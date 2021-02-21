<template>
 <div class="cart">
   <nav-bar class="nav-bar">
     <div slot="center">购物车{{ length }}</div>
   </nav-bar>
   <cart-list />
   <cart-bottom-bar />
 </div>
</template>
<script>
import NavBar from "../../components/common/navbar/NavBar"

import {mapGetters} from "vuex"

import CartList from "./childComps/CartList"
import CartBottomBar from "./childComps/CartBottomBar"

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: 'cartLength',
    })
  }
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: #fb7299;
  color: #fff;
}
</style>