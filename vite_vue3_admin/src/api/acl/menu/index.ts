import request from '@/utils/request'
// import type { PermisstionResponseData, MenuParams } from './type'

enum API {
  ALLPERMISSTION_URL = '/acl/permission'
}

export const reqAllPermisstion = () =>
  request.get<any,any>(API.ALLPERMISSTION_URL)