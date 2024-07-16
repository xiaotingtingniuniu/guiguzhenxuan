//小仓库：设置layout组件相关配置的仓库
import { defineStore } from 'pinia'
const useLayOutSettingStore = defineStore('setting', {
  state: () => {
    return {
      menuOpenTag: false, //菜单是否水平折叠收起菜单 true为收起 false为打开
      refresh: false, //仓库这个属性用于控制刷新
    }
  },
  actions: {},
  getters: {},
})
export default useLayOutSettingStore
