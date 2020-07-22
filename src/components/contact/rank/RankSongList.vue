<template>
  <div class="rankSongList">
    <back-header/>
    <create-loading :size="90" v-if="isLoading"/>
    <div v-else>
      <div class="banner" ref="imgBox">
        <img :src="$route.query.img" ref="img">
      </div>
      <my-pull-up-scroll ref="myPullUpScroll">
        <div class="box">
          <ul>
            <div class="title">{{$route.query.title}}歌单</div>
            <li class="songItem" v-for="item of songList" :key="item.id"
                @click.stop="rankSongClick(item)">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.singer}}</div>
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

  import {getRankSongList} from "network/rank";
  import {getSong} from "assets/js/songClick";

  export default {
    name: "RankSongList",
    data() {
      return {
        isLoading: true,
        rankParams: {
          id: this.$route.query.id,
          page: 0,
          format: 1
        },
        songList: []
      }
    },
    components: {
      BackHeader,
      CreateLoading,
      MyPullUpScroll
    },
    methods: {
      async fetchRankSongList() {
        const res = await getRankSongList(this.rankParams)
        this.songList = this.songList.concat(res.map(item => ({
          id: item.id,
          name: item.name,
          singer: item.singer,
        })))
      },
      async fetchRankSongListData() {
        await this.fetchRankSongList()
        this.isLoading = false
      },
      async pullingUpHandler() {
        this.$refs.myPullUpScroll.isPullUpLoad = true
        if (this.songList.length % 30 === 0) {
          this.rankParams.page++
          await this.fetchRankSongList()
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
      rankSongClick(song){
        getSong(song,this)
      }
    },
    created() {
      this.fetchRankSongListData()
    },
    watch: {
      isLoading() {
        this.$nextTick(() => {
          this.$refs.myPullUpScroll.bscroll.refresh()
          //实现下拉图片放大
          this.$refs.myPullUpScroll.bscroll.on("scroll", o => {
            if (o.y >= 0) {
              this.$refs.imgBox.style = `height:${400 + o.y}px`
              let scale = o.y / 400
              this.$refs.img.style = `transform:scale(${1 + scale})`
            }
          })
          //上拉加载
          this.$refs.myPullUpScroll.bscroll.on('pullingUp', this.pullingUpHandler)
        })
      }
    }
  }
</script>

<style scoped>
  .rankSongList .banner {
    width: 100%;
    height: 400px;
    position: fixed;
    top: 0;
    left: 0;
  }

  .rankSongList .box {
    padding-top: 370px;
  }

  .rankSongList .box ul {
    background-color: #222222;
  }

  .rankSongList .box .title {
    font-size: 20px;
    text-align: center;
    padding: 10px;
    border-bottom: 1px solid #999999;
  }

  .rankSongList ul .songItem {
    height: 43px;
    position: relative;
    margin: 10px 0;
    padding-left: 30px;
  }

  .rankSongList ul .songItem .name {
    width: 220px;
    font-size: 18px;
    line-height: 25px;
    height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .rankSongList ul .songItem .singer {
    width: 120px;
    height: 17px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999999;
    margin-right: 5px;
    font-size: 12px;
  }

  .rankSongList ul .songItem .play {
    position: absolute;
    top: 0;
    right: 90px;
    height: 40px;
  }

  .rankSongList ul .songItem .play span {
    font-size: 20px;
    line-height: 40px;
  }
</style>