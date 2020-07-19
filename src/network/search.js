import {apiRequest} from "./request";
import {indexRequest} from "./request";

export function getHotWord() {
  return apiRequest({
    url: '/search/hot'
  })
}

//根据关键字搜索歌曲
export function getSearchResult(params) {
  return apiRequest({
    url: '/search',
    params
  })
}