package openshift

import (
	appsv1 "github.com/openshift/client-go/apps/clientset/versioned/typed/apps/v1"
	authorizationv1 "github.com/openshift/client-go/authorization/clientset/versioned/typed/authorization/v1"
	buildv1 "github.com/openshift/client-go/build/clientset/versioned/typed/build/v1"
	imagev1 "github.com/openshift/client-go/image/clientset/versioned/typed/image/v1"
	oauthv1 "github.com/openshift/client-go/oauth/clientset/versioned/typed/oauth/v1"
	projectv1 "github.com/openshift/client-go/project/clientset/versioned/typed/project/v1"
	quotav1 "github.com/openshift/client-go/quota/clientset/versioned/typed/quota/v1"
	routev1 "github.com/openshift/client-go/route/clientset/versioned/typed/route/v1"
	securityv1 "github.com/openshift/client-go/security/clientset/versioned/typed/security/v1"
	templatev1 "github.com/openshift/client-go/template/clientset/versioned/typed/template/v1"
	userv1 "github.com/openshift/client-go/user/clientset/versioned/typed/user/v1"
	"k8s.io/client-go/discovery"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/util/flowcontrol"
)

type Interface interface {
	Discovery() discovery.DiscoveryInterface
	AppsV1() appsv1.AppsV1Interface
	//Deprecated: please explicitly pick a version if possible.
	Apps() appsv1.AppsV1Interface
	AuthorizationV1() authorizationv1.AuthorizationV1Interface
	//Deprecated: please explicitly pick a version if possible.
	Authorization() authorizationv1.AuthorizationV1Interface
	BuildV1() buildv1.BuildV1Interface
	Build() buildv1.BuildV1Interface
	ImageV1() imagev1.ImageV1Interface
	Image() imagev1.ImageV1Interface
	OauthV1() oauthv1.OauthV1Interface
	Oauth() oauthv1.OauthV1Interface
	QuotaV1() quotav1.QuotaV1Interface
	Quota() quotav1.QuotaV1Interface
	RouteV1() routev1.RouteV1Interface
	Route() routev1.RouteV1Interface
	SecurityV1() securityv1.SecurityV1Interface

	Security() securityv1.SecurityV1Interface
	TemplateV1() templatev1.TemplateV1Interface
	Template() templatev1.TemplateV1Interface
	UserV1() userv1.UserV1Interface
	User() userv1.UserV1Interface
	ProjectV1() projectv1.ProjectV1Interface
	Project() projectv1.ProjectV1Interface
}

// Clientset contains the clients for groups. Each group has exactly one
// version included in a Clientset.
type Clientset struct {
	*discovery.DiscoveryClient
	authorizationV1 *authorizationv1.AuthorizationV1Client
	appsV1          *appsv1.AppsV1Client
	buildV1         *buildv1.BuildV1Client
	imageV1         *imagev1.ImageV1Client
	oauthV1         *oauthv1.OauthV1Client
	quotaV1         *quotav1.QuotaV1Client
	routeV1         *routev1.RouteV1Client
	securityV1      *securityv1.SecurityV1Client
	templateV1      *templatev1.TemplateV1Client
	userV1          *userv1.UserV1Client
	projectV1       *projectv1.ProjectV1Client
}

var _ Interface = &Clientset{}

// Discovery retrieves the DiscoveryClient
func (c *Clientset) Discovery() discovery.DiscoveryInterface {
	if c == nil {
		return nil
	}
	return c.DiscoveryClient
}

// AppsV1 retrieves the AppsV1Client
func (c *Clientset) AppsV1() appsv1.AppsV1Interface {
	return c.appsV1
}
func (c *Clientset) Apps() appsv1.AppsV1Interface {
	return c.appsV1
}

// AuthorizationV1 retrieves the AuthorizationV1Client
func (c *Clientset) AuthorizationV1() authorizationv1.AuthorizationV1Interface {
	return c.authorizationV1
}
func (c *Clientset) Authorization() authorizationv1.AuthorizationV1Interface {
	return c.authorizationV1
}

// BuildV1 retrieves the BuildV1Client
func (c *Clientset) BuildV1() buildv1.BuildV1Interface {
	return c.buildV1
}
func (c *Clientset) Build() buildv1.BuildV1Interface {
	return c.buildV1
}

// ImageV1 retrieves the ImageV1Client
func (c *Clientset) ImageV1() imagev1.ImageV1Interface {
	return c.imageV1
}
func (c *Clientset) Image() imagev1.ImageV1Interface {
	return c.imageV1
}

