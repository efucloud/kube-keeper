package embeds

import (
	"embed"
	"gopkg.in/yaml.v3"
	"io/fs"
	"path/filepath"
	"strings"
)

var DynamicSkills []DynamicSkill

func init() {
	DynamicSkills = LoadDynamicSkills()
}

//go:embed locales
var I18nFiles embed.FS

//go:embed web
var WebFiles embed.FS

//go:embed skills
var skillFS embed.FS

//go:embed a2ui/basic-catalog-compact-v0_9.json
var a2uiPromptFS embed.FS

//go:embed system-prompt.md system-prompt.zh.md system-prompt.en.md
var systemPrompt embed.FS

func GetSystemPrompt() string {
	return GetSystemPromptByLanguage("中文")
}

func GetSystemPromptByLanguage(language string) string {
	if isEnglishPromptLanguage(language) {
		if data, err := systemPrompt.ReadFile("system-prompt.en.md"); err == nil && strings.TrimSpace(string(data)) != "" {
			return strings.TrimSpace(string(data))
		}
	}

	if data, err := systemPrompt.ReadFile("system-prompt.zh.md"); err == nil && strings.TrimSpace(string(data)) != "" {
		return strings.TrimSpace(string(data))
	}
	data, _ := systemPrompt.ReadFile("system-prompt.md")
	return strings.TrimSpace(string(data))
}

func GetA2UISchemaSummary(language string) string {
	if data, err := a2uiPromptFS.ReadFile("a2ui/basic-catalog-compact-v0_9.json"); err == nil && strings.TrimSpace(string(data)) != "" {
		return strings.TrimSpace(string(data))
	}

	return ""
}

func isEnglishPromptLanguage(language string) bool {
	normalized := strings.ToLower(strings.TrimSpace(language))
	return normalized == "english" || normalized == "en" || strings.HasPrefix(normalized, "en-") || strings.HasPrefix(normalized, "en_")
}

type DynamicSkill struct {
	ID string `json:"id" yaml:"id"` // 技能唯一标识（主键），用于前后端传参与技能精确匹配。
	// 技能展示名称（可读名），用于界面展示与提示词上下文增强。
	Name string `json:"name" yaml:"name"`
	// 英文技能展示名；当回复语言为 English 时优先使用。
	NameEn string `json:"nameEn,omitempty" yaml:"nameEn,omitempty"`
	// 技能简介，描述场景能力边界；用于技能路由选择与可读说明。
	Description string `json:"description" yaml:"description"`
	// 英文技能简介；当回复语言为 English 时优先使用。
	DescriptionEn string `json:"descriptionEn,omitempty" yaml:"descriptionEn,omitempty"`
	// 技能指令模板，作为该场景的核心行为约束（工具策略、输出要求、风格等）。
	Instruction string `json:"instruction" yaml:"instruction"`
	// 英文技能指令模板；当回复语言为 English 时优先使用。
	InstructionEn string `json:"instructionEn,omitempty" yaml:"instructionEn,omitempty"`
	// Plan 模式“步骤生成”专用指令（可选）。存在时优先用于生成 plan steps。
	PlanInstruction string `json:"planInstruction,omitempty" yaml:"planInstruction,omitempty"`
	// Plan 模式“步骤生成”英文专用指令（可选）。
	PlanInstructionEn string `json:"planInstructionEn,omitempty" yaml:"planInstructionEn,omitempty"`
	// Plan 模式“结果整理/最终报告”专用指令（可选）。存在时优先用于 plan 执行后总结。
	PlanResultInstruction string `json:"planResultInstruction,omitempty" yaml:"planResultInstruction,omitempty"`
	// Plan 模式“结果整理/最终报告”英文专用指令（可选）。
	PlanResultInstructionEn string `json:"planResultInstructionEn,omitempty" yaml:"planResultInstructionEn,omitempty"`
	// 技能允许使用的工具白名单；运行时会据此过滤可调用 MCP 工具。
	Tools []string `json:"tools" yaml:"tools" description:"工具"`
	// 技能作用域（如 cluster/namespace），用于约束执行范围与参数校验。
	Scope string `json:"scope" yaml:"scope" description:""`
	// 是否作为默认兜底技能；当未命中显式 skillId 或规则时可作为回退选项。
	Default bool `json:"default,omitempty" yaml:"default,omitempty" description:"是否作为兜底默认技能"`
	// 推荐交互模式（ralph）；用于前端默认模式与后端策略参考。
	Mode string `json:"mode,omitempty" yaml:"mode,omitempty" description:"推荐模式 ralph"`
	// 行业标签（可选元数据）；用于标记该技能覆盖的行业语义，不参与核心执行逻辑。
	Industries []string `json:"industries,omitempty" yaml:"industries,omitempty" description:"行业标签"`
	// 计划最大步骤数上限；用于约束 plan 模式生成的步骤长度与执行成本。
	MaxSteps int `json:"maxSteps" yaml:"maxSteps" description:"最大步骤数"`
	// 规则化匹配配置；用于基于问题内容/上下文做确定性技能路由。
	MatchRules []SkillMatchRule `json:"matchRules,omitempty" yaml:"matchRules,omitempty"`
	// 输出规范配置；用于约束总结结构、图表类型与完成提示语。
	OutputSpec *SkillOutputSpec `json:"outputSpec,omitempty" yaml:"outputSpec,omitempty"`
	// 计划回退模板；当动态规划失败或降级时，提供可执行的结构化步骤兜底。
	PlanFallback *SkillPlanFallback `json:"planFallback,omitempty" yaml:"planFallback,omitempty"`
}

