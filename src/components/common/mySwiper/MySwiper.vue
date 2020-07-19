<template>
  <div class="mySwiper">
    <swiper class="swiper" :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img :src="item.img">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: "MySwiper",
    props: {
      swiperList: {
        type: Array,
        required: true
      }
    },
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          loop: true,
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: false,
            bulletActiveClass: 'my-bullet-active',
          },
          on: {
            click() {
              this.that.$router.push({
                path: '/recommend/album',
                query: {
                  id: this.that.swiperList[this.realIndex].url
                }
              })
            }
          }
        }
      }
    },
    mounted() {
      this.$refs.mySwiper.$swiper.that = this
    }
  }
</script>

<style scoped>
  .swiper-container {
    padding: 10px;
  }

  .swiper-slide {
    border-radius: 20px;
    overflow: hidden;
  }

  .swiper-slide img {
    width: 100%;
    height: auto;
  }


</style>