<template>
  <div class="player" ref="player" >
      <div class="downHeader">
        <left>
          <img src="~assets/images/down.svg" slot="left" @click="downClick">
        </left>
        <center :title="title"/>
        <right/>
      </div>
      <div class="box">
        <play-main :song-info="songInfo" v-if="Object.keys(songInfo).length"/>
        <controls :music-url="songUrl" :lrc="songLrc"  :name="name" :song-down-load="songDownLoad"/>
      </div>
  </div>
</template>

<script>
  import DownHeader from "../myHeader/DownHeader";
  import PlayMain from "./PlayMain";
  import Controls from "./Controls";
  import Left from "../myHeader/Left";
  import Center from "../myHeader/Center";
  import Right from "../myHeader/Right";

  export default {
    name: "Player",
    data() {
      return {
        isPlay: false,
        title: 'Goo Music',
        songInfo: {},
        songUrl: '',
        songLrc: [],
        songDownLoad:'',
        name:'',
      }
    },
    methods: {
      downClick() {
        this.$refs.player.style.height = '0'
        this.$refs.player.style.top = '100vh'
        this.$store.commit("changeScreen")
      },
    },
    components: {
      DownHeader,
      Controls,
      PlayMain,
      Left,
      Center,
      Right,
    },
    watch: {
      isFullScreen(newValue) {
        if (newValue) {
          this.$refs.player.style.height = '100vh'
          this.$refs.player.style.top = '0'
        } else {
          this.$refs.player.style.height = '0'
          this.$refs.player.style.top = '100vh'
        }
      },
      song(newValue) {
        if (newValue !== null) {
          this.songInfo = {
            id: newValue.id,
            img: newValue.img,
            name: newValue.name,
            singer: newValue.singer,
          }
          this.songUrl = newValue.url
          this.songLrc = newValue.lrc
          this.songDownLoad = newValue.downLoad
          this.name = newValue.name
        }
      }
    },
    mounted() {
      if (!this.isFullScreen) {
        this.$refs.player.style.height = '0'
        this.$refs.player.style.top = '100vh'
      }
      if (this.song !== null) {
        this.songInfo = {
          id: this.song.id,
          img: this.song.img,
          name: this.song.name,
          singer: this.song.singer,
        }
        this.songUrl = this.song.url
        this.songLrc = this.song.lrc
        this.songDownLoad = this.song.downLoad
        this.name = this.song.name
      }else{
        console.log("没有歌曲");
      }
    },
    computed: {
      isFullScreen() {
        return this.$store.getters.screenStatus
      },
      length() {
        return this.$store.getters.length
      },
      song() {
        return this.$store.getters.getSong
      },
    },
  }
</script>

<style scoped>
  .player {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #222222;
    z-index: 100;
    overflow: hidden;
    transition: all 300ms ease;
  }

  .player .downHeader {
    background-color: #333333;
    width: 100vw;
    height: 50px;
    display: flex;
  }

  .player .box {
    padding: 30px;
  }
</style>