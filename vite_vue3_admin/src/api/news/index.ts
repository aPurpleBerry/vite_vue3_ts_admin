//统一管理项目用户相关的接口
import request from "@/utils/request";

//统一管理接口
enum API {
  NEWSLIST_URL = '/news/list',//所有新闻
  PUBNEWS_URL = '/news/publish',//发布
  DELNEWS_URL ='/news/list/', //删除
  EDITINTRI_URL = '/news/list/'
}

export const reqNewsList = () => {
  return request.get<any,any>(API.NEWSLIST_URL);
}

export const reqPubNews = (data:object) => {
  return request.put<any,any>(API.PUBNEWS_URL, data);
}

export const reqDelNews = (id:any) => {
  return request.delete<any,any>(API.DELNEWS_URL+id);
}


export const reqEditInitrial = (id:any) => {
  return request.get<any,any>(API.EDITINTRI_URL+id);
}