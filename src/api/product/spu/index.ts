//获取二次封装的axios
import http from '../../../utils/http'
import {GetSpuResponseData,TrademarkListResponseData,SpuHasImageListResponseData,SpuSaleAttrListResponseData,AllSaleAttrListResponseData} from './type'
//枚举接口地址
enum API {
  //获取spu接口
  GETSPU_URL = '/admin/product/',
  //获取全部品牌数据接口
  GETTRADEMARKLIST_URL= '/admin/product/baseTrademark/getTrademarkList',
  //获取某个spu下全部的售卖商品的图片数据接口
  ALLTRADEMARKIMAGELIST_URl= '/admin/product/spuImageList/',
  //获取spu销售属性接口
  GETSPUSALEATTRLIST_URL = '/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性[颜色、版本、尺码]接口
  GETBASESALEATTRLIST_URL ='/admin/product/baseSaleAttrList'
}
//获取spu接口返回数据ts
export const reqGetSpu = (page:number,limit:number,category3Id:number|string)=>http.get<any,GetSpuResponseData>(`${API.GETSPU_URL}${page}/${limit}?category3Id=${category3Id}`)
//获取全部品牌数据
export const reqGetTradeMarkList = ()=>http.get<any,TrademarkListResponseData>(API.GETTRADEMARKLIST_URL);
//获取某个spu下全部的售卖商品的图片数据
export const reqGetTradeMarkImageList = (spuId:number)=>http.get<any,SpuHasImageListResponseData>(`${API.ALLTRADEMARKIMAGELIST_URl}${spuId}`);
//获取某个spu下的销售属性数据
export const reqGetSpuSaleAttrList = (spuId:number)=>http.get<any,SpuSaleAttrListResponseData>(`${API.GETSPUSALEATTRLIST_URL}${spuId}`);
//获取整个项目全部的销售属性[颜色、版本、尺码]数据
export const reqGetAllSaleAttrList =()=>http.get<any,AllSaleAttrListResponseData>(API.GETBASESALEATTRLIST_URL);