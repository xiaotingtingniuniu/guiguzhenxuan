<template>
  <div class="container_layout">
    <!-- 左侧 左侧菜单 -->
    <div
      class="layout_left"
      :class="{ flod: settingStore.menuOpenTag ? true : false }"
    >
      <Logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件 -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          active-text-color="#ffd04b"
          background-color="#001529"
          text-color="#fff"
          :router="true"
          :collapse="settingStore.menuOpenTag"
          :collapse-transition="false"
        >
          <!-- 根据路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 右侧 -->
    <div class="layout_right">
      <!-- 顶部导航 -->
      <div class="layout_tab">
        <Tabbar></Tabbar>
      </div>
      <!-- 内容展示区 -->
      <div class="layout_main">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from '../layout/logo/index.vue'
import Menu from '../layout/menu/index.vue'
import Main from '../layout/main/index.vue'
import Tabbar from '../layout/tabbar/index.vue'
//引入用户小仓库
import useUserStore from '../store/modules/user'
import useLayOutSettingStore from '../store/modules/setting'
import { useRoute } from 'vue-router'
//获取用户小仓库
const userStore = useUserStore()
console.log('menuRoutes', userStore.menuRoutes)
//获取设置layout小仓库
const settingStore = useLayOutSettingStore()
// 获取路由对象
const $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Layout',
}
</script>

<style scoped lang="scss">
.container_layout {
  width: 100%;
  height: 100vh;
  display: flex;

  .layout_left {
    width: $base-menu-width;
    height: 100vh;
    background-color: $base-menu-background;
    color: white;
    transition: all 0.1s;
    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }
    &.flod {
      width: $base-menu-min-width;
    }
  }

  .layout_right {
    width: calc(100vh - $base-menu-width);
    flex: auto;

    .layout_tab {
      height: $base-tabbar-height;
    }

    .layout_main {
      height: calc(100vh - $base-tabbar-height);
      padding: 20px;
      overflow: auto;

      p {
        height: 1200px;
        background-color: antiquewhite;
      }
    }
  }
}
::v-deep .el-menu {
  border-right: none;
}
</style>
