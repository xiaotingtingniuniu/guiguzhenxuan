// 引入项目中全部的全局组件
import Test from '../components/Test'
//全局对象
const allGloablComponent: any = {
  Test,
}
//对外暴露插件对象
export default {
  install(app: any) {
    Object.keys(allGloablComponent).forEach((key) => {
      app.component(key, allGloablComponent[key])
    })
  },
}
