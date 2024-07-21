//品牌管理模块接口
//引入二次封装axios
import http from '../../../utils/http'
import { HasTrademarkResponseData, Record } from './type.ts'
//枚举接口地址
enum API {
  //获取已有品牌接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  //添加品牌接口
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  //修改已有品牌接口
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  //删除已有的品牌
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}
//获取已有品牌接口
export const reqHasTrademark = (page: number, limit: number) =>
  http.get<any, HasTrademarkResponseData>(
    `${API.TRADEMARK_URL}${page}/${limit}`,
  )
//添加与修改品牌接口
export const reqAddOrUpdateTrademark = (data: Record) => {
  if (data.id) {
    //修改品牌接口
    return http.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    //添加品牌接口
    return http.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}
//删除已有品牌接口
export const reqDeleteTrademark = (id: number) =>
  http.delete<any, any>(`${API.DELETETRADEMARK_URL}${id}`)
