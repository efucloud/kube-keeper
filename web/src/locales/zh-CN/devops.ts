export default {
  "devops.pipeline.trigger": "流水线触发器",
  "devops.pipeline.trigger.add": "添加流水线触发器",
  "devops.pipeline.trigger.update": "修改流水线触发器",
  "devops.pipeline": "流水线",
  "devops.pipeline.manage": "流水线管理",
  "devops.pipeline.manage.description":
    "管理的流水线可以被所有的组织使用，方便于复用和规范强制执行。",
  "devops.pipeline.name": "流水线名称",
  "devops.pipeline.import": "导入流水线",
  "devops.pipeline.file.import": "文件导入",
  "devops.import.description": "若系统中存在同名的数据则不会覆盖且认为导入成功",
  "devops.task.import": "导入任务",
  "devops.pipeline.system.import": "系统导入",
  "devops.pipeline.system.import.description":
    "从系统中导入流水线,方便于复用和规范强制执行。",
  "devops.pipeline.system.import.select": "请先选择系统流水线",
  "devops.pipeline.design": "设计流水线",
  "devops.pipeline.tags": "标签",
  "devops.pipeline.categories": "分类",
  "devops.pipeline.platforms": "平台",
  "devops.pipeline.status": "状态",
  "devops.pipeline.disable": "禁用",
  "devops.task": "任务",
  "devops.task.manage": "任务管理",
  "devops.task.name": "任务名称",
  "devops.task.manage.description":
    "管理的任务可以被所有组织的流水线使用，方便于复用和规范强制执行。",
  "devops.tekton.pipeline.not.support":
    "当前工作空间涉及到的集群未按照Tekton相关服务，不支持Tekton流水线，请联系集群管理员安装。",
  "devops.pipelinerun.display.description": "流水线记录最多展示500条。",
  "devops.pipeline.description":
    "流水线不能直接运行，需要通过触发器触发之后才能运行。",
  "devops.pipelinetrigger.description":
    "流水线触发器接收外部请求，根据规则触发流水线运行，支持触发多条流水线并行执行。",
  "devops.pipelinetrigger.executor": "执行器",
  "devops.pipelinetrigger.executor.description": "每个执行器对应一个流水线运行",
  "devops.pipelinetrigger.executor.add": "添加执行器",
  "devops.pipelinetrigger.executor.defaultValue": "执行器默认参数",
  "devops.pipelinetrigger.executor.defaultValue.add": "添加执行器默认值",
  "devops.pipelinetrigger.executor.defaultValue.description":
    "执行器默认值将会和触发器提取的值进行合并之后传递给流水线(不用于触发器表达式判断)",
  "devops.pipelinetrigger.executor.extractValue": "Webhook请求提取参数",
  "devops.pipelinetrigger.executor.extractValue.add": "添加Webhook请求提取值",
  "devops.pipelinetrigger.executor.extractValue.description":
    "从webhook请求中提取的值，并将用于触发器表达式判断",
  "devops.pipelinetrigger.executor.extract.path": "提取路径",
  "devops.pipelinetrigger.executor.expression": "执行器触发表达式",
  "devops.pipelinetrigger.executor.expression.description":
    "用于判断是否触发流水线",
  "devops.pipelinetrigger.executor.expression.mode": "计算模式",
  "devops.pipelinetrigger.executor.expression.simple": "简单条件判断",
  "devops.pipelinetrigger.executor.expression.simple.add": "添加简单条件判断",
  "devops.pipelinetrigger.executor.expression.simple.item.value": "比较值",
  "devops.pipelinetrigger.executor.expression.simple.item.name.tooltip":
    "选择Webhook请求提取值中的名称",
  "devops.pipelinetrigger.executor.expression.simple.operator": "比较运算符",
  "devops.pipelinetrigger.executor.expression.simple.operator.EqualValues":
    "等于",
  "devops.pipelinetrigger.executor.expression.simple.operator.Less": "小于",
  "devops.pipelinetrigger.executor.expression.simple.operator.LessOrEqual":
    "小于等于",
  "devops.pipelinetrigger.executor.expression.simple.operator.Greater": "大于",
  "devops.pipelinetrigger.executor.expression.simple.operator.GreaterOrEqual":
    "大于等于",
  "devops.pipelinetrigger.executor.expression.simple.operator.NotEqual":
    "不等于",
  "devops.pipelinetrigger.executor.expression.simple.operator.Contains": "包含",
  "devops.pipelinetrigger.executor.expression.simple.operator.NotContains":
    "不包含",
  "devops.pipelinetrigger.executor.expression.simple.operator.IsType": "类型为",
  "devops.pipelinetrigger.executor.expression.simple.operator.lenf": "长度为",
  "devops.pipelinetrigger.executor.expression.simple.operator.Regexp":
    "正则匹配",
  "devops.pipelinetrigger.executor.expression.simple.operator.NotRegexp":
    "正则不匹配",
  "devops.pipelinetrigger.executor.expression.simple.operator.startWith":
    "以...开始",
  "devops.pipelinetrigger.executor.expression.simple.operator.in": "在...中",
  "devops.pipelinetrigger.executor.expression.javascript": "JavaScript脚本",
  "devops.pipelinetrigger.executor.expression.cel": "Cel表达式",
  "devops.pipelinetrigger.executor.values.function":
    "执行器默认值和Webhook提取值将会合并后传递给流水线，请确保跟流水线中的参数对应",
  "devops.pipelinetrigger.webhook": "Webhook",
  "devops.pipelinetrigger.delete": "删除触发器",
  "devops.pipelinetrigger.executor.delete": "删除执行器",
  "devops.pipelinetrigger.executor.number": "执行器数量",
  "devops.pipelinetrigger.pipeline.refs": "涉及到的流水线",
  "devops.pipelinetrigger.history": "触发历史",
  "devops.pipelinetrigger.active": "是否生效",
  "devops.pipeline.target.namespace": "目标命名空间",
};
