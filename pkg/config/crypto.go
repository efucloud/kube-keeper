package config

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"crypto/ed25519"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/x509"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"encoding/pem"
	"errors"
	"fmt"
	"golang.org/x/crypto/ssh"
	"runtime"
	"strconv"
	"strings"
)

type PaddingMode string

const PKCS5 PaddingMode = "PKCS5"
const PKCS7 PaddingMode = "PKCS7"
const ZEROS PaddingMode = "ZEROS"

func Padding(padding PaddingMode, src []byte, blockSize int) []byte {
	switch padding {
	case PKCS5:
		src = PKCS5Padding(src, blockSize)
	case PKCS7:
		src = PKCS7Padding(src, blockSize)
	case ZEROS:
		src = ZerosPadding(src, blockSize)
	}
	return src
}

func UnPadding(padding PaddingMode, src []byte) ([]byte, error) {
	switch padding {
	case PKCS5:
		return PKCS5UnPadding(src)
	case PKCS7:
		return PKCS7UnPadding(src)
	case ZEROS:
		return ZerosUnPadding(src)
	}
	return src, nil
}

func PKCS5Padding(src []byte, blockSize int) []byte {
	return PKCS7Padding(src, blockSize)
}

func PKCS5UnPadding(src []byte) ([]byte, error) {
	return PKCS7UnPadding(src)
}

func PKCS7Padding(src []byte, blockSize int) []byte {
	padding := blockSize - len(src)%blockSize
	padtext := bytes.Repeat([]byte{byte(padding)}, padding)
	return append(src, padtext...)
}

func PKCS7UnPadding(src []byte) ([]byte, error) {
	length := len(src)
	if length == 0 {
		return src, fmt.Errorf("src length is 0")
	}
	unpadding := int(src[length-1])
	if length < unpadding {
		return src, fmt.Errorf("src length is less than unpadding")
	}
	return src[:(length - unpadding)], nil
}

func ZerosPadding(src []byte, blockSize int) []byte {
	rem := len(src) % blockSize
	if rem == 0 {
		return src
	}
	return append(src, bytes.Repeat([]byte{0}, blockSize-rem)...)
}

func ZerosUnPadding(src []byte) ([]byte, error) {
	for i := len(src) - 1; ; i-- {
		if src[i] != 0 {
			return src[:i+1], nil
		}
	}
}

// AesSimpleEncrypt encrypts data with key using AES algorithm.
// In simple encryption mode, the user only needs to specify the key to complete the encryption.
// IV will be obtained by hashing the key. By default, PKCS7Padding and CBC modes are used.
// Return empty string if error occurs.
func AesSimpleEncrypt(data, key string) string {
	key = trimByMaxKeySize(key)
	keyBytes := ZerosPadding([]byte(key), aes.BlockSize)
	return AesCBCEncrypt(data, string(keyBytes), GenIVFromKey(key), PKCS7)
}

// AesCBCEncrypt encrypts data with key and iv using AES algorithm.
// You must make sure the length of key and iv is 16 bytes. This function does not perform any padding for key or iv.
func AesCBCEncrypt(data, key, iv string, paddingMode PaddingMode) string {
	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		return ""
	}

	src := Padding(paddingMode, []byte(data), block.BlockSize())
	encryptData := make([]byte, len(src))
	mode := cipher.NewCBCEncrypter(block, []byte(iv))
	mode.CryptBlocks(encryptData, src)
	return base64.StdEncoding.EncodeToString(encryptData)
}

// AesSimpleDecrypt decrypts data with key using AES algorithm.
// In simple decryption mode, the user only needs to specify the key to complete the decryption.
// This function will automatically obtain the IV by hashing the key.
func AesSimpleDecrypt(data, key string) string {
	key = trimByMaxKeySize(key)
	keyBytes := ZerosPadding([]byte(key), aes.BlockSize)
	return AesCBCDecrypt(data, string(keyBytes), GenIVFromKey(key), PKCS7)
}

// AesCBCDecrypt decrypts data with key and iv using AES algorithm.
func AesCBCDecrypt(data, key, iv string, paddingMode PaddingMode) string {
	block, err := aes.NewCipher([]byte(key))
	if err != nil {
		return ""
	}

	decodeData, _ := base64.StdEncoding.DecodeString(data)
	decryptData := make([]byte, len(decodeData))
	mode := cipher.NewCBCDecrypter(block, []byte(iv))
	mode.CryptBlocks(decryptData, decodeData)

	original, _ := UnPadding(paddingMode, decryptData)
	return string(original)
}

