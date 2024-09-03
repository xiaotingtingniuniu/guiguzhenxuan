<template>
  <div class="box">
    <div class="top">
      <p class="title">年度游客量对比</p>
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
//获取charts Dom
const charts = ref();
onMounted(() => {
  //初始化charts
  const myCharts = echarts.init(charts.value);
  //设置配置项
  myCharts.setOption({
    title: {
      text: '游客量散点图',
      textStyle: {
        color: 'white'
      },
      left: '40%'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {},
    grid: {
      top: 30,
      left: 20,
      right: 20,
      bottom: 20
    },
    series: {
      type: 'scatter',
      data: [1, 3, 67, 7, 42, 1, 77, 88, 54, 21, 11],
      //标记图形设置
      symbol:'circle',
      symbolSize:16,
      //图文标签
      label:{
        show:true,
        position:'top',
        color:'white'
      },
      itemStyle:{
        color:'skyblue'
      }
    }
  });
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
    height: calc(100% - 30px);
  }
}
</style>