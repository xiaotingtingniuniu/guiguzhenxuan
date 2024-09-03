<template>
  <div class="box">
    <div class="top">
      <p class="title">
        年龄比例
      </p>
      <p class="bg"></p>
    </div>
    <!-- 图形图表容器 -->
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang='ts'>
import * as echatrs from 'echarts'
import { onMounted } from 'vue';
import { ref } from 'vue'
//获取chartsDom
const charts = ref();
onMounted(() => {
  //初始化echarts
  const myCharts = echatrs.init(charts.value);
  //设置配置项
  myCharts.setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 40,
      right: 40,
      orient:'vertical',//图例组件方向设置
      textStyle:{
        color:'white',//图例文字颜色
        fontSize:14
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'inside',
          color:'white'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '10岁以下',rate:'16%' },
          { value: 735, name: '新闻' },
          { value: 580, name: '直播' },
          { value: 484, name: '娱乐' },
          { value: 300, name: '财经' }
        ]
      }
    ],
    //调整图形图表的位置
    grid:{
      top:0,
      left:0,
      right:0,
      bottom:0
    }
  })
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background-color: rebeccapurple;
  background: url('../../../../assets/screen/images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;

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
    height: 260px;
  }
}
</style>