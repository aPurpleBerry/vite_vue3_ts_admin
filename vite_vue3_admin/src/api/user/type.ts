//登录接口参数TS类型
export interface loginForm {
  username: string,
  password: string
}

interface dataType {
  code: number,

  token?: string,
  message?:string
  avatar?: string,
  role?: number,
  gender?: number,
  introduction?: string,
  username?: string
}

//登录接口返回类型 
export interface loginResponseData {
  ActionType: string,
  data: dataType
}
/**~~~~~~~~~~~~~~~~~userinfo~~~~~~~~~~~~~~~~~~~~~~*/
//GET
interface userInfo {
  code: number,
  userId?: number,
  avatar: string,
  username: string,
  name: string,
  password: string,
  gender: number,
  introduction: string,
  // desc: string,
  roles?: number, //错误
  buttons?: string[],
  routes?: string[],
}
// interface user {
//   checkUser: userInfo
// }

//登录接口返回类型
export interface userResponseData {
  ActionType: string,
  data: userInfo
}
