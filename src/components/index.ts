//自定义插件
// 引入项目中全部的全局组件
import Test from '../components/Test/index.vue'
import Test1 from '../components/Test1/index.vue'
import Category from '../components/Category/index.vue'
//注册element-plus的Icon为全局组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
console.log('ElementPlusIconsVue', ElementPlusIconsVue)
//全局组件对象
const allGloablComponent: any = {
  Test,
  Test1,
  Category
}
console.log('allGloablComponent', allGloablComponent)
//对外暴露插件对象
export default {
  install(app: any) {
    console.log('app', app)
    // 在对象中找到全部可枚举的属性
    Object.keys(allGloablComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGloablComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