type SkillMatchRule struct {
	// 规则优先级，数值越大越优先命中；用于多条规则冲突时排序决策。
	Priority int `json:"priority,omitempty" yaml:"priority,omitempty"`
	// 问题文本“任一命中”关键词列表；任意词命中即可满足该子条件。
	QuestionContainsAny []string `json:"questionContainsAny,omitempty" yaml:"questionContainsAny,omitempty"`
	// 问题文本“全部命中”关键词列表；所有词都命中才满足该子条件。
	QuestionContainsAll []string `json:"questionContainsAll,omitempty" yaml:"questionContainsAll,omitempty"`
	// 问题文本“禁止命中”关键词列表；命中任一词则该规则失效。
	QuestionNotContains []string `json:"questionNotContains,omitempty" yaml:"questionNotContains,omitempty"`
	// 资源类型限制（如 Pod/Deployment）；仅当当前资源类型在列表中时命中。
	ResourceKinds []string `json:"resourceKinds,omitempty" yaml:"resourceKinds,omitempty"`
	// 是否要求必须携带 namespace；用于区分集群级与命名空间级场景路由。
	NamespaceRequired *bool `json:"namespaceRequired,omitempty" yaml:"namespaceRequired,omitempty"`
}

type SkillOutputSpec struct {
	// 是否启用企业级巡检输出规范；开启后强调可用性、容量、趋势、风险优先级等要点。
	EnterpriseInspection bool `json:"enterpriseInspection,omitempty" yaml:"enterpriseInspection,omitempty"`
	// 输出章节顺序（如 整体结论/关键发现/建议/可视化数据）；用于约束最终 Markdown 结构。
	Sections []string `json:"sections,omitempty" yaml:"sections,omitempty"`
	// 必须包含的图表类型（如 pie/bar/table）；用于保证前端可视化完整性。
	RequiredCharts []string `json:"requiredCharts,omitempty" yaml:"requiredCharts,omitempty"`
	// 可选图表类型（如 line）；用于在数据充分时增强表达。
	OptionalCharts []string `json:"optionalCharts,omitempty" yaml:"optionalCharts,omitempty"`
	// 完成提示语；用于统一回答开头文案。
	CompletionBanner string `json:"completionBanner,omitempty" yaml:"completionBanner,omitempty"`
}

type SkillPlanFallback struct {
	// 是否在回退计划末尾强制追加总结步骤；用于确保计划可收口。
	RequireSummaryStep *bool `json:"requireSummaryStep,omitempty" yaml:"requireSummaryStep,omitempty"`
	// 回退总结步骤标题；用于统一最后一步展示名称。
	SummaryTitle string `json:"summaryTitle,omitempty" yaml:"summaryTitle,omitempty"`
	// 回退总结步骤原因；用于解释为什么要进行收口总结。
	SummaryReason string `json:"summaryReason,omitempty" yaml:"summaryReason,omitempty"`
	// 回退计划步骤模板列表；当动态规划失败时按此模板生成可执行步骤。
	Steps []SkillFallbackStep `json:"steps,omitempty" yaml:"steps,omitempty"`
}

type SkillFallbackStep struct {
	// 步骤标题；用于前端展示和执行阶段标识。
	Title string `json:"title" yaml:"title"`
	// 步骤原因；用于说明该步骤的目的与上下文价值。
	Reason string `json:"reason,omitempty" yaml:"reason,omitempty"`
	// 工具候选列表；系统会在可用工具中按顺序挑选第一个可执行工具。
	ToolCandidates []string `json:"toolCandidates,omitempty" yaml:"toolCandidates,omitempty"`
	// 工具参数模板；支持占位符渲染，用于生成最终可调用的 args 对象。
	Args map[string]interface{} `json:"args,omitempty" yaml:"args,omitempty"`
}

// LoadDynamicSkills 从嵌入的 skills/ 目录加载所有 .yaml/.yml 文件，
// 解析为 []DynamicSkill。
// 每个 YAML 必须包含 id、description、instruction/instructionEn（二选一）字段（name 可选），
// 缺少必要字段的文件会被忽略。
func LoadDynamicSkills() []DynamicSkill {
	var result []DynamicSkill

	err := fs.WalkDir(skillFS, "skills", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() {
			return nil
		}

		ext := strings.ToLower(filepath.Ext(path))
		if ext != ".yaml" && ext != ".yml" {
			return nil
		}

		content, err := skillFS.ReadFile(path)
		if err != nil {
			return nil // 或记录日志后跳过
		}

		var skill DynamicSkill
		if err := yaml.Unmarshal(content, &skill); err != nil {
			// 格式错误，跳过
			return nil
		}

		// 必填字段校验：id、description、instruction（二选一：instruction/instructionEn 至少其一）
		if skill.ID == "" || skill.Description == "" || (skill.Instruction == "" && skill.InstructionEn == "") {
			// 缺少必要字段，跳过该文件
			return nil
		}

		result = append(result, skill)
		return nil
	})

	if err != nil {
		return result
	}

	return result
}
