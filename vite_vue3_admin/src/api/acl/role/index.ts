import request from '@/utils/request'

enum API {
  //获取全部的职位接口
  ALLROLE_URL = '/acl/role',
}

export const reqAllRoleList = (page: number, limit: number, roleName: string) =>
  request.get<any, any>(
    API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`,
  )