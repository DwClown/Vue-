<template>
  <div class="backHeader">
    <left>
      <img src="~assets/images/back.svg" slot="left" @click="$router.go(-1)">
    </left>
    <center :title="title"/>
    <right />
  </div>
</template>

<script>
  import Left from "./Left";
  import Center from "./Center";
  import Right from "./Right";

  export default {
    name: "BackHeader",
    data() {
      return {
        title: 'Goo Music'
      }
    },
    components: {
      Left,
      Center,
      Right,
    }
  }
</script>

<style scoped>
  .backHeader {
    z-index: 90;
    background-color: #333333;
    width: 100vw;
    height: 50px;
    display: flex;
    position: fixed;
    top:0;
    left:0;
  }
</style>