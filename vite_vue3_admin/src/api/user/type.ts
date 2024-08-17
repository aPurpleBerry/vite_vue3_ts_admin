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

//GET
interface userInfo {
  userId: number,
  avatar: string,
  username: string,
  password: string,
  desc: string,
  roles: string[],
  buttons: string[],
  routes: string[],
  token: string,
}
interface user {
  checkUser: userInfo
}

//登录接口返回类型
export interface userResponseData {
  code: number,
  data: user
}
