//用户管理模块的接口
//引入二次封装的axios
import http from '../../../utils/http'
import {User} from './type'
//枚举用户管理模块接口地址
enum API {
  //获取全部已有用户的账号信息
  ALLUSER_URL='/admin/acl/user/',
  //新增用户信息接口
  ADDUSER_URL='/admin/acl/user/save',
  //修改管理用户接口
  UPDATEUSER_URL='/admin/acl/user/update',
  //获取全部的职位，以及当前账号拥有的职位接口
  ALLROLE_URl='/admin/acl/user/toAssign/',
  //给已有的用户分配角色接口
  SETROLE_URL='/admin/acl/user/doAssignRole',
  //删除某一个账号接口
  DELETEUSER_URL='/admin/acl/user/remove/',
  //批量删除的接口
  DELETEALLUSER_URL= '/admin/acl/user/batchRemove'
}
import type { AllRolesResponseData, SetRoleData, UserResponseData } from './type';
//获取全部已有用户的账号信息
export const reqAllUserInfo = (page:number,limit:number,userName:string)=>{
  console.log('page',page);
  console.log('limit',limit);
  console.log('userName',userName);
  return http.get<any,UserResponseData>(`${API.ALLUSER_URL}${page}/${limit}?username=${userName}`);
}
//新增用户与更新已有用户
export const reqAddUserOrUpdateUser = (user:User)=>{
  if(user.id){
    return http.put<any,any>(API.UPDATEUSER_URL,user);
  }else{
    return http.post<any,any>(API.ADDUSER_URL,user);
  }
}
//获取全部的职位，以及当前用户的职位
export const reqAllRoles = (userId:number)=>http.get<any,AllRolesResponseData>(`${API.ALLROLE_URl}${userId}`);
//给已有的用户分配角色接口
export const reqSetRole = (data:SetRoleData)=>http.post<any,any>(API.SETROLE_URL,data);
//删除某一个账号
export const reqDeleteUser = (id:number)=>http.delete<any,any>(`${API.DELETEUSER_URL}${id}`);
//批量删除接口
export const reqDeleteAllUser = (idList:number[])=>http.delete<any,any>(API.DELETEALLUSER_URL,{data:idList})