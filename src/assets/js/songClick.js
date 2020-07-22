import {getSongImg} from "network/song";
import {getSongUrl} from "network/song";
import {getSongLrc} from "network/song";
import {getSongMediaId} from "network/song";
import {getSongDownLoad} from "network/song";


export async function getSong(song, that) {
  let id = song.id
  let imgRes = await getSongImg({id, imgSize: 500, isRedirect: 0})
  song.img = imgRes[0]

  let urlRes = await getSongUrl({id, quality: '320', isRedirect: 0})
  song.url = urlRes[0]

  let songInfo = await getSongMediaId({songmid: id})
  let mediaId = songInfo.track_info.file.media_mid

  let downLoad = await getSongDownLoad({id, type: '320', mediaId})
  song.downLoad = downLoad

  let lrcRes = await getSongLrc({songmid: id})
  let lrcArr = lrcRes.lyric.split("\n")
  lrcArr.splice(0, 5)
  for (let i in lrcArr) {
    let lrcTemp = {}
    //[00:00.00]谪仙 - 伊格赛听/叶里
    let time = lrcArr[i].substring(lrcArr[i].indexOf('[') + 1, lrcArr[i].indexOf(']')).split(":")
    // 00
    let m = parseInt(time[0]) * 60
    //00.00
    let s = parseFloat(time[1])
    lrcTemp.time = m + s
    //谪仙 - 伊格赛听/叶里
    lrcTemp.text = lrcArr[i].substring(lrcArr[i].indexOf(']') + 1, lrcArr[i].length)
    lrcArr[i] = lrcTemp
  }
  song.lrc = lrcArr
  that.$store.commit("add", song)

  let video = document.querySelector("#video")
  await that.$store.commit("stopMusic", true)
  video.play()

}