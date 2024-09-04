<template>
  <div class="box">
    <button @click="goHome">首页</button>
    <img src="../../assets/images/error_images/404.png" alt="">
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const $router = useRouter();
const goHome = ()=>{
  $router.push('/home');
}
</script>

<style scoped lang="scss">
.box{
  width:100vw;
  height: 100vh;
  background:yellowgreen;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width:800px;
    height: 400px;
    margin-left: 400px;
  }
}
</style>
