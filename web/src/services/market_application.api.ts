import { request } from '@umijs/max';

import { ApplicationState } from './application_def.d';
import { BatchOperationIds } from './common.d';
import { MarketApplicationCreate, MarketApplicationDetail, MarketApplicationDetailList, MarketApplicationExportImport, MarketApplicationUpdate } from './market_application.d';

//删除应用商店应用
//批量删除应用商店应用
//请求方法: DELETE
//请求地址: /api/v1/market-application
export async function deleteMarketApplication(  data: BatchOperationIds,   options?: { [key: string]: any }) {
  return request(`/api/v1/market-application`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
//获取应用商店应用列表
//获取应用商店应用列表
//请求方法: GET
//请求地址: /api/v1/market-application
//参数名: category 参数类型: string 参数位置: query 是否必须: false  参数说明: 分类
//参数名: name 参数类型: string 参数位置: query 是否必须: false  参数说明: 名称
//参数名: order 参数类型: string 参数位置: query 是否必须: false  参数说明: 排序
//参数名: page 参数类型: number 参数位置: query 是否必须: false  参数说明: 页码
//参数名: search 参数类型: string 参数位置: query 是否必须: false  参数说明: 搜索
//参数名: size 参数类型: number 参数位置: query 是否必须: false  参数说明: 每页大小
//参数名: state 参数类型: number 参数位置: query 是否必须: false  参数说明: 状态
export async function listMarketApplication<MarketApplicationDetailList>(
  params: {
    category?: string;// 分类
    name?: string;// 名称
    order?: string;// 排序
    page?: number;// 页码
    search?: string;// 搜索
    size?: number;// 每页大小
    state?: number;// 状态
  },
  options?: { [key: string]: any }) {
  return request<MarketApplicationDetailList>(`/api/v1/market-application`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: params,
    ...(options || {}),
  });
}
//获取应用商店应用详情
//获取应用商店应用详情
//请求方法: GET
//请求地址: /api/v1/market-application/{id}
//参数名: id 参数类型: string 参数位置: path 是否必须: true  参数说明: 记录ID
export async function getMarketApplication<MarketApplicationDetail>(
  params: {
    id: string;// 记录ID
  },
  options?: { [key: string]: any }) {
  const { id, ...rest } = params;
  return request<MarketApplicationDetail>(`/api/v1/market-application/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...rest },
    ...(options || {}),
  });
}
//创建应用商店应用
//创建应用商店应用信息
//请求方法: POST
//请求地址: /api/v1/market-application
export async function createMarketApplication<MarketApplicationDetail>(  data: MarketApplicationCreate,   options?: { [key: string]: any }) {
  return request<MarketApplicationDetail>(`/api/v1/market-application`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
//导入应用定义
//从 YAML 导入应用及版本
//请求方法: POST
//请求地址: /api/v1/market-application/import
export async function importMarketApplication<MarketApplicationDetail>(  data: MarketApplicationExportImport,   options?: { [key: string]: any }) {
  return request<MarketApplicationDetail>(`/api/v1/market-application/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
//更新应用商店应用
//更新应用商店应用信息
//请求方法: PUT
//请求地址: /api/v1/market-application
export async function updateMarketApplication<MarketApplicationDetail>(  data: MarketApplicationUpdate,   options?: { [key: string]: any }) {
  return request<MarketApplicationDetail>(`/api/v1/market-application`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
//更新应用商店应用状态
//更新应用商店应用状态
//请求方法: PUT
//请求地址: /api/v1/market-application/state
export async function updateMarketApplicationState<MarketApplicationDetail>(  data: ApplicationState,   options?: { [key: string]: any }) {
  return request<MarketApplicationDetail>(`/api/v1/market-application/state`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
    ...(options || {}),
  });
}
