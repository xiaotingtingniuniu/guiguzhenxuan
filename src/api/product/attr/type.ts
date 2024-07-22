//属性管理相关数据类型
//返回数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//一级分类数据类型
export interface GetCategory {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}
//分类数据类型数组
export type GetCategoryArr = GetCategory[]
//分类接口返回数据类型
export interface GetCategoryResponseData extends ResponseData {
  data: GetCategoryArr
}
