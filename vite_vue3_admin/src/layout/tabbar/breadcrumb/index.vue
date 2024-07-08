<template>
  <div class="breadcrumb">
    <el-icon style="margin-right: 12px;" @click="changeIcon">
      <component :is="layOutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" :to="item.path" v-show="item.meta.title">
        <span>{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BreadCrumb'
}
</script>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting';
import { useRoute } from 'vue-router';
let $route = useRoute()
let layOutSettingStore = useLayOutSettingStore()
//用于控制菜单折叠还是打开
const changeIcon = () => {
  layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
</style>