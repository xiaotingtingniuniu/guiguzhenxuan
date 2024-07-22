import type { RouteRecordRaw } from 'vue-router'
import type { GetCategoryArr } from '../../../api/product/attr/type.ts'
//定义小仓库数据state类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  userName: string
  avatar: string
}
export interface categoryState {
  category1Data: GetCategoryArr
  category2Data: GetCategoryArr
  category3Data: GetCategoryArr
  category1Id: number | string
  category2Id: number | string
  category3Id: number | string
}
