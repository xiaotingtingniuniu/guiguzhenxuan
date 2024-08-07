<template>
  <!-- 三级分类全局组件 -->
  <Category :scene="scene"></Category>
  <el-card style="margin: 20px 0">
    <div v-show="scene == 0">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        :disabled="!categoryStore.category3Id"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table
        :data="attrArr"
        style="width: 100%; margin: 10px 0"
        :border="true"
      >
        <el-table-column
          prop="number"
          label="序号"
          width="80"
          type="index"
          align="center"
        />
        <el-table-column prop="attrName" label="属性名称" width="120" />
        <el-table-column label="属性值名称">
          <template #="{ row, $index }">
            <el-tag
              style="margin: 5px"
              v-for="(item, index) in row.attrValueList"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <!-- row:已有的属性对象 -->
          <template #="{ row, $index }">
            <el-button
              icon="Edit"
              type="primary"
              size="small"
              @click="upDateAttr(row)"
            ></el-button>
            <el-popconfirm
              title="确定要删除该属性吗?"
              @confirm="confirmDelete(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="scene == 1">
      <!-- 展示添加属性与修改数据的结构 -->
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input
            placeholder="请你输入属性名称"
            v-model="attrParams.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addAttrHandler"
        :disabled="attrParams.attrName.length == 0"
      >
        添加属性值
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
      <el-table border style="margin: 10px 0" :data="attrParams.attrValueList">
        <el-table-column
          label="序号"
          width="80px"
          type="index"
          align="center"
        />
        <el-table-column label="属性值名称">
          <!-- row:当前属性值对象 -->
          <template #="{ row, $index }">
            <el-input
              ref="inputRef"
              v-if="row.flag"
              placeholder="请你输入属性值名称"
              v-model="row.valueName"
              @blur="toLook(row, $index)"
            ></el-input>
            <div v-else @click="toEdit(row)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button
              icon="Delete"
              type="primary"
              size="small"
              @click="deleteAttrValue($index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        size="default"
        @click="save"
        :disabled="attrParams.attrValueList.length == 0"
      >
        保存
      </el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
//引入分类小仓库
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import useCategoryStore from '../../../store/modules/category.ts'
import {
  reqAttr,
  reqAddorUpdateAttr,
  reqDeleteAttr,
} from '../../../api/product/attr/index.ts'
import type {
  AttrResponseData,
  AttrList,
  Attr,
  AttrValue,
} from '../../../api/product/attr/type.ts'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
//存储获取到的属性和属性值数据
const attrArr = ref<AttrList>([])
//定义card组件内容切换的变量
const scene = ref<number>(0)
//存储新增属性的数据
const attrParams = reactive<Attr>({
  attrName: '', //新增属性的名字
  attrValueList: [
    // {
    //   valueName:'string'//新增属性值名字
    // }
  ], //新增的属性值数组
  categoryId: '', //三级分类的id
  categoryLevel: 3, //分类的级别为3级
})
//获取属性值input的实例
const inputRef = ref<any>()
watch(
  () => categoryStore.category3Id,
  () => {
    //清空上一次查询的属性与属性值的数组
    attrArr.value = []
    //保证有三级分类的i才能发送请求
    if (!categoryStore.category3Id) return
    //获取已有属性与属性值
    getAttr()
  },
)
//获取已有属性与属性值
const getAttr = async () => {
  const { category1Id, category2Id, category3Id } = categoryStore
  const result: AttrResponseData = await reqAttr(
    category1Id,
    category2Id,
    category3Id,
  )
  if (result.code === 200) {
    attrArr.value = result.data
  }
}
//添加属性按钮点击事件
const addAttr = () => {
  //每次点击的时候先清空一下数据
  Object.assign(attrParams, {
    attrName: '', //新增属性的名字
    attrValueList: [
      // {
      //   valueName:'string'//新增属性值名字
      // }
    ], //新增的属性值数组
    categoryId: '', //三级分类的id
    categoryLevel: 3, //分类的级别为3级
  })
  //切换场景
  scene.value = 1
}
//切换场景后的添加属性值按钮
const addAttrHandler = () => {
  // 在属性值列表中新增一项
  attrParams.attrValueList.push({
    valueName: '',
    flag: true, //控制属性值编辑与只读状态的切换
  })
  //响应式的数据变化时，获取更新的DOM（组件实例）
  nextTick(() => {
    //input属性值组件实例直接获得焦点触发
    inputRef.value.focus()
  })
}
const addOrUpdateAttr = async () => {
  const result: any = await reqAddorUpdateAttr(attrParams)
  //添加属性｜修改已有属性已经成功
  if (result.code === 200) {
    //切换场景
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    //获取已有属性与属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
//属性编辑按钮点击事件
const upDateAttr = (row: AttrValue) => {
  //将选中的数据回填（需要使用深拷贝将row 拷贝一份再与attrParams合并，不然如果使用前拷贝，当改变了attrParams中的某个值，且取消了，那么row=>attrArr也会跟着改变，因为他们指向一个地址）
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  //切换场景
  scene.value = 1
}
//属性删除按钮后 弹出prop 点击确定按钮
const confirmDelete = (row: AttrValue) => {
  //调用删除属性接口
  deleteAttr(row)
}
//删除属性接口
const deleteAttr = async (row: AttrValue) => {
  const result: any = await reqDeleteAttr(row.id)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除属性成功',
    })
    //获取一次已有的属性与属性值
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除属性失败',
    })
  }
}
//保存按钮
const save = () => {
  //收集参数
  attrParams.categoryId = categoryStore.category3Id
  //发送请求
  //调用新增属性接口
  addOrUpdateAttr()
}
//取消按钮的回调
const cancel = () => {
  scene.value = 0
}
//input失去焦点时，转换为只读的div
const toLook = (row: AttrValue, $index: number) => {
  //非法情况1判断
  if (row.valueName.trim() == '') {
    //删除这个属性值为空值对象
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  //非法情况2判断
  const repeat = attrParams.attrValueList.find((item) => {
    //（由于是对象）所以比较的是引用
    if (item != row) {
      return item.valueName === row.valueName
    }
  })
  //如果有重复的，就返回不再执行了
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不可重复',
    })
    // 将重复的属性值删除
    attrParams.attrValueList.splice($index, 1)
    return
  }
  row.flag = false
}
//div点击时，转换为input
const toEdit = (row: AttrValue) => {
  row.flag = true
  //input属性值实例直接获得焦点触发
  nextTick(() => {
    inputRef.value.focus()
  })
}
//属性值的删除按钮
const deleteAttrValue = ($index: number) => {
  attrParams.attrValueList.splice($index, 1)
}
//路由组件销毁的时候，把仓库分类相关的数据清空
onBeforeUnmount(() => {
  //清空数据
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
