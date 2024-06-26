<template>
  <el-icon><ChatDotRound /></el-icon>
  <div>haha</div>
  <SvgIcon name="admin" color="pink"></SvgIcon>
  <el-button :icon="Plus"></el-button>
</template>

<style scoped></style>

<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue'
console.log( import.meta.env );
import SvgIcon from '@/components/SvgIcon/index.vue'

</script>