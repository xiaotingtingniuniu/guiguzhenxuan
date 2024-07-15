//创建用户相关的小仓库
import { defineStore } from 'pinia'
//调用登录接口
import { reqLogin } from '../../api/user/index'
import { LoginData, LoginResponseData } from '../../api/user/type'
import { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN } from '../../utils/token'
//引入路由（常量路由）
import {routes} from '@/router/routes.ts'
//选项式写法
//创建小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),//用户唯一标识token
      menuRoutes:routes,//仓库存储生成菜单需要数组（路由）
    }
  },
  //处理一步逻辑的地方
  actions: {
    async userLogin(data: LoginData) {
      const result: LoginResponseData = await reqLogin(data)
      console.log('result', result)
      if (result.code === 200) {
        //登录成功
        const token = result.data.token
        this.token = token as string //存入仓库
        //存入缓存
        SET_TOKEN(token as string)
        //保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        //登录失败 返回一个错误的Promise
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  //处理数据的地方
  getters: {},
})
//对外暴露用户小仓库
export default useUserStore
