<template>
  <div class="rankList">
    <div class="rankItem" v-for="item of rankList" :key="item.title">
      <div class="title">{{item.title}}</div>
      <ul>
        <li v-for="value of item.list" :key="value.id" @click="rankItemClick(value.id,value.img,value.title)">
          <div class="text">
            <div class="title">排行榜：{{value.title}}</div>
            <div class="num">热力值：{{value.num}}</div>
            <div class="time">最新时间：{{value.time}}</div>
          </div>
          <div class="img">
            <img :src="value.img" @load="imgLoad">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: "RankList",
    props: {
      rankList: {
        type: Array,
        required: true
      }
    },
    methods: {
      imgLoad() {
        this.$emit("img-load")
      },
      rankItemClick(id, img,title) {
        this.$router.push({
          path: '/rankSongList',
          query: {
            id,
            img,
            title
          }
        })
      }
    },

  }
</script>

<style scoped>
  .rankList {
    padding: 10px;
  }

  .rankList .rankItem .title {
    font-size: 20px;
    padding-bottom: 5px;
    border-bottom: 1px solid #999999;
  }

  .rankList .rankItem ul {
    padding: 10px;
  }

  .rankItem ul li {
    width: 100%;
    display: flex;
    margin-bottom: 15px;
    background-color: #282828;
    padding-left: 10px;
  }

  .rankItem li .img {
    width: 120px;
    height: 120px;
    border-radius: 20px;
    overflow: hidden;
  }

  .rankItem li .img img {
    width: 100%;
    height: 100%;
  }

  .rankItem li .text {
    width: 220px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
  }

  .rankItem li .text div {
    flex: 1;
    line-height: 40px;
    font-size: 16px;
  }

  .rankItem li .text .title {
    font-size: 18px;
    color: #eeeeee;
    border: none;
    margin-right: 30px;
    padding: 0;
  }
</style>