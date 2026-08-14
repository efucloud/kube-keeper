package dtos

// ClusterFeatureDetailList 集群特性表响应
type ClusterFeatureDetailList struct {
	//当前页数据
	Data []*ClusterFeatureDetail `json:"data"`
	//数据库满足条件的数据总数
	Total int64 `json:"total"`
}

// ClusterFeatureDetail 用户在集群的csr
type ClusterFeatureDetail struct {
	//编码
	Code string `gorm:"type:varchar(255);column:code" json:"code" validate:"required" description:"编码"`
	//名称
	Name string `gorm:"type:varchar(255);column:name" json:"name" validate:"required" description:"名称"`
	//检查资源
	CheckResource GroupVersionResources `gorm:"column:check_resource" json:"checkResource" description:"检查资源"`
}
