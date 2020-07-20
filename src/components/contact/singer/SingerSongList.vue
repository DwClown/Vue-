<template>
  <div class="singerInfo">
    <back-header/>
    <create-loading v-if="isLoading" :size="90"/>
    <div v-else>
      <div class="images" ref="imgBox">
        <img ref="img" :src="ImageUrl">
      </div>
      <my-pull-up-scroll ref="myPullUpScroll">
        <div class="box">
          <ul>
            <div class="title">歌手歌单</div>
            <li class="songItem" v-for="item of songList" :key="item.id"
                @click="singerSongClick(item)">
              <div class="name">{{item.name}}</div>
              <div class="singer">
                <span v-for="value of item.singer" :key="value.id">{{value.name}}</span>
              </div>
              <div class="play">
                <span class="iconfont icon-zanting1"></span>
              </div>
            </li>
          </ul>
        </div>
      </my-pull-up-scroll>
    </div>
  </div>
</template>

<script>
  import BackHeader from "components/common/myHeader/BackHeader";
  import CreateLoading from "components/common/myLoading/CreateLoading";
  import MyPullUpScroll from "components/common/myScroll/MyPullUpScroll";

  import {getSingerSongList} from "network/singer";
  import {getSong} from "assets/js/songClick";

  export default {
    name: "SingerInfo",
    data() {
      return {
        isLoading: true,
        page: 1,
        songList: [],
        startY: 0,
        isTouchStart: false,
        ImageUrl: `https://y.gtimg.cn/music/photo_new/T001R500x500M000${this.$route.query.id}.jpg`
      }
    },
    methods: {
      async fetchSingerSongList() {
        const res = await getSingerSongList({id: this.$route.query.id, page: this.page})
        this.songList = this.songList.concat(res.map(item => ({
          id: item.musicData.songmid,
          name: item.musicData.songname,
          singer: item.musicData.singer.map(value => ({
            id: value.mid,
            name: value.name
          }))
        })))
      },
      async fetchSingerSongListData() {
        await this.fetchSingerSongList()
        this.isLoading = false
      },
      async pullingUpHandler() {
        this.$refs.myPullUpScroll.isPullUpLoad = true
        if (this.songList.length % 30 === 0) {
          this.page++
          await this.fetchSingerSongList()
        } else {
          await new Promise(resolve => {
            setTimeout(() => {
              resolve()
            }, 800)
          })
        }
        this.$refs.myPullUpScroll.bscroll.finishPullUp()
        this.$refs.myPullUpScroll.bscroll.refresh()
        this.$refs.myPullUpScroll.isPullUpLoad = false
      },
      singerSongClick(song){
        getSong(song,this)
      }
    },
    components: {
      BackHeader,
      CreateLoading,
      MyPullUpScroll,
    },
    created() {
      this.fetchSingerSongListData()
    },
    watch: {
      isLoading() {
        this.$nextTick(() => {
          this.$refs.myPullUpScroll.bscroll.refresh()
          //上拉加载
          this.$refs.myPullUpScroll.bscroll.on('pullingUp', this.pullingUpHandler)
          //实现下拉图片放大
          this.$refs.myPullUpScroll.bscroll.on("scroll", o => {
            if (o.y >= 0) {
              this.$refs.imgBox.style = `height:${400 + o.y}px`
              let scale = o.y / 400
              this.$refs.img.style = `transform:scale(${1 + scale})`
            }
          })
        })
      }
    }
  }

</script>

<style scoped>
  .singerInfo .images {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 400px;
  }

  .singerInfo .box {
    padding-top: 370px;
  }

  .singerInfo ul {
    padding: 10px;
    background-color: #222222;
    z-index: 20;
  }

  .singerInfo ul .title {
    font-size: 20px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #999999;
  }

  .singerInfo ul .songItem {
    height: 43px;
    position: relative;
    margin: 10px 0;
    padding-left: 30px;
  }

  .singerInfo ul .songItem .name {
    width: 220px;
    font-size: 18px;
    line-height: 25px;
    height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singerInfo ul .songItem .singer {
    width: 120px;
    height: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singerInfo ul .songItem .singer span {
    font-size: 12px;
    line-height: 15px;
    color: #999999;
    margin-right: 5px;
  }

  .singerInfo ul .songItem .play {
    position: absolute;
    top: 0;
    right: 90px;
    height: 40px;
  }

  .singerInfo ul .songItem .play span {
    font-size: 20px;
    line-height: 40px;
  }
</style>