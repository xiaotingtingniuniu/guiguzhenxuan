<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <!-- option:label即为显示文字 value属性即为select下拉菜单收集的数据 -->
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.category1Id"
          @change="selectChange1"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            :label="item.name"
            v-for="item in categoryStore.category1Data"
            :key="item.id"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.category2Id"
          @change="selectChange2"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            :label="item.name"
            v-for="item in categoryStore.category2Data"
            :key="item.id"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          placeholder="请选择"
          style="width: 240px"
          v-model="categoryStore.category3Id"
          @change="selectChange3"
          :disabled="scene == 0 ? false : true"
        >
          <el-option
            :label="item.name"
            v-for="item in categoryStore.category3Data"
            :key="item.id"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
//引入分类小仓库
import useCategoryStore from '../../store/modules/category.ts'
//接收父组件传值
const sceneProps = defineProps(['scene'])
console.log('sceneProps', sceneProps)
const categoryStore = useCategoryStore()
console.log('categoryStore', categoryStore)
onMounted(() => {
  //获取一级分类
  getCategory1()
})
//获取一级分类
const getCategory1 = () => {
  //通知分类小仓库获取一级分类的数据
  categoryStore.getCategory1()
}
//一级分类选中时的回调
const selectChange1 = () => {
  //清空二级三级数据
  categoryStore.category3Data = []
  categoryStore.category2Id = ''
  categoryStore.category3Id = ''
  //获取二级分类
  getCategory2()
}
//获取二级分类
const getCategory2 = () => {
  //通知分类小仓库获取二级分类的数据
  categoryStore.getCategory2()
}
//二级分类选中时的回调
const selectChange2 = () => {
  //清空三级数据
  categoryStore.category3Id = ''
  getCategory3()
}
//获取三级分类
const getCategory3 = () => {
  //通知分类小仓库获取三级分类的数据
  categoryStore.getCategory3()
}
//三级分类选中时的回调
const selectChange3 = (value: number | string) => {
  //将三级分类选中的id存入到分类小仓库中
  categoryStore.category3Id = value
}
</script>

<style scoped lang="scss"></style>
