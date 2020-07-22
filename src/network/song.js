import {indexRequest} from "./request";
import {apiRequest} from "./request";

//得到音乐图片
export function getSongImg(params) {
  return indexRequest({
    url: '/pic',
    params
  })
}

//得到音乐播放地址
export function getSongUrl(params) {
  return indexRequest({
    url: '/url',
    params
  })
}

//获取音乐歌词
export function getSongLrc(params) {
  return apiRequest({
    url: '/lyric',
    params
  })
}

//获取歌曲的mediaId
export function getSongMediaId(params) {
  return apiRequest({
    url:'/song',
    params
  })
}

//获取歌曲下载链接
export function getSongDownLoad(params) {
return apiRequest({
  url:'/song/url',
  params
})
}