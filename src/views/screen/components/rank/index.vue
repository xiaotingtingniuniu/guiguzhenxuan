<template>
  <div class="box">
    <div class="top">
      <p class="title">热门景区排行</p>
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
//获取dom节点
const charts = ref();
onMounted(() => {
  //初始化
  const myCharts = echarts.init(charts.value);
  //设置配置项
  myCharts.setOption({
    title: {
      //主标题
      text: '景区排行',
      //标题位置
      left: '50%',
      //主标题文字样式
      textStyle: {
        color: 'yellowgreen',
        fontSize: 20
      },
      //子标题
      subtext: '各大景区排行',
      //子标题样式
      subtextStyle: {
        color: 'yellowgreen',
        fontSize: 16
      },
    },
    // x|y轴组件
    xAxis: {
      type: 'category'//图形图表在x轴上均匀分布
    },
    yAxis: {

    },
    //布局组件
    grid: {
      left: 20,
      right: 20,
      top: 60,
      bottom: 20
    },
    //系列：决定显示图形图表是哪一种的
    series: [
      {
        type: 'bar',
        data: [10, 20, 30, 40, 50, 60, 80],
        //柱状图的 图形上的文本标签
        label: {
          show: true,
          //文字的位置
          position: 'insideTop',
          //文字的颜色
          color: 'yellowgreen'
        },
        //是否显示柱条的背景色
        showBackground: true,
        //每一个柱条的背景样式
        backgroundStyle: {
          //背景颜色
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#fff' // 0% 处的颜色
            }, {
              offset: 1, color: '#ccc' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        //柱条的样式
        itemStyle:{
          //柱条圆角
          borderRadius:[10,10,0,0],
          //柱条颜色
          color:function(data:any){
            //给每一个柱条不一样的背景颜色
            let arr = ['red','orange','yellowgreen','green','purple','hotpink','skyblue']
            return arr[data.dataIndex]
          }
        }
      },
      {
        type:'line',
        data:[10,20,30,50,70,10,90],
        smooth:true //平滑曲线
      }
    ],
    tooltip:{
      show:true
    }
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
    height: calc(100% - 30px);
  }
}
</style>