import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueLzayLoad from 'vue-lazyload'
import store from './store'
import toast from './components/common/toast'

Vue.config.productionTip = false
//图片懒加载
Vue.use(VueLzayLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

Vue.use(toast)

//事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
