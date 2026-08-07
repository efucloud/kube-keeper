import { request } from '@umijs/max';


//
//
//请求方法: POST
//请求地址: /api/stream1/cluster/{cluster}/01kzd2f28s24g2z4zzzrthn7js/check
//参数名: cluster 参数类型: string 参数位置: path 是否必须: true  参数说明: 集群编码
export async function posthandleRequest(
  params: {
    cluster: string;// 集群编码
  },
  options?: { [key: string]: any }) {
  const { cluster, ...rest } = params;
  return request(`/api/stream1/cluster/${cluster}/01kzd2f28s24g2z4zzzrthn7js/check`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...rest },
    ...(options || {}),
  });
}
