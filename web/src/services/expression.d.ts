export type Expression = { 
  mode: string;
  simpleItems: SimpleItem[];
  javascript: string;
  cel?: string;
}; 
export type SimpleItem = { 
  name?: string;
  value: any;
  operator: string;
}; 
