<template>
  <div>
    <el-card class="top">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名：">
          <el-input
            placeholder="请你输入搜索用户名字"
            v-model="searchUserName"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            @click="seach"
            :disabled="searchUserName ? false : true"
          >
            搜索
          </el-button>
          <el-button type="primary" size="default" @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="bottom">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button
        type="primary"
        size="default"
        @click="deleteAllUser"
        :disabled="idList.length > 0 ? false : true"
      >
        批量删除
      </el-button>
      <!-- table 展示用户信息 -->
      <el-table
        class="table"
        :data="userArr"
        border
        style="width: 100%"
        @selection-change="selectChange"
      >
        <el-table-column type="selection" width="38" align="center" />
        <el-table-column
          label="#"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用户名字"
          align="center"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          align="center"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="setRole(row)"
            >
              分配角色
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateUser(row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              :title="`确定删除账户'${row.username}'吗?`"
              @confirm="deleteUser(row.id)"
              width="260px"
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
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 7, 9, 11]"
        size="small"
        layout="prev, pager, next,jumper, ->, sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 抽屉结构：完成添加新的用户账号｜更新已有的账号信息 -->
    <el-drawer v-model="drawer">
      <!-- 抽屉头部标题 -->
      <template #header>
        <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
      </template>
      <!-- 抽屉身体部分 -->
      <template #default>
        <div>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                placeholder="请输入用户名字"
                v-model="userParams.username"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input
                placeholder="请输入用户昵称"
                v-model="userParams.name"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户密码"
              prop="password"
              v-if="!userParams.id"
            >
              <el-input
                placeholder="请输入用户密码"
                v-model="userParams.password"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 抽屉结构：完成分配角色（用户某一个已有的账号进行职位分配） -->
    <el-drawer v-model="drawer1">
      <!-- 抽屉头部标题 -->
      <template #header>
        <h4>分配角色用户</h4>
      </template>
      <!-- 抽屉身体部分 -->
      <template #default>
        <div>
          <el-form :model="userParams" ref="formRef1">
            <el-form-item label="用户姓名" prop="username">
              <el-input
                placeholder="请输入用户名字"
                v-model="userParams.username"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="角色列表" prop="">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                v-model="userRoles"
                @change="handleCheckedCitiesChange"
              >
                <el-checkbox
                  v-for="(role, index) in allRoles"
                  :key="index"
                  :label="role"
                  :value="role"
                >
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancel1">取消</el-button>
          <el-button type="primary" @click="save1">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from 'vue'
