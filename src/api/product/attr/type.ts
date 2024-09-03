//属性管理相关数据类型
//返回数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//分类数据类型
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

//属性与属性值数据类型

//属性值对象的数据类型
export interface AttrValue {
  attrId?: number
  id?: number
  valueName: string
  flag?: boolean
}
//属性值的数组类型
export type AttrValueList = AttrValue[]
//属性对象的数据类型
export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
  attrIdAndValueId?: string
}
//属性对象数组的数据类型
export type AttrList = Attr[]
//属性与属性值接口返回的数据类型
export interface AttrResponseData extends ResponseData {
  data: AttrList
}
