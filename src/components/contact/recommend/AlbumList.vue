<template>
  <div class="albumList">
    <div class="albumItem" v-for="item of albumList" :key="item.id" @click="albumClick(item.id)">
      <div class="img">
        <img :src="item.img" @load="imgLoad">
      </div>
      <div class="text">
        <div class="title">{{item.title}}</div>
        <div class="name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AlbumList",
    props: {
      albumList: {
        type: Array,
        required: true
      }
    },
    methods: {
      imgLoad() {
        this.$emit("my-refresh")
      },
      albumClick(id) {
        this.$router.push({
          path: '/recommend/playList',
          query: {
            id: id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .albumList {
    padding: 10px;
  }

  .albumList .albumItem {
    padding: 10px;
    width: 100%;
    display: flex;
  }

  .albumList .albumItem .img {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    overflow: hidden;
    margin-right: 20px;
  }

  .albumList .albumItem .img img {
    width: 100%;
    height: 100%;
  }

  .albumList .albumItem .text {
    width: 60%;
    height: 100px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }

  .albumList .albumItem .text div {
    flex: 1;
    line-height: 50px;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .albumList .albumItem .text .name {
    color: #999999;
  }
</style>