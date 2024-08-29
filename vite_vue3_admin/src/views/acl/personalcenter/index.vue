<template>
  <div class="pc">
    <div class="pc-content">
        <el-card style="width: 30%" shadow="hover" class="person-box">
        <img :src="userForm.avatar">
        <h1>{{userForm.username }}</h1>
        <!-- From the mud to the stars. -->
        <h2>{{ userForm.introduction }}</h2>
        <template v-if="userForm.username=='admin'">
          <el-button type="primary"><a href="https://github.com/aPurpleBerry" target="_blank">Follow me</a></el-button>
          <span class="text"><el-icon><User /></el-icon>前端小白</span>
          <span class="text"><el-icon><Star /></el-icon>2001/11</span>
          <!-- <span class="text"><el-icon><Sunny /></el-icon>女</span> -->
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
        </template>
        
      </el-card>
      <el-card style="width: 60%" shadow="hover" class="right-box">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="基本信息" name="first">
            <el-form
                ref="userFormRef"
                :model="userForm"
                :rules="userFormRules"
                label-width="80px" style="margin-top: 20px;"
                class="demo-ruleForm"
            >
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="userForm.username"  :disabled="userForm.username=='admin'"/>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                  <el-input v-model="userForm.name" />
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                    <el-select
                        v-model="userForm.gender"
                        class="m-2"
                        placeholder="Select"
                        style="width:100%"
                    >
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="个人简介" prop="introduction">
                    <el-input v-model="userForm.introduction"  type="textarea"/>
                </el-form-item>

                <el-form-item  label="头像"  prop="avatar">
                  <Upload :avatar="userForm.avatar"  @kerwinchange="handleChange"/>
                </el-form-item>

                <el-form-item>
                    <el-button  type="primary"  @click="submitForm()">更新</el-button>
                </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="账号绑定" name="second">
            待开发
          </el-tab-pane>
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
import { ref, reactive,onMounted } from 'vue'
import useUserStore from "@/store/modules/user"
// import useLayOutSettingStore from '@/store/modules/setting';
//@ts-ignore
import Upload from "@/components/Upload/index.vue";
import upload from '@/utils/upload'
import { ElNotification } from 'element-plus';
let userStore = useUserStore()
// let useSetting = useLayOutSettingStore()

//tab默认选中第一个
const activeName = ref('first')

onMounted(()=>{
  // console.log(userStore.$state);
  Object.assign(userForm, userStore.$state)
  console.log(userForm);
})

const userFormRef = ref();
const userForm = reactive({
  username: '',
  name: '',
  gender: 0,
  introduction: '',
  avatar: '',
  file: null
});

const userFormRules = reactive({
  username: [{ required: true, message: "请输入名字", trigger: "blur" }],
  name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
  gender: [{ required: true, message: "请选择性别", trigger: "blur" }],
  introduction: [{ required: true, message: "请输入介绍", trigger: "blur" }],
  avatar: [{ required: true, message: "请上传头像", trigger: "blur" }]
});

//性别选择
const options = [
  { label: "保密", value: 0 },
  { label: "男", value: 1 },
  { label: "女", value: 2 }
];

//每次选择完图片之后的回调
const handleChange = (file:any) => {
  userForm.avatar = URL.createObjectURL(file);
  userForm.file = file;
};

//更新提交
const submitForm = () => {
  userFormRef.value.validate(async (valid:any) => {
    if (valid) {
      
      if(userForm.username != 'admin'){
        const res:any = await upload("/user/upload", userForm);
        console.log(res);
        
        // console.log('center---',res);
        if (res.ActionType == "ok") { 
          console.log(res);
          
          ElNotification({
            type:'success',
            message: '更新成功'
          })
          // this.windows.onload()
        }
      } else {
        ElNotification({
            type:'error',
            message: '很抱歉，为了数据安全，admin相关信息无法修改'
          })
      }
    }
  });
};
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