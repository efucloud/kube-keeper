package utils

import (
	"github.com/google/go-containerregistry/pkg/name"
	"regexp"
	"strings"
)

// NormalizeImageToRepo 将镜像字符串标准化为 "registry/repo" 形式（不含 tag）
// 例如:
//
//	"nginx"                     → "docker.io/library/nginx"
//	"library/nginx"             → "docker.io/library/nginx"
//	"nginx:1.25"                → "docker.io/library/nginx"
//	"quay.io/coreos/etcd"       → "quay.io/coreos/etcd"
//	"myreg:5000/ns/app:v1"      → "myreg:5000/ns/app"
func NormalizeImageToRepo(image string) (string, error) {
	// ParseReference 会自动处理默认 registry 和 library
	ref, err := name.ParseReference(image)
	if err != nil {
		return "", err
	}
	// 获取仓库上下文（不含 tag/digest）
	repo := ref.Context()
	// repo.Name() 返回标准化后的 "registry/repo"
	return repo.Name(), nil
}
func SanitizeImageNameForFilename(image string) string {
	// 移除 tag/digest 之前的 registry 部分只保留 repo 名
	parts := strings.Split(image, "/")
	base := parts[len(parts)-1] // 如 "nginx:1.25" 或 "myapp"
	base = strings.Split(base, ":")[0]
	base = strings.Split(base, "@")[0]
	// 替换非法字符
	base = strings.ReplaceAll(base, "/", "_")
	base = strings.ReplaceAll(base, "\\", "_")
	if base == "" {
		base = "image"
	}
	return base
}

var tagRegex = regexp.MustCompile(`^[a-zA-Z0-9_][a-zA-Z0-9._-]{0,127}$`)

func IsValidTag(tag string) bool {
	if len(tag) == 0 || len(tag) > 128 {
		return false
	}
	// 不允许以 '.' 或 '-' 开头（Docker 规范）
	if strings.HasPrefix(tag, ".") || strings.HasPrefix(tag, "-") {
		return false
	}
	return tagRegex.MatchString(tag)
}
