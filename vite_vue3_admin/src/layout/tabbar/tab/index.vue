<template>
  <el-tabs v-model="activeTab" @tab-change="tabChange" @tab-remove="tabRemove">
      <el-tab-pane v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path"
          :closable="item.path != '/'">
      </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
export default {
  name: 'Tab'
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router';

interface TabType {
  'title': string,
  'path': string
}

const route = useRoute()
const router = useRouter()
const activeTab = ref(route.path)
const tabList = reactive([
  {
      title: '首页',
      path: '/'
  }
])

//点击标签导致activeTab改变时触发
function tabChange(tab: string) {
  console.log('tabChange')
  router.push(tab)
  activeTab.value = tab
}


//添加路由 添加到标签页
function addTab(tab: TabType) {
  const index = tabList.findIndex((item) => item.path == tab.path)
  //选中的菜单项目前没有在标签页中 需要添加到标签页中
  if (index == -1) {
      tabList.push(tab)
  }
}

//点击菜单导致路由变化 路由变化之前使用这个全局守卫 
router.beforeEach((to) => {
  activeTab.value = to.path
  addTab({
      title: to.meta.title as string,
      path: to.path
  })
})


function tabRemove(targetTab: string) {
  let targetIndex: number = 0 //要关闭的tab的index    

  //先找到要删除的
  tabList.forEach((tab, index) => {
      if (tab.path == targetTab) {
          targetIndex = index
      }
  })
  //要关闭的是当前活跃的tab
  if (activeTab.value == targetTab) {
      const nextTab = tabList[targetIndex - 1] || tabList[targetIndex + 1]
      activeTab.value = nextTab.path
      router.push(activeTab.value)
  }
  tabList.splice(targetIndex, 1)
  
}
</script>