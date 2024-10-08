import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routes'
export default createRouter({
  //路由的模式的设置 hash模式
  history: createWebHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})
