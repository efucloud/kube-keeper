import { ApplicationEdges, ApplicationNodes, ParameterDefinitions, ParametersMappings } from './application_def.d';
import { ApplicationOutputDefinitions } from './application_output.d';
import { ResourceIndex } from './kubernetes.d';
export type MarketApplicationCopy = { 
  sourceId: string;
  version: string;
}; 
export type MarketApplicationCreate = { 
  //默认值: 0
  state: number;
  //最大长度: 50
  applicationId: string;
  description: string;
  templates?: string[];
  hasCrd?: boolean;
  parameters?: ParameterDefinitions;
  outputs?: ApplicationOutputDefinitions;
  mappings?: ParametersMappings;
  //最大长度: 50
  version: string;
  //默认值: base
  //最大长度: 50
  type: string;
  nodes?: ApplicationNodes;
  edges?: ApplicationEdges;
  //最大长度: 255
  hash?: string;
  handleProps?: string[];
}; 
export type MarketApplicationDetail = { 
  //最大长度: 50
  id: string;
  createdAt: string;
  updatedAt: string;
  //最大长度: 50
  creatorId: string;
  //最大长度: 50
  updaterId: string;
  deletedAt?: string;
  //默认值: 0
  state: number;
  //最大长度: 50
  applicationId: string;
  description: string;
  templates?: string[];
  //最大长度: 255
  resourceIndex?: ResourceIndex;
  hasCrd?: boolean;
  parameters?: ParameterDefinitions;
  outputs?: ApplicationOutputDefinitions;
  mappings?: ParametersMappings;
  //最大长度: 50
  version?: string;
  //默认值: base
  //最大长度: 50
  type: string;
  nodes?: ApplicationNodes;
  edges?: ApplicationEdges;
  //最大长度: 255
  hash?: string;
  handleProps?: string[];
}; 
export type MarketApplicationDetailList = { 
  data?: MarketApplicationDetail[];
  total?: number;
}; 
export type MarketApplicationExportImport = { 
  description: string;
  templates?: string[];
  hasCrd?: boolean;
  parameters?: ParameterDefinitions;
  outputs?: ApplicationOutputDefinitions;
  mappings?: ParametersMappings;
  //最大长度: 50
  version?: string;
  //默认值: base
  //最大长度: 50
  type: string;
  nodes?: ApplicationNodes;
  edges?: ApplicationEdges;
  handleProps?: string[];
}; 
export type MarketApplicationUpdate = { 
  //最大长度: 50
  id: string;
  //最大长度: 50
  applicationId: string;
  description: string;
  templates?: string[];
  //最大长度: 255
  resourceIndex?: ResourceIndex;
  hasCrd?: boolean;
  parameters?: ParameterDefinitions;
  outputs?: ApplicationOutputDefinitions;
  mappings?: ParametersMappings;
  //最大长度: 50
  version: string;
  //默认值: base
  //最大长度: 50
  type: string;
  nodes?: ApplicationNodes;
  edges?: ApplicationEdges;
  //最大长度: 255
  hash?: string;
  handleProps?: string[];
}; 
