<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefresh" />
  <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
  <el-button size="small" icon="Setting" circle />
  <img src="../../../../public/logo.png" alt="" class="head_sculpture" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//获取layout的小仓库
import useLayOutSettingStore from '../../../store/modules/setting'
const layOutSettingStore = useLayOutSettingStore()
console.log('layOutSettingStore', layOutSettingStore)
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
}
</style>
