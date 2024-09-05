<template>
  <el-card>
    <el-form inline class="form">
      <el-form-item label="职位搜索">
        <el-input
          placeholder="请输入搜索职位关键字"
          v-model="searchRoleName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="search"
          :disabled="searchRoleName ? false : true"
        >
          搜索
        </el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card class="card-table">
    <el-button icon="Plus" type="primary" class="plus" @click="addRole">
      添加职位
    </el-button>
    <el-table :data="roleArr" border>
      <el-table-column label="#" type="index" align="center"></el-table-column>
      <el-table-column label="id" prop="id" align="center"></el-table-column>
      <el-table-column
        label="职位名称"
        prop="roleName"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template #="{ row }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="setPermissions(row)"
          >
            分配权限
          </el-button>
          <el-button type="primary" size="small" icon="Edit" @click="edit(row)">
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定删除'${row.roleName}'吗？`"
            @confirm="deleteRole(row.id)"
            width="180"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      class="pagination"
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      size="small"
      layout="prev, pager, next, jumper, -> ,total, sizes,"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
  <!-- dialog组件 -->
  <el-dialog
    v-model="dialogVisible"
    :title="`${roleParams.id ? '更新职位' : '添加职位'}`"
    width="500"
  >
    <el-form :model="roleParams" :rules="rules" ref="formRef">
      <el-form-item inline label="角色名称" prop="roleName">
        <el-input
          placeholder="请填写角色名称"
          v-model="roleParams.roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 抽屉组件 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree
        style="max-width: 600px"
        ref="tree"
        :data="menuAndButtonList"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawer = false">取消</el-button>
        <el-button type="primary" @click="drawerConfirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from 'vue'
import {
  reqAllPermission,
  reqDeleteRole,
  reqGetALLRole,
  reqSaveOrUpdateRole,
  reqSetPermission,
} from '../../../api/acl/role'
import {
  GetAllRoleResponseData,
  GetPermissionResponseData,
  MenuOrButtonList,
  Role,
} from '../../../api/acl/role/type'
//引入layout小仓库
import useLayOutSettingStore from '../../../store/modules/setting'
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'
//当前页码
const pageNo = ref<number>(1)
//每页展示的条数
const pageSize = ref<number>(10)
//存储获取到的职位角色数组
const roleArr = ref<Role[]>([])
//获取所有的数据条数
const total = ref<number>(0)
//存储搜索角色
const searchRoleName = ref<string>('')
// 存储新增或修改岗位数据
const roleParams = reactive<Role>({
  id: 0,
  roleName: '',
})
//获取useLayOutSettingStore仓库
const layoutSettingStore = useLayOutSettingStore()
//存储dialog的状态
const dialogVisible = ref<boolean>(false)
//获取dialog form组件
const formRef = ref<any>()
//存储抽屉组件的控制数据
const drawer = ref<boolean>(false)
//存储所有的菜单和按钮的数据
const menuAndButtonList = reactive<MenuOrButtonList>([])
const defaultProps = {
  children: 'children',
  label: 'name',
}
//存储默认选中的选项
const defaultCheckedKeys = ref<(number | undefined)[]>([])
//获取树组件
const tree = ref<any>()
onMounted(() => {
  //调用获取所有职位角色接口
  getRole()
})
//获取所有职位角色接口
const getRole = async (paper = 1) => {
  pageNo.value = paper
  const result: GetAllRoleResponseData = await reqGetALLRole(
    pageNo.value,
    pageSize.value,
    searchRoleName.value,
  )
  console.log('result', result)
  if (result.code == 200) {
    //给职位角色数组赋值
    roleArr.value = result.data.records
    //给所有的数据条数赋值
    total.value = result.data.total
  }
}
//搜索按钮
const search = () => {
  //重新获取所有职位角色
  getRole()
}
//重置按钮
const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//分页器每页展示的条数改变时
const handleSizeChange = () => {
  //重新获取所有职位角色
  getRole()
}
//分页器当前页改变时
const handleCurrentChange = (val: number) => {
  console.log('val', val)
  pageNo.value = val
  //重新获取所有职位角色
  getRole(pageNo.value)
}
//添加职位按钮
const addRole = () => {
  //将对话框展示出来
  dialogVisible.value = true
  //清空输入框内的数据
  Object.assign(roleParams, {
    id: 0,
    roleName: '',
  })
  //清理掉校验信息
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
//编辑按钮
const edit = (row: Role) => {
  //将对话框展示出来
  dialogVisible.value = true
  //清理掉校验信息
  nextTick(() => {
    formRef.value.clearValidate()
  })
  Object.assign(roleParams, row)
}
//对话框确定按钮（添加或者修改角色）
const confirm = async () => {
  await formRef.value.validate()
  //调用新增或修改职位角色接口
  saveOrUpdateRole()
}
//调用新增职位角色接口
const saveOrUpdateRole = async () => {
  const result: any = await reqSaveOrUpdateRole(roleParams)
  //关闭对话框
  dialogVisible.value = false
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: `${roleParams.id ? '修改职位成功' : '添加职位成功'}`,
    })
    //重新获取所有职位角色
    getRole(roleParams.id ? pageNo.value : 1)
  } else {
    ElMessage({
      type: 'error',
      message: `${roleParams.id ? '修改职位失败' : '添加职位失败'}`,
    })
  }
}
//自定义校验规则的回调
const validateRoleName = (rule: any, value: any, callback: any) => {
  console.log('rule',rule);
  console.log('value', value)
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('职位名称至少两位'))
  }
}
// 职位校验规则
const rules = reactive<FormRules<typeof roleParams>>({
  roleName: [{ validator: validateRoleName, trigger: 'blur', required: true }],
})
//分配权限按钮
const setPermissions = (row: Role) => {
  //显示抽屉
  drawer.value = true
  //存储角色数据
  roleParams.id = row.id
  //根据角色获取菜单
  getPermission(row.id as number)
}
const getPermission = async (id: number) => {
  const result: GetPermissionResponseData = await reqAllPermission(id)
  if (result.code == 200) {
    //存储所有的菜单和按钮的数据
    Object.assign(menuAndButtonList, result.data)
    //过滤数组
    defaultCheckedKeys.value = filterSelectArr(menuAndButtonList, [])
  }
}
//递归函数过滤数组
const filterSelectArr = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectArr(item.children, initArr)
    }
  })
  return initArr
}

//抽屉的确定按钮
const drawerConfirm = () => {
  const roleId = roleParams.id
  //选中的角色id数组
  const arr = tree.value.getCheckedKeys()
  //半选中的角色id数组
  const arrHalf = tree.value.getHalfCheckedKeys()
  const permissionId = arr.concat(arrHalf)
  //调用给角色分配权限接口
  setPermissionUrl(roleId as number, permissionId)
}
//调用给角色分配权限接口
const setPermissionUrl = async (roleId: number, permissionId: number[]) => {
  const result: any = await reqSetPermission(roleId, permissionId)
  if (result.code == 200) {
    //提示分配权限成功
    ElMessage({
      type: 'success',
      message: '分配权限成功',
    })
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '分配权限失败',
    })
  }
  //关闭抽屉
  drawer.value = false
}
//删除按钮
const deleteRole = async (roleId: number) => {
  const result: any = await reqDeleteRole(roleId)
  if (result.code == 200) {
    //提示删除角色成功
    ElMessage({
      type: 'success',
      message: '删除角色成功',
    })
    //重新获取所有职位角色
    getRole(roleArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除角色失败',
    })
  }
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .el-form-item {
    margin-bottom: 0;
  }
}

.card-table {
  margin-top: 20px;

  .plus {
    margin-bottom: 20px;
  }

  .pagination {
    margin-top: 20px;
  }
}
</style>
