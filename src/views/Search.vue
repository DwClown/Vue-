<template>
  <div class="search">
    <Header/>
    <create-loading v-if="isLoading" :size="90"/>
    <my-scroll ref="myScroll" v-else>
      <search-main :hot-word="hotWord"/>
    </my-scroll>
  </div>
</template>

<script>
  import Header from "components/common/myHeader/Header";
  import CreateLoading from "components/common/myLoading/CreateLoading";
  import MyScroll from "components/common/myScroll/MyScroll";
  import SearchMain from "components/contact/search/SearchMain";

  import {getHotWord} from "network/search";

  export default {
    name: "Search",
    data() {
      return {
        isLoading: true,
        hotWord: []
      }
    },
    methods: {
      async fetchHotWord() {
        const res = await getHotWord()
        this.hotWord = res
      },
      async fetchSearchData() {
        await this.fetchHotWord()
        this.isLoading = false
      }
    },
    components: {
      CreateLoading,
      Header,
      MyScroll,
      SearchMain,
    },
    created() {
      this.fetchSearchData()
    }
  }
</script>

<style scoped>

</style>