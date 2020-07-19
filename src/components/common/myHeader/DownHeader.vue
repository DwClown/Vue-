<template>
  <div class="downHeader">
    <left>
      <img src="~assets/images/down.svg" slot="left" >
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
    name: "DownHeader",
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
  .downHeader {
    background-color: #333333;
    width: 100vw;
    height: 50px;
    display: flex;
  }
</style>