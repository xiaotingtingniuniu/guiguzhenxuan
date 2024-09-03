<template>
  <div class="box">
    <div class="top">
      <p class="title">实时泳客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span class="number">99999</span>
        人
      </p>
    </div>
    <div class="people">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- echarts展示图形图表 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
//echarts插件
import * as echarts from 'echarts'
//水球图拓展插件
import 'echarts-liquidfill'
const people = ref<string>('21608人')
console.log('echarts', echarts)
//获取refDom节点
const charts = ref()
onMounted(() => {
  //获取echarts类的实例
  const myCharts = echarts.init(charts.value)
  console.log('myCharts', myCharts)
  myCharts.setOption({
    //标题组件
    title: {
      text: '水球图',
    },
    //x|y轴组件
    xAxis: {},
    yAxis: {},
    //系列：决定你展示什么样的图形图标
    series: {
      type: 'liquidFill', //系列
      data: [
        { name: '游客统计', value: 0.8 },
        { name: '鞋子', value: 0.5 },
      ], //展示的数据
      // lineStyle:{
      //   type:'dashed'//设置为虚线
      // },
      waveAnimation: true, //动画
      animationDuration: 3, //动画时间
      animationDurationUpdate: 0,
      radius: '90%', //半径
      // backgroundStyle:{
      //   borderWidth:1,
      //   color:'transparent'//水球内部背景色
      // },
      outline: {
        borderDistance: 10,
        itemStyle: {
          borderWidth: 4,
          borderColor: '#5acef2',
        },
      },
      color: [
        //波浪颜色
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: 'rgba(6,187,112,0.3)',
            },
            {
              offset: 0,
              color: 'rgba(11,201,199,0.3)',
            },
          ],
          globalCoord: false,
        },
        {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: 'rgba(6,187,112,1)',
            },
            {
              offset: 0,
              color: 'rgba(11,201,199,1)',
            },
          ],
          globalCoord: false,
        },
      ],
      label: {
        normal: {
          textStyle: {
            color: '#000',
          },
          formatter: '游客统计\n\n{c}',
          fontSize: 30,
        },
      },
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    outline: {
      show: true,
      borderDistance: 8,
      itemStyle: {
        color: 'none',
        borderColor: '#294D99',
        borderWidth: 8,
        shadowBlur: 20,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
      },
    },
  })
})
</script>

<style scoped lang="scss">
.box {
  background: url('../../../../assets/screen/images/dataScreen-main-lb.png')
    no-repeat;
  background-size: 100% 100%;

  .top {
    margin-left: 20px;
    color: white;
    font-size: 18px;

    .title {
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

    .right {
      float: right;

      .number {
        color: yellow;
      }
    }
  }

  .people {
    margin-top: 30px;
    display: flex;
    padding: 20px 20px;

    span {
      flex: 1;
      background: url('../../../../assets/screen/images/total.png') no-repeat;
      background-size: 100% 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #29fcff;
      font-size: 30px;
    }
  }

  .charts {
    width: 100%;
    height: 240px;
  }
}
</style>
