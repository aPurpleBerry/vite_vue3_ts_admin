<template>
    <div class="container">
        <el-form
            ref="newsFormRef"
            :model="newsForm"
            :rules="newsFormRules"
            label-width="80px"
            class="demo-ruleForm"
        >
            <el-form-item
                label="标题"
                prop="title"
            >
                <el-input v-model="newsForm.title" />
            </el-form-item>
            <el-form-item
                label="内容"
                prop="content"
            >
                <editor @event="handleChange" :content="newsForm.content" v-if="newsForm.content"/>
            </el-form-item>

            <el-form-item
                label="类别"
                prop="category"
            >
                <el-select
                    v-model="newsForm.category"
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

            <el-form-item
                label="封面"
                prop="cover"
            >
                <Upload
                    :avatar="newsForm.cover"
                    @kerwinchange="handleUploadChange"
                />
            </el-form-item>

            <el-form-item>
                <el-button
                    type="primary"
                    @click="submitForm()"
                >更新新闻</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref, reactive,onMounted } from "vue";
// import editor from "@/components/editor/Editor";
import editor from "@/components/Editor/index.vue";
import Upload from "@/components/Upload/index.vue";
import upload from '@/utils/upload'
import {reqEditInitrial} from '@/api/news'
// import Upload from "@/components/upload/Upload";
// import upload from '@/util/upload'
import {useRouter,useRoute} from 'vue-router'
import axios from 'axios'
const router = useRouter()
const route = useRoute()
const newsFormRef = ref();
const newsForm = reactive({
  title: "",
  content: "",
  category: 1, //1 最新动态, 2典型案例 3 通知公告
  cover: "",
  file: null,
  isPublish: 0 // 0 未发布, 1 已发布
});

const newsFormRules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  content: [{ required: true, message: "请输入内容", trigger: "blur" }],
  category: [{ required: true, message: "请选择分类", trigger: "blur" }],
  cover: [{ required: true, message: "请上传图片", trigger: "blur" }]
});

//每次editor内容改变的回调
const handleChange = data => {
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
    label: "典型案例",
    value: 2
  },
  {
    label: "通知公告",
    value: 3
  }
];
 
const handleUploadChange = (file)=>{
    newsForm.cover = URL.createObjectURL(file);
    newsForm.file = file
}

const submitForm = ()=>{
    newsFormRef.value.validate(async (valid)=>{
        if(valid){
            // console.log(newsForm)
            //后台通信,
            await upload("/news/list",newsForm)
            router.back()
        }
    })
}

const handleBack=()=>{
    router.back()
}

//取当前页面数据
onMounted(async ()=>{
    // console.log(route.params.id)
  let res = await reqEditInitrial(route.params.id)
  //  const res = await  request.get(`/news/list/${route.params.id}`)
  //  console.log(res);
  //  console.log(res.data[0])
   Object.assign(newsForm,res.data[0])
})
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 600px;
  overflow: scroll;
  background-color: #fff;
  padding: 50px 20px;
}
</style>
