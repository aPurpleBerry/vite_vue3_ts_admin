<template>
  <div>
    <router-view v-slot="{Component}">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Main'
}
</script>

<script setup lang="ts">
import {watch,ref,nextTick} from 'vue'
import useLayOutSettingStore from '@/store/modules/setting';
let layOutSettingStore = useLayOutSettingStore()

//控制当前组件是否销毁重建
let flag = ref(true)
watch(() => layOutSettingStore.refsh, ()=>{
  //点击刷新按钮，路由组件销毁
  flag.value = false
  nextTick(()=>{
    flag.value = true
  })
})
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 1s;
}

.fade-enter-to {
  opacity: 1;
}
</style>