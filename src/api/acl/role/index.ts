//角色模块的接口
//引入二次封装的axios
import http from '../../../utils/http'
import { GetAllRoleResponseData, GetPermissionResponseData, Role } from './type';
// 枚举接口
enum API {
    //获取角色分页列表
    GETALLROLE_URL = '/admin/acl/role/',
    //新增职位角色接口
    SAVEROLE_URL = '/admin/acl/role/save',
    //修改职位角色接口
    UPDATEROLE_URL = '/admin/acl/role/update',
    //根据角色获取菜单接口（获取全部菜单与按钮的数据）
    ALLPERMISSION_URL = '/admin/acl/permission/toAssign/',
    //给角色分配权限接口
    SETPERMISSION_URL = '/admin/acl/permission/doAssign',
    //删除已有职位
    DELETEROLE_URL = '/admin/acl/role/remove/'
}
//获取角色分页列表
export const reqGetALLRole = (page:number,limit:number,roleName:string) =>http.get<any,GetAllRoleResponseData>(`${API.GETALLROLE_URL}${page}/${limit}?roleName=${roleName}`);
//新增职位角色或者修改职位角色
export const reqSaveOrUpdateRole = (data:Role) =>{
    if(data.id){
        //有id表示是修改职位角色
        return http.put<any,any>(API.UPDATEROLE_URL,data);
    }else{
        //没有id表示新增职位角色
        return http.post<any,any>(API.SAVEROLE_URL,data);
    }
}
//根据角色获取菜单（获取全部菜单与按钮的数据）
export const reqAllPermission = (roleId:number)=>http.get<any,GetPermissionResponseData>(`${API.ALLPERMISSION_URL}${roleId}`)
//给角色分配权限
export const reqSetPermission = (roleId:number,permissionId:number[])=>http.post<any,any>(`${API.SETPERMISSION_URL}?roleId=${roleId}&permissionId=${permissionId}`);
//删除已有职位角色
export const reqDeleteRole = (id:number)=>http.delete<any,any>(`${API.DELETEROLE_URL}${id}`);