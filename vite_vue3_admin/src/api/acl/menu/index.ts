import request from '@/utils/request'
// import type { PermisstionResponseData, MenuParams } from './type'

enum API {
  ALLPERMISSTION_URL = '/acl/permission',
  ADDPERMISSTION_URL = '/acl/permission/add'
}

export const reqAllPermisstion = () =>
  request.get<any,any>(API.ALLPERMISSTION_URL)

