<template>
  <div class="pc">
    <div class="pc-content">
        <el-card style="width: 30%" shadow="hover" class="person-box">
        <img src="@/assets/images/icon.gif">
        <h1>{{userStore.username}}</h1>
        <h2>From the mud to the stars.</h2>
        <el-button type="primary"><a href="https://github.com/aPurpleBerry" target="_blank">Follow me</a></el-button>
        <span class="text"><el-icon><User /></el-icon>前端小白</span>
        <span class="text"><el-icon><Star /></el-icon>2001/11</span>
        <span class="text"><el-icon><Sunny /></el-icon>女</span>
        <span class="text"><el-icon><MapLocation /></el-icon>中国 • 广东省 • 深圳市</span>
        <!-- <span class="text"><el-icon><Collection /></el-icon>JS、Vue、React、Node</span> -->
        <div class="tag-box">
          <h3>技术栈</h3>
          <el-tag>HTML</el-tag>
          <el-tag>CSS</el-tag>
          <el-tag>Sass</el-tag>
          <el-tag>JavaScript</el-tag>
          <el-tag>Vue</el-tag>
          <el-tag>React</el-tag>
          <el-tag>Nextjs</el-tag>
          <el-tag>Node</el-tag>
          <el-tag>Express</el-tag>
          <el-tag>Nestjs</el-tag>
          <el-tag>Nginx</el-tag>
        </div>
      </el-card>
      <el-card style="width: 60%" shadow="hover" class="right-box">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
          <el-tab-pane label="账号绑定" name="second">账号绑定</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <CopyR></CopyR>
  </div>
  

</template>

<script lang="ts">
export default {
  name: 'PersonalCenter'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from "@/store/modules/user";
let userStore = useUserStore()

//tab默认选中第一个
const activeName = ref('second')

</script>

<style scoped lang="scss">
.pc {
  height: 800px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  a {
    text-decoration: none;
    color: white;
  }
  .pc-content {
    width: 100%;
    height: 620px;
    display: flex;
    justify-content: space-evenly;
    
    .person-box {
      display: flex;
      flex-direction: column;
      img {
        width: 100px; 
        height: 100px;
        border-radius: 50%; 
        margin-left: 37%;
        margin-top: 20px;
        margin-bottom: 15px;
      }

      h1 {
        text-align: center;
        font-size:1.5rem;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
      }

      h2 {
        text-align: center;
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        font-size: 1rem;
        margin: 15px;
      }

      .el-button {
        font-family:Verdana, Geneva, Tahoma, sans-serif;
        margin-left: 35%;
        margin-bottom: 10px;
        border-radius: 15px;
      }

      .text {
        // height: 30px;
        display: flex;
        align-items: center;
        text-align:left;
        margin-left: 15%;
        margin-top: 10px;
        color: rgb(133,126,125);
        width: 250px;
        // background-color: red;
      }
      .text .el-icon {
        margin-right: 5px
      }
      .tag-box {
        margin: 30px auto;
        width: 80%;
        height: 100px;
        // background-color: red;
        border-top: 3px solid rgb(246,246,246);

        .el-tag {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      h3 {
        color: rgb(133,126,125);
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 12px;
        font-weight: bolder;
      }
    }

    .right-box {
      padding: 0px 20px;
      :deep(.el-tabs__nav-wrap::after) {
        height: 0px !important;
      }
    }
  }
}


</style>