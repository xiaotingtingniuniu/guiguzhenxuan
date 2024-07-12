<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              autocomplete="off"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="default"
              class="login_btn"
              @click="login"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'
//引入用户小仓库
import useUserStore from '../../store/modules/user'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import getTime from '../../utils/time'
//获取路由器对象
const $router = useRouter()
const userStore = useUserStore()
//收集账号和密码
const loginForm = reactive({ username: 'admin', password: '111111' })
//定义变量控制登录按钮的loading
const loading = ref(false)
//自定义校验username的函数
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('账号长度至少五位'))
  }
}
//自定义校验password的函数
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 15) {
    callback()
  } else {
    callback(new Error('密码长度至少6位，最多15位'))
  }
}

//定义表单校验需要的规则
const rules = reactive({
  //required:代表这个字段务必要校验
  //min:文本长度至少多少位
  //max:文本长度最多多少位
  //message:错误的提示信息
  //trigger:触发校验表单的时机 change->文本发生变化触发校验，blur->失去焦点的时候触发校验

  username: [
    // { required: true, min: 5, max: 10, message: '账号长度至少五位', trigger: 'change' }
    //自定义规则
    { validator: validateUsername, trigger: 'change' },
  ],
  password: [
    // { required: true, min: 6, max: 15, message: '密码长度至少6位，最多15位', trigger: 'change' }
    { validator: validatePassword, trigger: 'change' },
  ],
})
//获取form表单对象
const loginForms = ref()
//点击登录按钮
const login = async () => {
  //保证全部表单相校验通过后再发出请求
  console.log('loginForms', loginForms.value.validate())
  await loginForms.value.validate()
  //打开按钮的loading
  loading.value = true
  //调用用户仓库的登录方法
  try {
    //保证登录成功
    await userStore.userLogin(loginForm)
    //跳转到首页
    $router.push('/home')
    //登录成功提示
    //获取message时间
    const message = getTime()
    ElNotification({
      type: 'success',
      title: `Hi,${message}好`,
      message: '欢迎回来',
    })
  } catch (error) {
    //登录失败的提示
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  } finally {
    //关闭按钮loading
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    width: 80%;
    position: relative;
    top: 30vh;
    background: url('../../assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      font-size: 40px;
      color: white;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
