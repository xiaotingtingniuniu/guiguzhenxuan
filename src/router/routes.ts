import { RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    component: () => import('../views/home/index.vue'),
    name: 'home',
    meta: {
      title: '首页',
    },
  },
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录页',
    },
  },
  {
    path: '/404',
    component: () => import('../views/404/index.vue'),
    name: '404',
    meta: {
      title: '404页',
    },
  },
  {
    path: '/:pathMatch(.*)*', //匹配不到的时候，就会重定向到404路径
    redirect: '/404',
    name: 'any',
  },
  {
    path: '/',
    redirect: '/home',
    name: '首页',
  },
]
