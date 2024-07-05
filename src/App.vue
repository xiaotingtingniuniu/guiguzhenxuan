<template>
  <div class="box">
    <h1>App根组件</h1>
    <h2>我的</h2>
    <el-button type="primary" :icon="Edit" />
  </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'


</script>

<style scoped lang="scss">
.box {
  width: 600px;
  height: 400px;
  background: black;
  h1 {
    color: white;
  }
}
</style>
