<template>
  <div class="recommend">
    <Header/>
    <create-loading v-if="isLoading" :size="90"/>
    <my-scroll ref="myScroll" v-else>
      <div>
        <my-swiper :swiper-list="swiperList" ref="mySwiper"/>
        <album-list :album-list="albumList" @my-refresh="myRefresh"/>
      </div>
    </my-scroll>
  </div>
</template>

<script>
  import Header from "components/common/myHeader/Header";
  import CreateLoading from "components/common/myLoading/CreateLoading";
  import MySwiper from "components/common/mySwiper/MySwiper";
  import MyScroll from "components/common/myScroll/MyScroll";
  import AlbumList from "components/contact/recommend/AlbumList";

  import {getBanner} from "network/recommend";
  import {getHotSongAlbum} from "network/recommend";

  export default {
    name: "Recommend",
    data() {
      return {
        isLoading: true,
        swiperList: [],
        albumList: [],
      }
    },
    methods: {
      async fetchSwiper() {
        const res = await getBanner()
        let list = res.filter(item => item.jump_info.url.length === 14)
        this.swiperList = list.map(item => ({
          id: item.id,
          url: item.jump_info.url,
          img: item.pic_info.url
        }))
      },
      async fetchHotSongList() {
        const res = await getHotSongAlbum()
        this.albumList = res.list.map(item => ({
          id: item.dissid,
          img: item.imgurl,
          name: item.creator.name,
          title: item.dissname
        }))
      },
      async getRecommendData() {
        await this.fetchSwiper()
        await this.fetchHotSongList()
        this.isLoading = false
      },
      myRefresh() {
        this.$nextTick(() => {
          this.$refs.myScroll.bs.refresh()
        })
      }
    },
    components: {
      CreateLoading,
      Header,
      MySwiper,
      MyScroll,
      AlbumList
    },
    created() {
      this.getRecommendData()
    },
  }
</script>

<style scoped>

</style>