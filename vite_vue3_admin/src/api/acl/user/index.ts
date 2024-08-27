import request from '@/utils/request'

enum API {
  ALLUSER_URL = '/user/list', //获取全部已有用户账号信息
  DELUSER_URL = '/user/list?id=',
  FINDUSER_URL = '/user/findlist', //查找用户
  ADDUSER_URL = '/user/adduser', //添加一个新的用户账号
  UPDATEUSER_URL = '/user/update', //更新已有的用户账号
  SETROLE_URL = '/user/doAssignRole',//给已有的用户分配角色接口
}

//获取用户账号信息的接口
export const reqUserInfo = () => request.get<any, any>(API.ALLUSER_URL)

//删除某一个账号的信息
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELUSER_URL + userId)


//删除某一个账号的信息
export const reqFindUser = (data:object) =>
  request.post<any, any>(API.FINDUSER_URL, data)

//添加用户与更新已有用户的接口
export const reqAddOrUpdateUser = (data: any) => {
  //携带参数有ID更新
  if (data._id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data)
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data)
  }
}

//分配职位
export const reqSetUserRole = (data: any) =>
  request.post<any, any>(API.SETROLE_URL, data)