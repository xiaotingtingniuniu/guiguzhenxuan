export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//登录接口携带的参数
export interface LoginData {
  username: string
  password: string
}

//登录接口返回的数据类型
export interface LoginResponseData extends ResponseData {
  data: string
}

export type Routes = []
export type Buttons = []
export type Roles = []
//用户信息接口返回数据类型
export interface UserInforResponseData extends ResponseData {
  data: {
    routes: Routes
    buttons: Buttons
    roles: Roles
    name: string
    avatar: string
  }
}
