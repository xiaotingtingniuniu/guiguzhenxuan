<template>
  <div class="box">
    <div class="top">
      <p class="title">未来七天游客数量趋势图</p>
      <p class="bg"></p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
//获取dom元素
const charts = ref()
onMounted(() => {
  //初始化chart
  const myCharts = echarts.init(charts.value)
  //设置配置项
  myCharts.setOption({
    //标题组件
    title: {
      text: '(访问量)',
      top: 10,
      textStyle: {
        color: '#fff',
      },
    },
    //x|y轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      //x轴的分割线是否展示
      splitLine: {
        show: false,
      },
      //展示y轴轴线
      axisLine: {
        show: true,
      },
      //展示y轴轴线刻度
      axisTick: {
        show: true,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      //y轴的分割线是否展示
      splitLine: {
        show: false,
      },
      //展示y轴轴线
      axisLine: {
        show: true,
      },
      //展示y轴轴线刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 50,
      right: 10,
      bottom: 20,
    },
    series: [
      {
        type: 'line',
        data: [120, 1240, 99, 321, 890, 1200, 100],
        //平滑曲线设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'skyblue', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style scoped lang="scss">
.box {
  width: calc(100% - 40px);
  background-color: antiquewhite;
  height: 100%;
  background: url('../../../../assets/screen/images/dataScreen-main-cb.png')
    no-repeat;
  background-size: 100% 100%;
  margin: 0 20px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url('../../../../assets/screen/images/dataScreen-title.png')
        no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
  }

  .charts {
    width: 100%;
    height: calc(100% - 40px);
  }
}
</style>
