// SPU相关数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//spu图片数据类型
export interface SpuImage {
  id?: number
  imgName?: string
  imgUrl?: string
  spuId?: number
  updateTime?: string
  createTime?: string
  name?: string
  url?: string
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
//已有的spu销售属性值
export interface SpuSaleAttrValue {
  baseSaleAttrId: number | string//销售属性id
  createTime?: string
  id?: number
  isChecked?: string
  saleAttrName?: string
  saleAttrValueName?: string//销售属性值
  spuId?: number
  updateTime?: string
}
//已有的sup销售属性值数组类型
export type SpuSaleAttrValueList = SpuSaleAttrValue[]
//spu销售属性
export interface SpuSaleAttr {
  baseSaleAttrId: number | string//销售属性id
  createTime?: string
  id?: number
  saleAttrName: string//销售属性名字
  spuId?: number
  spuSaleAttrValueList: null | SpuSaleAttrValueList//销售属性值数组
  updateTime?: string
  flag?: boolean
  saleAttrValue?: string
  saleIdAndValueId?:string
}
//SPU数据的ts类型:需要修改
export interface Record {
  id?: number|string //spu的id
  spuName: string //spu的名字
  description: string //spu的描述
  category3Id: number | string //三级分类的id
  tmId: number | string //品牌的id
  spuSaleAttrList: SpuSaleAttrValueList
  spuImageList: SpuImageList//商品图片的数据
  spuPosterList?: SpuPosterList
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
//spu已有的销售属性接口返回数据类型
export interface SpuSaleAttrListResponseData extends ResponseData {
  data: SpuSaleAttr[]
}
//获取项目全部销售属性的数据类型
export interface AllSaleAttr {
  id?: number
  createTime?: string
  updateTime?: string
  name: string
}
//获取项目全部销售属性返回的数据类型
export interface AllSaleAttrListResponseData extends ResponseData {
  data: AllSaleAttr[]
}

// sku的平台属性
export interface Attr {
  attrId: string | number,//平台属性id
  valueId: string | number,//属性值的id
}
// sku的销售属性
export interface saleAttr {
  saleAttrId: string | number,//销售属性id
  saleAttrValueId: string | number,//属性值id
}
//新增一个sku的入参
export interface SkuInfo {
  category3Id: string | number,//三级分类的ID
  spuId: string | number,//已有的SPU的ID
  tmId: string | number,//spu品牌的id
  skuName: string,//sku名字
  price: number | string,//sku价格
  weight: string | number,//sku重量
  skuDesc: string,//sku的描述
  skuAttrValueList: Attr[],//平台属性
  skuSaleAttrValueList: saleAttr[],//销售属性
  skuDefaultImg: string,//sku图片地址
}
//获取sku的数据接口类型
export interface SkuInforResponseData extends ResponseData{
  data:SkuInfo[]
}