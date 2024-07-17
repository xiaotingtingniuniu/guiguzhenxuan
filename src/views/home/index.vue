<template>
  <div>home组件</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '../../store/modules/user';
const userStore = useUserStore();
onMounted(()=>[
  //获取用户信息
  userStore.userInfor()
]);
</script>

<style scoped lang="scss"></style>
