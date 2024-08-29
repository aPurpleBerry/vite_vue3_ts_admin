<template>
  <div class="container">
    <el-card style="box-shadow: none; margin-bottom: 20px;" >
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input placeholder="请你输入搜索职位关键字" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                <el-button type="primary" size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="box-shadow: none; border: none;">
      <el-button type="primary" size="default" icon="Plus" @click="addRole">添加职位</el-button>
      <el-table border style="margin: 10px 0px;" :data="allRole">
          <el-table-column type="index" align="center" label="#"></el-table-column>
          <el-table-column label="ID" align="center" prop="_id" width="300px"></el-table-column>
          <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
          <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
          <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
          <el-table-column label="操作" width="280px" align="center">
              <!-- row:已有的职位对象 -->
              <template #="{ row }">
                  <el-button type="primary" size="small" icon="User" @click="setPermisstion(row)">分配权限</el-button>
                  <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
                  <el-popconfirm :title="`你确定要删除${row.roleName}?`" width="260px" @confirm="removeRole(row._id)">
                      <template #reference>
                          <el-button type="primary" size="small" icon="Delete">删除</el-button>
                      </template>
                  </el-popconfirm>
              </template>
          </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加职位与更新已有职位的结构:对话框 -->
    <el-dialog v-model="dialogVisite" :title="RoleParams.rid ? '更新职位' : '添加职位'">
        <el-form :model="RoleParams" :rule="rules" ref="form">
            <el-form-item label="职位名称" prop="roleName">
                <el-input placeholder="请你输入职位名称" v-model="RoleParams.roleName"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="primary" size="default" @click="dialogVisite = false">取消</el-button>
            <el-button type="primary" size="default" @click="save">确定</el-button>
        </template>
    </el-dialog>
    <!-- 抽屉组件:分配职位的菜单权限与按钮的权限 -->
    <el-drawer v-model="drawer">
      <template #header>
          <h4>分配菜单与按钮的权限</h4>
      </template>
      <template #default>
          <!-- 树形控件 -->
          <el-tree ref="tree" :data="menuArr" show-checkbox node-key="aid" default-expand-all
              :default-checked-keys="selectArr" :props="defaultProps" />
      </template>
      <template #footer>
          <div style="flex: auto">
              <el-button @click="drawer = false">取消</el-button>
              <el-button type="primary" @click="handler">确定</el-button>
          </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { reqAllRoleList,reqUpdateRolePermission,reqUpdateRole,reqAddRole,reqRemoveRole,reqFindRole } from '@/api/acl/role';
import { reqAllPermisstion } from '@/api/acl/menu';
import { ref, onMounted, reactive, nextTick } from 'vue';
import type { RoleData} from '@/api/acl/role/type'
import { ElNotification } from 'element-plus';


let settingStore = useLayOutSettingStore(); //【搜索】-重置
let allRole = ref([]);
let form = ref()
let menuArr = ref([]);//定义数组存储用户权限的数据
let tree = ref<any>();//获取tree组件实例

let dialogVisite = ref<boolean>(false); //控制对话框的显示与隐藏
let drawer = ref<boolean>(false); //控制抽屉显示与隐藏

//树形控件的测试数据
const defaultProps = {
    children: 'children',
    label: 'aname',
}
//准备一个数组:数组用于存储勾选的节点的ID(四级的)
let selectArr = ref<number[]>([]);

//收集新增岗位数据
let RoleParams = reactive<RoleData>({
    roleName: ''
})

//搜索职位关键字
let keyword = ref<string>('');

const reset = () => {
    settingStore.refsh = !settingStore.refsh;
}

onMounted(() => {
    //获取职位请求
    getHasRole();
});

