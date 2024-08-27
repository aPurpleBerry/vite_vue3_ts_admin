<template>
  <div class="container">
    <el-card style="box-shadow: none; margin-bottom: 20px; height: 80px;" >
      <el-form :inline="true" class="form">
            <el-form-item label="用户名:">
                <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="keyword ? false : true" @click="search">搜索</el-button>
                <el-button type="primary" size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="box-shadow: none; border: none;">
      <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
      <!-- table展示用户信息 -->
      <el-table style="margin: 10px 0px;" border :data="userArr">
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column label="#" align="center" type="index"></el-table-column>
          <el-table-column label="ID" align="center" prop="_id" show-overflow-tooltip></el-table-column>
          <el-table-column label="用户名" align="center" prop="username" show-overflow-tooltip></el-table-column>
          <el-table-column label="昵称" align="center" prop="name" show-overflow-tooltip></el-table-column>
          <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
          <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
          <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="300px" align="center">
              <template #="{ row, $index }">
                <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
                <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
                <el-popconfirm :title="`你确定要删除${row.username}?`" width="260px" @confirm="deleteUser(row._id)">
                  <template #reference>
                    <el-button type="primary" size="small" icon="Delete">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
          </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5]"
        :background="true" layout="prev, pager, next, ->,sizes,total" :total="total" @current-change="getHasUser"
      />
    </el-card>

    <!-- 抽屉结构:完成添加新的用户账号|更新已有的账号信息 -->
    <el-drawer v-model="drawer">
        <!-- 头部标题:将来文字内容应该动态的 -->
        <template #header>
            <h4>{{ userParams._id ? '更新用户' : '添加用户' }}</h4>
        </template>
        <!-- 身体部分 -->
        <template #default>
            <el-form :model="userParams" :rules="rules" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请您输入用户姓名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请您输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userParams._id">
                    <el-input placeholder="请您输入用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </div>
        </template>
    </el-drawer>

    <!-- 抽屉结构:用户某一个已有的账号进行职位分配 -->
    <el-drawer v-model="drawer1">
        <template #header>
            <h4>分配角色(职位)</h4>
        </template>
        <template #default>
            <el-form>
                <el-form-item label="用户姓名">
                    <el-input v-model="userParams.username" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="职位列表">
                  <el-radio-group v-model="userRole.roleName" >
                    <el-radio
                      v-for="(item) in allRole"
                      :key="item._id"
                      :label="item.roleName"
                      @change="handleRadioGroup(item)"
                    ></el-radio>
                  </el-radio-group>
                    <!-- <el-checkbox @change="handleCheckAllChange" v-model="checkAll"
                        :indeterminate="isIndeterminate">全选</el-checkbox> -->
                    <!-- 显示职位的的复选框 -->
                    <!-- <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">{{ role.roleName
                        }}</el-checkbox>
                    </el-checkbox-group> -->
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawer1 = false">取消</el-button>
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqUserInfo, reqRemoveUser,reqFindUser,reqAddOrUpdateUser,reqSetUserRole } from '@/api/acl/user'
import { reqAllRoleList } from '@/api/acl/role'
import { ElNotification } from 'element-plus';

let settingStore = useLayOutSettingStore(); //获取模板setting仓库
let userArr = ref([]); //存储全部用户的数组
let drawer = ref<boolean>(false); //定义响应式数据控制抽屉的显示与隐藏
let drawer1 = ref<boolean>(false); //控制分配角色抽屉显示与隐藏
//收集用户信息的响应式数据
let userParams = reactive({
  _id: '',
  username: '',
  name: '',
  password: ''
});
//分页器
let pageNo = ref<number>(1); //默认页码
let pageSize = ref<number>(5);//一页展示几条数据
let total = ref<number>(5);//用户总个数

/*************************用户搜索********************/
let keyword = ref<string>(''); //定义响应式数据:收集用户输入进来的关键字

const reset = ()=> {
  settingStore.refsh = !settingStore.refsh;
}

