package dtos

import (
	"context"
	stdpath "path"
	"strings"
)

func normalizeAbsolutePodPath(value string) string {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" || trimmed == "." {
		return "/"
	}
	if !strings.HasPrefix(trimmed, "/") {
		trimmed = "/" + trimmed
	}
	cleaned := stdpath.Clean(trimmed)
	if cleaned == "." || cleaned == "" {
		return "/"
	}
	if !strings.HasPrefix(cleaned, "/") {
		return "/" + cleaned
	}
	return cleaned
}

type PodFileUploadInfo struct {
	Doc      string `json:"-" description:"容器文件上传信息:建议上传到/tmp目录，其他目录可能因为权限导致上传失败"`
	File     string `json:"file" description:"文件内容,非字符串"`
	FileName string `json:"fileName" description:"上传后的文件名"`
	Path     string `json:"path" description:"上传后保存目录，必须为绝对路径，为空的话默认为/tmp"`
}

type PodFilePath struct {
	Doc       string `json:"-" description:"容器文件路径信息"`
	Pod       string `json:"pod" description:"pod名称,path参数"`
	Container string `json:"container" description:"容器名称，path参数"`
	Dir       string `json:"dir" description:"容器里面文件绝对路径"`
	FileName  string `json:"fileName" description:"文件名称,下载时不需要填，会自动从dir中提取"`
}

func (p *PodFilePath) Default(ctx context.Context) {
	p.Dir = normalizeAbsolutePodPath(p.Dir)
}

type PodFileCreate struct {
	Doc       string `json:"-" description:"容器文件/目录创建信息"`
	ParentDir string `json:"parentDir" description:"父目录绝对路径"`
	Name      string `json:"name" description:"文件或目录名称"`
	Directory bool   `json:"directory" description:"是否目录"`
}

func (p *PodFileCreate) Default(ctx context.Context) {
	p.ParentDir = normalizeAbsolutePodPath(p.ParentDir)
}

type PodFileRename struct {
	Doc     string `json:"-" description:"容器文件/目录重命名信息"`
	Dir     string `json:"dir" description:"当前绝对路径"`
	NewName string `json:"newName" description:"新名称"`
}

func (p *PodFileRename) Default(ctx context.Context) {
	p.Dir = normalizeAbsolutePodPath(p.Dir)
}

type PodFileEntry struct {
	Doc          string `json:"-" description:"容器目录文件树条目"`
	Name         string `json:"name" description:"文件或目录名称"`
	Path         string `json:"path" description:"容器中的绝对路径"`
	Directory    bool   `json:"directory" description:"是否目录"`
	Text         bool   `json:"text" description:"是否文本文件"`
	Binary       bool   `json:"binary" description:"是否二进制文件"`
	Editable     bool   `json:"editable" description:"是否允许编辑"`
	Downloadable bool   `json:"downloadable" description:"是否允许下载"`
	Size         int64  `json:"size" description:"文件大小，目录为0"`
}

type PodFileList struct {
	Doc     string         `json:"-" description:"容器目录文件树"`
	Root    string         `json:"root" description:"当前查询根目录"`
	Entries []PodFileEntry `json:"entries" description:"目录树条目"`
}

func (p *PodFileList) Default(ctx context.Context) {
	p.Root = normalizeAbsolutePodPath(p.Root)
}

type PodFileContent struct {
	Doc       string `json:"-" description:"容器文件内容"`
	Pod       string `json:"pod" description:"pod名称,path参数"`
	Container string `json:"container" description:"容器名称，path参数"`
	Dir       string `json:"dir" description:"容器里面文件绝对路径"`
	FileName  string `json:"fileName" description:"文件名称"`
	Content   string `json:"content" description:"文件内容，仅文本文件可用"`
	Binary    bool   `json:"binary" description:"是否二进制文件"`
	Truncated bool   `json:"truncated" description:"是否被截断"`
	Writable  bool   `json:"writable" description:"是否允许写入"`
	Encoding  string `json:"encoding" description:"文件编码"`
	Language  string `json:"language" description:"推荐语言"`
	MimeType  string `json:"mimeType" description:"MIME 类型"`
	Size      int64  `json:"size" description:"文件大小"`
	MaxBytes  int64  `json:"maxBytes" description:"最大预览字节数"`
}

func (p *PodFileContent) Default(ctx context.Context) {
	p.Dir = normalizeAbsolutePodPath(p.Dir)
}
