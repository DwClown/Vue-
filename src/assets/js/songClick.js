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

export async function getSong(song,that) {
  let id = song.id
  let imgRes = await fetchSongImg(id)
  song.img = imgRes[0]
  let urlRes = await fetchSongUrl(id)
  song.url = urlRes[0]
  that.$store.commit("add", song)
}