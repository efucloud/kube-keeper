package structs

type GitProject struct {
	Name    string `json:"name" description:"仓库名称"`
	Address string `json:"address" description:"仓库地址"`
	ID      string `json:"id" description:"仓库ID"`
}
