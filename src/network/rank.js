import{apiRequest} from "./request";
import{indexRequest} from "./request";

export function getRankList() {
  return apiRequest({
    url:'/top/category'
  })
}

//根据排行榜Id获取歌曲列表
export function getRankSongList(params) {
  return indexRequest({
    url:'/topList',
    params
  })
}