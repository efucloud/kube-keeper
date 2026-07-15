package openshift

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"github.com/RangelReale/osin"
	"github.com/RangelReale/osincli"
	"github.com/efucloud/kube-keeper/pkg/config"
	"io"
	"io/ioutil"
	apierrs "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/sets"
	restclient "k8s.io/client-go/rest"
	"net/http"
	"net/url"
	"path"
	"regexp"
	"strings"
)

const (
	//csrfTokenHeader is a marker header that indicates we are not a browser that got tricked into requesting basic auth
	//Corresponds to the header expected by basic-auth challenging authenticators
	//Copied from pkg/auth/authenticator/challenger/passwordchallenger/password_auth_handler.go
	csrfTokenHeader = "X-CSRF-Token"

	//DiscoveryClient endpoint for OAuth 2.0 Authorization Server Metadata
	//See IETF Draft:
	//https://tools.ietf.org/html/draft-ietf-oauth-discovery-04#section-2
	//Copied from pkg/cmd/server/origin/nonapiserver.go
	oauthMetadataEndpoint = "/.well-known/oauth-authorization-server"

	//openShiftCLIClientID is the name of the CLI OAuth client, copied from pkg/oauth/apiserver/auth.go
	openShiftCLIClientID = "openshift-challenging-client"

	//pkce_s256 is sha256 hash per RFC7636, copied from github.com/RangelReale/osincli/pkce.go
	pkce_s256 = "S256"

	//token fakes the missing osin.TOKEN const
	token osincli.AuthorizeRequestType = "token"
)

const (
	AuthorizePath = "/authorize"
	TokenPath     = "/token"
	InfoPath      = "/info"

	RequestTokenEndpoint  = "/token/request"
	DisplayTokenEndpoint  = "/token/display"
	ImplicitTokenEndpoint = "/token/implicit"
)

const OpenShiftOAuthAPIPrefix = "/oauth"

func OpenShiftOAuthAuthorizeURL(masterAddr string) string {
	return openShiftOAuthURL(masterAddr, AuthorizePath)
}
func OpenShiftOAuthTokenURL(masterAddr string) string {
	return openShiftOAuthURL(masterAddr, TokenPath)
}
func OpenShiftOAuthTokenRequestURL(masterAddr string) string {
	return openShiftOAuthURL(masterAddr, RequestTokenEndpoint)
}
func OpenShiftOAuthTokenDisplayURL(masterAddr string) string {
	return openShiftOAuthURL(masterAddr, DisplayTokenEndpoint)
}
func OpenShiftOAuthTokenImplicitURL(masterAddr string) string {
	return openShiftOAuthURL(masterAddr, ImplicitTokenEndpoint)
}
func openShiftOAuthURL(masterAddr, oauthEndpoint string) string {
	return strings.TrimRight(masterAddr, "/") + path.Join(OpenShiftOAuthAPIPrefix, oauthEndpoint)
}

type OpenshiftAuth interface {
	RequestToken(username, password string) (token string, err error)
}

func NewOpenshiftAuth(config *restclient.Config) OpenshiftAuth {
	return &auth{config: config}
}

type auth struct {
	config *restclient.Config
}

type RequestTokenOptions struct {
	ClientConfig *restclient.Config
	Handler      ChallengeHandler
	OsinConfig   *osincli.ClientConfig
	TokenFlow    bool
}

type ChallengeHandler interface {
	//CanHandle returns true if the handler recognizes a challenge it thinks it can handle.
	CanHandle(headers http.Header) bool
	//HandleChallenge lets the handler attempt to handle a challenge.
	//It is only invoked if CanHandle() returned true for the given headers.
	//Returns response headers and true if the challenge is successfully handled.
	//Returns false if the challenge was not handled, and an optional error in error cases.
	HandleChallenge(requestURL string, headers http.Header) (http.Header, bool, error)
	//CompleteChallenge is invoked with the headers from a successful server response
	//received after having handled one or more challenges.
	//Returns an error if the handler does not consider the challenge/response interaction complete.
	CompleteChallenge(requestURL string, headers http.Header) error
	//Release gives the handler a chance to release any resources held during a challenge/response sequence.
	//It is always invoked, even in cases where no challenges were received or handled.
	Release() error
}

type BasicChallengeHandler struct {
	//Host is the server being authenticated to. Used only for displaying messages when prompting for username/password
	Host string

	//Reader is used to prompt for username/password. If nil, no prompting is done
	Reader io.Reader
	//Writer is used to output prompts. If nil, stdout is used
	Writer io.Writer

	//Username is the username to use when challenged. If empty, a prompt is issued to a non-nil Reader
	Username string
	//Password is the password to use when challenged. If empty, a prompt is issued to a non-nil Reader
	Password string

	//handled tracks whether this handler has already handled a challenge.
	handled bool
	//prompted tracks whether this handler has already prompted for a username and/or password.
	prompted bool
}

