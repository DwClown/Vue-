import {indexRequest} from "./request";

//得到歌手分类
export function getSingerCategory() {
  return indexRequest({
    url: '/artist/category'
  })
}

//根据分类得到歌手列表
export function getSingerList(params) {
  return indexRequest({
    url: '/artist/list',
    params
  })
}

//根据歌手Id获取歌手歌曲列表
export function getSingerSongList(params) {
  return indexRequest({
    url: '/song/artist',
    params
  })
}