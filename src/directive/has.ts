import pinia from '../store'
import useUserStore from "../store/modules/user";
const userStore = useUserStore(pinia);
export const isHasButton = (app:any)=>{
  //全局自定义指令：实现按钮的权限
  app.directive('has',{
    //使用这个全局自定义指令的Dom｜组件挂在完毕的时候会执行一次
    mounted(el:any,options:any){
      console.log('app',app);
      console.log('options',options);
      //自定义指令右侧的数值：如果在用户信息buttons数组当中没有
      if(!userStore.buttons.includes(options.value)){
        //从Dom树中 删掉该节点
        el.parentNode.removeChild(el);
      }
    },
  })
}