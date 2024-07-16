<template>
  <div>
    <!-- 路由组件出口的位置 -->
    <!-- <router-view></router-view> -->
    <!-- 过渡动画 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 全局组件 -->
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="flag"/>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch,ref,nextTick } from 'vue';
import useLayOutSettingStore from '../../store/modules/setting';
const layOutSettingStore = useLayOutSettingStore();
let flag = ref(true);
//监听仓库内的layOutSettingStore,如果发生变化,表示点击了刷新按钮
watch(()=>layOutSettingStore.refresh,()=>{
  //点击刷新按钮:路由组件销毁
  flag.value = false;
  //nextTick 响应数据发生变化后 Dom更新完毕，再次创建
  nextTick(()=>{
    flag.value = true;
  })
});
</script>
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
