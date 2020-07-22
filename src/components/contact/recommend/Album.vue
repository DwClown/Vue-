<template>
  <div class="album">
    <back-header/>
    <create-loading v-if="isLoading" :size="90"/>
    <my-scroll ref="myScroll" v-else>
      <div>
        <album-info :album-info="albumInfo" @img-Load="myRefresh" @show-more="myRefresh"/>
        <album-song-list :song-list="songList"/>
      </div>
    </my-scroll>
  </div>
</template>

<script>
  import BackHeader from "components/common/myHeader/BackHeader";
  import MyScroll from "components/common/myScroll/MyScroll";
  import CreateLoading from "components/common/myLoading/CreateLoading";
  import AlbumInfo from "./AlbumInfo";
  import AlbumSongList from "./AlbumSongList";

  import {getAlbumInfo} from "network/recommend";

  export default {
    name: "Album",
    components: {
      BackHeader,
      MyScroll,
      CreateLoading,
      AlbumInfo,
      AlbumSongList
    },
    data() {
      return {
        isLoading: true,
        albumInfo: {},
        songList: [],
      }
    },
    methods: {
      async fetchAlbumInfo() {
        const res = await getAlbumInfo({id: this.$route.query.id})
        this.albumInfo = {
          img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.$route.query.id}.jpg?max_age=2592000`,
          desc: res.getAlbumDesc.Falbum_desc.trim(),
          singer: {
            id: res.getSingerInfo.Fsinger_mid,
            name: res.getSingerInfo.Fsinger_name
          },
          name: res.getAlbumInfo.Falbum_name,
        }
        this.songList = res.getSongInfo.map(item => ({
          id: item.songmid,
          name: item.songname,
          singer: item.singer.map(value => ({
            id: value.mid,
            name: value.name
          })),
        }))
      },
      async fetchAlbumData() {
        await this.fetchAlbumInfo()
        this.isLoading = false
      },
      myRefresh() {
        this.$nextTick(() => {
          this.$refs.myScroll.bs.refresh()
        })
      }
    },
    created() {
      this.fetchAlbumData()
    }
  }
</script>

<style scoped>

</style>