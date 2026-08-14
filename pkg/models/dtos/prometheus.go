package dtos

type PrometheusQuery struct {
	Query       string                             `json:"query" yaml:"query" description:"promql语句，带参数"`
	Variables   map[string]PrometheusQueryVariable `json:"variables" yaml:"variables" description:"参数"`
	I18N        I18N                               `json:"i18N" yaml:"i18N" description:"多语言"`
	Description string                             `json:"description" yaml:"description" description:"描述"`
}
type PrometheusQueryVariable struct {
	Description string `json:"description" yaml:"description" description:"描述"`
	Default     string `json:"default" yaml:"default" description:"默认值"`
	Required    bool   `json:"required" yaml:"required" description:"是否必须"`
}
type VectorData struct {
	Metric map[string]string `json:"metric"`
	Value  []interface{}     `json:"value"`
}
type ResponseVectorData struct {
	Result     []VectorData `json:"result"`
	ResultType string       `json:"resultType"`
}
type PrometheusResponseVectorData struct {
	Status    string             `json:"status" yaml:"status" description:"状态"`
	Data      ResponseVectorData `json:"data" yaml:"data" description:"数据"`
	ErrorType string             `json:"errorType" yaml:"errorType" description:"错误提示"`
	Error     string             `json:"error" yaml:"error" description:"错误内容"`
}
type MatrixDataLineData struct {
	Result     []MatrixDataLine `json:"result"`
	ResultType string           `json:"resultType"`
}
type PrometheusResponseMatrixData struct {
	Status    string             `json:"status" yaml:"status" description:"状态"`
	Data      MatrixDataLineData `json:"data" yaml:"data" description:"数据"`
	ErrorType string             `json:"errorType" yaml:"errorType" description:"错误提示"`
	Error     string             `json:"error" yaml:"error" description:"错误内容"`
}

// MatrixDataLine 响应数据为matrix类型
type MatrixDataLine struct {
	Metric map[string]string
	Values [][]interface{}
}
