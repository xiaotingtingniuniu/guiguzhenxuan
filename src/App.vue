<template>
  <div class="box">
    <h1>App根组件</h1>
    <h2>我的</h2>
    <el-button type="primary" :icon="Edit" />
    <i class="iconfont icon-settings"></i>
    <Test></Test>
  </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import Test from '@/components/Test.vue'
import './style/icon.scss'
const a = 1
console.log('a', a)
</script>

<style scoped lang="scss"></style>
