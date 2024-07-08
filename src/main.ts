import { createApp } from 'vue'
import App from '@/App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn, //element-plus 国际化配置
})
app.mount('#app')
console.log('环境', import.meta.env)
