<template>
  <div class="setting">
    <el-icon @click="goHome" class="styleL"><Female /></el-icon>
    <!-- <el-button size="default" icon="Refresh" circle bg="true"></el-button>
    <el-button size="default" icon="Refresh" circle ></el-button> -->
  </div>
</template>

<script setup lang="ts">
const goHome = () => {
  alert('111')
}
</script>

<style scoped>
.setting {
  display: flex;
  align-items: center;
  /* background-color: blue; */
}
.styleL {
  cursor: pointer;
}
</style>