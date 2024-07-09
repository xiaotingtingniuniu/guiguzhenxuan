<template>
  <div class="box">
    <h1>App根组件</h1>
    <h2>我的</h2>
    <el-button type="primary" :icon="Edit" />
    <i class="iconfont icon-settings"></i>
    <Test></Test>
  </div>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import './style/icon.scss'
import { login, userInfor } from '@/api/user/index.ts'
import { onMounted } from 'vue'
const data = {
  username: 'admin',
  password: '111111',
}
onMounted(() => {
  //登录接口
  getLogin()
})
//登录
const getLogin = async () => {
  const result = await login(data)
  console.log('result', result)
  const { token } = result.data
  console.log('token', token)
  localStorage.setItem('token', token)
  getUserInfor()
}
//获取用户信息
const getUserInfor = async () => {
  const result = await userInfor()
  console.log('result', result)
}
</script>

<style scoped lang="scss">
.box {
  color: $color;
}
</style>
