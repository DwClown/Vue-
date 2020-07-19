import {getSongImg} from "network/song";
import {getSongUrl} from "../../network/song";

async function fetchSongImg(id) {
  const res = await getSongImg({
    id,
    imgSize: 500,
    isRedirect: 0
  })
  return res
}

async function fetchSongUrl(id) {
  const res = await getSongUrl({
    id,
    quality: 'm4a',
    isRedirect: 0
  })
  return res
}

//得到完整歌曲完整信息
export async function getSongInfo(that, song) {
  let id = song.id
  let imgRes = await fetchSongImg(id)
  let urlRes = await fetchSongUrl(id)
  song.img = imgRes[0]
  song.url = urlRes[0]
  that.$store.commit("add", song)
}