//接口返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//职位的数据类型
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
//获取职位角色接口返回的数据类型
export interface GetAllRoleResponseData extends ResponseData {
  data: {
    records: Role[]
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
//菜单与按钮的数据Ts类型
export interface MenuOrButtonData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: MenuOrButtonList
  select: boolean
}
//菜单或者按钮的数组类型
export type MenuOrButtonList = MenuOrButtonData[]
//根据角色获取菜单接口返回的数据类型
export interface GetPermissionResponseData extends ResponseData {
  data: MenuOrButtonList
}
