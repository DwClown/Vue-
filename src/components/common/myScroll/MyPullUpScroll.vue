<template>
  <div class="pullup">
    <div ref="scroller" class="pullup-bswrapper">
      <div class="pullup-scroller">
        <ul class="pullup-list">
          <slot></slot>
        </ul>
        <div class="pullup-wrapper">
          <div v-if="isPullUpLoad" class="before-trigger">
            <orbit-spinner
                :animation-duration="1200"
                :size="25"
                color="#ff1d5e"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'

  BScroll.use(Pullup)

  import {OrbitSpinner} from 'epic-spinners'

  export default {
    name: "MyPullUpScroll",
    data() {
      return {
        isPullUpLoad: false,
        data: 30,
      }
    },
    components: {
      OrbitSpinner
    },
    created() {
      this.bscroll = null
    },
    mounted() {
      this.initBscroll()
    },
    methods: {
      initBscroll() {
        this.bscroll = new BScroll(this.$refs.scroller, {
          scrollY: true,
          pullUpLoad: true,
          click: true
        })
      }
    }
  }
</script>

<style scoped>
  .pullup {
    height: 100%
  }

  .pullup-bswrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #222222;
  }

  .pullup-scroller {
    padding-top: 50px;
    padding-bottom: 65px;
  }

  .pullup-wrapper {
    padding: 5px 0;
  }

  .before-trigger .orbit-spinner {
    margin: 0 auto;
  }
</style>