// SPU相关数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//spu图片数据类型
export interface SpuImage {
  createTime: string
  id: number
  imgName: string
  imgUrl: string
  spuId: number
  updateTime: string
}
//spu图片数组类型
export type SpuImageList = SpuImage[]
//spuPoster数据类型
export interface SpuPoster {
  createTime: '2024-07-25T11:45:15.679Z'
  id: number
  imgName: string
  imgUrl: string
  spuId: number
  updateTime: string
}
export type SpuPosterList = SpuPoster[]
//spu销售属性值
export interface SpuSaleAttrValue {
  baseSaleAttrId: number
  createTime: string
  id?: number
  isChecked: string
  saleAttrName: string
  saleAttrValueName: string
  spuId: number
  updateTime: string
}
export type SpuSaleAttrValueList = SpuSaleAttrValue[]
//spu销售属性
export interface spuSaleAttr {
  baseSaleAttrId: number
  createTime: string
  id?: number
  saleAttrName: string
  spuId: number
  spuSaleAttrValueList: SpuSaleAttrValueList
  updateTime: string
}
//SPU数据的ts类型:需要修改
export interface Record {
  id?: number
  spuName: string
  description: string
  category3Id: number | string
  tmId: number
  spuSaleAttrList: SpuSaleAttrValueList
  spuImageList: SpuImageList
  spuPosterList: SpuPosterList
}
//数组:元素都是已有SPU数据类型
export type Records = Record[]
//获取已有spu接口返回数据
export interface GetSpuResponseData extends ResponseData {
  data: {
    current: number
    hitCount: boolean
    pages: number
    records: Records
    searchCount: boolean
    size: number
    total: number
  }
}
//品牌的数据类型
export interface Trademark {
  createTime: string
  id: number
  logoUrl: string
  tmName: string
  updateTime: string
}
//获取品牌数据接口返回的数据类型
export interface TrademarkListResponseData extends ResponseData {
  data: Trademark[]
}
//已有的spu的照片墙返回数据类型
export interface SpuHasImageListResponseData extends ResponseData {
  data: SpuImageList
}
//spu销售属性返回数据类型
export interface SpuSaleAttrListResponseData extends ResponseData {
  data: spuSaleAttr[]
}
//获取项目全部销售属性的数据类型
export interface AllSaleAttr {
  id: number
  createTime: string
  updateTime: string
  name: string
}
//获取项目全部销售属性返回的数据类型
export interface AllSaleAttrListResponseData extends ResponseData {
  data: AllSaleAttr[]
}
