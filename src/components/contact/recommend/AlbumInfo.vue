<template>
  <div class="albumInfo">
    <div class="top">
      <div class="img">
        <img :src="albumInfo.img" @click="$emit('img-load')">
      </div>
      <div class="text">
        <div class="name">专辑名：{{albumInfo.name}}</div>
        <div class="singer">歌手： {{albumInfo.singer.name}}</div>
      </div>
    </div>
    <div class="desc" ref="desc">
      {{albumInfo.desc===''?'没有更多信息':albumInfo.desc}}
      <span @click="isShowMore" ref="more">...更多</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AlbumInfo",
    props: {
      albumInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      initDesc() {
        if (this.$refs.desc.clientHeight > 80) {
          this.$refs.desc.style = 'height:70px'
        } else {
          this.$refs.desc.style = 'height:none'
          this.$refs.more.style = 'display:none'
        }
      },
      isShowMore() {
        this.isShow = !this.isShow
        if (this.isShow) {
          this.$refs.desc.style = 'height:none'
          this.$refs.more.innerHTML = '收起'
        } else
          this.$refs.desc.style = 'height:70px'
        this.$emit('show-more')
      }
    },
    mounted() {
      this.initDesc()
    }
  }
</script>

<style scoped>
  .albumInfo {
    padding: 10px;
  }

  .albumInfo .top {
    display: flex;
    padding-left: 10px;
  }

  .albumInfo .top .img {
    width: 120px;
    height: 120px;
    border-radius: 20px;
    overflow: hidden;
    margin-right: 30px;
  }

  .albumInfo .top .text div {
    width: 200px;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .albumInfo .top .text div span {
    font-size: 18px;
    margin-right: 5px;
  }

  .albumInfo .desc {
    padding: 10px 10px 0;
    margin-top: 10px;
    line-height: 20px;
    overflow: hidden;
    text-indent: 2em;
    position: relative;
  }

  .albumInfo .desc span {
    position: absolute;
    bottom: 0;
    right: 10px;
    background-color: #222222;
    text-indent: 0;
    color: #999999;
    line-height: 20px;
  }
</style>