//职位数据类型
export interface RoleData {
  _id?: string,
  rid?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}

//全部职位的数组的ts类型
export type Records = RoleData[]