import {
  reqAddUserOrUpdateUser,
  reqAllRoles,
  reqAllUserInfo,
  reqDeleteAllUser,
  reqDeleteUser,
  reqSetRole,
} from '../../../api/acl/user'
import {
  AllRolesResponseData,
  Records,
  RoleArr,
  SetRoleData,
  User,
  UserResponseData,
} from '../../../api/acl/user/type'
import { ElMessage } from 'element-plus'
import useLayOutSettingStore from '../../../store/modules/setting'
//存储全部的用户数组
const userArr = ref<Records>([])
//默认页码
const pageNo = ref<number>(1)
//一页展示几条数据
const pageSize = ref<number>(5)
//用户总个数
const total = ref<number>(0)
//控制抽屉组件是否显示
const drawer = ref<boolean>(false)
//控制抽屉组件是否显示
const drawer1 = ref<boolean>(false)
//收集用户信息的响应式对象
const userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
//获取form组件实例
const formRef = ref<any>()
/*Elment-plus 的复选框checkbox的设置 */
//是否全选 checkAll
const checkAll = ref<boolean>(false)
//设置复选框不确定的样式
const isIndeterminate = ref<boolean>(true)
//当前账号的职位
const userRoles = ref<RoleArr>([])
//全部账号的职位
const allRoles = ref<RoleArr>([])
//存储table选中项的id
const idList = ref<number[]>([])
//存储搜索的用户名字
const searchUserName = ref<string>('')
//获取useLayOutSettingStore仓库
let settingStore = useLayOutSettingStore()
//顶部全部复选框的change事件
const handleCheckAllChange = (val: boolean) => {
  console.log('val------', val)
  // val：true（全选）false（没有全选）
  userRoles.value = val ? allRoles.value : []
  //不确定的样式
  isIndeterminate.value = false
}
//底部全部复选框的change事件
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRoles.value.length
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length
}
onMounted(() => {
  //获取全部用户信息
  getAllUserInfo()
})
//获取全部用户信息
const getAllUserInfo = async (pager = 1) => {
  pageNo.value = pager
  const result: UserResponseData = await reqAllUserInfo(
    pageNo.value,
    pageSize.value,
    searchUserName.value,
  )
  if (result.code == 200) {
    userArr.value = result.data.records
    total.value = result.data.total
  }
}
//修改当前页码
const handleCurrentChange = (currentRow: number) => {
  console.log('currentRow', currentRow)
  //再次获取全部用户信息
  getAllUserInfo(currentRow)
}
//修改当前展示条数
const handleSizeChange = (currentRow: number) => {
  console.log('currentRow', currentRow)
  //再次获取全部用户信息
  getAllUserInfo(currentRow)
}
//点击添加用户按钮
const addUser = () => {
  //显示抽屉组件
  drawer.value = true
  //清空用户数据
  Object.assign(userParams, {
    username: '',
    name: '',
    password: '',
    id: null,
    createTime: '',
    updateTime: '',
  })
  //清空表单校验(clearValidate是Element-plus的form表单清空校验方法)
  //nextTick 在下次 DOM 更新循环结束之后执行延迟回调
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
//点击编辑按钮
const updateUser = (row: User) => {
  drawer.value = true
  console.log('row', row)
  //将编辑时选中的数据row与userParams合并
  Object.assign(userParams, row)
  //清空表单校验
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
//点击抽屉的确定按钮
const save = async () => {
  //点击保存按钮时先进行表单校验
  //formRef.value.validate()返回的是一个promise await 只在返回fulfilled时，才能继续向下执行代码
  await formRef.value.validate()
  //新增｜更新管理用户接口
  addOrUpdateUser()
}
//新增｜更新管理用户接口
const addOrUpdateUser = async () => {
  const result: any = await reqAddUserOrUpdateUser(userParams)
  console.log('result', result)
  if (result.code === 200) {
    //关闭抽屉
    drawer.value = false
    //提示添加成功或者更新成功
    ElMessage({
      type: 'success',
      message: userParams.id ? '更新成功' : '添加成功',
    })
    // 重新获取全部用户信息（如果是有id代表是更新数据则还在当前页，如果是没有id表明是新增数据则跳转到第一页）
    // getAllUserInfo(userParams.id?pageNo.value:1);
    //如果修改的是当前的账号则 让浏览器刷新一遍
    // if(userParams.name===useUserStore().userName){
    //   window.location.reload();
    // }
    window.location.reload()
  } else {
    //关闭抽屉
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
//点击抽屉的取消按钮
const cancel = () => {
  //关闭抽屉
  drawer.value = false
}

//校验用户名字的回调函数
const validatorUsername = (rule: any, value: any, callback: any) => {
  console.log('rule',rule);
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户名字至少五位'))
  }
}
//校验用户昵称的回调函数
const validatorName = (rule: any, value: any, callback: any) => {
  console.log('rule',rule);
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error('用户昵称至少五位'))
  }
}
//校验密码的回调函数
const validatorPassword = (rule: any, value: any, callback: any) => {
  console.log('rule',rule);
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error('用户密码至少6位'))
  }
}
//表单校验的规则对象
const rules = {
  //用户名字
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  //用户昵称
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  //密码
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
//分配角色按钮点击
const setRole = (row: User) => {
  //合并用户数据
  Object.assign(userParams, row)
  //获取全部职位(角色)与当前用户的职位
  getAllRoles(userParams.id as number) //() as xxx 断言是xxx类型
}
//获取全部职位(角色)
const getAllRoles = async (userId: number) => {
  const result: AllRolesResponseData = await reqAllRoles(userId)
  if (result.code == 200) {
    //存储全部的职位
    allRoles.value = result.data.allRolesList
    //存储当前账号的职位
    userRoles.value = result.data.assignRoles
    //显示抽屉
    drawer1.value = true
  }
}
//给已有的用户分配角色(分配职位的确定按钮)
const save1 = () => {
  console.log('xxxxx', userRoles.value.length)
  if (userRoles.value.length > 0) {
    //分配置为接口调用
    setRoleUrl()
  } else {
    //提示没有分配任何角色
    ElMessage({
      type: 'error',
      message: '没有分配任何角色',
    })
    drawer1.value = false
  }
}
//分配职位接口调用
const setRoleUrl = async () => {
  //分配的职位的id数组
  const roleIdList: (number | undefined)[] = userRoles.value.map((item) => {
    return item.id
  })
  //分配职位携带参数
  const data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: roleIdList,
  }
  const result: any = await reqSetRole(data)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '分配角色成功',
    })
    //关闭抽屉
    drawer1.value = false
    //再次获取全部用户信息，并留在当前页
    getAllUserInfo(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: '分配角色失败',
    })
  }
}
//分配角色 取消按钮
const cancel1 = () => {
  //关闭抽屉
  drawer1.value = false
}
//调用删除一个用户的接口
const deleteUser = async (id: number) => {
  const result: any = await reqDeleteUser(id)
  if (result.code == 200) {
    //提示删除账户成功
    ElMessage({
      type: 'success',
      message: '删除账户成功',
    })
    //再次获取全部用户信息
    getAllUserInfo(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    //提示删除账户失败
    ElMessage({
      type: 'error',
      message: '删除账户失败',
    })
  }
}
//table选中项改变时
const selectChange = (newSelection: any[]) => {
  idList.value = newSelection.map((item) => {
    return item.id
  })
  console.log('idList', idList.value)
}
//删除所有账户事件
const deleteAllUser = async () => {
  const result: any = await reqDeleteAllUser(idList.value)
  if (result.code == 200) {
    //提示删除账户成功
    ElMessage({
      type: 'success',
      message: '批量删除账户成功',
    })
    //再次获取全部用户信息
    getAllUserInfo(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '批量删除账户失败',
    })
  }
}
//搜索按钮
const seach = async () => {
  //获取全部用户信息
  getAllUserInfo()
}
//重置按钮
const reset = () => {
  //修改设置仓库
  settingStore.refresh = !settingStore.refresh
}
</script>

<style scoped lang="scss">
.top {
  .form {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-form-item {
      margin-bottom: 0;
    }
  }
}

.bottom {
  margin-top: 20px;

  .table {
    margin: 20px 0;
  }
}
</style>
