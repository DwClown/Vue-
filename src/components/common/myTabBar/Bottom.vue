<template>
  <div class="myBottom" >
    <music-box />
    <tab-bar />
  </div>
</template>

<script>
  import TabBar from "components/common/myTabBar/TabBar";
  import MusicBox from "./MusicBox";

  export default {
    name: "Bottom",
    components: {
      TabBar,
      MusicBox
    },

  }
</script>

<style scoped>
  .myBottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 80;
    background-color: #333333;
  }
</style>