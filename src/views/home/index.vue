<template>
  <el-card>
    <div class="card-div">
      <img :src="userStore.avatar" alt="" class="img" />
      <div class="right">
        <h2>{{ getTime() }}好{{ userStore.userName }}</h2>
        <span>硅谷甄选运营平台</span>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
//获取user小仓库
import useUserStore from '../../store/modules/user'
//获取时间方法
import getTime from '../../utils/time'
const userStore = useUserStore()
console.log('userStore', userStore)
</script>

<style scoped lang="scss">
.card-div {
  display: flex;
  align-items: center;

  .img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 30px;
  }

  .right {
    h2 {
      margin-bottom: 20px;
    }

    span {
      color: #ccc;
      font-size: 14px;
    }
  }
}
.bottom {
  display: flex;
  justify-content: center;
}
</style>
