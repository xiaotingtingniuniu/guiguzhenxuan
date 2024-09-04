//创建用户相关的小仓库
import { defineStore } from 'pinia'
//调用登录接口
import { reqLogin, reqUserInfor, reqLogout } from '../../api/user/index'
import {
  LoginData,
  LoginResponseData,
  UserInforResponseData,
} from '../../api/user/type'
import { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '../../utils/token'
//引入路由（常量路由）
import { constantRoute,anyRoute,asyncRoute } from '../../router/routes'
import router from '../../router'
//@ts-ignore
//引入深拷贝的方法
import cloneDeep from 'lodash/cloneDeep'
//选项式写法
//用于过滤当前用户需要展示的异步路由
function filterAsyncRoute(asyncRoute:any,routes:any){
  console.log('asyncRoute',asyncRoute)
  console.log('routes',routes)
  return asyncRoute.filter((item:any)=>{
    if(routes.includes(item.name)){
      if(item.children&&item.children.length>0){
        //这句话会导致改变了原有的孩子数组
        item.children=filterAsyncRoute(item.children,routes)
      }
      return true
    }
  })
}
//创建小仓库
const useUserStore = defineStore('User', {
  //小仓库存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识token
      menuRoutes: constantRoute, //仓库存储生成菜单需要数组（路由）
      userName: '',
      avatar: '',
      buttons:[],
    }
  },
  //处理异步逻辑的地方
  actions: {
    //用户登录的方法
    async userLogin(data: LoginData) {
      const result: LoginResponseData = await reqLogin(data)
      console.log('result', result)
      if (result.code === 200) {
        //登录成功
        const token = result.data
        this.token = token //存入仓库
        //存入缓存
        SET_TOKEN(token)
        //保证当前async函数返回一个成功的promise
        return 'ok'
      } else {
        //登录失败 返回一个错误的Promise
        return Promise.reject(new Error('登录失败'))
      }
    },
    //获取用户信息
    async userInfor() {
      const result: UserInforResponseData = await reqUserInfor()
      console.log('result', result.data.routes)
      if (result.code === 200) {
        this.userName = result.data.name
        this.avatar = result.data.avatar
        //存储buttom的权限数组
        this.buttons = result.data.buttons
        //计算当前用户需要展示的异步路由
        const userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute),result.data.routes);
        console.log('userAsyncRoute',userAsyncRoute);
        //菜单的数据
        this.menuRoutes = [...constantRoute,...userAsyncRoute,anyRoute]
        console.log('this.menuRoutes',this.menuRoutes);
        console.log('注册的常量路由',router.getRoutes());
        //目前路由器管理的只有常量路由
        const routeArr = [...userAsyncRoute,anyRoute];
        console.log('routeArr',routeArr);
        routeArr.forEach((route:any)=>{
          console.log('route',route);
          router.addRoute(route);
        });
        console.log('注册的所有路由',router.getRoutes());
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code === 200) {
        ;(this.token = ''),
          (this.userName = ''),
          (this.avatar = ''),
          REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  //处理数据的地方
  getters: {},
})
//对外暴露用户小仓库
export default useUserStore
