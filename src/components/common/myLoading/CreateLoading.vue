<template>
  <div class="createLoading">
    <orbit-spinner
        :animation-duration="1200"
        :size="size"
        color="#ff1d5e"
        :style="{margin:position}"
    />
  </div>
</template>

<script>
  import {OrbitSpinner} from 'epic-spinners'

  export default {
    name: "CreateLoading",
    components: {
      OrbitSpinner
    },
    props: {
      size: {
        type: Number,
        required: true
      },
      position: {
        type: String,
        default: '60% auto'
      }
    }
  }
</script>

<style scoped>
  .createLoading {
    padding-top: 1px;
    z-index: 88;
    background-color: #222222;
    width: 100%;
    height: 100%;
  }

</style>