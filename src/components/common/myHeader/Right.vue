<template>
  <div class="right" @click="rightClick">
    <img src="~assets/images/person.svg">
  </div>
</template>

<script>
  export default {
    name: "Right",
    methods: {
      rightClick() {
        this.$router.push({
          path: '/mySongList'
        })
      }
    }
  }
</script>

<style scoped>
  .right {
    width: 80px;
    height: 50px;

  }

  .right img {
    display: block;
    width: 32px;
    height: 32px;
    margin: 9px auto;
  }
</style>