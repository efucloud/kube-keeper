package config

import (
	"fmt"

	"github.com/efucloud/kube-keeper/pkg/embeds"
	"github.com/golang-jwt/jwt/v5"
)

func LoadSystemTokenKeys() error {
	privateKeyPEM := embeds.GetSystemTokenPrivateKeyPEM()
	if len(privateKeyPEM) == 0 {
		return fmt.Errorf("embedded system token private key is empty")
	}
	publicKeyPEM := embeds.GetSystemTokenPublicKeyPEM()
	if len(publicKeyPEM) == 0 {
		return fmt.Errorf("embedded system token public key is empty")
	}
	privateKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateKeyPEM)
	if err != nil {
		return fmt.Errorf("parse embedded system token private key failed: %w", err)
	}
	publicKey, err := jwt.ParseRSAPublicKeyFromPEM(publicKeyPEM)
	if err != nil {
		return fmt.Errorf("parse embedded system token public key failed: %w", err)
	}
	SystemRSAPrivateKey = privateKey
	SystemRSAPublicKey = publicKey
	return nil
}
