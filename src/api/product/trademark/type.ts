export interface ResponseData{
  code:number,
  message:string,
  ok:boolean
}
//品牌数据类型
export interface Record {
  id?: number,
  tmName: string,
  logoUrl:string
}
//品牌数据数组类型
export type Records = Record[];
//获取已有品牌接口返回数据类型
export interface HasTrademarkResponseData extends ResponseData{
  data:{
    "records": Records,
    "total": number,
    "size": number,
    "current": number,
    "orders": [],
    "optimizeCountSql": boolean,
    "hitCount": boolean,
    "countId": null,
    "maxLimit": null,
    "searchCount": boolean,
    "pages": number
  }
}
// 添加品牌接口需要的参数类型
export interface AddTrademarkData {
  logoUrl:string,
  tmName:string
  id?:number
}
//添加品牌接口返回数据类型
// export interface AddTrademarkResponseData extends ResponseData{
//   data:
// }