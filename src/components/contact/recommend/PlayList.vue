<template>
  <div class="playList">
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

  import {getPlayListInfo} from "network/recommend";

  export default {
    name: "PlayList",
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
      async fetchPlayListInfo() {
        const res = await getPlayListInfo({id: this.$route.query.id})
        this.albumInfo = {
          img: res[0].logo,
          desc: res[0].desc.trim(),
          singer: {
            id: res[0].dirid,
            name: res[0].nickname
          },
          name: res[0].dissname
        }
        this.songList = res[0].songlist.map(item => ({
          id: item.mid,
          name: item.title,
          singer: item.singer.map(value => ({
            id: value.mid,
            name: value.name
          })),
        }))
      },
      async fetchPlayListData() {
        await this.fetchPlayListInfo()
        this.isLoading = false
      },
      myRefresh() {
        this.$nextTick(() => {
          this.$refs.myScroll.bs.refresh()
        })
      }
    },
    created() {
      this.fetchPlayListData()
    }
  }
</script>

<style scoped>

</style>