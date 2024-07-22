<template>
  <!-- 三级分类全局组件 -->
  <Category></Category>
  <el-card style="margin: 20px 0">
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      :disabled="!categoryStore.category3Id"
    >
      添加属性
    </el-button>
    <el-table :data="tableData" style="width: 100%" :border="true">
      <el-table-column
        prop="number"
        label="序号"
        width="80"
        type="index"
        align="center"
      />
      <el-table-column prop="attributeName" label="属性名称" width="120" />
      <el-table-column prop="属性值名称" label="属性值名称" />
      <el-table-column prop="属性值名称" label="操作" width="120" />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
//引入分类小仓库
import useCategoryStore from '../../../store/modules/category.ts'
const categoryStore = useCategoryStore()
</script>

<style scoped lang="scss"></style>