// GenIVFromKey generates IV from key.
func GenIVFromKey(key string) (iv string) {
	hashedKey := sha256.Sum256([]byte(key))
	return trimByBlockSize(hex.EncodeToString(hashedKey[:]))
}

func trimByBlockSize(key string) string {
	if len(key) > aes.BlockSize {
		return key[:aes.BlockSize]
	}
	return key
}

func trimByMaxKeySize(key string) string {
	if len(key) > 32 {
		return key[:32]
	}
	return key
}

const secretPrefix = "efuCloudSecretData:"

const (
	autoRegistryCipherPrefix  = "enc:rsa-v1:"
	autoRegistryCipherAAD     = "kube-keeper-auto-registry-transport-v2"
	autoRegistryCipherAlg     = "RSA-OAEP-SHA256+AES-256-GCM"
	autoRegistryPrivateKeyPEM = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDC1+G5GJ3dhWxy
9A7ZTsUaq/5wXiStXIKYqvdLehROCRXMo8vvZaQC9brUwdQvgyrOkFJm2FaaZmxl
AJRoNeYhxMztHqroQXnti+Qh36SLxmTOu4subPGujnC9r30/o8ZA3XdBhTNteRVO
g6fBqDqNdz8Vcg4fsLOjRX0PcdC6G8h+8tweNkXLmixKPwHsiNaaO0GwyRywRMkk
pX4GHONEQmO0CSwuuxIbDCl7CdKhb9LRNq2GVU+4FEK9jWQnX2yRBrunR5mp0x9S
eNQn4tI1IgOEEp9pfcxzPJe3vk22TndN0ybhbzIJMzlY1pQDMspqR+Y4Kx1nkmfD
AfXcLPYXAgMBAAECggEAGSnobQ9Q1Bs3NmFuyYHy0s8DvV9rPTiFZVIvPgA2Px3N
QvCklfZ6iCdUScX+sWQvUx4whjfKd4Zi2WiJwiuz3QidrsIXMIfER3mZrQZFKggl
XM272/MWA4VB6j2P33g3UolHrZ6WVb0dk1ZNhCVF6p9L9mkUieM4UA3ZaPU6D87s
wiuzDPc9YdeZlMp3AWLmfdFn5U/q0l/U1XFAbxAEROYFcT+Y9j1fb+vxambBbIEC
H1kQahJzAtJ3kSxtOWzwbNEviPkvQoPivP78h0JXpyoLgNz7AzMKOVTFKZuFiA+v
bocvoTZNBVdqotBq/rKAPJUjpcL82v1s1aZpNoC4gQKBgQD4ZTMpqSQcFuwShzI1
3AUdIroxHzLYcN22RmE+UIB+6h3mkobCguSbhhKG+srZY9TNnAPRnOJP423DpdaK
MnDpR2LJsySk+MVcU7CHdboZhR8o3U8OQkySRe78Y1Icy2RfWI5NaRqjJ5B4gOvx
d+jWVpwZ0lXba16shnTWy+URuwKBgQDIzves3zmISCDuUTQfbSE/foY3FH8Ip5wW
lIZeq+ssET3TDQgnMi3iGL6N++KrOqDee4Ouz7bWiXmpFahhw79GBGOxSI+XbD2D
Fu1GN0ZGMStseAzD9ePgRn9/T5AHMO1BJXZEKjzmHvX9gmkB58ut7zauEHXYELNA
tW+iyVOJVQKBgHX46oHA2WuV3201VL2Lz8n0smWeIbH2ePaXGpxT85NTcfwOX36G
WDkdRjNhbXIuHeXBUXb+geXbaEhhvTFJn6LLyrltIdxQYrvk65SKb2areQ8ZfPCS
wHdAS68HJPqUBwnZr0xIvOP8aHszD9xRTP5viBgjc6+QoRhji55wnEz9AoGAF5yO
bttIjoe8p4kQ0ekpEag06+ETFtdueRE5w4P/gQz98gUEQmeaEY3LSjKl8nBQXhiz
4Sg3XX6IuaL8S5KSuQ7nEf9wMuPdT76wY6M4NiSt8HElPx14j/R6JWQbkVzlaNWY
1GcLBhv53Lcq1biFsIwCJ/FzidZc3Wz4FXIKyokCgYBq0JMTOsxP85VeI/EleWQt
VWd80eLfeWPG8lY8d6xL7FSytEUZmjREIJnGB1yiMeb7LTRe7XrSzd9mTNaLCg7u
52fRjRZQQ5THqpXNrTJlSsKnm9g5QpruXuUPx+8zN4EJEQSPWWJA+2ix33e9fTyM
umwM/CX7CbcHw5MkJV+DWg==
-----END PRIVATE KEY-----`
)

var autoRegistryPrivateKey = mustParseAutoRegistryPrivateKey(autoRegistryPrivateKeyPEM)

type autoRegistryTransportEnvelope struct {
	Alg string `json:"alg"`
	Ek  string `json:"ek"`
	N   string `json:"n"`
	C   string `json:"c"`
}

// ClusterCertDataDecrypt 集群数据解密
func ClusterCertDataDecrypt(data string) (result string, err error) {
	var deBytes []byte
	if strings.HasPrefix(data, secretPrefix) {
		data = strings.TrimPrefix(data, secretPrefix)
		result = AesSimpleDecrypt(data, SerialNumber)
	} else {
		// 尝试base64解码，失败则保持原数据
		deBytes, err = base64.StdEncoding.DecodeString(data)
		if err == nil {
			result = string(deBytes)
		}
	}
	if result == "" {
		result = data
	}
	return result, err
}

// ClusterCertDataEncrypt 集群数据加密
func ClusterCertDataEncrypt(data string) (result string, err error) {
	if strings.HasPrefix(data, secretPrefix) {
		return data, nil
	}
	var deBytes []byte
	// 尝试base64解码，失败则保持原数据
	deBytes, err = base64.StdEncoding.DecodeString(data)
	if err == nil {
		data = string(deBytes)
	}
	result = AesSimpleEncrypt(data, SerialNumber)
	if result == "" {
		result = data
	}
	result = secretPrefix + result
	return result, err

}

// AutoRegistryDecryptField decrypts kube-keeper auto-registry encrypted field.
// Plain text is rejected by design (except empty value).
func AutoRegistryDecryptField(data string) (string, error) {
	value := strings.TrimSpace(data)
	if value == "" {
		return "", nil
	}
	if !strings.HasPrefix(value, autoRegistryCipherPrefix) {
		return "", fmt.Errorf("plain text auto-registry field is not allowed")
	}

	raw, err := base64.StdEncoding.DecodeString(strings.TrimPrefix(value, autoRegistryCipherPrefix))
	if err != nil {
		return "", err
	}
	var env autoRegistryTransportEnvelope
	if err := json.Unmarshal(raw, &env); err != nil {
		return "", err
	}
	if strings.TrimSpace(env.Alg) != autoRegistryCipherAlg {
		return "", fmt.Errorf("unsupported auto-registry cipher alg: %s", env.Alg)
	}

	encryptedKey, err := base64.StdEncoding.DecodeString(strings.TrimSpace(env.Ek))
	if err != nil {
		return "", err
	}
	nonce, err := base64.StdEncoding.DecodeString(strings.TrimSpace(env.N))
	if err != nil {
		return "", err
	}
	cipherRaw, err := base64.StdEncoding.DecodeString(strings.TrimSpace(env.C))
	if err != nil {
		return "", err
	}

	cek, err := rsa.DecryptOAEP(
		sha256.New(),
		rand.Reader,
		autoRegistryPrivateKey,
		encryptedKey,
		[]byte(autoRegistryCipherAAD),
	)
	if err != nil {
		return "", err
	}
	block, err := aes.NewCipher(cek)
	if err != nil {
		return "", err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}
	if len(nonce) != gcm.NonceSize() {
		return "", fmt.Errorf("nonce length mismatch")
	}

	plain, err := gcm.Open(nil, nonce, cipherRaw, []byte(autoRegistryCipherAAD))
	if err != nil {
		return "", err
	}
	return string(plain), nil
}

func mustParseAutoRegistryPrivateKey(privateKeyPEM string) *rsa.PrivateKey {
	block, _ := pem.Decode([]byte(strings.TrimSpace(privateKeyPEM)))
	if block == nil {
		panic("invalid auto-registry private key pem")
	}
	keyAny, err := x509.ParsePKCS8PrivateKey(block.Bytes)
	if err != nil {
		panic(fmt.Sprintf("parse auto-registry private key failed: %v", err))
	}
	key, ok := keyAny.(*rsa.PrivateKey)
	if !ok {
		panic("auto-registry private key is not RSA")
	}
	return key
}

type Ed25519KeyPair struct {
	PrivateKeyPEM    string // 私钥，PEM 格式（PKCS#8），可安全存入数据库（需加密）
	PublicKeyOpenSSH string // 公钥，OpenSSH 格式，如 "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5..."
}

func GenerateEd25519KeyPair() (private string, public string, err error) {
	// 1. 生成 Ed25519 密钥对
	publicKey, privateKey, err := ed25519.GenerateKey(rand.Reader)
	if err != nil {
		return "", "", fmt.Errorf("failed to generate Ed25519 key: %w", err)
	}

	// 2. 将私钥编码为 PKCS#8 PEM 格式（通用且标准）
	privateKeyBytes, err := x509.MarshalPKCS8PrivateKey(privateKey)
	if err != nil {
		return "", "", fmt.Errorf("failed to marshal private key: %w", err)
	}
	privatePEM := pem.EncodeToMemory(&pem.Block{
		Type:  "PRIVATE KEY", // PKCS#8
		Bytes: privateKeyBytes,
	})

	// 3. 将公钥编码为 OpenSSH 格式（如 ssh-ed25519 AAAA...）
	sshPublicKey, err := ssh.NewPublicKey(publicKey)
	if err != nil {
		return "", "", fmt.Errorf("failed to create SSH public key: %w", err)
	}
	publicKeyOpenSSH := string(ssh.MarshalAuthorizedKey(sshPublicKey))

	return string(privatePEM), publicKeyOpenSSH, nil
}

const (
	// token format:
	// LIC1.<enc_kid_b64>.<encrypted_cek_b64>.<nonce_b64>.<ciphertext_b64>
	LicenseTokenPrefix = "LIC1"

	tokenVersion          = 1
	tokenSigAlgorithm     = "Ed25519"
	maxLicenseTokenLength = 128 * 1024
)

var (
	ErrInvalidLicenseTokenFormat = errors.New("invalid license token format")
	ErrUnsupportedLicenseToken   = errors.New("unsupported license token")
	ErrUnknownSigningKey         = errors.New("unknown signing key")
	ErrInvalidLicenseSignature   = errors.New("invalid license signature")
)

type LicenseTokenMeta struct {
	Version         int    `json:"version"`
	EncryptionKeyID string `json:"encryptionKeyId"`
	SigningKeyID    string `json:"signingKeyId"`
}

type signedEnvelope struct {
	V          int    `json:"v"`
	SigAlg     string `json:"sig_alg"`
	SigKID     string `json:"sig_kid"`
	PayloadB64 string `json:"payload"`
	SigB64     string `json:"sig"`
}

func b64dRaw(s string) ([]byte, error) {
	return base64.RawURLEncoding.DecodeString(s)
}

func buildAAD(encKID string) []byte {
	// AAD binds prefix/version/enc-kid to ciphertext.
	return []byte(LicenseTokenPrefix + "|" + strconv.Itoa(tokenVersion) + "|" + encKID)
}

func wipeBytes(b []byte) {
	for i := range b {
		b[i] = 0
	}
	runtime.KeepAlive(b)
}

func parseRSAPrivateKeyPEM(privatePEM string) (*rsa.PrivateKey, error) {
	block, _ := pem.Decode([]byte(privatePEM))
	if block == nil {
		return nil, errors.New("invalid rsa private pem")
	}

	if privAny, err := x509.ParsePKCS8PrivateKey(block.Bytes); err == nil {
		priv, ok := privAny.(*rsa.PrivateKey)
		if !ok {
			return nil, errors.New("private key is not rsa")
		}
		if priv.N.BitLen() < 2048 {
			return nil, errors.New("rsa private key bits must be >= 2048")
		}
		return priv, nil
	}

	priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, fmt.Errorf("parse rsa private key: %w", err)
	}
	if priv.N.BitLen() < 2048 {
		return nil, errors.New("rsa private key bits must be >= 2048")
	}
	return priv, nil
}

func parseEd25519PublicKeyPEM(publicPEM string) (ed25519.PublicKey, error) {
	block, _ := pem.Decode([]byte(publicPEM))
	if block == nil {
		return nil, errors.New("invalid ed25519 public pem")
	}

	pubAny, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return nil, fmt.Errorf("parse ed25519 public key: %w", err)
	}
	pub, ok := pubAny.(ed25519.PublicKey)
	if !ok {
		return nil, errors.New("public key is not ed25519")
	}
	return pub, nil
}

// DecryptAndVerifyLicenseToken decrypts token then verifies signature.
// trustedIssuerPublicKeysByKID: map[sigKID]issuerEd25519PublicPEM
func DecryptAndVerifyLicenseToken(
	token string,
	recipientPrivateKeyPEM string,
	trustedIssuerPublicKeysByKID map[string]string,
) ([]byte, LicenseTokenMeta, error) {
	var emptyMeta LicenseTokenMeta

	if token == "" || len(token) > maxLicenseTokenLength {
		return nil, emptyMeta, ErrInvalidLicenseTokenFormat
	}

	parts := strings.Split(token, ".")
	if len(parts) != 5 {
		return nil, emptyMeta, ErrInvalidLicenseTokenFormat
	}
	if parts[0] != LicenseTokenPrefix {
		return nil, emptyMeta, ErrUnsupportedLicenseToken
	}

	encKIDBytes, err := b64dRaw(parts[1])
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("decode enc_kid: %w", err)
	}
	encKID := string(encKIDBytes)
	aad := buildAAD(encKID)

	encryptedCEK, err := b64dRaw(parts[2])
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("decode encrypted_cek: %w", err)
	}
	nonce, err := b64dRaw(parts[3])
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("decode nonce: %w", err)
	}
	ciphertext, err := b64dRaw(parts[4])
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("decode ciphertext: %w", err)
	}

	recipientPriv, err := parseRSAPrivateKeyPEM(recipientPrivateKeyPEM)
	if err != nil {
		return nil, emptyMeta, err
	}

	cek, err := rsa.DecryptOAEP(sha256.New(), rand.Reader, recipientPriv, encryptedCEK, aad)
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("decrypt cek: %w", err)
	}
	defer wipeBytes(cek)

	block, err := aes.NewCipher(cek)
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("new aes cipher: %w", err)
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("new gcm: %w", err)
	}
	if len(nonce) != gcm.NonceSize() {
		return nil, emptyMeta, errors.New("invalid nonce size")
	}

	plainEnv, err := gcm.Open(nil, nonce, ciphertext, aad)
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("decrypt ciphertext: %w", err)
	}
	defer wipeBytes(plainEnv)

	var env signedEnvelope
	if err := json.Unmarshal(plainEnv, &env); err != nil {
		return nil, emptyMeta, fmt.Errorf("unmarshal envelope: %w", err)
	}

	if env.V != tokenVersion || env.SigAlg != tokenSigAlgorithm {
		return nil, emptyMeta, ErrUnsupportedLicenseToken
	}

	pubPEM, ok := trustedIssuerPublicKeysByKID[env.SigKID]
	if !ok {
		return nil, emptyMeta, ErrUnknownSigningKey
	}
	issuerPub, err := parseEd25519PublicKeyPEM(pubPEM)
	if err != nil {
		return nil, emptyMeta, err
	}

	payload, err := b64dRaw(env.PayloadB64)
	if err != nil {
		return nil, emptyMeta, fmt.Errorf("decode payload: %w", err)
	}
	sig, err := b64dRaw(env.SigB64)
	if err != nil {
		wipeBytes(payload)
		return nil, emptyMeta, fmt.Errorf("decode signature: %w", err)
	}

	if !ed25519.Verify(issuerPub, payload, sig) {
		wipeBytes(payload)
		return nil, emptyMeta, ErrInvalidLicenseSignature
	}

	meta := LicenseTokenMeta{
		Version:         tokenVersion,
		EncryptionKeyID: encKID,
		SigningKeyID:    env.SigKID,
	}
	return payload, meta, nil
}
