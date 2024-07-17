//进行axios二次封装：目的是使用请求与响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { GET_TOKEN } from './token'
//第一步：利用axios对象的create方法，创建axios实例(其他的配置：基础路径、超时的时间)
const http = axios.create({
  //基础路径
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径会携带上/api
  timeout: 5000, //请求超时时间
})
//第二步：http实例添加请求拦截器
http.interceptors.request.use((config: any) => {
  //config配置对象，headers属性请求头，经常给服务器端携带公共参数
  const token = GET_TOKEN();//获取本地存储的token
  if (token) {
    //如果存在token表示已经登录,需要在请求头中加入
    config.headers.token = token
  }
  //返回配置对象
  return config
})
//第三步:http实例添加响应拦截器
http.interceptors.response.use(
  (response) => {
    //成功的回调
    //简化数据
    return response.data
  },
  (error) => {
    //失败回调:处理http网络错误
    //定义一个变量：存储网络错误信息
    let message = ''
    //获取请求错误状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权限访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
//对外暴露
export default http
