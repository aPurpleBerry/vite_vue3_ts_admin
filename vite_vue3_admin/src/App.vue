<template>
  <el-icon><ChatDotRound /></el-icon>
  <div>
    haha
    <h1>sss</h1>
    <h2>{{ myres }}</h2>
  </div>
  <SvgIcon name="admin" color="pink"></SvgIcon>
  <el-button :icon="Plus"></el-button>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: $color
  }
}
</style>

<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue'

import { onMounted } from 'vue';
import {reqLogin} from './api/user'
import {ref} from 'vue'
let myres:any = ref('')
onMounted(()=>{
  reqLogin({username:'admin',password:'111111'})
})
</script>