//获取二次封装的axios
import http from '../../../utils/http'
import {
  GetSpuResponseData,
  TrademarkListResponseData,
  SpuHasImageListResponseData,
  SpuSaleAttrListResponseData,
  AllSaleAttrListResponseData,
  Record,
  SkuInfo,
  SkuInforResponseData,
} from './type'
//枚举接口地址
enum API {
  //获取spu接口
  GETSPU_URL = '/admin/product/',
  //获取全部品牌数据接口
  GETTRADEMARKLIST_URL = '/admin/product/baseTrademark/getTrademarkList',
  //获取某个spu下全部的售卖商品的图片数据接口
  TRADEMARKIMAGELIST_URl = '/admin/product/spuImageList/',
  //获取某一个spu下全部的已有的销售属性接口
  GETSPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性[颜色、版本、尺码]接口
  GETBASESALEATTRLIST_URL = '/admin/product/baseSaleAttrList',
  //添加一个新的spu
  ADDSPU_URL= '/admin/product/saveSpuInfo',
  //更新一个已有的spu
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  //添加一个新的sku
  ADDSKU_URL = '/admin/product/saveSkuInfo',
  //获取某一个已有的spu下全部售卖的商品
  SKUINFOR_URL = '/admin/product/findBySpuId/',
  //删除已有的spu
  DELETESPU_URL = '/admin/product/deleteSpu/'
}
//获取spu接口返回数据ts
export const reqGetSpu = (
  page: number,
  limit: number,
  category3Id: number | string,
) =>
  http.get<any, GetSpuResponseData>(
    `${API.GETSPU_URL}${page}/${limit}?category3Id=${category3Id}`,
  )
//获取全部品牌数据
export const reqGetTradeMarkList = () =>
  http.get<any, TrademarkListResponseData>(API.GETTRADEMARKLIST_URL)
//获取某个spu下全部的售卖商品的图片数据
export const reqGetTradeMarkImageList = (spuId: number) =>
  http.get<any, SpuHasImageListResponseData>(
    `${API.TRADEMARKIMAGELIST_URl}${spuId}`,
  )
//获取某个spu下已有的的销售属性数据
export const reqGetSpuSaleAttrList = (spuId: number) =>
  http.get<any, SpuSaleAttrListResponseData>(
    `${API.GETSPUSALEATTRLIST_URL}${spuId}`,
  )
//获取整个项目全部的销售属性[颜色、版本、尺码]数据
export const reqGetAllSaleAttrList = () =>
  http.get<any, AllSaleAttrListResponseData>(API.GETBASESALEATTRLIST_URL)

//添加或者更新一个的spu
export const reqAddOrUpdateSpu = (data:Record)=>{
  if(data.id){
    // 更新
    return http.post<any,any>(API.UPDATESPU_URL,data);
  }else{
    // 新增
    return http.post<any,any>(API.ADDSPU_URL,data);
  }
}
//添加一个新的sku
export const reqAddSku = (data:SkuInfo)=>http.post<any,any>(API.ADDSKU_URL,data);
//获取某一个已有的spu下全部售卖的商品
export const reqSkuList = (spuId:string|number)=>http.get<any,SkuInforResponseData>(`${API.SKUINFOR_URL}${spuId}`);
//删除已有的spu
export const reqDeleteSpu = (spuId:string|number)=>http.delete<any,any>(`${API.DELETESPU_URL}${spuId}`);