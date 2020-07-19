<template>
  <div class="center">{{title}}</div>
</template>

<script>
  export default {
    name: "Center",
    props: {
      title: {
        type: String,
        required: true
      }
    }
  }
</script>

<style scoped>
  .center {
    flex: 1;
    text-align: center;
    line-height: 50px;
    font-size: 28px;
    font-weight: 700;
    color: #dd1800;
  }
</style>