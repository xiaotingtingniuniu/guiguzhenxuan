<template>
  <div class="container">
    <!-- 数据大屏展示内容区域 -->
    <div class="screen" ref="screen">
      <Top></Top>
      <div class="bottom">
        <div class="left">
          <!-- 游客组件 -->
          <Tourist class="tourist"></Tourist>
          <!-- 性别组件 -->
          <Sex class="sex"></Sex>
          <!-- 年龄组件 -->
          <Age class="age"></Age>
        </div>
        <div class="center">
          <!-- 地图组件 -->
           <Map class="map"></Map>
          <!-- 折线组件 -->
           <Line class="line"></Line>
        </div>
        <div class="right">
          <!-- 排行榜组件 -->
          <Rank class="rank"></Rank>
          <!-- 年度组件 -->
          <Year class="year"></Year>
          <!-- 渠道组件 -->
          <Couter class="couter"></Couter>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
//引入顶部子组件
import Top from './components/top/index.vue'
//引入左侧三个子组件
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
//引入中间两个子组件
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
//引入右侧三个子组件
import Rank from './components/rank/index.vue'
import Year from './components/year/index.vue'
import Couter from './components/couter/index.vue'
//获取数据大屏展示内容盒子的DOM元素
const screen = ref();
onMounted(()=>{
  screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`
});
//定义大屏锁房的比例函数
const getScale = (w:number=1920,h:number=1080)=>{
  const ww = window.innerWidth/w;
  const wh = window.innerHeight/h;
  return ww<wh?ww:wh
}
//监听视口变化
window.onresize=()=>{
  screen.value.style.transform=`scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style scoped lang="scss">
//vw|vh是css3 中新增的单位 -》兼容到ie8
.container {
  width: 100vw; //视口宽度
  height: 100vh; //视口高度
  background: url('../../assets/screen/images/bg.png') no-repeat;
  background-size:cover ;
  .screen{
    width: 1920px;
    height: 1080px;
    position: fixed;
    transform-origin: left top;
    left:50%;
    top:50%;
    .bottom{
      display: flex;
      .left{
        flex:1;
        height: 1040px;
        display:flex;
        flex-direction: column;
        .tourist{
          flex:1.2;
          margin-top:10px;
        }
        .sex{
          flex:1;
        }
        .age{
          flex:1;
        }
      }
      .right{
        flex:1;
        display: flex;
        flex-direction: column;
        .rank{
          flex:1.5
        }
        .year{
          flex:1
        }
        .couter{
          flex:1;
        }
      }
      .center{
        flex:1.8;
        display: flex;
        flex-direction: column;
        .map{
          flex:4;
        }
        .line{
          flex:1;
        }
      }
    }
  }
}
</style>
