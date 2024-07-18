//统一管理用户相关的接口
import http from '../../utils/http'
//mock 数据
import { LoginData, LoginResponseData, UserInforResponseData } from './type.ts'
// //枚举接口地址
// enum API {
//   LOGIN_URL = '/user/login',
//   USERINFOR_URL = '/user/info',
// }
// //暴露请求函数
// //登录接口
// export const reqLogin = (data: LoginData) =>
//   http.post<any, LoginResponseData>(API.LOGIN_URL, data)
// //获取用户信息接口
// export const reqUserInfor = () =>
//   http.get<any, UserInforResponseData>(API.USERINFOR_URL)



//项目用户相关的请求地址
enum API{
  LOGIN_URL = '/admin/acl/index/login',
  USERINFOR_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout'
}
//登录接口
export const reqLogin = (data:LoginData)=>http.post<any,LoginResponseData>(API.LOGIN_URL,data)
//获取用户信息接口
export const reqUserInfor = ()=>http.get<any,UserInforResponseData>(API.USERINFOR_URL);
//登出接口
export const reqLogout = ()=>http.post<any,any>(API.LOGOUT_URL);