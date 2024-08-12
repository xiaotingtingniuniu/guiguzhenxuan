//用户管理模块的ts类型
//返回的数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
//一个账号信息的ts类型
export interface User {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password?: string
  name: string
  phone?: null
  roleName?: string
}
//全部的账号信息（数组）
export type Records = User[]
//获取全部用户信息接口返回的数据类型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}
//职位的数据类型
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
// 职位数组类型
export type RoleArr = Role[]
//获取全部职位接口返回的数据类型
export interface AllRolesResponseData extends ResponseData {
  data: {
    assignRoles: RoleArr
    allRolesList: RoleArr
  }
}
//分配职务携带参数类型
export interface SetRoleData {
  roleIdList: (number | undefined)[]
  userId: number
}
