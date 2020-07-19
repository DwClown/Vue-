<template>
  <div class="header">
    <left>
      <div @click="$router.replace('/recommend')" slot="left">
        <trinity-rings-spinner
            :animation-duration="1500"
            :size="44"
            color="#ff1d5e"
        />
      </div>
    </left>
    <center :title="title"/>
    <right/>
  </div>
</template>

<script>
  import {TrinityRingsSpinner} from 'epic-spinners'
  import Left from "./Left";
  import Center from "./Center";
  import Right from "./Right";

  export default {
    name: "Header",
    data() {
      return {
        title: 'Goo Music'
      }
    },
    components: {
      Left,
      Center,
      Right,
      TrinityRingsSpinner
    }
  }
</script>

<style scoped>
  .header {
    z-index: 99;
    background-color: #333333;
    width: 100vw;
    height: 50px;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
  }
</style>