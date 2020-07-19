<template>
  <div class="singerList">
    <create-loading :size="55" :position="'30% auto'" v-if="isLoading"/>
    <ul v-else>
      <li class="singerItem" v-for="item of singerList" :key="item.id"
          @click="singerClick(item.id,item.img)">
        <div class="img">
          <img :src="item.img" @load="imgLoad">
        </div>
        <div class="name">{{item.name}}</div>
      </li>
      <div class="singerNothing" v-if="singerList.length===0">没有相关歌手数据！</div>
    </ul>
  </div>
</template>

<script>
  import CreateLoading from "components/common/myLoading/CreateLoading";

  export default {
    name: "SingerList",
    props: {
      singerList: {
        type: Array,
        required: true,
        default: []
      }
    },
    data() {
      return {
        isLoading: true
      }
    },
    components: {
      CreateLoading
    },
    methods: {
      imgLoad() {
        this.$emit("img-load")
      },
      singerClick(id, img) {
        let imgUrl = img.replace(/T001R150x150/g, 'T001R500x500')
        this.$router.push({
          path: '/singerInfo',
          query: {
            id: id,
          }
        })
      }
    },
  }
</script>

<style scoped>
  .singerList {
    padding: 10px 10px 0 10px;
  }

  .singerList ul .singerItem {
    padding: 0 10px;
    display: flex;
    margin-bottom: 20px;
  }

  .singerList ul .singerItem .img {
    width: 120px;
    height: 120px;
    margin-right: 30px;
    border-radius: 50%;
    overflow: hidden;
  }

  .singerList ul .singerItem .img img {
    width: 100%;
    height: 100%;
  }

  .singerList ul .singerItem .name {
    width: 220px;
    font-size: 20px;
    line-height: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .singerList ul .singerNothing {
    font-size: 16px;
    text-align: center;
  }
</style>