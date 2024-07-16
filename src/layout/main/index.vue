<template>
  <div>
    <!-- 路由组件出口的位置 -->
    <!-- <router-view></router-view> -->
    <!-- 过渡动画 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 全局组件 -->
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: 'Main',
}
</script>
<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
