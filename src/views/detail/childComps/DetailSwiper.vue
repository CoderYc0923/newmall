<template>
    <swiper class="detail-swiper">
      <swiper-item v-for="(item, index) in topImages" :key="index">
        <img :src="item" alt="" @load="DetailSwiperImageLoad">
      </swiper-item>
    </swiper>
</template>
<script>
import { Swiper,SwiperItem } from '../../../components/common/swiper'

export default {
name:'DetailSwiper',
props: {
  topImages: {
    type:Array,
    default() {
      return []
    }  
  }
},
components: {
  Swiper,
  SwiperItem
},
 methods: {
    DetailSwiperImageLoad() {
      this.$emit("DetailSwiperImageLoad");
    }
  }
}
</script>
<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>