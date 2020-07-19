<template>
  <div class="horizontal-container">
    <div class="scroll-wrapper" ref="scroll">
      <div class="scroll-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'

  export default {
    name: "MyHScroll",
    mounted() {
      this.init()
    },
    beforeDestroy() {
      this.bs.destroy()
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.scroll, {
          scrollX: true,
          probeType: 3, // listening scroll hook
          click: true
        })
      }
    }
  }
</script>

<style scoped>
  .scroll-wrapper {
    width: 100vw;
    white-space: nowrap;
  }

  .scroll-content {
    display: inline-block
  }

</style>