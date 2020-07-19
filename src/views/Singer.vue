<template>
  <div class="singer">
    <Header/>
    <create-loading :size="90" v-if="isLoading"/>
    <div v-else>
      <my-pull-up-scroll ref="myPullScroll">
        <div>
          <singer-category :singer-category="singerCategory" @category="categoryIndex"/>
          <singer-list :singer-list="singerList" ref="singerList" @img-load="myRefresh"/>
        </div>
      </my-pull-up-scroll>
      <div class="goTop" @click="goTop">
        <img src="~assets/images/goTop.svg">
      </div>
    </div>
  </div>
</template>

<script>
  import Header from "components/common/myHeader/Header";
  import MyPullUpScroll from "components/common/myScroll/MyPullUpScroll";
  import SingerCategory from "components/contact/singer/SingerCategory";
  import CreateLoading from "components/common/myLoading/CreateLoading";
  import SingerList from "components/contact/singer/SingerList";


  import {getSingerCategory} from "network/singer";
  import {getSingerList} from "../network/singer";

  export default {
    name: "Singer",
    components: {
      Header,
      MyPullUpScroll,
      SingerCategory,
      CreateLoading,
      SingerList,
    },
    data() {
      return {
        singerList: [],
        singerCategory: {},
        isLoading: true,
        category: {
          sexId: -100,
          areaId: -100,
          genre: -100,
          page: 1
        }
      }
    },
    methods: {
      async fetchSingerList() {
        const res = await getSingerList(this.category)
        this.singerList = this.singerList.concat(res.map(item => ({
          id: item.singer_mid,
          img: item.singer_pic.replace(/.webp/g, '.jpg'),
          name: item.singer_name
        })))
      },
      async fetchSingerCategory() {
        const res = await getSingerCategory()
        this.singerCategory = {
          sexId: res.sex,
          areaId: res.area,
          genre: res.genre
        }
      },
      async fetchSingerData() {
        await this.fetchSingerCategory()
        await this.fetchSingerList()
        this.isLoading = false
      },
      async categoryIndex(category) {
        this.$refs.myPullScroll.isPullUpLoad = false
        this.singerList = []
        this.category.sexId = this.singerCategory.sexId[category.sex].id
        this.category.areaId = this.singerCategory.areaId[category.area].id
        this.category.genre = this.singerCategory.genre[category.genre].id
        this.category.page = 1
        this.$refs.singerList.isLoading = true
        await this.fetchSingerList()
        this.$refs.singerList.isLoading = false
      },
      myRefresh() {
        this.$nextTick(() => {
          this.$refs.myPullScroll.bscroll.refresh()
        })
      },
      async pullingUpHandler() {
        this.$refs.myPullScroll.isPullUpLoad = true
        if (this.singerList.length % 80 === 0) {
          this.category.page++
          await this.fetchSingerList()
        } else {
          await new Promise(resolve => {
            setTimeout(() => {
              resolve()
            }, 800)
          })
        }
        this.$refs.myPullScroll.bscroll.finishPullUp()
        this.$refs.myPullScroll.bscroll.refresh()
        this.$refs.myPullScroll.isPullUpLoad = false
      },
      goTop() {
        this.$refs.myPullScroll.bscroll.scrollTo(0, 0, 1000)
      }
    },
    created() {
      this.fetchSingerData()
    },
    watch: {
      isLoading() {
        this.$nextTick(() => {
          this.$refs.singerList.isLoading = false
          this.$refs.myPullScroll.bscroll.on('pullingUp', this.pullingUpHandler)
        })
      }
    }
  }
</script>

<style scoped>
  .singer {
    width: 100vw;
    height: 100vh;
  }

  .singer .goTop {
    position: fixed;
    bottom: 100px;
    right: 35px;
    width: 35px;
    height: 35px;
    background-color: #333333;
    border-radius: 50%;
    padding-left: 2px;
  }

  .singer .goTop img {
    display: block;
    width: 25px;
    height: 25px;
    margin: 5px auto;
  }
</style>