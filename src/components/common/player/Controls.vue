<template>
  <div class="controls">
    <div class="line" ref="line">
      <div class="allLine"></div>
      <div class="currentLine" ref="currentLine">
        <span class="currentPoint" ref="currentPoint"></span>
      </div>
      <span class="currentTime">{{currentTime}}</span>
      <span class="endTime">{{allTime}}</span>
    </div>
    <div class="box">
      <div class="mode" @click="modeClick">
        <span ref="mode" :class="mode[currentMode].class"></span>
      </div>
      <div class="pre" @click.stop="preSong">
        <span class="iconfont icon-yduishangyiqu"></span>
      </div>
      <div class="play" @click.stop="play">
        <span v-if="this.isPlay" class="iconfont icon-bofang"></span>
        <span v-else class="iconfont icon-zanting1"></span>
      </div>
      <div class="next" @click.stop="nextSong">
        <span class="iconfont icon-yduixiayiqu"></span>
      </div>
      <div class="downLoad">
        <span class="iconfont icon-ziyuan-"></span>
      </div>
    </div>
    <iframe style="display:none">
      <audio id="video" ref="video" autoplay :src="musicUrl"></audio>
    </iframe>
  </div>
</template>

<script>

  export default {
    name: "Controls",
    props: {
      musicUrl: {
        type: String,
        required: true,
      },
      lrc: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        allTime: '00:00',
        time: 0,
        currentTime: '0:00',
        status: 2,
        mode: [
          {status: 0, class: "iconfont icon-suijibofang"},
          {status: 1, class: "iconfont icon-danquxunhuan"},
          {status: 2, class: "iconfont icon-icon-"},
        ]
      }
    },
    methods: {
      play() {
        this.$store.commit("changePlay")
        if (this.isPlay)
          this.$refs.video.play()
        else
          this.$refs.video.pause()
      },
      playing() {
        //进度条的改变
        let em = parseInt(this.$refs.video.currentTime / 60)
        let es = parseInt(this.$refs.video.currentTime % 60) < 10 ? '0' +
          parseInt(this.$refs.video.currentTime % 60) : parseInt(this.$refs.video.currentTime % 60)
        this.currentTime = em + ":" + es
        this.$refs.currentLine.style.width =
          `${this.$refs.video.currentTime / this.$refs.video.duration * 100}%`
        //歌词的改变
        if (this.lrc.length === 0) {
          this.$store.commit("changeCurrentLrc", "暂无歌词")
        } else {
          for (let i = 0; i < this.lrc.length; i++) {
            if (i === this.lrc.length - 1 && (this.$refs.video.currentTime + 0.5) >= this.lrc[i].time) {
              this.$store.commit("changeCurrentLrc", this.lrc[i].text)
            } else if ((this.$refs.video.currentTime + 0.5) >= this.lrc[i].time &&
              this.$refs.video.currentTime < this.lrc[i + 1].time) {
              this.$store.commit("changeCurrentLrc", this.lrc[i].text)
            }
          }
        }
      },
      start() {
        let cm = parseInt(this.$refs.video.duration / 60)
        let cs = parseInt(this.$refs.video.duration % 60) < 10 ? '0' +
          parseInt(this.$refs.video.duration % 60) : parseInt(this.$refs.video.duration % 60)
        this.allTime = cm + ':' + cs
        this.time = this.$refs.video.duration
      },
      end() {
        this.currentTime = 0
        this.$refs.currentLine.style.width = "0"
        this.currentTime = "0:00"
        this.$store.commit("changeCurrentLrc", "")
        this.$refs.video.autoplay = true
        //随机播放
        if (this.currentMode === 0) {
          let index = Math.floor(Math.random() * this.length)
          this.$store.commit("playIndexMusic", index)
        } else if (this.currentMode === 1) { //单曲循环
          this.$refs.video.loop = true
        } else {  //列表播放
          this.nextSong()
        }
      },
      moveStart(e) {
        this.$refs.video.pause()
        let startX = e.touches[0].clientX - 30
        let percentage = startX / this.$refs.line.clientWidth
        if (percentage <= 1)
          this.$refs.currentLine.style.width =
            `${percentage * 100}%`
        this.$refs.video.currentTime = this.time * percentage
      },
      move(e) {
        let endX = e.touches[0].clientX - 30
        let percentage = endX / this.$refs.line.clientWidth
        if (percentage < 1 && percentage > 0)
          this.$refs.currentLine.style.width =
            `${percentage * 100}%`
        else if (percentage <= 0) {
          this.$refs.currentLine.style.width = "0"
        } else if (percentage >= 1)
          this.$refs.currentLine.style.width = "100%"
        this.$refs.video.currentTime = this.time * percentage
      },
      moveEnd() {
        this.$refs.video.play()
        this.$store.commit("stopMusic", true)
      },
      preSong() {
        this.$store.commit("preSong")
        this.$refs.video.play()
      },
      nextSong() {
        this.$store.commit("nextSong")
        this.$refs.video.play()
      },
      // waiting() {
      //   this.$store.commit("stopMusic", false)
      //   this.$refs.video.pause()
      // },
      // loaded() {
      //   this.$store.commit("stopMusic", true)
      //   this.$refs.video.play()
      // },
      modeClick() {
        this.status++
        if (this.status > 2)
          this.status = 0
        else if (this.status < 0)
          this.status = 2
        this.$store.commit("changePlayMode", this.status)
      },
    },
    mounted() {
      this.$refs.video.addEventListener("timeupdate", this.playing)
      this.$refs.video.addEventListener("canplay", this.start)
      this.$refs.video.addEventListener("ended", this.end)
      // this.$refs.video.addEventListener("waiting", this.waiting)
      // this.$refs.video.addEventListener("playing", this.loaded)
      this.$refs.line.addEventListener("touchstart", this.moveStart)
      this.$refs.line.addEventListener("touchmove", this.move)
      this.$refs.line.addEventListener("touchend", this.moveEnd)
      this.$store.commit("stopMusic", false)
      this.$refs.video.autoplay = false
    },
    watch: {
      musicUrl() {
        this.$refs.video.currentTime = 0
        this.$refs.currentLine.style.width = "0"
      },
      isPlay(newValue) {
        if (newValue)
          this.$refs.video.play()
        else
          this.$refs.video.pause()
      },
      length(newValue) {
        if (newValue === 0) {
          this.$refs.video.pause()
          this.$refs.video.setAttribute("src", "")
          this.currentTime = 0
          this.$refs.currentLine.style.width = "0"
          this.$store.commit("stopMusic", false)
        }
      },
      currentMode(newValue) {
        //单曲循环
        if (newValue === 1) {
          this.$refs.video.loop = true
          this.$refs.video.play()
          //非单曲循环
        } else {
          this.$refs.video.loop = false
        }
      }
    },
    computed: {
      isPlay() {
        return this.$store.getters.playStatus
      },
      length() {
        return this.$store.getters.length
      },
      currentMode() {
        return this.$store.getters.getMode
      }
    }
  }
