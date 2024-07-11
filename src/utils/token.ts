//封装本地存储数据和读取数据的方法
//存储本地数据
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}
// 获取本地数据
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}
