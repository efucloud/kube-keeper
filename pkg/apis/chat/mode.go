package chat

type Mode string

const (
	// ModeAgent 是当前主模式：采用类似 opencode 的 agentic loop 思路，
	// 按“推理->行动(工具)->吸收观测->更新计划->终止”迭代收敛。
	ModeAgent Mode = "agent"
)

func ParseMode(_ string) Mode {
	// 当前不支持模式切换：无论传入什么，统一走单一 agent 内核。
	return ModeAgent
}
