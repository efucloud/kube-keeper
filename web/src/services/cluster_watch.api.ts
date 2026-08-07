import { request } from '@umijs/max';


//流式获取日志
//流式获取日志
//请求方法: GET
//请求地址: /api/stream/cluster/{cluster}/namespaces/{namespace}/pods/{pod}/logs
//参数名: cluster 参数类型: string 参数位置: path 是否必须: true  参数说明: 集群编码
//参数名: container 参数类型: string 参数位置: query 是否必须: false  参数说明: Container name (required)
//参数名: namespace 参数类型: string 参数位置: path 是否必须: true  参数说明: Pod namespace
//参数名: pod 参数类型: string 参数位置: path 是否必须: true  参数说明: Pod name
//参数名: previous 参数类型: boolean 参数位置: query 是否必须: false  参数说明: 奔溃前的日志
//参数名: sinceSeconds 参数类型: number 参数位置: query 是否必须: false  参数说明: Only return logs newer than this duration
//参数名: tailLines 参数类型: number 参数位置: query 是否必须: false  参数说明: Number of recent lines to fetch
export async function streamPodContainerLogs(
  params: {
    cluster: string;// 集群编码
    namespace: string;// Pod namespace
    pod: string;// Pod name
    container?: string;// Container name (required)
    previous?: boolean;// 奔溃前的日志
    sinceSeconds?: number;// Only return logs newer than this duration
    tailLines?: number;// Number of recent lines to fetch
  },
  options?: { [key: string]: any }) {
  const { cluster, namespace, pod, ...rest } = params;
  return request(`/api/stream/cluster/${cluster}/namespaces/${namespace}/pods/${pod}/logs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...rest },
    ...(options || {}),
  });
}
