import { debounce } from './utils';
import BackTop from '../components/content/BackTop/BackTop.vue'
import { BACK_POSITION } from './const'


export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.Refresh, 100);
    this.itemImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("imageLoad", this.itemImgListener)
  }
}
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.ScrollTo(0, 0, 300)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > BACK_POSITION
    }
  }
}
