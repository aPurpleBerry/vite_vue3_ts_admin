//代表一个职位的ts类型
export interface RoleData {
  id?: number
  _id?: string
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
//全部职位的列表
export type AllRole = RoleData[]