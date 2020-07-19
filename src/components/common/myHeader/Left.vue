<template>
  <div class="left">
    <slot name="left"></slot>
  </div>
</template>

<script>
  export default {
    name: "Left",
    components: {

    }
  }
</script>

<style scoped>
  .left {
    width: 80px;
    height: 50px;
    padding: 3px 2px;
  }

  .left .trinity-rings-spinner {
    margin: 0 auto;
  }
  .left img{
    display: block;
    width: 32px;
    height: 32px;
    margin: 6px auto;
  }
</style>