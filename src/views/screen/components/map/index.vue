<template>
  <div class="box" ref="map">

  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'
//引入中国地图的json
import chinaJson from './china.json'
//获取Dom
const map = ref();
//注册地图
echarts.registerMap('china', chinaJson as any);
onMounted(() => {
  //初始化echarts
  const myCharts = echarts.init(map.value);
  //设置echarts的配置项
  myCharts.setOption({
    //地图组件
    geo: {
      map: 'china',//中国地图
      roam: true,//鼠标缩放
      //地图位置调试
      top: 100,
      bottom: 0,
      left: 100,
      right: 100,
      //地图上的文字设置
      label: {
        show: true,//显示地图上的文字
        color: 'white',
        fontSize: 14
      },
      //地图区域的多边形，图形样式
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0, color: '#58e3e5' // 0% 处的颜色
          }, {
            offset: 1, color: '#0e2cc8' // 100% 处的颜色
          }],
          global: false // 缺省为 false
        },
        opacity: 1
      },
      //地图高亮时多边形和标签的样式设置
      emphasis: {
        itemStyle: {
          color: 'yellow'
        },
        label: {
          fontSize: 18
        }
      }
    },
    //布局位置
    // grid: {
    //   left: 100,
    //   top: 100,
    //   right: 100,
    //   bottom: 100
    // },
    series: [
      {
        type: 'lines',//航线系列
        data: [
          {
            coords: [
              [
                116.405285,
                39.904989
              ],//终点 北京
              [
                113.280637,
                23.125178
              ]//起点 广东省
            ],
            // 统一的样式设置
            lineStyle: {
              color: "red",
              type: 'solid',
              width: 3
            }
          },
          {
            coords: [
              [
                117.190182,
                39.125596
              ],//终点 天津
              [
                113.280637,
                23.125178
              ]//起点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "red",
              type: 'solid',
              width: 3
            }
          }
        ],
        //开启线的特效
        effect: {
          show: true,
          symbol: "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z",
          symbolSize: 20,
          color: 'white'
        }
      }
    ]
  })
})
</script>

<style scoped lang="scss"></style>