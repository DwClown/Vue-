<template>
  <div class="myScroll">
    <div class="core-container">
      <div class="scroll-wrapper" ref="scroll">
        <div class="scroll-content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'

  export default {
    name: "MyScroll",

    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.bs.destroy()
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.scroll, {
          scrollY: true,
          click: true,
          probeType: 3 // listening scroll hook
        })
      }
    },
  }
</script>

<style scoped>
  .scroll-wrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #222222;
  }

  .scroll-content {
    padding-top: 50px;
    padding-bottom: 75px;
  }
</style>