const search = async ()=>{
  let res = await reqFindUser({username: keyword.value})
  console.log(res);
  total.value = res.data.ans.length
  pageNo.value = 1
  userArr.value = res.data.ans
  console.log(keyword.value);
  keyword.value = '';
}
/********************添加 & 更新 用户***************************/
let formRef = ref<any>(); //获取form组件实例
//校验用户名字回调函数
const validatorUsername = (rule: any, value: any, callBack: any) => {
    //用户名字|昵称,长度至少五位
    if (value.trim().length >= 3) {
        callBack();
    } else {
        callBack(new Error('用户名字至少3位'))
    }
}
//校验用户名字回调函数
const validatorname = (rule: any, value: any, callBack: any) => {
    //用户名字|昵称,长度至少五位
    if (value.trim().length >= 3) {
        callBack();
    } else {
        callBack(new Error('用户昵称至少3位'))
    }
}
const validatorPassword = (rule: any, value: any, callBack: any) => {
    //用户名字|昵称,长度至少五位
    if (value.trim().length >= 6) {
        callBack();
    } else {
        callBack(new Error('用户密码至少六位'))
    }
}
//表单校验的规则对象
const rules = {
    //用户名字
    username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
    //用户昵称
    name: [{ required: true, trigger: 'blur', validator: validatorname }],
    //用户的密码
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
const addUser = () => {
    drawer.value = true;
    //清空数据
    Object.assign(userParams, {
        _id: 0,
        username: '',
        name: '',
        password: '',
        role: 0,
        roleName: ''
    });
    //清除上一次的错误的提示信息
    // nextTick(() => {
    //     formRef.value.clearValidate('username');
    //     formRef.value.clearValidate('name');
    //     formRef.value.clearValidate('password');
    // });
}

const updateUser = (row: any) => {
    drawer.value = true;
    Object.assign(userParams, row); //存储收集已有的账号信息
    //清除上一次的错误的提示信息
    nextTick(() => {
        formRef.value.clearValidate('username');
        formRef.value.clearValidate('name');
    });
}

const cancel = () => {
    drawer.value = false;
}

//保存按钮的回调
const save = async () => {
    await formRef.value.validate()
    //保存按钮:添加新的用户|更新已有的用户账号信息
    console.log(userParams) 
    try{
      let res = await reqAddOrUpdateUser(userParams)
      if(res.ActionType == 'ok') {
        ElNotification({ type: 'success', message: userParams._id ? '更新成功' : '添加成功' });
      }
      drawer.value = false;
      getHasUser();
    } catch(Err) {
      console.log(Err);
      
    }
    
}
/*************************分页逻辑*********************** */
onMounted(() => {
    getHasUser();
});

//获取全部已有的用户信息
const getHasUser = async (pager = 1) => {
    //收集当前页码
    pageNo.value = pager;
    console.log(pageNo.value, pageSize.value)
    
    let result: any = await reqUserInfo()
    total.value = result.data.result.length
    // console.log(result);
    let start:number = (pageNo.value - 1)* pageSize.value
    console.log('start ---- ', start);
    
    
    let len:number = ((total.value-start)>pageSize.value)?pageSize.value:(total.value-start)
    console.log('len ---- ' ,len);
    console.log(result.data.result);
    if((start+pageSize.value-1)<=total.value) {
      userArr.value = result.data.result.slice(start,(start+pageSize.value))
      console.log('-------------------------getHasUser-------userArr--------------');
      console.log(userArr.value);
      
    } else {
      userArr.value = result.data.result.slice(start)
    }
}

const deleteUser= async (id:number)=>{
  console.log(id);
  try {
    let res = await reqRemoveUser(id)
    console.log(res);
    if(res.data.message.acknowledged) {
      ElNotification({
        type: 'success',
        message: '删除成功'
      })
    } else {
      ElNotification({
        type: 'error',
        message: res.data.message
      })
    }
    getHasUser()
  } catch(Err) {
    console.log(Err);
  }
}

/******************** 分配角色 ***************************/
let allRole = ref([]); //存储全部职位的数据
let userRole = reactive({
  role: 0,
  roleName: ""
});

const setRole = async (row: any) => {
  // console.log('!!!!!!!!!!!!!setRole!!!!!!!!!!!!!!!');  
  // console.log(row);
  
    //存储已有的用户信息
    Object.assign(userParams, row);
    // console.log(userParams);
    drawer1.value = true;
    //获取全部的职位的数据与当前用户已有的职位的数据
    let result: any = await reqAllRoleList();
    // console.log(result.data.ans)
    allRole.value = result.data.ans
    userRole.roleName = row.roleName
    userRole.role = row.role
    // console.log('---userRole---');
    // console.log(userRole);
    
    // if (result.code == 200) {
    //     //存储全部的职位
    //     allRole.value = result.data.allRolesList;
    //     //存储当前用户已有的职位
    //     userRole.value = result.data.assignRoles;
    //     //抽屉显示出来
    //     drawer1.value = true;
    // }

}

const handleRadioGroup=(item:any)=>{
  // console.log($event, item);
  // userRole.value = item
  // console.log(item);
  userRole.role = item.rid
  userRole.roleName = item.roleName
  // console.log(userRole);
  
}

//确定按钮的回调(分配职位)
const confirmClick = async () => {
    //收集参数
    let data = {
      userId: userParams._id,
      role: userRole.role,
      roleName: userRole.roleName
    }
    console.log(data);
    
    //分配用户的职位
    try {
      let result: any = await reqSetUserRole(data);
      if(result.ActionType == 'ok') {
        ElNotification({
          type: 'success',
          message: '分配角色成功'
        })
      }
    } catch(Err) {
      console.log(Err);  
    }
    drawer1.value = false;
    getHasUser()
    // if (result.code == 200) {
    //     //提示信息
    //     ElNotification({ type: 'success', message: '分配职务成功' });
    //     //关闭抽屉
    //     drawer1.value = false;
    //     //获取更新完毕用户的信息,更新完毕留在当前页
    //     getHasUser();

    // }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 600px;
  overflow: scroll;
  background-color: #fff;
  padding: 20px;
}
</style>