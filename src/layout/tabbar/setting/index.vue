<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefresh" />
  <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
  <el-button size="small" icon="Setting" circle />
  <img :src="userStore.avatar" alt="" class="head_sculpture" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userName }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//获取layout的小仓库
import useLayOutSettingStore from '../../../store/modules/setting'
//获取用户小仓库
import useUserStore from '../../../store/modules/user'
import { useRouter, useRoute } from 'vue-router'
//获取路由器对象
const $router = useRouter()
//获取路由对象
const $route = useRoute()
const layOutSettingStore = useLayOutSettingStore()
console.log('layOutSettingStore', layOutSettingStore)
const userStore = useUserStore()
//点击刷新按钮
const updateRefresh = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}
//点击全屏按钮
const fullScreen = () => {
  //此方法只适用于谷歌浏览器，如需兼容其他浏览器，可以使用插件
  //Dom对象的一个属性：可以用来判断当前是不是全屏模式【全屏：true，不是全屏：false】
  let full = document.fullscreenElement
  //切换为全屏模式
  if (!full) {
    //文档根节点的方法 requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏模式
    document.exitFullscreen()
  }
}
//退出登录
const logout = async() => {
  //第一步：需要向服务器发送请求【退出登录接口】
  //第二步：仓库当中关于用于相关的数据清空【token、username、avatar】
  //第三步：跳转到登录页面
  //清空数据
  await userStore.userLogout()
  //跳转到登录页面，并且从哪里来的，还可以回到哪里去
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss">
.head_sculpture {
  width: 24px;
  height: 24px;
  margin-left: 10px;
  border-radius: 50%;
}
</style>
