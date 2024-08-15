<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup lang="ts">
//接受父组件传递过来的参数
defineProps({
  //xlink:href属性值
  prefix: {
    type: String,
    default: '#icon-',
  },
  //父组件提供使用的图标名字
  name: String,
  //接受父组件传递颜色
  color: {
    type: String,
    default: '',
  },
  //接受父组件传递过来的图标的宽度
  width: {
    type: String,
    default: '16px',
  },
  //接收父组件传递过来的图标的高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>

<style scoped lang="scss"></style>
