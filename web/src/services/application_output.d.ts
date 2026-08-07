// ApplicationOutputDefinition 应用输出定义
export type ApplicationOutputDefinition = { 
  //输出名称，例如 database.host
  name: string;
  //显示名称
  displayName?: string;
  //输出类型
  type: string;
  //描述
  description?: string;
  //取值来源
  valueFrom?: ApplicationOutputValueSource;
}; 
// ApplicationOutputDefinitions 数组
export type ApplicationOutputDefinitions = ApplicationOutputDefinition[];
// ApplicationOutputValueSource 应用输出取值来源
export type ApplicationOutputValueSource = { 
  //取值类型：parameter-来自输入参数，template-模板渲染结果
  type: string;
  //输入参数名，Type=parameter 时使用
  parameter?: string;
  //模板资源索引键，Type=template 时使用，对应 ResourceIndex 中的 kind|apiVersion|name
  template?: string;
  //模板渲染后取值路径，Type=template 时使用
  path?: string;
  //保留给后续扩展的二次计算脚本
  javascript?: string;
}; 
