import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mySongList: [],
    currentSongIndex: 0,
    isFullScreen: false,
    isPlay: false,
    currentLrc: '歌词',
    mode: 2,
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
    //播放状态
    playStatus(state) {
      return state.isPlay
    },
    //返回所有的歌曲
    getSongList(state) {
      if (state.mySongList.length !== 0)
        return state.mySongList
      else
        return null
    },
    //返回当前歌词
    getCurrentLrc(state) {
      return state.currentLrc
    },
    //返回播放模式 0随机 1单曲循环 2列表播放
    getMode(state) {
      return state.mode
    }
  },
  mutations: {
    //网页初始化时读取本地数据
    initSongList(state) {
      state.mySongList = JSON.parse(localStorage.getItem("mySongList"))
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
      localStorage.setItem("mySongList", JSON.stringify(state.mySongList))
    },
    //删除指定位置的歌曲
    delete(state, index) {
      if (state.mySongList.length !== 0) {
        state.mySongList.splice(index, 1)
        //本地存储歌曲列表
        localStorage.setItem("mySongList", JSON.stringify(state.mySongList))
      }
    },
    //改变全屏状态
    changeScreen(state) {
      state.isFullScreen = !state.isFullScreen
    },
    //关闭全屏
    stopScreen(state) {
      state.isFullScreen = false
    },
    //暂停播放
    stopMusic(state, status) {
      state.isPlay = status
    },
    //切换播放状态
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
    },
    //修改当前歌词
    changeCurrentLrc(state, lrc) {
      state.currentLrc = lrc
    },
    //修改播放模式
    changePlayMode(state, mode) {
      state.mode = mode
    },
  },
  actions: {},
  modules: {}
})
