<template>
  <div class="tabbar">
    <div class="left">
      <Breadcrumb></Breadcrumb>
    </div>
    <div class="right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from '../tabbar/breadcrumb/index.vue'
import Setting from '../tabbar/setting/index.vue'
</script>
<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to right,
    rgb(249, 247, 247),
    rgb(246, 224, 224),
    rgb(249, 211, 211)
  );

  .left {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .expand {
      margin-right: 10px;
    }
  }

  .right {
    display: flex;
    align-items: center;
    .head_sculpture {
      width: 24px;
      height: 24px;
      margin-left: 10px;
    }
  }
}
</style>
