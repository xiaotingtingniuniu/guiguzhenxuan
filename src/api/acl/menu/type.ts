//菜单管理模块数据类型
export interface ResponseData {
  code: number,
  message: string,
  ok: boolean
}
//菜单或按钮数据类型
export interface MenuOrButtonData {
  id?: number,
  createTime: string,
  updateTime: string,
  pid: number,
  name: string,
  code: string,
  toCode: string,
  type: number,
  status: null,
  level: number,
  children?: MenuOrButtonList,
  select: boolean
}
// 菜单或按钮数据数组的类型
export type MenuOrButtonList = MenuOrButtonData[];
//获取菜单模块返回的数据
export interface GetAllRloeResponseData extends ResponseData {
  data:MenuOrButtonList
}
//添加与修改菜单携带参数数据类型
export interface MenuParams{
  id?:number,
  code:string,//权限数值
  level:number,//几级菜单
  name:string,//菜单的名字
  pid:number//菜单的id
}