//分配权限按钮的回调
//已有的职位的数据
const setPermisstion = async (row: RoleData) => {
    //抽屉显示出来
    drawer.value = true;

    //收集当前要分类权限的职位的数据
    Object.assign(RoleParams, row);
    // console.log(RoleParams);
    try {
      let allpermissiontree = await reqAllPermisstion()
      // console.log(allpermissiontree);
      //获取到所有的权限
      if(!menuArr.value.length) {
        //@ts-ignore
        menuArr.value.push(allpermissiontree.data.ans2)
      }
      
      //清空选中的节点
      tree.value.setCheckedKeys([])
      //根据角色分配选中的节点
      //@ts-ignore
      selectArr.value=row.level3
      // console.log(selectArr.value);
    } catch(Err) {
      console.log(Err);
    }
    getHasRole()
    //清空数据
    Object.assign(RoleParams, {
        roleName: '',
        id: 0
    });
}

//自定义校验规则的回调
//@ts-ignore
const validatorRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('职位名称至少两位'))
    }
}

//职位校验规则
const rules = {
    roleName: [
        { required: true, trigger: 'blur', validator: validatorRoleName }
    ]
}


//获取全部用户信息的方法
const getHasRole = async () => {
  let result: any = await reqAllRoleList();
  allRole.value = result.data.ans
  allRole.value
  console.log(result);
}

//添加职位按钮的回调
const addRole = () => {
    //对话框显示出来
    dialogVisite.value = true;
    //清空数据
    Object.assign(RoleParams, {
        roleName: '',
        rid: 0
    });
    //清空上一次表单校验错误结果
    nextTick(() => {
        form.value.clearValidate('roleName');
    })
}

const updateRole=async(row:any)=>{
  // console.log('updateRole'); 
  dialogVisite.value = true; //显示出对话框
  Object.assign(RoleParams, row); //存储已有的职位----带有ID的
  
  //清空上一次表单校验错误结果
  nextTick(() => {
      form.value.clearValidate('roleName');
  })

  
}

//添加职位/修改职位 确定按钮的回调
const save = async () => {
  await form.value.validate(); //表单校验结果,结果通过在发请求、结果没有通过不应该在发生请求
  if(RoleParams.rid) {
    let req = {_id:RoleParams._id, roleName:RoleParams.roleName}
    let res = await reqUpdateRole(req)
    try {
      ElNotification({
        type: res.data.ActionType=='ok'?'success':'error',
        message: res.data.message
      })
      getHasRole()

    } catch(err) {
      console.log(err)
    }
  } else {
    console.log('新增');
    console.log(RoleParams.roleName);
    let res = await reqAddRole({roleName:RoleParams.roleName})
    try {
      ElNotification({
        type: 'success',
        message: res.data.message
      })
      getHasRole()

    } catch(err) {
      console.log(err)
    }
  }

  dialogVisite.value = false
}


//分配
const handler = async ()=>{
  let checkedNodes = tree.value.getCheckedNodes()
  let level3 = checkedNodes.filter((item:any)=> item.level==3).map((item:any)=>item.aid)
  // console.log(RoleParams);
  let req = {
    _id: RoleParams._id,
    level3
  } 
  console.log(req);
  if(req._id == '66d0460852b485bba2be883e') {
    ElNotification({
        type: 'error',
        message: '您无权修改管理员权限'
      })
    drawer.value = false
  } else {
    try {
      let result: any = await reqUpdateRolePermission(req);
      console.log(result);
      ElNotification({
        type: 'success',
        message: '更新成功'
      })
      drawer.value = false
    } catch(Err) {
      console.log(Err);
    }
  }
  
}

const removeRole = async (_id:string)=>{
  console.log(_id);
  try {
    if(_id == '66d0460852b485bba2be883e') {
      ElNotification({
          type: 'error',
          message: '无法删除管理员角色'
        })
    } else {
      let result: any = await reqRemoveRole(_id);
      console.log(result);
      if(result.ActionType == 'ok') {
        ElNotification({
          type: 'success',
          message: '删除成功'
        })
      }
      getHasRole()
    }
  } catch(Err) {
    ElNotification({
      type: 'error',
      message: '出错'
    })
  }
}

const search = async () => {
  console.log(keyword.value);
  let result: any = await reqFindRole({roleName: keyword.value});
  allRole.value = result.data.ans
  // allRole.value
  console.log(result);
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: #fff;
  padding: 20px;
}
</style>