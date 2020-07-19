import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mySongList: [],
    currentSongIndex: 0,
    isFullScreen: false,
    isPlay: false,
  },
  getters: {
    //歌曲列表长度
    length(state) {
      return state.mySongList.length
    },
    //全屏状态
    screenStatus(state) {
      return state.isFullScreen
    },
    //当前歌曲索引
    currentSongIndex(state) {
      return state.currentSongIndex
    },
    //返回当前歌曲   默认索引0
    getSong(state) {
      if (state.mySongList.length !== 0)
        return state.mySongList[state.currentSongIndex]
      else
        return null
    },
    //返回当前索引歌曲名字和图片 默认索引0
    getSongInfo(state) {
      if (state.mySongList.length !== 0) {
        let info = {
          img: state.mySongList[state.currentSongIndex].img,
          name: state.mySongList[state.currentSongIndex].name
        }
        return info
      } else
        return null
    },
    //播放状态
    playStatus(state) {
      return state.isPlay
    }
  },
  mutations: {
    //网页初始化时读取本地数据
    initSongList(state) {
      state.mySongList = JSON.parse(localStorage.getItem("songList"))
      if (state.mySongList === null) {
        state.mySongList = []
      }
    },
    //添加一首歌曲在曲单顶部
    add(state, song) {
      if (state.mySongList.length !== 0) {
        if (state.mySongList[0].id !== song.id)
          state.mySongList.unshift(song)
      } else {
        state.mySongList.unshift(song)
      }
      state.currentSongIndex = 0
      //本地存储歌曲列表
      localStorage.setItem("songList", JSON.stringify(state.mySongList))
    },
    //改变全屏状态
    changeScreen(state) {
      state.isFullScreen = !state.isFullScreen
    },
    //暂停播放
    stopMusic(state, status) {
      state.isPlay = status
    },
    //改变播放状态
    changePlay(state) {
      state.isPlay = !state.isPlay
    },
    //上一曲
    preSong(state) {
      state.currentSongIndex--
      if (state.currentSongIndex < 0) {
        state.currentSongIndex = state.mySongList.length - 1
      }
    },
    //下一曲
    nextSong(state) {
      state.currentSongIndex++
      if (state.currentSongIndex > state.mySongList.length - 1) {
        state.currentSongIndex = 0
      }
    }
  },
  actions: {},
  modules: {}
})
