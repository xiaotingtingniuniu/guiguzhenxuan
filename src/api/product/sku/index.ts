//引入二次封装的axios
import http from '../../../utils/http'
import { GetSkuListResponseData, SkuInforResponseData } from './type'
//枚举接口
enum API {
  //获取sku数据
  GETSKULIST_URL = '/admin/product/list/',
  //上架商品
  ONSALE_URL = '/admin/product/onSale/',
  //下架商品
  CANCELSALE_URL = '/admin/product/cancelSale/',
  //获取sku商品详情信息
  SKUINFOR_URL = '/admin/product/getSkuInfo/',
  //删除sku数据
  DELETESKU_URL = '/admin/product/deleteSku/',
}
//获取sku数据
export const reqGetSkuList = (pageNo: number, pageSize: number) =>
  http.get<any, GetSkuListResponseData>(
    `${API.GETSKULIST_URL}${pageNo}/${pageSize}`,
  )
//上架商品
export const reqOnSale = (skuId: number) =>
  http.get<any, any>(`${API.ONSALE_URL}${skuId}`)
//下架商品
export const reqCancelSale = (skuId: number) =>
  http.get<any, any>(`${API.CANCELSALE_URL}${skuId}`)
//获取sku商品详情信息
export const reqSkuInfor = (skuId: number) =>
  http.get<any, SkuInforResponseData>(`${API.SKUINFOR_URL}${skuId}`)
//删除sku数据
export const reqDeleteSku = (skuId: number) =>
  http.delete<any, any>(`${API.DELETESKU_URL}${skuId}`)
