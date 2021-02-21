<template>
  <div class="detail">
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick" />
    <scroll
      ref="scroll"
      class="content"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper
        :top-images="topImages"
        @DetailSwiperImageLoad="DetailSwiperImageLoad"
      />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";

import { itemListenerMixin, backTopMixin } from "../../common/mixin";
import { debounce } from "../../common/utils";

import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailBottomBar,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      isShowBackTop: false,
      currentIndex: 0,
    };
  },
  created() {
    this.iid = this.$route.params.iid;
    //请求详情页数据
    getDetail(this.iid).then((res) => {
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    //请求推荐页数据
     getRecommend().then((res) => {
        this.recommends = res.data.list;
      });
    //对获取各位置操作时进行防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 50);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 50);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 50);
      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  activated() {
    //对推荐组件中的照片加载进行防抖和更新，以保证跳转正确
    debounce(this.$bus.$on("imageLoad", () => {
      this.$refs.scroll.Refresh();
    }),100)
  },
  deactivated() {
    this.$bus.$off("imageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    DetailSwiperImageLoad() {
      this.$refs.scroll.Refresh();
    },
    imageLoad() {
      this.$refs.scroll.Refresh();
      this.getThemeTopY();
    },
    contentScroll(position) {
      this.listenShowBackTop(position);
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY > this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    titleClick(index) {
      this.$refs.scroll.ScrollTo(0, -this.themeTopYs[index], 200);
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.$route.params.iid;
      this.addCart(product).then((res) => {
        this.$toast.show(res, 2000);
      });
    },
  },
};
</script>
<style scoped>
.detail {
  position: relative;
  background-color: #fff;
  height: 100vh;
  z-index: 9;
}

.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 9;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>