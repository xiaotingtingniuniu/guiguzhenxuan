//属性相关接口
import http from '../../../utils/http'
import { GetCategoryResponseData,AttrResponseData,Attr } from './type.ts'
//属性管理模块接口地址
enum API {
  //获取一级分类的接口地址
  GETCATEGORY1_URL = '/admin/product/getCategory1',
  //获取二级分类的接口地址
  GETCATEGORY2_URL = '/admin/product/getCategory2/',
  //获取三级分类的接口地址
  GETCATEGORY3_URL = '/admin/product/getCategory3/',
  //获取分类下已有的属性与属性值接口地址
  ATTR_URL = '/admin/product/attrInfoList/',
  //添加或修改已有属性的接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  //删除属性接口
  DELETEATTR_URL = '/admin/product/deleteAttr/'
}
//获取一级分类接口
export const reqGetCategory1 = () =>
  http.get<any, GetCategoryResponseData>(API.GETCATEGORY1_URL)
//获取二级分类接口
export const reqGetCategory2 = (category1Id: number | string) =>
  http.get<any, GetCategoryResponseData>(
    `${API.GETCATEGORY2_URL}${category1Id}`,
  )
//获取三级分类接口
export const reqGetCategory3 = (category2Id: number | string) =>
  http.get<any, GetCategoryResponseData>(
    `${API.GETCATEGORY3_URL}${category2Id}`,
  )
//获取已有的属性与属性值接口
export const reqAttr = (category1Id: number|string, category2Id: number|string, category3Id: number|string) =>
  http.get<any, AttrResponseData>(`${API.ATTR_URL}${category1Id}/${category2Id}/${category3Id}`)
//添加或修改已有属性的接口
export const reqAddorUpdateAttr = (data:Attr)=>http.post<any,any>(API.ADDORUPDATEATTR_URL,data);
//删除属性接口
export const reqDeleteAttr = (attrId:number|undefined)=>http.delete(`${API.DELETEATTR_URL}${attrId}`)