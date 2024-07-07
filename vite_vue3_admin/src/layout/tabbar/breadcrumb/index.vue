<template>
  <div class="breadcrumb">
    <el-icon style="margin-right: 12px;"><Expand /></el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  margin-left: 15px;
}
</style>