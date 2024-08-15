// 菜单管理模块的接口
// 引入二次封装的axios
import http from "../../../utils/http";
import { GetAllRloeResponseData, MenuParams } from "./type";
//枚举地址
enum API {
  //获取全部菜单与按钮的数据接口
  ALLPERMISSION_URL = '/admin/acl/permission',
  //新增菜单
  ADDMENU_URL = '/admin/acl/permission/save',
  //修改已有菜单
  UPDATEMENU_URL= '/admin/acl/permission/update',
  //删除已有菜单
  DELETEMENU_URL= '/admin/acl/permission/remove/'
}
//获取所有的菜单
export const reqAllPermission = ()=>http.get<any,GetAllRloeResponseData>(API.ALLPERMISSION_URL);
//新增|修改菜单
export const reqAddOrUpdateMenu = (permission:MenuParams)=>{
  if(permission.id){
    //有id表示是修改菜单
    return http.put<any,any>(API.UPDATEMENU_URL,permission);
  }else{
    //没有id表示是新增菜单
    return http.post<any,any>(API.ADDMENU_URL,permission);
  }
}
//删除已有菜单
export const reqDeleteMenu = (id:number)=> http.delete<any,any>(`${API.DELETEMENU_URL}${id}`);
