package dtos

// ChatHTTPPayload HTTP 入参
type ChatHTTPPayload struct {
	Mode       string                `json:"mode" description:"对话模式 agent"`
	Message    string                `json:"message" description:"问题"`
	RequestId  string                `json:"requestId" description:"请求ID"`
	SessionId  string                `json:"sessionId" description:"对话session id"`
	SkillId    string                `json:"skillId" description:"用户选择的Skill ID"`
	CNCF       string                `json:"cncf" description:"cncf项目"`
	Kind       string                `json:"kind" description:"问题关于的资源类型"`
	Name       string                `json:"name" description:"问题关于的资源名称"`
	ApiVersion string                `json:"apiVersion" description:"问题关于的资源接口版本"`
	A2UI       *A2UIInteractionInput `json:"a2ui,omitempty" description:"A2UI 交互输入"`
}

// ChatContext 运行时上下文
type ChatContext struct {
	Cluster   string `json:"cluster,omitempty" description:"集群编码"`
	Namespace string `json:"namespace,omitempty" description:"命名空间"`
	ApiServer string `json:"apiServer,omitempty" description:"集群apiserver地址"`
	Language  string `json:"language,omitempty" description:"回答语言"`
}

// ResourceContext 资源上下文
type ResourceContext struct {
	Kind       string `json:"kind,omitempty" description:"资源类型"`
	Name       string `json:"name,omitempty" description:"资源名称"`
	ApiVersion string `json:"apiVersion,omitempty" description:"资源接口版本"`
}

type A2UIClientAction struct {
	Name              string                 `json:"name,omitempty" description:"A2UI action name"`
	SurfaceId         string                 `json:"surfaceId,omitempty" description:"A2UI surface ID"`
	SourceComponentId string                 `json:"sourceComponentId,omitempty" description:"动作来源组件ID"`
	Timestamp         string                 `json:"timestamp,omitempty" description:"动作时间戳"`
	Context           map[string]interface{} `json:"context,omitempty" description:"动作上下文"`
}

type A2UIInteractionInput struct {
	SurfaceId    string                 `json:"surfaceId,omitempty" description:"A2UI surface ID"`
	AgentId      string                 `json:"agentId,omitempty" description:"目标 agent ID"`
	TaskId       string                 `json:"taskId,omitempty" description:"任务 ID"`
	Action       string                 `json:"action,omitempty" description:"交互动作，如 create/update/delete/submit"`
	Message      string                 `json:"message,omitempty" description:"交互文本"`
	Surface      map[string]interface{} `json:"surface,omitempty" description:"A2UI surface 摘要"`
	Task         map[string]interface{} `json:"task,omitempty" description:"任务载荷"`
	Proposal     map[string]interface{} `json:"proposal,omitempty" description:"结构化变更提案"`
	Decision     string                 `json:"decision,omitempty" description:"确认决策"`
	Metadata     map[string]interface{} `json:"metadata,omitempty" description:"扩展元数据"`
	ClientAction *A2UIClientAction      `json:"clientAction,omitempty" description:"前端A2UI动作事件"`
}

// StreamEvent 定义向前端发送的 NDJSON envelope 结构。
type StreamEvent struct {
	RequestId string      `json:"requestId,omitempty" description:"请求ID"`
	SessionId string      `json:"sessionId,omitempty" description:"对话session id"`
	Type      string      `json:"type" description:"顶层 envelope 类型，如 session_meta/event_msg/response_item/run_complete"`
	Payload   interface{} `json:"payload,omitempty" description:"顶层 envelope 负载"`
	Version   string      `json:"version,omitempty" description:"协议版本，如 v2"`
	Timestamp string      `json:"timestamp,omitempty" description:"事件时间"`
}

// ChatRequest 对话请求
type ChatRequest struct {
	Mode       string                `json:"mode" description:"对话模式 agent"`
	Cluster    string                `json:"cluster,omitempty" description:"集群编码"`
	Namespace  string                `json:"namespace,omitempty" description:"命名空间"`
	Message    string                `json:"message" description:"问题"`
	RequestId  string                `json:"requestId,omitempty" description:"请求ID"`
	SessionId  string                `json:"sessionId,omitempty" description:"对话session id"`
	SkillId    string                `json:"skillId,omitempty" description:"用户选择的Skill ID"`
	CNCF       string                `json:"cncf,omitempty" description:"cncf项目"`
	Kind       string                `json:"kind,omitempty" description:"问题关于的资源类型"`
	Name       string                `json:"name,omitempty" description:"问题关于的资源名称"`
	ApiVersion string                `json:"apiVersion,omitempty" description:"问题关于的资源接口版本"`
	A2UI       *A2UIInteractionInput `json:"a2ui,omitempty" description:"A2UI 交互输入"`
}

// AiChatUsage Represents the total token usage per request to OpenAI.
type AiChatUsage struct {
	PromptTokens            int                      `json:"prompt_tokens"`
	CompletionTokens        int                      `json:"completion_tokens"`
	TotalTokens             int                      `json:"total_tokens"`
	PromptTokensDetails     *PromptTokensDetails     `json:"prompt_tokens_details"`
	CompletionTokensDetails *CompletionTokensDetails `json:"completion_tokens_details"`
}

// CompletionTokensDetails Breakdown of tokens used in a completion.
type CompletionTokensDetails struct {
	AudioTokens              int `json:"audio_tokens"`
	ReasoningTokens          int `json:"reasoning_tokens"`
	AcceptedPredictionTokens int `json:"accepted_prediction_tokens"`
	RejectedPredictionTokens int `json:"rejected_prediction_tokens"`
}

// PromptTokensDetails Breakdown of tokens used in the prompt.
type PromptTokensDetails struct {
	AudioTokens  int `json:"audio_tokens"`
	CachedTokens int `json:"cached_tokens"`
}

// ChatStopMeta chat响应
type ChatStopMeta struct {
	RequestId    string      `json:"requestId" description:"请求ID"`
	FinishReason string      `json:"finish_reason" description:"结束原因"`
	Usage        AiChatUsage `json:"usage" description:"Token使用数据"`
	Mode         string      `json:"mode,omitempty" description:"本次执行模式"`
	AutoExecuted bool        `json:"auto_executed,omitempty" description:"plan模式是否自动执行"`
	ExecutedStep int         `json:"executed_steps,omitempty" description:"已执行步骤数"`
	FailedStep   int         `json:"failed_steps,omitempty" description:"失败步骤数"`
}

// ToolChain 工具调用链
type ToolChain struct {
	Title       string `json:"title" yaml:"title" description:"工具名称"`
	Status      string `json:"status" yaml:"status" description:"工具调用状态"`
	Description string `json:"description" yaml:"description" description:"工具调用名称"`
	RequestId   string `json:"requestId" yaml:"requestId" description:"请求ID"`
}
