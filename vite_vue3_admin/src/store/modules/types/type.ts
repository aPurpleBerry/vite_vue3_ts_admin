import type { RouteRecordRaw } from "vue-router"
//小仓库对象类型
export interface UserState {
  token: string|null,
  menuRoutes: RouteRecordRaw[],
  username: string,
  name: string,
  gender: number,
  avatar: string,
  introduction: string
}