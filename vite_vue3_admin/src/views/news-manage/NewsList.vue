<template>
  <div class="container">
      <el-card>
          <el-table :data="tableData" style="width: 100%" 
            :header-cell-style="{textAlign: 'center'}" :cell-style="{'text-align':'center'}">
              <el-table-column prop="title"   label="标题" width="500" />
              <el-table-column label="分类">
                  <template #default="scope">
                      {{categoryFormat(scope.row.category)}}
                  </template>
              </el-table-column>

              <el-table-column label="更新时间">
                  <template #default="scope">
                      {{formatTime.getTime(scope.row.editTime)}}
                  </template>
              </el-table-column>
              <el-table-column label="是否发布">
                  <template #default="scope">
                      <el-switch
                          v-model="scope.row.isPublish"
                          :active-value="1"
                          :inactive-value="0"
                          @change="handleSwitchChange(scope.row)"
                      />
                  </template>
              </el-table-column>

              <el-table-column label="操作" width="200">
                  <template #default="scope">
                      <el-button
                          circle
                          :icon="Star"
                          type="success"
                          @click="handlePreview(scope.row)"
                      ></el-button>
                      <el-button
                          circle
                          :icon="Edit"
                           @click="handleEdit(scope.row)"
                      ></el-button>

                      <el-popconfirm
                          title="你确定要删除吗?"
                          confirmButtonText="确定"
                          cancelButtonText="取消"
                          @confirm="handleDelete(scope.row)"
                      >
                          <template #reference>
                              <el-button
                                  circle
                                  :icon="Delete"
                                  type="danger"
                              ></el-button>
                          </template>
                      </el-popconfirm>
                  </template>
              </el-table-column>
          </el-table>
      </el-card>

      <!-- 预览 -->
      <el-dialog  v-model="dialogVisible"  title="预览新闻"  width="50%">
          <div>
              <h2>{{previewData.title}}</h2>
              <div style="font-size:12px;color:gray;">{{formatTime.getTime(previewData.editTime)}}</div>

              <el-divider>
                  <el-icon>
                      <star-filled />
                  </el-icon>
              </el-divider>

              <div  v-html="previewData.content"  class="htmlcontent" ></div>
          </div>
      </el-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import formatTime from "@/utils/formatTime";
import { Star, Edit, Delete, StarFilled } from "@element-plus/icons-vue";
import {useRouter} from 'vue-router'
import { ElMessage } from "element-plus";
import { reqNewsList,reqPubNews,reqDelNews } from '@/api/news'


const router = useRouter()
const tableData = ref([]);
const previewData = ref({});
const dialogVisible = ref(false);

onMounted(() => {
  getTableData();
});

const getTableData = async () => {
  let res = await reqNewsList()
  // const res = await axios.get(`/adminapi/news/list`);
  console.log(res);
  tableData.value = res.data;
};

//格式化分类信息
const categoryFormat = category => {
  const arr = ["最新动态", "典型案例", "通知公告"];
  return arr[category - 1];
};

//开关回调
const handleSwitchChange = async item => {
  // console.log(item)
  let res = await reqPubNews({
    _id: item._id,
    isPublish: item.isPublish
  })
  // let res = await axios.put(`/adminapi/news/publish`, {
  //   _id: item._id,
  //   isPublish: item.isPublish
  // });
  if(item.isPublish === 1) {
    ElMessage({
      type: 'success',
      message: '发布成功'
    })
  } else {
    ElMessage({
      type: 'success',
      message: '取消发布'
    })
  }
  // console.log(item.isPublish);

  await getTableData();
};

//预览回调
const handlePreview = data => {
  // console.log(data)
  previewData.value = data;
  dialogVisible.value = true;
};

//删除回调
const handleDelete =async (item)=>{
  // console.log(item)
  try {
    await reqDelNews(item._id)
    // await axios.delete(`/adminapi/news/list/${item._id}`)
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    await getTableData()
  } catch(err) {
    console.log(err);
  }
}

//编辑回调
const handleEdit = (item)=>{
  //跳转到/news-manage/editnews/:id
  router.push(`/news/newsedit/${item._id}`)
}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 600px;
  overflow: scroll;

}

::v-deep .htmlcontent {
  img {
    max-width: 100%;
  }
}
</style>