// OauthV1 retrieves the OauthV1Client
func (c *Clientset) OauthV1() oauthv1.OauthV1Interface {
	return c.oauthV1
}
func (c *Clientset) Oauth() oauthv1.OauthV1Interface {
	return c.oauthV1
}

// QuotaV1 retrieves the QuotaV1Client
func (c *Clientset) QuotaV1() quotav1.QuotaV1Interface {
	return c.quotaV1
}
func (c *Clientset) Quota() quotav1.QuotaV1Interface {
	return c.quotaV1
}

// RouteV1 retrieves the RouteV1Client
func (c *Clientset) RouteV1() routev1.RouteV1Interface {
	return c.routeV1
}
func (c *Clientset) Route() routev1.RouteV1Interface {
	return c.routeV1
}

// SecurityV1 retrieves the SecurityV1Client
func (c *Clientset) SecurityV1() securityv1.SecurityV1Interface {
	return c.securityV1
}
func (c *Clientset) Security() securityv1.SecurityV1Interface {
	return c.securityV1
}

// TemplateV1 retrieves the TemplateV1Client
func (c *Clientset) TemplateV1() templatev1.TemplateV1Interface {
	return c.templateV1
}
func (c *Clientset) Template() templatev1.TemplateV1Interface {
	return c.templateV1
}

// UserV1 retrieves the UserV1Client
func (c *Clientset) UserV1() userv1.UserV1Interface {
	return c.userV1
}
func (c *Clientset) User() userv1.UserV1Interface {
	return c.userV1
}

// ProjectV1 retrieves the ProjectV1Client
func (c *Clientset) ProjectV1() projectv1.ProjectV1Interface {
	return c.projectV1
}
func (c *Clientset) Project() projectv1.ProjectV1Interface {
	return c.projectV1
}

// NewForConfig creates a new Clientset for the given config.
func NewForConfig(c *rest.Config) (*Clientset, error) {
	configShallowCopy := *c
	if configShallowCopy.RateLimiter == nil && configShallowCopy.QPS > 0 {
		configShallowCopy.RateLimiter = flowcontrol.NewTokenBucketRateLimiter(configShallowCopy.QPS, configShallowCopy.Burst)
	}
	var cs Clientset
	var err error
	cs.authorizationV1, err = authorizationv1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.appsV1, err = appsv1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.buildV1, err = buildv1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.imageV1, err = imagev1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.oauthV1, err = oauthv1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.quotaV1, err = quotav1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.routeV1, err = routev1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.securityV1, err = securityv1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}

	cs.templateV1, err = templatev1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.userV1, err = userv1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.projectV1, err = projectv1.NewForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	cs.DiscoveryClient, err = discovery.NewDiscoveryClientForConfig(&configShallowCopy)
	if err != nil {
		return nil, err
	}
	return &cs, nil
}

// NewForConfigOrDie creates a new Clientset for the given config and
// panics if there is an error in the config.
func NewForConfigOrDie(c *rest.Config) *Clientset {
	var cs Clientset
	cs.authorizationV1 = authorizationv1.NewForConfigOrDie(c)
	cs.appsV1 = appsv1.NewForConfigOrDie(c)
	cs.buildV1 = buildv1.NewForConfigOrDie(c)
	cs.imageV1 = imagev1.NewForConfigOrDie(c)
	cs.oauthV1 = oauthv1.NewForConfigOrDie(c)
	cs.quotaV1 = quotav1.NewForConfigOrDie(c)
	cs.routeV1 = routev1.NewForConfigOrDie(c)
	cs.securityV1 = securityv1.NewForConfigOrDie(c)
	cs.templateV1 = templatev1.NewForConfigOrDie(c)
	cs.userV1 = userv1.NewForConfigOrDie(c)
	cs.projectV1 = projectv1.NewForConfigOrDie(c)
	cs.DiscoveryClient = discovery.NewDiscoveryClientForConfigOrDie(c)
	return &cs
}

// New creates a new Clientset for the given RESTClient.
func New(c rest.Interface) *Clientset {
	var cs Clientset
	//cs.authorizationV1 = authorizationv1.New(c)
	cs.appsV1 = appsv1.New(c)
	//cs.buildV1 = buildv1.New(c)
	//cs.imageV1 = imagev1.New(c)
	//cs.oauthV1 = oauthv1.New(c)
	//cs.quotaV1 = quotav1.New(c)
	//cs.routeV1 = routev1.New(c)
	//cs.securityV1 = securityv1.New(c)
	//cs.templateV1 = templatev1.New(c)
	cs.userV1 = userv1.New(c)
	cs.DiscoveryClient = discovery.NewDiscoveryClient(c)
	return &cs
}