// if any of these match a WWW-Authenticate header, it is a basic challenge
// capturing group 1 (if present) should contain the realm
var basicRegexes = []*regexp.Regexp{
	//quoted realm
	regexp.MustCompile(`(?i)^\s*basic\s+realm\s*=\s*"(.*?)"\s*(,|$)`),
	//token realm
	regexp.MustCompile(`(?i)^\s*basic\s+realm\s*=\s*(.*?)\s*(,|$)`),
	//no realm
	regexp.MustCompile(`(?i)^\s*basic(?:\s+|$)`),
}

func basicRealm(headers http.Header) (bool, string) {
	for _, challengeHeader := range headers[http.CanonicalHeaderKey("WWW-Authenticate")] {
		for _, r := range basicRegexes {
			if matches := r.FindStringSubmatch(challengeHeader); matches != nil {
				if len(matches) > 1 {
					//We got a realm as well
					return true, matches[1]
				}
				//No realm, but still basic
				return true, ""
			}
		}
	}
	return false, ""
}
func getBasicHeader(username, password string) string {
	return "Basic " + base64.StdEncoding.EncodeToString([]byte(username+":"+password))
}

func (c *BasicChallengeHandler) CanHandle(headers http.Header) bool {
	isBasic, _ := basicRealm(headers)
	return isBasic
}
func (c *BasicChallengeHandler) HandleChallenge(requestURL string, headers http.Header) (http.Header, bool, error) {
	if c.handled {
		config.Logger.Info("already handled basic challenge")
		return nil, false, nil
	}

	username := c.Username
	password := c.Password
	if len(username) > 0 || len(password) > 0 {
		//Basic auth does not support usernames containing colons
		//http://tools.ietf.org/html/rfc2617#section-2
		if strings.Contains(username, ":") {
			return nil, false, fmt.Errorf("username %s is invalid for basic auth", username)
		}
		responseHeaders := http.Header{}
		responseHeaders.Set("Authorization", getBasicHeader(username, password))
		//remember so we don't re-handle non-interactively
		c.handled = true
		return responseHeaders, true, nil
	}

	config.Logger.Info("no username or password available")
	return nil, false, nil
}
func (c *BasicChallengeHandler) CompleteChallenge(requestURL string, headers http.Header) error {
	return nil
}

func (c *BasicChallengeHandler) Release() error {
	return nil
}

func (a *auth) RequestToken(username, password string) (token string, err error) {
	return NewRequestTokenOptions(a.config, nil, username, password, false).RequestToken()
}

func NewRequestTokenOptions(clientCfg *restclient.Config, reader io.Reader, defaultUsername string, defaultPassword string, tokenFlow bool) *RequestTokenOptions {
	return &RequestTokenOptions{
		ClientConfig: clientCfg,
		Handler:      &BasicChallengeHandler{Host: clientCfg.Host, Reader: reader, Username: defaultUsername, Password: defaultPassword},
		TokenFlow:    tokenFlow,
	}
}

// OauthAuthorizationServerMetadata holds OAuth 2.0 Authorization Server Metadata used for discovery
// https://tools.ietf.org/html/draft-ietf-oauth-discovery-04#section-2
type OauthAuthorizationServerMetadata struct {
	//The authorization server's issuer identifier, which is a URL that uses the https scheme and has no query or fragment applications.
	//This is the location where .well-known RFC 5785 [RFC5785] resources containing information about the authorization server are published.
	Issuer string `json:"issuer"`

	//URL of the authorization server's authorization endpoint [RFC6749].
	AuthorizationEndpoint string `json:"authorization_endpoint"`

	//URL of the authorization server's token endpoint [RFC6749].
	TokenEndpoint string `json:"token_endpoint"`

	//JSON array containing a list of the OAuth 2.0 [RFC6749] scope values that this authorization server supports.
	//Servers MAY choose not to advertise some supported scope values even when this parameter is used.
	ScopesSupported []string `json:"scopes_supported"`

	//JSON array containing a list of the OAuth 2.0 response_type values that this authorization server supports.
	//The array values used are the same as those used with the response_types parameter defined by "OAuth 2.0 Dynamic Client Registration Protocol" [RFC7591].
	ResponseTypesSupported osin.AllowedAuthorizeType `json:"response_types_supported"`

	//JSON array containing a list of the OAuth 2.0 grant type values that this authorization server supports.
	//The array values used are the same as those used with the grant_types parameter defined by "OAuth 2.0 Dynamic Client Registration Protocol" [RFC7591].
	GrantTypesSupported osin.AllowedAccessType `json:"grant_types_supported"`

	//JSON array containing a list of PKCE [RFC7636] code challenge methods supported by this authorization server.
	//Code challenge method values are used in the "code_challenge_method" parameter defined in Section 4.3 of [RFC7636].
	//The valid code challenge method values are those registered in the IANA "PKCE Code Challenge Methods" registry [IANA.OAuth.Parameters].
	CodeChallengeMethodsSupported []string `json:"code_challenge_methods_supported"`
}

