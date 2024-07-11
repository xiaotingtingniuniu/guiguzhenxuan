//登录接口携带的参数
export interface LoginData {
  username: string
  password: string
}
//登录接口
export interface ResponseData {
  code: number
}
//登录接口返回的数据类型
export interface LoginResponseData extends ResponseData {
  data: {
    token?: string
    message?: string
  }
}
//用户信息数据类型
export interface userInfor {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}
//用户信息接口返回数据类型
export interface userInforResponseData extends ResponseData {
  data: {
    userInfor: userInfor
  }
}
