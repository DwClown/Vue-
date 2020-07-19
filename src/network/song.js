import {indexRequest} from "./request";

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
    url:'/url',
    params
  })
}