func (o *RequestTokenOptions) SetDefaultOsinConfig() error {
	if o.OsinConfig != nil {
		return fmt.Errorf("osin config is already set to: %#v", *o.OsinConfig)
	}

	//get the OAuth metadata from the server
	rt, err := restclient.TransportFor(o.ClientConfig)
	if err != nil {
		return err
	}

	requestURL := strings.TrimRight(o.ClientConfig.Host, "/") + oauthMetadataEndpoint
	resp, err := request(rt, requestURL, nil)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("couldn't get %v: unexpected response status %v", requestURL, resp.StatusCode)
	}

	metadata := &OauthAuthorizationServerMetadata{}
	if err := json.NewDecoder(resp.Body).Decode(metadata); err != nil {
		return err
	}

	//use the metadata to build the osin config
	config := &osincli.ClientConfig{
		ClientId:     openShiftCLIClientID,
		AuthorizeUrl: metadata.AuthorizationEndpoint,
		TokenUrl:     metadata.TokenEndpoint,
		RedirectUrl:  OpenShiftOAuthTokenImplicitURL(metadata.Issuer),
	}

	if !o.TokenFlow && sets.NewString(metadata.CodeChallengeMethodsSupported...).Has(pkce_s256) {
		if err := osincli.PopulatePKCE(config); err != nil {
			return err
		}
	}
	o.OsinConfig = config
	return nil
}

func request(rt http.RoundTripper, requestURL string, requestHeaders http.Header) (*http.Response, error) {
	//Build the request
	req, err := http.NewRequest("GET", requestURL, nil)
	if err != nil {
		return nil, err
	}
	for k, v := range requestHeaders {
		req.Header[k] = v
	}
	req.Header.Set(csrfTokenHeader, "1")

	//Make the request
	return rt.RoundTrip(req)
}

