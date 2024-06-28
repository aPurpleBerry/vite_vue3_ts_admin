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
import request from '@/utils/request';

import { onMounted } from 'vue';
import {ref} from 'vue'
let myres:any = ref('')
onMounted(()=>{
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111'
    }
  }).then(res => {
    console.log(res);
    myres.value = res
  })
})
</script>