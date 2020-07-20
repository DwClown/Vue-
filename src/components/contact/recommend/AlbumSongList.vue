<template>
  <div class="albumSongList">
    <div class="header">
      <div>歌曲</div>
      <div>歌手</div>
    </div>
    <ul>
      <li class="songItem" v-for="item of songList" :key="item.id" @click.stop="songClick(item)">
        <div class="name">{{item.name}}</div>
        <div class="singer">
          <span v-for="value of item.singer" :key="value.id">{{value.name}}</span>
        </div>
        <div class="play">
          <span class="iconfont icon-zanting1"></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getSong} from "assets/js/songClick";

  export default {
    name: "AlbumSongList",
    props: {
      songList: {
        type: Array,
        required: true,
        songImg: '',
        songUrl: '',
      }
    },
    methods: {
      songClick(song) {
        getSong(song, this)
      }
    }
  }
</script>

<style scoped>
  .albumSongList {
    padding: 10px 20px;
  }

  .albumSongList .header {
    display: flex;
  }

  .albumSongList .header div {
    flex: 1;
    font-size: 18px;
    padding-bottom: 5px;
    border-bottom: 1px solid #282828;
  }

  .albumSongList ul {
    padding-bottom: 15px;
  }

  .albumSongList .songItem {
    display: flex;
    height: 30px;
    line-height: 30px;
    position: relative;
    margin-bottom: 5px;
  }

  .albumSongList .songItem div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .albumSongList .songItem .name {
    font-size: 16px;
    width: 40%;
    margin-right: 10%;
  }

  .albumSongList .songItem .singer {
    width: 120px;
  }

  .albumSongList .songItem .singer span {
    font-size: 16px;
    margin-right: 5px;
  }

  .albumSongList .songItem .play {
    position: absolute;
    top: 0;
    right: 40px;
  }

  .albumSongList .songItem .play span {
    font-size: 20px;
  }
</style>