func (o *RequestTokenOptions) RequestToken() (string, error) {
	defer func() {
		//Always release the handler
		if err := o.Handler.Release(); err != nil {
			//Release errors shouldn't fail the token request, just log
			config.Logger.Infof("error releasing handler: %v", err)
		}
	}()

	rt, err := restclient.TransportFor(o.ClientConfig)
	if err != nil {
		return "", err
	}

	if o.OsinConfig == nil {
		if err := o.SetDefaultOsinConfig(); err != nil {
			return "", err
		}
	}

	client, err := osincli.NewClient(o.OsinConfig)
	if err != nil {
		return "", err
	}
	client.Transport = rt
	authorizeRequest := client.NewAuthorizeRequest(osincli.CODE) //assume code flow to start with

	var oauthTokenFunc func(redirectURL string) (accessToken string, oauthError error)
	if o.TokenFlow {
		//access_token in fragment or error parameter
		authorizeRequest.Type = token //manually override to token flow if necessary
		oauthTokenFunc = oauthTokenFlow
	} else {
		//code or error parameter
		oauthTokenFunc = func(redirectURL string) (accessToken string, oauthError error) {
			return oauthCodeFlow(client, authorizeRequest, redirectURL)
		}
	}

	//requestURL holds the current URL to make requests to. This can change if the server responds with a redirect
	requestURL := authorizeRequest.GetAuthorizeUrl().String()
	//requestHeaders holds additional headers to add to the request. This can be changed by o.Handlers
	requestHeaders := http.Header{}
	//requestedURLSet/requestedURLList hold the URLs we have requested, to prevent redirect loops. Gets reset when a challenge is handled.
	requestedURLSet := sets.NewString()
	requestedURLList := []string{}
	handledChallenge := false

	for {
		//Make the request
		resp, err := request(rt, requestURL, requestHeaders)
		if err != nil {
			return "", err
		}
		defer resp.Body.Close()

		if resp.StatusCode == http.StatusUnauthorized {
			if resp.Header.Get("WWW-Authenticate") != "" {
				if !o.Handler.CanHandle(resp.Header) {
					return "", apierrs.NewUnauthorized("unhandled challenge")
				}
				//Handle the challenge
				newRequestHeaders, shouldRetry, err := o.Handler.HandleChallenge(requestURL, resp.Header)
				if err != nil {
					return "", err
				}
				if !shouldRetry {
					return "", apierrs.NewUnauthorized("challenger chose not to retry the request")
				}
				//Remember if we've ever handled a challenge
				handledChallenge = true

				//Reset request set/list. Since we're setting different headers, it is legitimate to request the same urls
				requestedURLSet = sets.NewString()
				requestedURLList = []string{}
				//Use the response to the challenge as the new headers
				requestHeaders = newRequestHeaders
				continue
			}

			//Unauthorized with no challenge
			unauthorizedError := apierrs.NewUnauthorized("")
			//Attempt to read body content and include as an error detail
			if details, err := ioutil.ReadAll(resp.Body); err == nil && len(details) > 0 {
				unauthorizedError.ErrStatus.Details = &metav1.StatusDetails{
					Causes: []metav1.StatusCause{
						{Message: string(details)},
					},
				}
			}

			return "", unauthorizedError
		}

		//if we've ever handled a challenge, see if the handler also considers the interaction complete.
		//this is required for negotiate flows with mutual authentication.
		if handledChallenge {
			if err := o.Handler.CompleteChallenge(requestURL, resp.Header); err != nil {
				return "", err
			}
		}

		if resp.StatusCode == http.StatusFound {
			redirectURL := resp.Header.Get("Location")

			//OAuth response case
			accessToken, err := oauthTokenFunc(redirectURL)
			if err != nil {
				return "", err
			}
			if len(accessToken) > 0 {
				return accessToken, nil
			}

			//Non-OAuth response, just follow the URL
			//add to our list of redirects
			requestedURLList = append(requestedURLList, redirectURL)
			//detect loops
			if !requestedURLSet.Has(redirectURL) {
				requestedURLSet.Insert(redirectURL)
				requestURL = redirectURL
				continue
			}
			return "", apierrs.NewInternalError(fmt.Errorf("redirect loop: %s", strings.Join(requestedURLList, " -> ")))
		}

		//Unknown response
		return "", apierrs.NewInternalError(fmt.Errorf("unexpected response: %d", resp.StatusCode))
	}
}

func oauthCodeFlow(client *osincli.Client, authorizeRequest *osincli.AuthorizeRequest, location string) (string, error) {
	//Make a request out of the URL since that is what AuthorizeRequest.HandleRequest expects to extract data from
	req, err := http.NewRequest("GET", location, nil)
	if err != nil {
		return "", err
	}

	req.ParseForm()
	if oauthErr := oauthErrFromValues(req.Form); oauthErr != nil {
		return "", oauthErr
	}
	if len(req.Form.Get("code")) == 0 {
		return "", nil //no code parameter so this is not part of the OAuth flow
	}

	//any errors after this are fatal because we are committed to an OAuth flow now
	authorizeData, err := authorizeRequest.HandleRequest(req)
	if err != nil {
		return "", osinToOAuthError(err)
	}

	accessRequest := client.NewAccessRequest(osincli.AUTHORIZATION_CODE, authorizeData)
	accessData, err := accessRequest.GetToken()
	if err != nil {
		return "", osinToOAuthError(err)
	}

	return accessData.AccessToken, nil
}

// osinToOAuthError creates a better error message for osincli.Error
func osinToOAuthError(err error) error {
	if osinErr, ok := err.(*osincli.Error); ok {
		return createOAuthError(osinErr.Id, osinErr.Description)
	}
	return err
}

func oauthTokenFlow(location string) (string, error) {
	u, err := url.Parse(location)
	if err != nil {
		return "", err
	}

	if oauthErr := oauthErrFromValues(u.Query()); oauthErr != nil {
		return "", oauthErr
	}

	//Grab the raw fragment ourselves, since the stdlib URL parsing decodes parts of it
	fragment := ""
	if parts := strings.SplitN(location, "#", 2); len(parts) == 2 {
		fragment = parts[1]
	}
	fragmentValues, err := url.ParseQuery(fragment)
	if err != nil {
		return "", err
	}

	return fragmentValues.Get("access_token"), nil
}

func oauthErrFromValues(values url.Values) error {
	if errorCode := values.Get("error"); len(errorCode) > 0 {
		errorDescription := values.Get("error_description")
		return createOAuthError(errorCode, errorDescription)
	}
	return nil
}

func createOAuthError(errorCode, errorDescription string) error {
	return fmt.Errorf("%s %s", errorCode, errorDescription)
}
