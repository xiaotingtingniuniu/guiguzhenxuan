//路由鉴权
/**
 * 第一个问题：任意路由切换实现进度条业务 --nprogress
 * 第二个问题：路由鉴权（路由组件访问权限的设置）
 * 全部路由组件：登录｜404｜任意路由｜首页｜数据大屏｜权限管理（三个子路由）｜商品管理（四个子路由）
 * 用户未登录：可以访问login，其余六个路由不能访问（指向login）
 * 用户登录成功：不可以访问login[指向首页]，其余路由都可以访问
 */
import router from './router/index'
//@ts-ignore
//引入进度条
import NProgress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
import { GET_TOKEN } from './utils/token'
//获取小仓库
import useUserStore from './store/modules/user'
//获取大仓库
import pinia from './store/index'
import setting from './setting'
//加载的小圆球，隐藏
NProgress.configure({ showSpinner: false })
//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  console.log('from',from);
  //访问某一个路由之前的守卫
  //to：你将要访问哪个路由
  //from: 你从哪个路由而来
  //next: 路由的放行函数
  //进度条开始
  NProgress.start()
  //设置title
  document.title = `${setting.title}-${to.meta.title}`
  const userStore = useUserStore(pinia)
  // console.log('userStore', userStore);
  const userName = userStore.userName
  //获取本地存储的token
  const token = GET_TOKEN()
  //根据token去判断用户登录、还是未登录
  if (token) {
    //如果登录了
    console.log('to', to)
    if (to.path === '/login') {
      //如果已经登录，想去登录页面，不能访问，直接重新跳转到首页
      next({ path: '/home' })
    } else {
      //登录成功访问其余六个路由（排除登录）
      if (userName) {
        //如果有用户信息，直接放行
        next()
      } else {
        //如果没有用户信息，在守卫这里发送请求获取到用户信息，然后再放行
        try {
          //获取用户信息
          await userStore.userInfor()
          next({ ...to })
        } catch (error) {
          //token过期或一些其他问题
          //退出登录->用户相关的数据清空
          await userStore.userLogout()
          next({ path: '/login', redirect: to.path })
        }
      }
    }
  } else {
    //没有登录
    if (to.path === '/login') {
      next()
    } else {
      //如果想要跳转的不是登录页面，强制让它跳转到登录页面，并且带上之前想要去的页面
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  console.log('to',to);
  console.log('from',from);
  NProgress.done()
})
