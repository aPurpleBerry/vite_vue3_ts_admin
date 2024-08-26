import request from '@/utils/request'

enum API {
  ALLUSER_URL = '/user/list', //获取全部已有用户账号信息
  DELUSER_URL = '/user/list?id=',
  FINDUSER_URL = '/user/findlist' //查找用户
}

//获取用户账号信息的接口
export const reqUserInfo = () => request.get<any, any>(API.ALLUSER_URL)

//删除某一个账号的信息
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELUSER_URL + userId)


//删除某一个账号的信息
export const reqFindUser = (data:object) =>
  request.post<any, any>(API.FINDUSER_URL, data)

