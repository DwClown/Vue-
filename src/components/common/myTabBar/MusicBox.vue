<template>
  <div class="musicBox" @click.stop="fullScreen">
    <div class="box">
      <div class="img">
        <img :src="imgUrl">
      </div>
      <div class="name">{{name}}</div>
      <div class="controls">
        <div class="pre" @click.stop="pre">
          <img src="~assets/images/pre.svg">
        </div>
        <div class="play" @click.stop="playClick">
          <img v-if="isPlay" src="~assets/images/stop.svg">
          <img v-else src="~assets/images/play.svg">
        </div>
        <div class="next" @click.stop="next">
          <img src="~assets/images/next.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MusicBox",
    data() {
      return {
        imgUrl: '',
        name: '',
      }
    },
    methods: {
      //当音乐列表长度不为0时，点击展开全屏
      fullScreen() {
        if (this.length !== 0)
          this.$store.commit("changeScreen")
      },
      //点击播放当前索引音乐
      playClick() {
        if (this.length !== 0)
          this.$store.commit("changePlay")
      },
      //上一曲
      pre() {
        this.$store.commit("preSong")
      },
      //下一曲
      next() {
        this.$store.commit("nextSong")
      },
    },
    watch: {
      song(newValue) {
        if (newValue !== null) {
          this.imgUrl = this.song.img
          this.name = newValue.name
        } else {
          this.imgUrl = require('assets/images/music.svg')
          this.name = '咕咚音乐，享受更好的生活'
        }
      },
      length(newValue) {
        if (newValue === 0) {
          this.imgUrl = require('assets/images/music.svg')
          this.name = '咕咚音乐，享受更好的生活'
        }
      }
    },
    //页面初始化时，判断本地是否存储有歌曲，有则返回最上方歌曲 没有则使用默认图片和文字
    created() {
      if (this.song === null) {
        this.imgUrl = require('assets/images/music.svg')
        this.name = '咕咚音乐，享受更好的生活'
      } else {
        this.imgUrl = this.song.img
        this.name = this.song.name
      }
    },
    computed: {
      //返回歌曲图片的名字
      song() {
        return this.$store.getters.getSong
      },
      isPlay() {
        return this.$store.getters.playStatus
      },
      length() {
        return this.$store.getters.length
      },
    }
  }
</script>

<style scoped>
  .musicBox {
    height: 40px;
    width: 100%;
    background-color: #222222;
  }

  .musicBox .box {
    height: 40px;
    width: 110%;
    background-color: #333333;
    border-radius: 20px;
    margin-left: -10%;
    padding-left: 10%;
    display: flex;
    padding-top: 1px;
  }

  .musicBox .box .img {
    width: 40px;
    height: 40px;
    margin-top: -10px;
    margin-left: 10px;
    border-radius: 50%;
    overflow: hidden;
  }

  .musicBox .box .name {
    width: 150px;
    height: 100%;
    margin-left: 10px;
    line-height: 38px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .musicBox .box .controls {
    display: flex;
    width: 150px;
  }

  .musicBox .box .controls div {
    flex: 1;
  }
</style>