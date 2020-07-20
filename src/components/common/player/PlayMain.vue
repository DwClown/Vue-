<template>
  <div class="playMain">
    <div class="img">
      <img :src="songInfo.img">
    </div>
    <div class="text">
      <div class="name">{{songInfo.name}}</div>
      <div class="singer">
        <span v-for="item of songInfo.singer" :key="item.id">{{item.name}}</span>
      </div>
      <div class="lrc">歌词</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlayMain",
    props: {
      songInfo: {
        type: Object,
        required: true
      }
    },
  }
</script>

<style scoped>
  .playMain {
    padding: 0 5px;
  }

  .playMain .img {
    width: 100%;
    border-radius: 15px;
    overflow: hidden;
  }

  .playMain .text {
    margin-top: 20px;
  }

  .playMain .text .name {
    font-size: 22px;
    color: #eeeeee;
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .playMain .text .singer {
    font-size: 14px;
    height: 30px;
    line-height: 18px;
    padding: 6px 0;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .playMain .text .singer span {
    margin-right: 5px;
  }

  .playMain .text .lrc {
    margin-top: 5px;
  }
</style>