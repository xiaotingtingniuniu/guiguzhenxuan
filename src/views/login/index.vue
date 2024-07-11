<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item>
            <el-input :prefix-icon="User" v-model="loginForm.username" />
          </el-form-item>
          <el-form-item>
            <el-input type="password" autocomplete="off" :prefix-icon="Lock" v-model="loginForm.password"
              show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="default" class="login_btn" @click="login" :loading="loading">
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
import { useRouter } from 'vue-router';
import { ref } from 'vue'
import  getTime  from '../../utils/time';
//获取路由器对象
const $router = useRouter();
const userStore = useUserStore();
//收集账号和密码
const loginForm = reactive({ username: 'admin', password: '111111' })
//定义变量控制登录按钮的loading
const loading = ref(false);
//点击登录按钮
const login = async () => {
  //打开按钮的loading
  loading.value = true;
  //调用用户仓库的登录方法
  try {
    //保证登录成功
    await userStore.userLogin(loginForm);
    //跳转到首页
    $router.push('/home');
    //登录成功提示
    //获取message时间
    const message = getTime();
    ElNotification({
      type: 'success',
      title: `Hi,${message}好`,
      message: '欢迎回来'
    })
  } catch (error) {
    //登录失败的提示
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
  } finally {
    //关闭按钮loading
    loading.value = false;
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
