//sku数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// sku的平台属性
export interface Attr {
  attrId: string | number //平台属性id
  valueId: string | number //属性值的id
  id: number
  skuId: number
  attrName: string
  valueName: string
}
// sku的销售属性
export interface saleAttr {
  saleAttrId: string | number //销售属性id
  saleAttrValueId: string | number //属性值id
  id: number
  skuId: number
  spuId: number
  saleAttrName: string
  saleAttrValueName: string
}
//Sku数据类型
export interface SkuData {
  category3Id: string | number //三级分类的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //spu品牌的id
  skuName: string //sku名字
  price: number | string //sku价格
  weight: string | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList: Attr[] //平台属性
  skuSaleAttrValueList: saleAttr[] //销售属性
  skuDefaultImg: string //sku图片地址
  isSale?: number //是否上架
  id?: number //skuid
}
//获取sku数据接口返回的数据类型
export interface GetSkuListResponseData extends ResponseData {
  data: {
    records: SkuData[]
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
  }
}
//sku图片信息
export interface SkuImage {
  id: number
  createTime: string
  updateTime: string
  skuId: number
  imgName: string
  imgUrl: string
  spuImgId: number
  isDefault: string
}
//sku商品信息
export interface SkuInfor {
  id: number | string
  spuId: number | string
  price: number | string
  skuName: string
  skuDesc: string
  weight: string
  tmId: number | string
  category3Id: number | string
  skuDefaultImg: string
  isSale: number | string
  skuImageList: SkuImage[]
  skuAttrValueList: Attr[]
  skuSaleAttrValueList: saleAttr[]
}
//获取sku商品信息接口返回的数据
export interface SkuInforResponseData extends ResponseData {
  data: SkuInfor
}
