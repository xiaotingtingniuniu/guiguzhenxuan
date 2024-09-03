<template>
  <div class="top">
    <div class="left">
      <span class="lbtn" @click="goHome">首页</span>
    </div>
    <div class="center">
      <div class="title">智慧旅游可视化数据展示平台</div>
    </div>
    <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import moment from 'moment'
import { onBeforeUnmount, onMounted, ref } from 'vue'
//存储当前时间
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
//存储定时器
let timer = ref<number>(0)
//获取路由器对象
const $router = useRouter()
const goHome = () => {
  $router.push('/home')
}
onMounted(() => {
  timer.value = setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
  }, 1000)
})
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top {
  width: 100%;
  height: 40px;
  display: flex;

  .left {
    flex: 1;
    background: url('../../../../assets/screen/images/dataScreen-header-left-bg.png')
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: end;

    .lbtn {
      width: 140px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: url('../../../../assets/screen/images/dataScreen-header-btn-bg-l.png')
        no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 20px;
      cursor: pointer;
    }
  }

  .center {
    flex: 1.8;
    .title {
      width: 100%;
      height: 74px;
      background: url('../../../../assets/screen/images/dataScreen-header-center-bg.png')
        no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color: #29fcff;
      font-size: 30px;
    }
  }

  .right {
    flex: 1;
    background: url('../../../../assets/screen/images/dataScreen-header-left-bg.png')
      no-repeat;
    background-size: cover;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #29fcff;
    .rbtn {
      width: 140px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: url('../../../../assets/screen/images/dataScreen-header-btn-bg-r.png')
        no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
      font-size: 20px;
    }
    .time {
      margin-right: 5px;
      font-size: 20px;
      width: 325px;
    }
  }
}
</style>
