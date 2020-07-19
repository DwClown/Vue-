import {indexRequest} from "./request";

//获取轮播图
export function getBanner() {
  return indexRequest({
    url: '/banner'
  })
}

//获取推荐专辑
export function getHotSongAlbum() {
  return indexRequest({
    url: '/songList/hot'
  })
}

//根据专辑Id获取专辑详情
export function getAlbumInfo(params) {
  return indexRequest({
    url: '/album',
    params
  })
}

//根据歌单Id获取歌单详情
export function getPlayListInfo(params) {
  return indexRequest({
    url: '/songList',
    params
  })
}
