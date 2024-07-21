<template>
  <!-- 卡片组件 -->
  <el-card class="card">
    <!-- 卡片顶部添加品牌按钮 -->
    <el-button type="primary" size="primary" icon="Plus" @click="addTrademark">
      添加品牌
    </el-button>
    <!-- table表格组件 
         table
         -- border:可以设置表格纵向是有边框
         table-column
         --label:某一个标题
         --width:设置某列的宽度
         --align:设置列的对齐方式
    -->
    <el-table border :data="trademarkArr" style="width: 100%" class="table">
      <el-table-column prop="id" label="序号" width="80" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
        <template #="{ row }">
          <img
            :src="
              row.logoUrl.substring(0, 7) === 'http://'
                ? `${row.logoUrl}`
                : `http://${row.logoUrl}`
            "
            class="logo"
          />
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="品牌操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="editTrademark(row)"
          ></el-button>
          <!-- <el-button type="primary" size="small" icon="Delete"></el-button> -->
          <!-- 气泡组件 -->
          <el-popconfirm
            :title="`您确定要删除${row.tmName}?`"
            @confirm="confirmEvent(row.id)"
            width="200px"
            icon="Delete"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件
        pagination
        --v-model:current-page 当前页数
        --v-model:page-size 每页显示条目个数
        size:分页器大小
        disabled:是否禁用分页
        layout:可以设置分页器六个字组件布局调整
    -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="limit"
      :page-sizes="[3, 6, 9, 12]"
      size="small"
      layout="prev, pager, next, jumper,->,sizes, total"
      :total="total"
      @current-change="currentChange"
      @size-change="sizeChange"
    />
  </el-card>
  <!-- 对话框组件 -->
  <el-dialog
    v-model="dialogTableVisible"
    :title="form.id ? '修改品牌' : '添加品牌'"
    width="500"
    class="dialog"
  >
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item
        label="品牌名称"
        class="form_width"
        label-width="90px"
        prop="tmName"
      >
        <el-input
          autocomplete="off"
          placeholder="请输入品牌名称"
          v-model="form.tmName"
        />
      </el-form-item>
      <el-form-item
        label="品牌Logo"
        class="form_width"
        label-width="90px"
        prop="logoUrl"
      >
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, toRefs } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '../../../api/product/trademark'
import {
  HasTrademarkResponseData,
  Records,
  Record,
} from '../../../api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
//分页器当前页数
const pageNo = ref<number>(1)
//分页器每页显示的条数
const limit = ref<number>(3)
//分页器中数据的总条数
const total = ref<number>(0)
//存储已有品牌的数据
const trademarkArr = ref<Records>([])
//控制对话框的显示与隐藏
const dialogTableVisible = ref<boolean>(false)
const form = reactive<Record>({
  tmName: '',
  logoUrl: '',
})
//获取form表单组件
const formRef = ref()
onMounted(() => {
  //获取已有品牌数据
  getTrademark()
})
const getTrademark = async (pager = 1) => {
  //不传参数时默认是访问第一页数据
  pageNo.value = pager
  const result: HasTrademarkResponseData = await reqHasTrademark(
    pageNo.value,
    limit.value,
  )
  if (result.code === 200) {
    trademarkArr.value = result.data.records
    total.value = result.data.total
    return 'ok'
  } else {
    return Promise.reject(new Error(result.message))
  }
}
//分页器当前页码改变
const currentChange = (val: number) => {
  //调用获取已有品牌数据
  getTrademark(val)
}
//修改page-size
const sizeChange = () => {
  //调用获取已有品牌数据，让其回到第一页
  getTrademark()
}
//添加品牌
const addTrademark = () => {
  //打开对话框
  dialogTableVisible.value = true
  //清空数据
  form.logoUrl = ''
  form.tmName = ''
  form.id = 0
}
//修改品牌
const editTrademark = (row: any) => {
  dialogTableVisible.value = true
  // form.tmName = row.tmName;
  // form.logoUrl = row.logoUrl;
  // form.id = row.id;
  // form=toRefs(row);
  Object.assign(form, row)
}
//dialog取消按钮
const cancel = () => {
  dialogTableVisible.value = false
  formRef.value.clearValidate()
}
//dialog确定按钮
const confirm = async () => {
  //对form表单进行校验
  //validate() 返回一个Promise，调用这个方法进行全部表单校验，如果校验全部通过，在执行后面的语句（await 等待成功的返回，然后执行后续语句）
  await formRef.value.validate()
  dialogTableVisible.value = false
  //添加或修改品牌接口
  const result: any = await reqAddOrUpdateTrademark(form)
  if (result.code === 200) {
    //添加或修改品牌成功
    //关闭对话框
    dialogTableVisible.value = false
    ElMessage({
      type: 'success',
      message: form.id ? '修改品牌成功' : '添加品牌成功',
    })
    //获取已有品牌
    getTrademark(form.id ? pageNo.value : 1)
  } else {
    //添加或修改品牌失败
    ElMessage({
      type: 'error',
      message: form.id ? '修改品牌失败' : '添加品牌失败',
    })
    //关闭对话框
    dialogTableVisible.value = false
  }
}
//上传图片成功的回调函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  form.logoUrl = response.data
  //图片上传成功，清除掉对应的校验结果（红色的校验文字）
  formRef.value.clearValidate('logoUrl')
}
//上传之前的回调函数（可以限制上传文件的大小或者类型）
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  //上传文件的格式png/jpg/gif/jpeg 4M
  if (
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必png/jpg/gif',
    })
    return false
  }
}
//自定义校验规则的方法1
const validateTmName = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 2) {
    callback()
  } else {
    callback(new Error('品牌名称位数大于等于两位'))
  }
}
//自定义校验规则的方法2
const validateLogoUrl = (rule: any, value: any, callback: any) => {
  if (value) {
    callback()
  } else {
    callback(new Error('请添加图片'))
  }
}
//校验规则
const rules = {
  //required:必填项，表单前面出现*
  //trigger:触发校验规则的时机，【blur、change】
  /*由于图片的触发校验规则不是blur，也不是change，所以不使用trigger，而是使用form的validate，对整个表单的内容进行验证。
   *接收一个回调函数，或返回 Promise。在对话框点击确定按钮时，可以调用
   */
  tmName: [{ validator: validateTmName, trigger: 'blur', required: true }],
  logoUrl: [{ validator: validateLogoUrl, required: true }],
}
//气泡的确定删除按钮
const confirmEvent = async (id: number) => {
  //调用删除品牌接口
  const result: any = await reqDeleteTrademark(id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除品牌成功',
    })
    //调用获取已有品牌数据，让其回到第一页
    getTrademark(pageNo.value)
  } else {
    ElMessage({
      type: 'error',
      message: result.data,
    })
  }
}
</script>
<script lang="ts">
export default {
  name: 'trademark',
}
</script>

<style scoped lang="scss">
.card {
  .table {
    margin: 10px 0;

    .logo {
      width: 100px;
      height: 100px;
    }
  }
}

.dialog {
  .form_width {
    width: 80%;
  }

  .avatar-uploader {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}

::v-deep .el-form-item__label {
  justify-content: flex-start;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
