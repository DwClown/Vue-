<template>
  <div class="searchMain">
    <div class="searchHeader">
      <input type="text" v-model="inputText" placeholder="请输入搜索内容" @keypress="mySearch">
      <span class="iconfont icon-sousuo"></span>
    </div>
    <ul class="wordList">
      <div>热搜词</div>
      <span v-for="item of hotWord" :key="item.n" @click="spanClick(item.k)">{{item.k}}</span>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "SearchMain",
    props: {
      hotWord: {
        type: Array,
        required: true
      },
    },
    data() {
      return {
        inputText: ''
      }
    },
    methods: {
      spanClick(value) {
        this.inputText = value
        this.mySearch()
      },
      mySearch() {
        this.$router.push({
          path: '/searchResult',
          query: {
            keyWord: this.inputText.trim()
          }
        })
      }
    },

  }
</script>

<style scoped>
  .searchMain {
    padding: 10px;
  }

  .searchMain .searchHeader {
    padding: 10px 20px;
    height: 50px;
    position: relative;
  }

  .searchMain .searchHeader input {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: #484848;
    padding: 3px 32px;
  }

  .searchMain .searchHeader span {
    position: absolute;
    top: 16px;
    left: 32px;
  }

  .searchMain .wordList {
    margin-top: 10px;
    padding: 10px;
  }

  .searchMain .wordList div {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .searchMain .wordList span {
    display: inline-block;
    padding: 1px 4px;
    background-color: #565656;
    border-radius: 6px;
    margin: 5px;
    color: #cccccc;
    font-size: 16px
  }
</style>