<template>
  <div>
    <!-- 三级分类 -->
    <Category :scene="scene" />
    <el-card style="margin:10px 0px">
      <!-- 场景0 -->
      <div v-show="scene==0">
        <el-button type="primary" size="default" icon="Plus" :disabled="!categoryStore.category3Id" @click="addSpu">添加SPU</el-button>
        <!-- 展示已有SPU数据 -->
        <el-table style="margin:10px 0px" :border="true" :data="spuData">
          <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button type="primary" icon="Plus" size="small" title="添加SKU"></el-button>
              <el-button type="warning" icon="Edit" size="small" title="修改SPU" @click="editSpu(row)"></el-button>
              <el-button type="info" icon="View" size="small" title="查看SKU列表"></el-button>
              <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 6, 9, 12]"
          size="default" layout="prev, pager, next, jumper, ->, sizes, total," :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
      <!-- 添加SPU｜修改SPU子组件 -->
      <SpuForm v-show="scene==1" @changeScene="changeScene"></SpuForm>
      <!-- 添加SKU的子组件 -->
      <SkuForm v-show="scene==2"></SkuForm>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { reqGetSpu,reqGetTradeMarkList } from '../../../api/product/spu/index.ts'
import type { GetSpuResponseData, Records,Record,TrademarkListResponseData} from '../../../api/product/spu/type.ts'
//获取分类小仓库数据
import useCategoryStore from '../../../store/modules/category.ts'
//引入子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
const categoryStore = useCategoryStore();
//存储分页器当前页码
const pageNo = ref<number>(1);
//存储每一页展示几条数据
const pageSize = ref<number>(3);
//存储共有数据条数
const total = ref<number>(0);
//场景的数据
let scene = ref<number>(0);//0:显示已有的数据 1:显示添加或修改SPU数据 2:添加SKU的结构
//存储获取到的SPU数据
const spuData = ref<Records>([]);
//监听三级分类Id的变化
watch(() => categoryStore.category3Id, () => {
  if (categoryStore.category3Id) {
    //获取spu接口数据
    getSpu();
  }
})
//获取spu数据
const getSpu = async (pager = 1) => {
  // 修改当前页码
  pageNo.value = pager;
  const result: GetSpuResponseData = await reqGetSpu(pageNo.value, pageSize.value, categoryStore.category3Id);
  if (result.code === 200) {
    spuData.value = result.data.records;
    total.value = result.data.total;
    console.log('spuData', spuData.value)
  } else {

  }
}
//修改分页器每页有几条数据
const handleSizeChange = (value: number) => {
  pageSize.value = value;
  //再次获取spu数据
  getSpu();
}
//修改分页器当前页数
const handleCurrentChange = (value: number) => {
  //再次获取spu数据
  getSpu(value);
}
//添加spu按钮
const addSpu = ()=>{
  scene.value= 1;
}
//修改Spu按钮
const editSpu = (row:Record)=>{
  scene.value = 1;
  //获取已有的spu品牌
  reqGetTradeMarkList();
}
// 获取已有的spu品牌
const reqGetTradeMarkList = async ()=>{
  const result: TrademarkListResponseData = await reqGetTradeMarkList();
  console.log('result',result);
  if(result.code ==200){
    result.data
  }
}
//子传父，子组件SpuForm绑定自定义事件：子组件通知父组件切换场景为0
const changeScene = (num:number)=>{
  //子组件Spuform点击取消变为场景0:展示已有Spu数据
  scene.value = num;
}
</script>

<style scoped lang="scss"></style>
