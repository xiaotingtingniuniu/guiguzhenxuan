<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px">
      <!-- 场景0 -->
      <!-- v-if和v-show都可以显示与隐藏 v-show只挂载一次，v-if会多次重新挂在与销毁 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.category3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <!-- 展示已有SPU数据 -->
        <el-table style="margin: 10px 0px" :border="true" :data="spuData">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作">
            <template #="{ row }">
              <el-button
                type="primary"
                icon="Plus"
                size="small"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="Edit"
                size="small"
                title="修改SPU"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                type="info"
                icon="View"
                size="small"
                title="查看SKU列表"
                @click="findSku(row)"
              ></el-button>
              <el-popconfirm
                :title="`你确定删除${row.spuName}吗？`"
                width="200"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    icon="Delete"
                    size="small"
                    title="删除SPU"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 6, 9, 12]"
          size="default"
          layout="prev, pager, next, jumper, ->, sizes, total,"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- 添加SPU｜修改SPU子组件 场景1-->
      <SpuForm
        v-show="scene == 1"
        @changeScene="changeScene"
        ref="spuForm"
      ></SpuForm>
      <!-- 添加SKU的子组件 场景2-->
      <SkuForm
        v-show="scene == 2"
        @changeScene="changeScene"
        ref="skuForm"
      ></SkuForm>
      <!-- dialog对话框：展示已有的sku数据 -->
      <el-dialog v-model="dialogTableVisible" title="SKU列表" width="800">
        <el-table :data="skuData" border>
          <el-table-column prop="skuName" label="sku名字" width="150" />
          <el-table-column prop="price" label="sku价格" width="200" />
          <el-table-column prop="weight" label="sku重量" />
          <el-table-column label="sku图片">
            <template #="{ row }">
              <img
                :src="row.skuDefaultImg"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, onBeforeUnmount } from 'vue'
import {
  reqDeleteSpu,
  reqGetSpu,
  reqSkuList,
} from '../../../api/product/spu/index.ts'
import type {
  GetSpuResponseData,
  Records,
  Record,
  SkuInfo,
} from '../../../api/product/spu/type.ts'
//获取分类小仓库数据
import useCategoryStore from '../../../store/modules/category.ts'
//引入子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
//存储分页器当前页码
const pageNo = ref<number>(1)
//存储每一页展示几条数据
const pageSize = ref<number>(3)
//存储共有数据条数
const total = ref<number>(0)
//场景的数据
let scene = ref<number>(0) //场景0:显示已有的数据 场景1:显示添加或修改SPU数据 场景2:添加SKU的结构
//存储获取到的SPU数据
const spuData = ref<Records>([])
//获取spu实例
const spuForm = ref<any>()
//获取sku实例
const skuForm = ref<any>()
//存储所有的sku的数据
const skuData = ref<SkuInfo[]>([])
//控制弹框的显示与隐藏
const dialogTableVisible = ref<boolean>(false)
//监听三级分类Id的变化
watch(
  () => categoryStore.category3Id,
  () => {
    if (categoryStore.category3Id) {
      //获取spu接口数据
      getSpu()
    }
  },
)
//获取spu数据
const getSpu = async (pager = 1) => {
  // 修改当前页码
  pageNo.value = pager
  const result: GetSpuResponseData = await reqGetSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.category3Id,
  )
  if (result.code === 200) {
    spuData.value = result.data.records
    total.value = result.data.total
  }
}
//修改分页器每页有几条数据
const handleSizeChange = (value: number) => {
  pageSize.value = value
  //再次获取spu数据
  getSpu()
}
//修改分页器当前页数
const handleCurrentChange = (value: number) => {
  //再次获取spu数据
  getSpu(value)
}
//添加spu按钮
const addSpu = () => {
  //切换为场景1
  scene.value = 1
  //调用子组件实例方法获取添加新的spu初始化方法
  spuForm.value.initAddSpu(categoryStore.category3Id)
}
//修改Spu按钮
const editSpu = (row: Record) => {
  //切换为场景1
  scene.value = 1
  //调用子组件实例方法获取完整已有的spu的数据
  spuForm.value.initHasSpuData(row)
}
//添加Sku按钮
const addSku = (row: Record) => {
  //清空skuForm数据
  skuForm.value.clearData()
  //切换为场景2
  scene.value = 2
  skuForm.value.initSkuData(
    categoryStore.category1Id,
    categoryStore.category2Id,
    categoryStore.category3Id,
    row,
  )
}
//子传父，子组件SpuForm绑定自定义事件：子组件通知父组件切换场景为0
const changeScene = (obj: any) => {
  console.log('obj', obj)
  const { flag, params, isCancel } = obj
  //子组件Spuform点击取消变为场景0:展示已有Spu数据
  scene.value = flag
  if (!isCancel) {
    if (params === 'update') {
      //再次获取全部的已有spu 且在当前页
      getSpu(pageNo.value)
    } else {
      //回到第一页
      getSpu()
    }
  }
}
//查看sku按钮
const findSku = (row: Record) => {
  console.log('row', row)
  //根据spuId查看sku数据
  getSkuData(row.id as number)
}
//根据spuId查看sku数据
const getSkuData = async (spuId: number) => {
  const result: any = await reqSkuList(spuId)
  if (result.code === 200) {
    console.log('result', result.data)
    skuData.value = result.data
    //展示对话弹框
    dialogTableVisible.value = true
  }
}
//点击删除按钮
const deleteSpu = (row: Record) => {
  console.log('row', row)
  //调用删除sku接口
  deleteSpuData(row.id as number)
}
//删除spu数据
const deleteSpuData = async (spuId: number) => {
  console.log('spuId', spuId)
  const result: any = await reqDeleteSpu(spuId)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除spu成功',
    })
    //重新获取spu数据
    getSpu(spuData.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除spu失败',
    })
  }
}
//路由组件销毁前，清空仓库关于分类的数据
onBeforeUnmount(() => {
  categoryStore.$reset()
})
</script>

<style scoped lang="scss"></style>
