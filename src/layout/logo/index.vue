
<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" />
    <p v-if="!settingStore.menuOpenTag">{{ setting.title }}</p>
  </div>
</template>

<script setup lang="ts">
import setting from '../../setting'
import useLayOutSettingStore from '../../store/modules/setting'
//获取设置layout小仓库
const settingStore = useLayOutSettingStore();
</script>
<script lang="ts">
export default {
  name:'Logo'
}
</script>
<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  font-size: $base-menu-logo-title-fontSize;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    margin-left: 10px;
  }
}
</style>