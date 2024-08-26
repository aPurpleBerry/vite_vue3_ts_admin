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
      <el-table @selection-change="selectChange" style="margin: 10px 0px;" border :data="userArr">
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
  </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '@/store/modules/setting';
import { ref, onMounted, reactive, nextTick } from 'vue';
import { reqUserInfo, reqRemoveUser,reqFindUser } from '@/api/acl/user'
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
        id: 0,
        username: '',
        name: '',
        password: ''
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
    // let result: any = await reqAddOrUpdateUser(userParams);
    // //添加或者更新成功
    // if (result.code == 200) {
    //     //关闭抽屉
    //     drawer.value = false;
    //     //提示消息
    //     ElMessage({ type: 'success', message: userParams.id ? '更新成功' : '添加成功' });
    //     //获取最新的全部账号的信息
    //     // getHasUser(userParams.id ? pageNo.value : 1);
    //     //浏览器自动刷新一次
    //     window.location.reload();
    // } else {
    //     //关闭抽屉
    //     drawer.value = false;
    //     //提示消息
    //     ElMessage({ type: 'error', message: userParams.id ? '更新失败' : '添加失败' });
    // }
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