<template>
  <el-card style="width: 100%">
    <el-table border style="margin: 10px 0; width: 100%" :data="skuData">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        label="名称"
        prop="skuName"
        width="150px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="描述"
        prop="skuDesc"
        width="150px"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="图片" width="150px">
        <template #="{ row, $index }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="重量(g)"
        prop="weight"
        width="150px"
      ></el-table-column>
      <el-table-column
        label="价格(元)"
        prop="price"
        width="150px"
      ></el-table-column>
      <el-table-column label="操作" width="400px" fixed="right">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="saleOrCancelSale(row)"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="Edit"
            @click="updateSku"
          ></el-button>
          <el-button
            type="primary"
            size="small"
            icon="InfoFilled"
            @click="findSku(row)"
          ></el-button>
          <el-popconfirm
            :title="`确定要删除${row.skuName}吗？`"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button type="primary" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      size="small"
      layout="prev, pager, next, jumper,->, sizes, total,"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>查看商品详情</h4>
      </template>
      <template #default>
        <!-- 栅格 -->
        <el-row style="margin: 10px 0">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">
            {{ skuInfor.skuName }}
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">
            {{ skuInfor.skuDesc }}
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">
            {{ skuInfor.price }}
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfor.skuAttrValueList"
              style="margin: 5px"
              :key="item.id"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfor.skuSaleAttrValueList"
              style="margin: 5px"
              :key="item.id"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item
                v-for="item in skuInfor.skuImageList"
                :key="item.id"
              >
                <img
                  :src="item.imgUrl"
                  alt=""
                  style="width: 100%; height: 100%"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  reqCancelSale,
  reqDeleteSku,
  reqGetSkuList,
  reqOnSale,
  reqSkuInfor,
} from '../../../api/product/sku'
import {
  GetSkuListResponseData,
  SkuData,
  SkuInfor,
  SkuInforResponseData,
} from '../../../api/product/sku/type'
import { ElMessage } from 'element-plus'
//分页器当前页码
const pageNo = ref<number>(1)
//分页器每页展示几条数据
const pageSize = ref<number>(10)
//存储sku数据
const skuData = ref<SkuData[]>([])
//存储总共的数据条数
const total = ref<number>(0)
//控制抽屉显示与隐藏
const drawer = ref<boolean>(false)
//存储sku商品信息数据
const skuInfor = ref<SkuInfor>({
  id: '',
  spuId: '',
  price: '',
  skuName: '',
  skuDesc: '',
  weight: '',
  tmId: '',
  category3Id: '',
  skuDefaultImg: '',
  isSale: '',
  skuImageList: [],
  skuAttrValueList: [],
  skuSaleAttrValueList: [],
})
onMounted(() => {
  //获取sku数据
  getSkuData()
})
//获取sku数据
const getSkuData = async (page = 1) => {
  pageNo.value = page
  const result: GetSkuListResponseData = await reqGetSkuList(
    pageNo.value,
    pageSize.value,
  )
  if (result.code === 200) {
    skuData.value = result.data.records
    total.value = result.data.total
  }
}
//当前页码修改时的回调
const handleCurrentChange = (pageNo: number) => {
  //再次获取sku数据
  getSkuData(pageNo)
}
//每页展示几条数据 修改时的回调
const handleSizeChange = () => {
  //再次获取sku数据
  getSkuData()
}
//上架或者下架商品
const saleOrCancelSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    //已上架，可以做下架操作
    const result: any = await reqCancelSale(row.id as number)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '下架成功',
      })
      //更新sku数据
      getSkuData(pageNo.value)
    } else {
      ElMessage({
        type: 'error',
        message: '下架失败',
      })
    }
  } else {
    //已下架，可以做上架操作
    const result: any = await reqOnSale(row.id as number)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      })
      //更新数据
      getSkuData(pageNo.value)
    } else {
      ElMessage({
        type: 'error',
        message: '上架失败',
      })
    }
  }
}
//点击编辑按钮updateSku
const updateSku = () => {
  ElMessage({
    type: 'success',
    message: '程序员在努力的更新中···',
  })
}
//查看sku详情
const findSku = (row: SkuData) => {
  console.log('row', row)
  drawer.value = true
  //获取sku商品信息
  getSkuInfor(row.id as number)
}
//获取sku商品信息
const getSkuInfor = async (skuId: number) => {
  const result: SkuInforResponseData = await reqSkuInfor(skuId)
  if (result.code === 200) {
    skuInfor.value = result.data
  }
}
//删除按钮
const deleteSku = async (row: SkuData) => {
  const result: any = await reqDeleteSku(row.id as number)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除sku成功',
    })
    //更新sku数据
    getSkuData(skuData.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除sku失败',
    })
  }
}
</script>

<style scoped lang="scss">
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
