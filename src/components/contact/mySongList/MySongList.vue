<template>
  <div class="mySongList">
    <back-header/>
    <my-scroll>
      <ul>
        <li class="songItem" v-for="(item,index) of songList" :key="index">
          <div class="name">{{item.name}}</div>
          <div class="singer">
            <span v-for="value of item.singer" :key="value.id">{{value.name}}</span>
          </div>
          <div class="delete" @click.stop="myDelete(index)">
            <img src="~assets/images/delete.svg">
          </div>
        </li>
      </ul>
    </my-scroll>
  </div>
</template>

<script>
  import BackHeader from "components/common/myHeader/BackHeader";
  import MyScroll from "components/common/myScroll/MyScroll";

  export default {
    name: "MySongList",
    data() {
      return {
        songList: []
      }
    },
    components: {
      BackHeader,
      MyScroll
    },
    methods: {
      myDelete(index) {
        this.$store.commit("delete", index)
        this.$store.commit("stopMusic", false)
      }
    },
    created() {
      this.songList = this.$store.getters.getSongList
    }
  }
</script>

<style scoped>
  .mySongList {
    width: 100vw;
    height: 100vh;
    z-index: 85;
    background-color: #222222;
    position: fixed;
    top: 0;
    left: 0;
  }

  .mySongList .songItem {
    height: 50px;
    padding: 10px 20px;
    display: flex;
  }

  .mySongList .songItem div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 30px;
  }

  .mySongList .songItem .name {
    width: 120px;
    font-size: 16px;
    color: yellow;
    margin-right: 20px;
  }

  .mySongList .songItem .singer {
    width: 150px;
  }

  .mySongList .songItem .singer span {
    font-size: 16px;
    color: yellow;
  }

  .mySongList .songItem .delete {
    padding: 5px;
    width: 30px;
    height: 30px;
    margin-left: 20px;
    line-height: 0;
  }

  .mySongList .songItem .delete img {
    width: 100%;
    height: 100%;
  }
</style>