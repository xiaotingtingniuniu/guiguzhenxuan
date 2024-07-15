<template>
  <el-button size="small" icon="Refresh" circle />
  <el-button size="small" icon="FullScreen" circle />
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

<script setup lang="ts"></script>

<style scoped lang="scss">
.head_sculpture {
  width: 24px;
  height: 24px;
  margin-left: 10px;
}
</style>
