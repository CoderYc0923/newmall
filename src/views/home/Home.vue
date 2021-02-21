<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      class="tab-control"
      v-show="isTabFixed"
      ref="tabControl1"
    />
    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop" />
  </div>
</template>
<script>
import NavBar from "../../components/common/navbar/NavBar";
import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";
import TabControl from "../../components/content/tabControl/TabControl";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "../../network/home";

import { itemListenerMixin, backTopMixin } from "../../common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    GoodsList,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isTabFixed: false,
      tabOffsetTop: 0,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  activated() {
    //当进入Home组件时，设置上一次离开时的位置
    this.$refs.scroll.Refresh();
    this.$refs.scroll.ScrollTo(0, this.saveY, 0);
  },
  //当组件停止调用时，销毁掉事件总线中的itemImgLoad，以保证下一次使用事件总线时没有上一次调用的残留
  //当离开Home组件时，记录离开时的位置
  deactivated() {
    this.$bus.$off("imageLoad", this.itemImageListener);
    this.saveY = this.$refs.scroll.getScrollY();
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentType = index;
      this.$refs.tabControl2.currentType = index;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.$refs.scroll.Refresh();
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    contentScroll(position) {
      this.isTabFixed = -position.y > this.tabOffsetTop;
      this.listenShowBackTop(position);
    },
    //网络请求
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.FinishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  height: 100vh;
  padding-top: 44px;
}

.home-nav {
  color: #fff;
  background-color: var(--color-tint);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  right: 0;
  left: 0;
  bottom: 49px;
  overflow: hidden;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>