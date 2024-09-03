<template>
  <el-button size="small" icon="Refresh" circle @click="updateRefresh" />
  <el-button size="small" icon="FullScreen" circle @click="fullScreen" />
  <el-popover placement="bottom" title="主题设置" trigger="hover" :width="300">
    <template #reference>
      <el-button size="small" icon="Setting" circle />
    </template>
    <!-- 表单 -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="color"
          @change="setColor"
          show-alpha
          :predefine="predefineColors"
          size="small"
          :teleported="false"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          @change="changeDark"
          class="mt-2"
          style="margin-left: 24px"
          size="small"
          inline-prompt
          active-icon="Sunny"
          inactive-icon="Moon"
        />
      </el-form-item>
    </el-form>
  </el-popover>
  <img :src="userStore.avatar" alt="" class="head_sculpture" />
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userStore.userName }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
//获取layout的小仓库
import useLayOutSettingStore from '../../../store/modules/setting'
//获取用户小仓库
import useUserStore from '../../../store/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import Color from 'color'
//获取路由器对象
const $router = useRouter()
//获取路由对象
const $route = useRoute()
const layOutSettingStore = useLayOutSettingStore()
console.log('layOutSettingStore', layOutSettingStore)
const userStore = useUserStore()
//取色器
const color = ref<string>('')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
// 暗黑模式 收集开关的数据
const dark = ref<boolean>(true)
//点击刷新按钮
const updateRefresh = () => {
  layOutSettingStore.refresh = !layOutSettingStore.refresh
}
//点击全屏按钮
const fullScreen = () => {
  //此方法只适用于谷歌浏览器，如需兼容其他浏览器，可以使用插件
  //Dom对象的一个属性：可以用来判断当前是不是全屏模式【全屏：true，不是全屏：false】
  let full = document.fullscreenElement
  //切换为全屏模式
  if (!full) {
    //文档根节点的方法 requestFullscreen,实现全屏模式
    document.documentElement.requestFullscreen()
  } else {
    //退出全屏模式
    document.exitFullscreen()
  }
}
//退出登录
const logout = async () => {
  //第一步：需要向服务器发送请求【退出登录接口】
  //第二步：仓库当中关于用于相关的数据清空【token、username、avatar】
  //第三步：跳转到登录页面
  //清空数据
  await userStore.userLogout()
  //跳转到登录页面，并且从哪里来的，还可以回到哪里去
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
//switch开关状态发生变化时的回调函数(暗黑模式时的切换)
const changeDark = () => {
  const html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}
//取色器的颜色改变时的回调（主题颜色设置）
const setColor = (value: string) => {
  //通知js修改跟节点的样式对象的属性与属性值
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', value)
  html.style.setProperty('--el-color-primary-dark-2', value)
  for (let i = 1; i < 10; i++) {
    html.style.setProperty(
      `--el-color-primary-light-${i}`,
      Color(value).alpha(`${(1 - i * 0.1).toFixed(1)}`),
    )
  }
}
</script>
<script lang="ts">
export default {
  name: 'Setting',
}
</script>

<style scoped lang="scss">
.head_sculpture {
  width: 24px;
  height: 24px;
  margin-left: 10px;
  border-radius: 50%;
}
</style>
