<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item :index="item.path" v-if="!item.meta.hidden">
        <el-icon>
          <!-- 全局组件 -->
          <component :is="item.meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item?.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由，子路由的个数为1 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item :index="item.children[0].path" v-if="!item.children[0].meta.hidden">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item?.children[0].meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 有子路由，且子路由个数大于一个 -->
    <el-sub-menu :index="item.path" v-if="item.children && item.children.length >= 2">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item?.meta?.title }}</span>
      </template>
      <!-- 使用递归  需要将自己的暴露出去 如下script => export default {name:'Menu'}-->
      <Menu :menuList="item.children"></Menu>
      <!-- 不使用递归 -->
      <!-- <el-menu-item v-for="item1 in item.children " :index="item1.path">
        <el-icon>
          <document />
        </el-icon>
        <span>{{ item1?.meta?.title }}</span>
      </el-menu-item> -->
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
//获取父组件传递过来的全部路由
import { defineProps } from 'vue'
defineProps(['menuList'])
</script>
<script lang="ts">
export default {
  name: 'Menu',
}
</script>
<style scoped lang="scss"></style>
