<template>
  <div class="singerCategory">
    <div class="singerSex">
      <span v-for="(item,index) of singerCategory.sexId" :key="item.id"
            :class="{'active':index===categoryIndex.sex}"
            @click="categoryIndex.sex=index">{{item.name}}</span>
    </div>
    <myH-scroll>
      <div class="singerArea">
        <span v-for="(item,index) of singerCategory.areaId" :key="item.id"
              :class="{'active':index===categoryIndex.area}"
              @click="categoryIndex.area=index">{{item.name}}</span>
      </div>
    </myH-scroll>
    <myH-scroll>
      <div class="singerGenre">
        <span v-for="(item,index) of singerCategory.genre" :key="item.id"
              :class="{'active':index===categoryIndex.genre}"
              @click="categoryIndex.genre=index">{{item.name}}</span>
      </div>
    </myH-scroll>
  </div>
</template>

<script>
  import MyHScroll from "components/common/myScroll/MyHScroll";

  export default {
    name: "SingerCategory",
    props: {
      singerCategory: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        categoryIndex: {
          sex: 0,
          area: 0,
          genre: 0
        }
      }
    },
    components: {
      MyHScroll
    },
    watch: {
      categoryIndex: {
        handler(newValue) {
          this.$emit('category',newValue)
        },
        deep: true
      }
    }
  }
</script>

<style scoped>
  .singerCategory {
    padding: 10px;
  }

  .singerCategory .singerArea {
    width: 365px;
  }

  .singerCategory .singerGenre {
    width: 720px;
  }

  .singerCategory div span {
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    padding: 1px 5px;
    border-radius: 6px;
  }

  .singerCategory .active {
    background-color: #dd1800;
    color: #eeeeee;
  }
</style>