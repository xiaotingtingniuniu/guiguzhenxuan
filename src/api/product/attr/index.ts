//属性相关接口
import http from '../../../utils/http'
import { GetCategoryResponseData } from './type.ts'
//属性管理模块接口地址
enum API {
  //获取一级分类的接口地址
  GETCATEGORY1_URL = '/admin/product/getCategory1',
  //获取二级分类的接口地址
  GETCATEGORY2_URL = '/admin/product/getCategory2/',
  //获取三级分类的接口地址
  GETCATEGORY3_URL = '/admin/product/getCategory3/',
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
