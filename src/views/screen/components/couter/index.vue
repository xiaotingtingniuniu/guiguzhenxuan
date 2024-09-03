<template>
  <div class="box">
    <div class="top">
      <p class="title">数据统计</p>
      <p class="bg"></p>
    </div>
    <!-- 图形图表的容器 -->
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
//获取charts dom节点
const charts = ref();
onMounted(() => {
  //初始化echarts
  const myCharts = echarts.init(charts.value);
  //设置配置项
  myCharts.setOption({
    title: {
      text: '游客消费统计',
      textStyle:{
        color:'white',
      },
      top:20,
    },
    
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感', max: 16000 },
        { name: '出行', max: 30000 },
        { name: '小吃', max: 38000 },
        { name: '爱好', max: 52000 },
        { name: '景点', max: 25000 }
      ],
      radius:'70%'
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '购物'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '吃饭'
          }
        ]
      }
    ]
  })
})
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url('../../../../assets/screen/images/dataScreen-main-lb.png') no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url('../../../../assets/screen/images/dataScreen-title.png') no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
  }

  .charts {
    width: 100%;
    height: calc(100% - 30px)
  }
}
</style>