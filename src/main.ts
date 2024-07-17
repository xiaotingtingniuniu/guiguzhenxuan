import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//引入自定义插件：可以注册整个项目的全局组件
import globalComponent from './components/index'
//引入全局的默认样式
import './style/index.scss'
//引入路由
import router from './router/index'
import store from './store/index'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, //element-plus 国际化配置
})
//安装自定义的全局插件
app.use(globalComponent)
//注册路由
app.use(router)
//安装pinia仓库
app.use(store)
/**
 * //测试mock接口代码
import axios from 'axios';
//登录接口
axios({
  method: 'post',
  url: '/api/user/login',
  data: {
    username: 'system',
    password: '1112111'
  }
});
**/
//引入路由鉴权文件
import './permission'
app.mount('#app')
console.log('环境', import.meta.env)
