//统一管理用户相关的接口
import http from '../../utils/http'
import {LoginData,LoginResponseData,userInforResponseData}from './type.ts'
//枚举接口地址
enum API{
  LOGIN_URL='/user/login',
  USERINFOR_URL='/user/info'
}
//暴露请求函数
//登录接口
export const login = (data:LoginData)=>http.post<any,LoginResponseData>(API.LOGIN_URL,data);
//获取用户信息接口
export const userInfor = ()=>http.get<any,userInforResponseData>(API.USERINFOR_URL);