//自定义插件
// 引入项目中全部的全局组件
import Test from '../components/Test/index.vue'
import Test1 from '../components/Test1/index.vue'
import Category from '../components/Category/index.vue'
//引入svg组件
import SvgIcon from '../components/SvgIcon/index.vue';
//注册element-plus的Icon为全局组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
console.log('ElementPlusIconsVue', ElementPlusIconsVue)
//全局组件对象
const allGloablComponent: any = {
  Test,
  Test1,
  Category,
  SvgIcon,
}
console.log('allGloablComponent', allGloablComponent)
//对外暴露插件对象
export default {
  //务必叫做install方法
  install(app: any) {
    console.log('app', app)
    // 在对象中找到全部可枚举的属性
    Object.keys(allGloablComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGloablComponent[key])
    })
    //注册所有的ElementPlusIconsVue Icon组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
