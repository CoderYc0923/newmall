<template>
  <div id="app">
    <!-- exclude指定detail组件不被缓存，因为detail组件需要根据iid动态获取页面数据,所以需要在离开时销毁页面以保证数据的自动更新 -->
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "./components/content/mainTabbar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "./assets/css/base.css";
</style>
