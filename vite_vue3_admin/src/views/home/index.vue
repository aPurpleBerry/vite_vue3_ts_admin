<template>
  <div>
    11
    <CopyR></CopyR>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
//首页挂在完毕发请求
onMounted(()=>{
  userStore.userInfo()
})
</script>

<style scoped>

</style>