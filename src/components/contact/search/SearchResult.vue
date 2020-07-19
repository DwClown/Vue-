<template>
  <div class="searchResult">
    <back-header/>
    <div class="searchHeader">
      <div class="top">
        <input type="text" v-model="inputText" @keypress="mySearch">
        <span class="iconfont icon-sousuo"></span>
      </div>
      <div class="title">
        <div>歌曲名</div>
        <div>歌手</div>
      </div>
    </div>
    <create-loading v-if="isLoading" :size="90"/>
    <my-pull-up-scroll ref="myPullUpScroll" v-else>
      <create-loading v-if="isSearchLoading" :size="60"/>
      <div v-else class="result">
        <li v-for="item of songList" :key="item.key" @click.stop="resultSongClick(item)">
          <div class="name">{{item.name}}</div>
          <div class="singer">
            <span v-for="value of item.singer" :key="value.id">{{value.name}}</span>
          </div>
        </li>
      </div>
    </my-pull-up-scroll>
  </div>
</template>

<script>
  import BackHeader from "components/common/myHeader/BackHeader";
  import CreateLoading from "components/common/myLoading/CreateLoading";
  import MyPullUpScroll from "components/common/myScroll/MyPullUpScroll";

  import {getSearchResult} from "network/search";
  import {getSongInfo} from "assets/js/getSong";

  export default {
    name: "SearchResult",
    data() {
      return {
        isLoading: true,
        isSearchLoading: false,
        inputText: '',
        songList: [],
        searchParams: {
          key: '',
          pageNo: 1
        },
        total: 0
      }
    },
    components: {
      BackHeader,
      CreateLoading,
      MyPullUpScroll
    },
    methods: {
      async fetchSearchResult() {
        const res = await getSearchResult(this.searchParams)
        this.songList = this.songList.concat(res.list.map(item => ({
          key: item.songid,
          id: item.songmid,
          name: item.songname,
          singer: item.singer.map(value => ({
            id: value.mid,
            name: value.name
          }))
        })))
      },
      async fetchSearchData() {
        await this.fetchSearchResult()
        this.isLoading = false
      },
      async pullingUpHandler() {
        this.$refs.myPullUpScroll.isPullUpLoad = true
        if (this.songList.length % 20 === 0) {
          this.searchParams.pageNo++
          await this.fetchSearchResult()
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
      async mySearch() {
        this.isSearchLoading = true
        this.searchParams.key = this.inputText
        this.searchParams.pageNo = 1
        this.songList = []
        await this.fetchSearchResult()
        this.isSearchLoading = false
        this.myRefresh()
      },
      myRefresh() {
        this.$nextTick(() => {
          this.$refs.myPullUpScroll.bscroll.refresh()
        })
      },
      resultSongClick(song) {
        getSongInfo(this, song)
      }
    },
    created() {
      this.inputText = this.$route.query.keyWord
      this.searchParams.key = this.inputText
      this.fetchSearchData()
    },
    watch: {
      isLoading() {
        this.myRefresh()
        this.$nextTick(() => {
          this.$refs.myPullUpScroll.bscroll.on('pullingUp', this.pullingUpHandler)
        })
      }
    }
  }
</script>

<style scoped>
  .searchResult {
    padding-top: 1px;
  }

  .searchResult .searchHeader {
    position: fixed;
    top: 50px;
    left: 0;
    width: 100%;
    background-color: #222222;
    z-index: 20;
    padding-top: 10px;
  }

  .searchResult .searchHeader .top {
    width: 100%;
    padding: 10px 30px;
    height: 50px;
    z-index: 20;
  }

  .searchResult .searchHeader .top input {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: #484848;
    padding: 3px 32px;
  }

  .searchResult .searchHeader .top span {
    position: absolute;
    top: 27px;
    left: 40px;
  }

  .searchResult .searchHeader .title {
    display: flex;
    padding: 5px 25px;
  }

  .searchResult .searchHeader .title div {
    font-size: 18px;
    flex: 1;
  }

  .searchResult .result {
    padding: 90px 25px 0;
  }


  .searchResult .result li {
    display: flex;
    height: 30px;
    line-height: 30px;
  }

  .searchResult .result li div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .searchResult .result li .name {
    font-size: 16px;
    width: 40%;
    margin-right: 10%;
  }

  .searchResult .result li .singer {
    flex: 1;
  }

  .searchResult .result li .singer span {
    display: inline-block;
    height: 30px;
    margin-right: 6px;
    font-size: 16px;
    line-height: 30px;
  }
</style>