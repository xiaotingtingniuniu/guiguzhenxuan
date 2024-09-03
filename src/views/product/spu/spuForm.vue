<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SPU名称">
        <el-input
          placeholder="请你输入SPU名称"
          v-model="spuParams.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌">
        <el-select
          placeholder="请你选择品牌"
          style="width: 240px"
          v-model="spuParams.tmId"
        >
          <el-option
            v-for="item in allTradeMark"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          type="textarea"
          placeholder="请你输入SPU的 描述"
          v-model="spuParams.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU照片">
        <!--
           v-model:file-list用于展示默认图片 
           action:上传图片的接口地址
           list-type:文件列表的类型
        -->
        <el-upload
          v-model:file-list="spuImageList"
          action="/api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :before-upload="handleBeforeUpload"
        >
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="SPU销售属性">
        <el-select
          :placeholder="
            unSelectSaleAttr.length
              ? `还未选择的有${unSelectSaleAttr.length}个`
              : '无'
          "
          style="width: 240px"
          v-model="saleAttrIdAndValueName"
        >
          <el-option
            :value="`${item.id}:${item.name}`"
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
          />
        </el-select>
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          style="margin-left: 10px"
          :disabled="saleAttrIdAndValueName ? false : true"
          @click="addSaleAttr"
        >
          添加销售属性
        </el-button>
        <el-table border style="margin: 10px 0" :data="spuSaleAttrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            label="销售属性名"
            prop="saleAttrName"
            width="120"
          ></el-table-column>
          <el-table-column label="销售属性值">
            <template #="{ row, $index }">
              <div class="flex gap-2">
                <el-tag
                  v-for="(tag, index) in row.spuSaleAttrValueList"
                  :key="tag.id"
                  closable
                  type="primary"
                  style="margin: 0 5px"
                  @close="row.spuSaleAttrValueList.splice(index, 1)"
                >
                  {{ tag.saleAttrValueName }}
                </el-tag>
                <el-input
                  v-if="row.flag === true"
                  ref="InputRef"
                  v-model="row.saleAttrValue"
                  class="w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm(row)"
                  @blur="handleInputConfirm(row)"
                  placeholder="请输入属性值"
                />
                <el-button
                  v-else
                  class="button-new-tag"
                  type="primary"
                  size="small"
                  icon="Plus"
                  @click="showInput(row)"
                ></el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template #="{ row, $index }">
              <el-button
                type="primary"
                size="small"
                icon="Delete"
                @click="spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="save"
          :disabled="spuSaleAttrList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" size="default" @click="cancel">
          取消
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type {
  AllSaleAttr,
  AllSaleAttrListResponseData,
  Record,
  SpuHasImageListResponseData,
  SpuImageList,
  SpuSaleAttr,
  SpuSaleAttrListResponseData,
  SpuSaleAttrValue,
  Trademark,
  TrademarkListResponseData,
} from '../../../api/product/spu/type'
import {
  reqAddOrUpdateSpu,
  reqGetAllSaleAttrList,
  reqGetSpuSaleAttrList,
  reqGetTradeMarkImageList,
  reqGetTradeMarkList,
} from '../../../api/product/spu'
import { ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
//存储已有的spu数据
const spuParams = ref<Record>({
  spuName: '', //spu的名字
  description: '', //spu的描述
  category3Id: '', //三级分类的id
  tmId: '', //品牌的id
  spuSaleAttrList: [],
  spuImageList: [],
})
//存储已有的spu品牌数据
const allTradeMark = ref<Trademark[]>([])
//存储已有的spu照片墙
let spuImageList = ref<SpuImageList>([])
//存储已有的spu销售属性
let spuSaleAttrList = ref<SpuSaleAttr[]>([])
//存储所有的销售属性
const allSaleAttrList = ref<AllSaleAttr[]>([])
//存储预览对话框的展示与隐藏
const dialogVisible = ref<boolean>(false)
//存储预览的图片地址
const dialogImageUrl = ref<string>('')
//将来收集还未选择的销售属性的ID和属性值的名字
const saleAttrIdAndValueName = ref<string>('')
//获取inputdom
const InputRef = ref()
let $emit = defineEmits(['changeScene'])
//子组件点击取消按钮，通知父组件切换场景为0，显示已有的SPU数据
const cancel = () => {
  $emit('changeScene', {
    flag: 0,
    params: spuParams.value.id ? 'update' : 'add',
    isCancel: true,
  })
}
//子组件书写一个方法(更新已有的spu)
const initHasSpuData = (spuData: Record) => {
  //spu即为父组件传递过来的已有的SPU对象
  // 存储已有的spu数据
  spuParams.value = spuData
  //获取已有的spu品牌
  getTradeMartList()
  //获取已有spu的照片墙
  getImageList(spuData.id as number)
  //获取已有spu的销售属性
  getSpuSaleAttrList(spuData.id as number)
  //获取所有的销售属性
  getAllSaleAttrList()
}
//获取已有的spu品牌
const getTradeMartList = async () => {
  const result: TrademarkListResponseData = await reqGetTradeMarkList()
  console.log('result', result)
  if (result.code === 200) {
    //存储已有的sup品牌
    allTradeMark.value = result.data
  }
}
//获取已有的spu的照片墙
const getImageList = async (spuId: number) => {
  const result: SpuHasImageListResponseData =
    await reqGetTradeMarkImageList(spuId)
  console.log('result', result)
  if (result.code === 200) {
    //存储已有的spu照片墙
    spuImageList.value = result.data?.map((item) => {
      return {
        name: item.imgName,
        url: item.imgUrl,
      }
    })
  }
}
//获取已有的spu销售属性
const getSpuSaleAttrList = async (spuId: number) => {
  const result: SpuSaleAttrListResponseData = await reqGetSpuSaleAttrList(spuId)
  console.log('result', result)
  if (result.code === 200) {
    //存储已有的spu销售属性
    spuSaleAttrList.value = result.data
  }
}
//获取所有的销售属性
const getAllSaleAttrList = async () => {
  const result: AllSaleAttrListResponseData = await reqGetAllSaleAttrList()
  console.log('result', result)
  if (result.code === 200) {
    //存储所有的销售属性
    allSaleAttrList.value = result.data
  }
}
//照片墙点击预览按钮时的回调函数
const handlePictureCardPreview = (uploadFile: any) => {
  dialogVisible.value = true
  console.log('uploadFile', uploadFile)
  dialogImageUrl.value = uploadFile.url
}
//照片删除的回调函数
const handleRemove = (uploadFile: any, uploadFiles: any) => {
  console.log('uploadFile', uploadFile)
  console.log('uploadFiles', uploadFiles)
}
//上传图片之前的回调函数(可以限制图片类型和大小)
const handleBeforeUpload = (rawFile: any) => {
  console.log('rawFile', rawFile)
  if (
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/jpg'
  ) {
    if (rawFile.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件的大小不能超过3M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件务必是PNG|JPEG|JPG',
    })
    return false
  }
}
//计算出当前SPU还未拥有的销售属性
const unSelectSaleAttr = computed(() => {
  //全部销售属性：颜色、版本、尺码
  //已有的销售属性：颜色、版本
  let unSelectArr = allSaleAttrList.value.filter((item) => {
    return spuSaleAttrList.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})
//点击添加销售属性按钮
const addSaleAttr = () => {
  /**
   * 需要包含的字段
   * baseSaleAttrId：销售属性id
   * saleAttrName：销售属性名字
   * spuSaleAttrValueList：销售属性值数组
   */
  //将字符串通过：分割saleAttrIdAndValueName
  //复制解构数组
  const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
  //准备一个新的销售对象
  const newSaleAttr: SpuSaleAttr = {
    baseSaleAttrId,
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  console.log('newSaleAttr', newSaleAttr)
  //追加到数组中
  spuSaleAttrList.value.push(newSaleAttr)
  console.log('spuSaleAttrList', spuSaleAttrList.value)
  //清空收集的数据
  saleAttrIdAndValueName.value = ''
}
//点击添加属性值按钮
const showInput = (row: SpuSaleAttr) => {
  row.flag = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
const handleInputConfirm = (row: SpuSaleAttr) => {
  console.log('row', row)
  const { saleAttrValue, baseSaleAttrId } = row
  if (saleAttrValue?.trim() === '' || saleAttrValue === undefined) {
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  const repeat = row.spuSaleAttrValueList?.find((item) => {
    return item.saleAttrValueName == saleAttrValue
  })
  console.log('repeat', repeat)
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.spuSaleAttrValueList?.push({
    baseSaleAttrId: baseSaleAttrId as number,
    saleAttrValueName: saleAttrValue as string,
  })
  row.flag = false
  row.saleAttrValue = ''
}
//点击保存按钮
const save = () => {
  //整理参数
  //1:整理照片墙的数据
  spuParams.value.spuImageList = spuImageList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  //2:整理销售属性的数据
  spuParams.value.spuSaleAttrList = spuSaleAttrList.value
  console.log('spuParams', spuParams.value)
  //发送请求 添加｜更新已有的SPU
  addOrUpdateSpu()
}
//添加或者更新已有的spu数据
const addOrUpdateSpu = async () => {
  const result: any = await reqAddOrUpdateSpu(spuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: spuParams.value.id ? '更新成功' : '添加成功',
    })
    //通知父组件更改场景为0
    $emit('changeScene', {
      flag: 0,
      params: spuParams.value.id ? 'update' : 'add',
      isCancel: false,
    })
  } else {
    ElMessage({
      type: 'error',
      message: spuParams.value.id ? '更新失败' : '添加失败',
    })
  }
}

//添加一个新的spu初始化请求方法
const initAddSpu = (category3Id: number | string) => {
  if (spuParams.value.id) {
    spuParams.value.id = 0
  }
  //清空数据
  Object.assign(spuParams.value, {
    spuName: '', //spu的名字
    description: '', //spu的描述
    category3Id: '', //三级分类的id
    tmId: '', //品牌的id
    spuSaleAttrList: [],
    spuImageList: [],
  })
  //清空spu照片墙
  spuImageList.value = []
  //清空spu销售属性
  spuSaleAttrList.value = []
  //清空将来收集还未选择的销售属性的ID和属性值的名字
  saleAttrIdAndValueName.value = ''
  //存储三级分类的id
  spuParams.value.category3Id = category3Id
  //获取已有的spu品牌
  getTradeMartList()
  //获取所有的销售属性
  getAllSaleAttrList()
}
/*
  因为有setup 所以一般情况下外面是访问不到的，如果想让外面可以访问到，
  可以将方法对外暴露
*/
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped lang="scss"></style>
