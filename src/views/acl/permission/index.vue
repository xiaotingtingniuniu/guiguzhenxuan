<template>
  <el-table :data="menuList" style="width: 100%; margin-bottom: 20px" row-key="id" border>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="权限值" align="center" />
    <el-table-column prop="updateTime" label="修改时间" align="center" />
    <el-table-column label="操作" align="center">
      <template #="{ row, $index }">
        <el-button type="primary" size="small" icon="Plus" :disabled="row.level == 4 ? true : false"
          @click="addMenu(row)">{{ row.level == 3 ? '添加功能' : '添加菜单' }}</el-button>
        <el-button type="primary" size="small" icon="Edit" :disabled="row.level == 1 ? true : false"
          @click="edit(row)">编辑</el-button>
        <el-popconfirm :title="`你确定删除${row.name}吗?`" width="260" @confirm="deleteMenu(row)">
          <template #reference>
            <el-button type="primary" size="small" icon="Delete"
              :disabled="row.level == 1 ? true : false">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>
  <!-- dialog组件 -->
  <el-dialog v-model="dialogVisible" :title="menuData.id ? '更新菜单' : '添加菜单'" width="350">
    <el-form :model="menuData" :rules="rules" ref="form">
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请输入权限名称" v-model="menuData.name"></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="code">
        <el-input placeholder="请输入权限数值" v-model="menuData.code"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, nextTick } from 'vue';
import { GetAllRloeResponseData, MenuOrButtonData, MenuOrButtonList, MenuParams } from '../../../api/acl/menu/type';
import { reqAddOrUpdateMenu, reqAllPermission, reqDeleteMenu } from '../../../api/acl/menu';
import { ElMessage, } from 'element-plus';
//添加或更新菜单携带的参数
const menuData = reactive<MenuParams>({
  code: '',
  level: 0,
  name: '',
  pid: 0
});
//form表单组件
const form = ref();
const validateName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 4) {
    callback()
  } else {
    callback(new Error('请至少输入4位'));
  }
}
const validateCode = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 4) {
    callback();
  } else {
    callback(new Error('请至少输入4位'));
  }
}
//自定义校验规则
const rules = reactive({
  name: [{ validator: validateName, trigger: 'blur', required: true }],
  code: [{ validator: validateCode, trigger: 'blur', required: true }],
})
//存储所有菜单数据
let menuList = ref<MenuOrButtonList>([]);
//控制对话框的状态
const dialogVisible = ref<boolean>(false);
onMounted(() => {
  //获取所有菜单的数据
  getAllPermission();
});
//获取所有菜单的数据
const getAllPermission = async () => {
  const result: GetAllRloeResponseData = await reqAllPermission();
  if (result.code == 200) {
    //存储获取到的菜单数据
    menuList.value = result.data;
  }
}
//添加菜单按钮
const addMenu = (row: MenuOrButtonData) => {
  //清除数据
  Object.assign(menuData, {
    code: '',
    level: 0,
    name: '',
    pid: 0,
    id: 0
  });
  //展示弹框
  dialogVisible.value = true;
  //清除自定义校验
  nextTick(() => {
    form.value.clearValidate();
  })
  menuData.level = row.level + 1;
  //pid为父节点的id
  menuData.pid = row.id as number;
}
//编辑按钮
const edit = (row: MenuOrButtonData) => {
  //展示弹框
  dialogVisible.value = true;
  //清除自定义校验
  nextTick(() => {
    form.value.clearValidate();
  })
  //点击修改按钮:收集已有的菜单的数据进行更新
  Object.assign(menuData, row);
}
//确定按钮
const confirm = async () => {
  //先进行表单校验，当校验通过后再执行调用添加接口，否则不予执行
  await form.value.validate();
  //调用添加菜单接口
  saveMenu();
}
//添加菜单接口
const saveMenu = async () => {
  const result: any = await reqAddOrUpdateMenu(menuData);
  if (result.code == 200) {
    //提示添加菜单｜更新菜单成功
    ElMessage({
      type: 'success',
      message: `${menuData.id ? '更新菜单成功' : '添加菜单成功'}`
    });
    //获取所有菜单的数据
    getAllPermission();
  } else {
    ElMessage({
      type: 'error',
      message: `${menuData.id ? '更新菜单失败' : '添加菜单失败'}`
    });
  }
  //关闭弹框
  dialogVisible.value = false;
}
//删除菜单按钮
const deleteMenu = (row: MenuOrButtonData) => {
  console.log('row', row);
  //调用删除菜单接口
  deleteMenuUrl(row.id as number);
}
//调用删除菜单接口
const deleteMenuUrl = async (id: number) => {
  const result: any = await reqDeleteMenu(id);
  if (result.code == 200) {
    //提示删除菜单成功
    ElMessage({
      type: 'success',
      message: '删除菜单成功'
    });
    //获取所有菜单的数据
    getAllPermission();
  }else{
    ElMessage({
      type:'error',
      message:'删除菜单失败'
    })
  }
}
</script>

<style scoped lang="scss"></style>
