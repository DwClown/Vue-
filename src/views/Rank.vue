<template>
  <div class="rank">
    <Header/>
    <create-loading v-if="isLoading" :size="90"/>
    <my-scroll ref="myScroll" v-else>
      <rank-list :rank-list="rankList" @img-load="myRefresh"/>
    </my-scroll>
  </div>
</template>

<script>
  import Header from "components/common/myHeader/Header";
  import CreateLoading from "components/common/myLoading/CreateLoading";
  import MyScroll from "components/common/myScroll/MyScroll";
  import RankList from "components/contact/rank/RankList";

  import {getRankList} from "network/rank";

  export default {
    name: "Rank",
    data() {
      return {
        isLoading: true,
        rankList: []
      }
    },
    methods: {
      async fetchRankList() {
        const res = await getRankList()
        this.rankList = res.map(item => ({
          title: item.title,
          list: item.list.map(value => ({
            id: value.topId,
            img: value.picUrl,
            num: value.listenNum,
            title: value.label,
            time: value.updateTime
          }))
        }))
      },
      async fetchRankData() {
        await this.fetchRankList()
        this.isLoading = false
      },
      myRefresh() {
        this.$nextTick(()=>{
          this.$refs.myScroll.bs.refresh()
        })
      }
    },
    components: {
      CreateLoading,
      Header,
      MyScroll,
      RankList,
    },
    created() {
      this.fetchRankData()
    }
  }
</script>

<style scoped>

</style>