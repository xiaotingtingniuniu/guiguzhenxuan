<template>
  <!-- 顶部左侧静态 -->
  <el-icon class="expand" @click="changeFlag">
    <component :is="!layOutSettingStore.menuOpenTag ? 'Expand' : 'Fold'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight" class="left_breadcrumb">
    <!-- 面包屑动态展示路由名字与标题 -->
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" class="left_breadcrumb_item" v-show="item.meta.icon !== ''" :to="item.path">
      <!-- 图标 -->
      <el-icon class="expand" @click="changeFlag">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <!-- 标题 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '../../../store/modules/setting'
import { useRoute } from 'vue-router'
const layOutSettingStore = useLayOutSettingStore()
const changeFlag = () => {
  layOutSettingStore.menuOpenTag = !layOutSettingStore.menuOpenTag
}
//获取路由对象
const $route = useRoute();
console.log('$route', $route.matched);
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>
<style scoped lang="scss">
.expand {
  margin-right: 10px;
}

.left_breadcrumb {
  .left_breadcrumb_item {
    ::v-deep .el-breadcrumb__inner {
      display: flex;
      align-items: center;
    }
  }
}
</style>
