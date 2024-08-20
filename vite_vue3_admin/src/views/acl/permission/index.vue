<template>
  <div class="container">
    <el-table :data="PermisstionArr" style="width: 100%; margin-bottom: 20px" row-key="aid" 
      border :header-cell-style="{textAlign: 'center'}" >
        <el-table-column label="名称" prop="aname"></el-table-column>
        <el-table-column label="权限值" prop="code"></el-table-column>
        <el-table-column label="修改时间" prop="updatetime"></el-table-column>
        <el-table-column label="操作" width="300px">
            <!-- row:即为已有的菜单对象|按钮的对象的数据 -->
            <template #="{ row, $index }">
                <el-button type="primary" @click="" size="small"
                    :disabled="row.level == 3 ? true : false">{{
                        row.level == 2 ? '添加功能'
                        : '添加菜单' }}</el-button>
                <el-button type="primary" @click="" size="small"
                    :disabled="row.level == 0 ? true : false">编辑</el-button>
                <el-popconfirm :title="`你确定要删除${row.name}?`" width="260px" @confirm="">
                    <template #reference>
                        <el-button type="primary" size="small" :disabled="row.level == 0 ? true : false">删除</el-button>
                    </template>
                </el-popconfirm>

            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
//引入获取菜单请求API
import { reqAllPermisstion} from '@/api/acl/menu';
import { onMounted, ref } from 'vue';
// let PermisstionArr:any = []
let PermisstionArr = ref([]);
//组件挂载完毕
onMounted(() => {
    getHasPermisstion();
});

//获取菜单数据的方法
const getHasPermisstion = async () => {
  try {
    let result: any = await reqAllPermisstion();
    PermisstionArr.value.push(result.data.ans2)
    console.log(PermisstionArr.value);
    
  } catch(error) {
    console.log(error)
  }
}

</script> 

<style scoped lang="scss">
.container {
  height: 98%;
  padding: 20px 50px;
  overflow: scroll;
  background-color: #fff;
}
</style>