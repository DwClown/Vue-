import {getSongImg} from "network/song";
import {getSongUrl} from "network/song";
import {getSongLrc} from "network/song";

async function fetchSongImg(id) {
  const res = await getSongImg({id, imgSize: 500, isRedirect: 0})
  return res
}

async function fetchSongUrl(id) {
  const res = await getSongUrl({id, quality: '320', isRedirect: 0})
  return res
}

async function fetchSongLrc(id) {
  const res = await getSongLrc({songmid: id})
  let lrcArr = res.lyric.split("\n")
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
  return lrcArr
}

export async function getSong(song, that) {
  let id = song.id
  let imgRes = await fetchSongImg(id)
  song.img = imgRes[0]
  let urlRes = await fetchSongUrl(id)
  song.url = urlRes[0]
  let lrcRes = await fetchSongLrc(id)
  song.lrc = lrcRes
  that.$store.commit("add", song)
}