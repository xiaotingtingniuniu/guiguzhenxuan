//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import type {GetCategoryResponseData} from '../../api/product/attr/type.ts'
import type {categoryState} from './types/type.ts'
import {reqGetCategory1, reqGetCategory2,reqGetCategory3} from '../../api/product/attr/index.ts'
const useCategoryStore = defineStore('category', {
  state: (): categoryState=> {
    return {
      //存储一级分类的数据
      category1Data:[],
      //存储二级分类的数据
      category2Data:[],
      //存储三级分类的数据
      category3Data:[],
      //存储一级分类选择（select）的ID
      category1Id:'',
      //存储二级分类选择（select）的ID
      category2Id:'',
      //存储三级分类选择（select）的ID
      category3Id:''
    }
  },
  actions: {
    //获取一级分类
    async getCategory1(){
      const result: GetCategoryResponseData = await reqGetCategory1();
      if (result.code === 200) {
        //存储获取到的一级分类数据
        this.category1Data = result.data;
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //获取二级分类
    async getCategory2(){
      const result:GetCategoryResponseData = await reqGetCategory2(this.category1Id);
      if(result.code === 200){
        //存储获取到的二级分类的数据
        this.category2Data = result.data;
        return 'ok'
      }else{
        return Promise.reject(new Error(result.message));
      }
    },
    //获取三级分类
    async getCategory3(){
      const result:GetCategoryResponseData = await reqGetCategory3(this.category2Id)
      if(result.code === 200){
        //存储获取到的三级分类的数据
        this.category3Data = result.data;
        return 'ok'
      }else{
        return Promise.reject(new Error(result.message));
      }
    }
  },
  getters: {

  }
});
export default useCategoryStore
