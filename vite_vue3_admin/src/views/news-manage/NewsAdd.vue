<template>
  <div class="newsadd">
    <el-form
      ref="newsFormRef"
      :model="newsForm"
      :rules="newsFormRules"
      label-width="80px"
      class="demo-ruleForm"
    >
    <!-- 标题 -->
      <el-form-item  label="标题"  prop="title">
        <el-input v-model="newsForm.title" style="width: 1000px;"/>
      </el-form-item>
    <!-- 富文本 -->
      <el-form-item  label="内容"  prop="content">
        <editor @event="handleChange"></editor>
      </el-form-item>
    <!-- 类别 -->
      <el-form-item  label="类别"  prop="category">
        <el-select
          v-model="newsForm.category"
          class="m-2"
          placeholder="Select"
          style="width:1000px"
        >
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-form-item>
    <!-- 封面图片 -->
      <el-form-item  label="封面"  prop="cover">
        <Upload
          :avatar="newsForm.cover"
          @kerwinchange="handleUploadChange"
        />
      </el-form-item>
    <!-- 添加新闻 -->
      <el-form-item>
        <el-button
            type="primary"
            @click="submitForm()"
        >添加新闻</el-button>
     </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
//@ts-ignore
import editor from "@/components/Editor/index.vue";
//@ts-ignore
import Upload from "@/components/Upload/index.vue";
import upload from '@/utils/upload'

const newsFormRef = ref();
const newsForm = reactive({
  title: "",
  content: "",
  category: 1, //1 最新动态, 2典型案例 3 通知公告
  cover: "", //封面图片
  file: null, //图片对象
  isPublish: 0 // 0 未发布, 1 已发布
});

const newsFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请上传图片", trigger: "blur" }]
});

//每次editor内容改变的回调
const handleChange = (data:any) => {
  // console.log(data)
  newsForm.content = data;
};

//新闻类别
const options = [
  {
    label: "最新动态",
    value: 1
  },
  {
    label: "公司通告",
    value: 2
  },
  {
    label: "产品动态",
    value: 3
  }
];

const handleUploadChange = (file:any)=>{
  newsForm.cover = URL.createObjectURL(file);
  newsForm.file = file
}

const submitForm = ()=>{
  newsFormRef.value.validate(async (valid:any)=>{
      if(valid){
          console.log(newsForm)
          // //后台通信,
          await upload("/adminapi/news/add",newsForm)
          // router.push(`/news-manage/newslist`)
      }
  })
}
</script>


<style scoped>
.newsadd {
  background-color: #fff;
  padding: 20px;
  height: 1000px;
}
</style>