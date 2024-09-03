<template>
  <el-form label-width="100px">
    <el-form-item label="sku名称">
      <el-input placeholder="sku名称" v-model="skuParams.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
      <el-input
        placeholder="价格(元)"
        type="number"
        v-model="skuParams.price"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(克)">
      <el-input
        placeholder="重量(克)"
        type="number"
        v-model="skuParams.weight"
      ></el-input>
    </el-form-item>
    <el-form-item label="sku描述">
      <el-input
        placeholder="sku描述"
        type="textarea"
        v-model="skuParams.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true">
        <el-form-item
          v-for="item in attrArr"
          :key="item.id"
          :label="item.attrName"
        >
          <el-select
            v-model="item.attrIdAndValueId"
            placeholder="请选择"
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="item1 in item.attrValueList"
              :key="item1.id"
              :label="item1.valueName"
              :value="`${item.id}:${item1.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true">
        <el-form-item
          :label="item.saleAttrName"
          v-for="item in saleArr"
          :key="item.id"
        >
          <el-select
            v-model="item.saleIdAndValueId"
            placeholder="请选择"
            size="small"
            style="width: 240px"
          >
            <el-option
              v-for="item1 in item.spuSaleAttrValueList"
              :key="item1.id"
              :label="item1.saleAttrValueName"
              :value="`${item.id}:${item1.id}`"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table
        border
        :data="imgArr"
        ref="imgTable"
        @select="selectCheckbox"
        :selectable="false"
      >
        <el-table-column
          type="selection"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template #="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" @click="handler(row)">
              设置默认
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="default" @click="save">保存</el-button>
      <el-button type="primary" size="default" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { reqAttr } from '../../../api/product/attr/index'
import {
  reqGetTradeMarkImageList,
  reqGetSpuSaleAttrList,
  reqAddSku,
} from '../../../api/product/spu'
import { AttrResponseData, AttrList } from '../../../api/product/attr/type'
import {
  Record,
  SkuInfo,
  SpuHasImageListResponseData,
  SpuImage,
  SpuImageList,
  SpuSaleAttr,
  SpuSaleAttrListResponseData,
} from '../../../api/product/spu/type'
import { ElMessage } from 'element-plus'
//存储平台属性
let attrArr = ref<AttrList>([])
//存储图片数据
let imgArr = ref<SpuImageList>([])
//销售属性
let saleArr = ref<SpuSaleAttr[]>([])
//获取imgTable的dom
const imgTable = ref<any>()
//收集SKU的参数
const skuParams = reactive<SkuInfo>({
  category3Id: '', //三级分类的ID
  spuId: '', //已有的SPU的ID
  tmId: '', //spu品牌的id
  skuName: '', //sku名字
  price: '', //sku价格
  weight: '', //sku重量
  skuDesc: '', //sku的描述
  skuAttrValueList: [], //平台属性
  skuSaleAttrValueList: [], //销售属性
  skuDefaultImg: '', //sku图片地址
})
//自定义事件
const $emit = defineEmits(['changeScene'])
//点击取消按钮
const cancel = () => {
  //告诉父组件 切换为场景0
  $emit('changeScene', { flag: 0, params: '', isCancel: true })
}
//初始化Sku数据
const initSkuData = (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
  row: Record,
) => {
  skuParams.category3Id = category3Id
  skuParams.spuId = row.id as number | string
  skuParams.tmId = row.tmId
  //获取平台数据
  getAttr(category1Id, category2Id, category3Id)
  //获取图片数据
  getImageList(row.id as number)
  //获取对应的销售属性
  getSpuSaleAttrList(row.id as number)
}
//获取平台数据
const getAttr = async (
  category1Id: string | number,
  category2Id: string | number,
  category3Id: string | number,
) => {
  const result: AttrResponseData = await reqAttr(
    category1Id,
    category2Id,
    category3Id,
  )
  if (result.code == 200) {
    attrArr.value = result.data
  }
}
//获取图片数据
const getImageList = async (id: number) => {
  const result: SpuHasImageListResponseData = await reqGetTradeMarkImageList(id)
  if (result.code == 200) {
    imgArr.value = result.data
  }
}
//获取某个spu下已有的销售属性
const getSpuSaleAttrList = async (id: number) => {
  const result: SpuSaleAttrListResponseData = await reqGetSpuSaleAttrList(id)
  if (result.code == 200) {
    saleArr.value = result.data
  }
}
//设置默认图片的方法回调
const handler = (row: SpuImage) => {
  skuParams.skuDefaultImg = row.imgUrl as string
  //点击时先让所有的复选框都不被选中
  imgArr.value.forEach((item) => {
    imgTable.value.toggleRowSelection(item, false)
  })
  //使得当前行选中
  imgTable.value.toggleRowSelection(row, true)
  console.log('skuParams', skuParams)
}
//当用户手动勾选数据行的checkbox时触发的事件
const selectCheckbox = (selection: SpuImageList, row: SpuImage) => {
  //将选中的img赋值给skuParams
  skuParams.skuDefaultImg = row.imgUrl as string
}
//点击保存按钮
const save = () => {
  console.log('点击了保存按钮')
  //整理参数
  //平台属性
  attrArr.value.map((item) => {
    console.log('item', item)
    if (item.attrIdAndValueId) {
      const [attrId, valueId] = item.attrIdAndValueId.split(':')
      skuParams.skuAttrValueList.push({ attrId: valueId, valueId: attrId })
    }
  })
  //销售属性
  saleArr.value.map((item) => {
    console.log('saleArr', saleArr.value)
    console.log('item', item)
    if (item.saleIdAndValueId) {
      const [saleAttrId, saleAttrValueId] = item.saleIdAndValueId.split(':')
      skuParams.skuSaleAttrValueList.push({ saleAttrId, saleAttrValueId })
    }
  })
  //发送请求
  // 添加一个新的sku
  addSku()
}
//添加一个新的sku
const addSku = async () => {
  const result: any = await reqAddSku(skuParams)
  if (result.code === 200) {
    //请求成功
    ElMessage({
      type: 'success',
      message: '添加SKU成功',
    })
  } else {
    //请求失败
    ElMessage({
      type: 'error',
      message: '添加SKU失败',
    })
  }
  //跳转到场景0
  //告诉父组件 切换为场景0
  $emit('changeScene', { flag: 0, params: '', isCancel: true })
}
//清空数据
const clearData = () => {
  console.log('清空数据')
  //清空数据
  Object.assign(skuParams, {
    category3Id: '', //三级分类的ID
    spuId: '', //已有的SPU的ID
    tmId: '', //spu品牌的id
    skuName: '', //sku名字
    price: '', //sku价格
    weight: '', //sku重量
    skuDesc: '', //sku的描述
    skuAttrValueList: [], //平台属性
    skuSaleAttrValueList: [], //销售属性
    skuDefaultImg: '', //sku图片地址
  })
}
//当前子组件的方法对外暴露
defineExpose({ initSkuData, clearData })
</script>

<style scoped lang="scss"></style>
