import request from '@/utils/request'

enum API {
  ALLROLE_URL = '/acl/role',//获取全部的职位接口
  ADDROLE_URL = '/acl/addrole', //新增角色/职位
  UPDATEROLE_URL = '/acl/updaterole',//更新职位/角色名称
  UPDATEROLEPERMIS_URL = '/acl/role/updatepermission',
  REMOVEROLE_URL = '/acl/role/remove/',//删除已有的职位
  FINDROLE_URL = '/acl/findrole'//搜索职位
}

// export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
//   request.get<any, any>(
//     API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
//   )

export const reqAllRoleList = () =>
  request.get<any, any>(
    API.ALLROLE_URL
)

export const reqUpdateRolePermission = (data:any) => {
  return request.post<any,any>(API.UPDATEROLEPERMIS_URL, data);
}

//更新职位
export const reqUpdateRole = (data:any) => {
  return request.post<any,any>(API.UPDATEROLE_URL, data);
}

//添加职位
export const reqAddRole = (data: any) => {
  return request.post<any, any>(API.ADDROLE_URL, data)
}

//删除已有的职位
export const reqRemoveRole = (roleId: string) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId)


//添加职位
export const reqFindRole = (data: any) => {
  return request.post<any, any>(API.FINDROLE_URL, data)
}