</script>

<style scoped>
  .controls {
    padding: 10px;
  }

  .controls .line {
    width: 100%;
    height: 7px;
    position: relative;
    padding-top: 2px;
  }

  .controls .line .allLine {
    height: 3px;
    background-color: #999999;
    border-radius: 20px;
  }

  .controls .line .currentLine {
    height: 3px;
    background-color: #eeeeee;
    border-radius: 20px;
    width: 0;
    position: absolute;
    top: 2px;
    left: 0;
    z-index: 3;
  }

  .controls .line .currentLine .currentPoint {
    position: absolute;
    top: -2px;
    right: -3px;
    display: inline-block;
    width: 7px;
    height: 7px;
    background-color: #fff;
    border-radius: 50%;
  }

  .controls .line span {
    color: #999999;
    position: absolute;
    top: 6px;
  }

  .controls .line .currentTime {
    left: -10px;
  }

  .controls .line .endTime {
    right: -10px;
  }

  .controls .box {
    position: relative;
    margin-top: 30px;
  }

  .controls .box div {
    position: absolute;
    top: 0;
  }

  .controls .box .mode {
    top: 10px;
    left: -5px;
  }

  .controls .box .mode span {
    font-size: 30px;
  }

  .controls .box .downLoad {
    top: 8px;
    right: -10px;
  }

  .controls .box .downLoad span {
    font-size: 35px;
  }

  .controls .box .pre {
    left: 15%;
  }

  .controls .box .play {
    left: 50%;
    transform: translateX(-50%);
  }

  .controls .box .next {
    right: 15%;
  }

  .controls .box div span {
    font-size: 50px;
  }
</style>