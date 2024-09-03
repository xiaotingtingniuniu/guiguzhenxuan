<template>
  <div class="box">
    <div class="top">
      <p class="title">男女比例</p>
      <p class="bg"></p>
    </div>
    <div class="bottom">
      <div class="male">
        <img src="../../../../assets/screen/images/man.png" alt="">
      </div>
      <div class="female">
        <img src="../../../../assets/screen/images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <div class="box-rate">
        <p>男士58%</p>
        <p>女士42%</p>
      </div>
    </div>
    <div class="charts" ref="charts">

    </div>
  </div>
</template>

<script setup lang='ts'>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'
//获取charts的Dom节点
const charts = ref();
onMounted(() => {
  //初始化echats实例
  const myCharts = echarts.init(charts.value);
  //设置配置项
  myCharts.setOption({
    //标题
    title: {
      text: '男女比例',//主标题
      textStyle: {//主标题的颜色
        color: 'skyblue'
      },
      left: '35%',
    },
    xAxis:{
      // type: 'category'//在x轴上均匀分布
      show:false,
      min:0,//x轴最小值为0
      max:100//x轴最大值为100
    },
    yAxis: {
      show:false,
      type: 'category'//在y轴上均匀分布
    },
    series: [
      {
        type: 'bar',
        data: [58],//男士占58%
        barWidth:20,
        z:100,//男士层级 让男士在上面
        itemStyle:{
          color:'blue',
          borderRadius:20
        }
      },
      {
        type: 'bar',
        data: [100],//女士占100-58=42%
        barWidth:20,//bar的宽度
        //调整女士柱条位置
        barGap:'-100%',
        itemStyle:{
          color:'pink',
          borderRadius:20
        },
        z:1//让女士在下面
      }
    ],
    //调整图形图表位置
    grid:{
      top:0,
      left:0,
      right:0,
      bottom:0
    }
  })
})


</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  background: url('../../../../assets/screen/images/dataScreen-main-cb.png') no-repeat;
  background-size: 100% 100%;
  margin: 20px 0;

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

  .bottom {
    display: flex;
    justify-content: center;

    .male {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url('../../../../assets/screen/images/man-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .female {
      margin: 20px;
      width: 111px;
      height: 115px;
      background: url('../../../../assets/screen/images/woman-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .rate {
    display: flex;
    justify-content: center;

    .box-rate {
      width: 300px;
      height: 30px;
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

  }

  .charts {
    width: 300px;
    height: 100px;
    margin: 0 auto;
  }
}
</style>