<template>
  <div>
    <el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
const currentPage4 = ref(4)
const pageSize4 = ref(100)
</script>

<style scoped lang="scss"></style>
