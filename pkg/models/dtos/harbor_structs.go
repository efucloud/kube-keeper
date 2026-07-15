package dtos

type RegistryAuth struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type ListProjectsParams struct {
	Name string `json:"name" yaml:"name" description:"工程名称"`

	Owner string `json:"owner" yaml:"owner" description:"工程拥有者"`

	Page int64 `json:"page" yaml:"page" description:"页码"`

	PageSize int64 `json:"pageSize" yaml:"pageSize" description:"页大小"`

	Public bool `json:"public" yaml:"public" description:"公开"`

	//Query string to query resources. Supported query patterns are "exact match(k=v)", "fuzzy match(k=~v)", "range(k=[min~max])", "list with union releationship(k={v1 v2 v3})" and "list with intersetion relationship(k=(v1 v2 v3))". The value of range and list can be string(enclosed by " or '), integer or time(in format "2020-04-09 02:36:00"). All of these query patterns should be put in the query string "q=xxx" and splitted by ",". e.g. q=k1=v1,k2=~v2,k3=[min~max]
	Q string `json:"q" yaml:"q" description:"搜索："`
	//排序：sort=field1,-field2
	Sort string `json:"sort" yaml:"sort" description:"排序：sort=field1,-field2"`
}

type ProjectReq struct {
	// The CVE allowlist of the project.
	AutoScan *string `json:"auto_scan,omitempty"`
	// The name of the project.
	// Max Length: 255
	ProjectName string `json:"project_name,omitempty"`
	// deprecated, reserved for project creation in replication
	Public *bool `json:"public,omitempty"`
	// The storage quota of the project.
	StorageLimit *int64 `json:"storage_limit,omitempty"`
}

type GetArtifactParams struct {
	Page int64 `json:"page" yaml:"page" description:""`

	PageSize int64 `json:"pageSize" yaml:"pageSize" description:""`

	/* ProjectName.

	   The name of the project
	*/
	ProjectName string `json:"projectName" yaml:"projectName" description:""`

	/* Reference.

	   The reference of the artifact, can be digest or tag
	*/
	Reference string `json:"reference" yaml:"reference" description:""`

	/* RepositoryName.

	   The name of the repository. If it contains slash, encode it twice over with URL encoding. e.g. a/b -> a%2Fb -> a%252Fb
	*/
	RepositoryName string `json:"repositoryName" yaml:"repositoryName" description:""`

	/* WithAccessory.

	   Specify whether the accessories are included of the returning artifacts.
	*/
	WithAccessory bool `json:"withAccessory" yaml:"withAccessory" description:""`

	/* WithImmutableStatus.

	   Specify whether the immutable status is inclued inside the tags of the returning artifacts.
	*/
	WithImmutableStatus bool `json:"withImmutableStatus" yaml:"withImmutableStatus" description:""`

	/* WithLabel.

	   Specify whether the labels are inclued inside the returning artifacts
	*/
	WithLabel bool `json:"withLabel" yaml:"withLabel" description:""`

	/* WithScanOverview.

	   Specify whether the scan overview is inclued inside the returning artifacts
	*/
	WithScanOverview bool `json:"withScanOverview" yaml:"withScanOverview" description:""`

	/* WithSignature.

	   Specify whether the signature is inclued inside the returning artifacts
	*/
	WithSignature bool `json:"withSignature" yaml:"withSignature" description:""`

	/* WithTag.

	   Specify whether the tags are inclued inside the returning artifacts

	   Default: true
	*/
	WithTag bool `json:"withTag" yaml:"withTag" description:""`
}
