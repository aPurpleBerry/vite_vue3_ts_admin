//统一管理项目用户相关的接口
import request from "@/utils/request";

//统一管理接口
enum API {
  NEWSLIST_URL = '/news/list',
  PUBNEWS_URL = '/news/publish',
  DELNEWS_URL ='/news/list/'
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