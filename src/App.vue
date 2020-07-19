<template>
  <div class="app">
    <keep-alive exclude="SearchResult,Search" include="Singer,Rank">
      <router-view/>
    </keep-alive>
    <Player/>
    <Bottom/>
  </div>
</template>

<script>
  import Bottom from "components/common/myTabBar/Bottom";
  import Player from "components/common/player/Player";
  import FastClick from "fastclick"

  FastClick.attach(document.body)
  export default {
    name: "App",
    data() {
      return {}
    },
    components: {
      Bottom,
      Player
    },
    created() {
      this.$store.commit("initSongList")
    }
  }
</script>

<style scoped>
  @import "assets/css/base.css";

  .app {
    width: 100vw;
    height: 100vh;
    background: #222222;
  }
</style>