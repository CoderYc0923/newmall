<template>
  <div class="bottom-bar">
    <div class="bar-left bar-item">
      <div>
        <i class="service icon"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="shop icon"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="select icon"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-right bar-item">
      <div class="cart" @click="addCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addCart() {
      this.$emit('addCart')
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  height: 49px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item > div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 26px;
  height: 26px;
  margin: 3px auto 3px;
  background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position: 0 -62px;
}

.bar-left .shop {
  background-position: 0 -115px;
}

.bar-right{
  font-size: 15px;
  color: #fff;
  line-height: 49px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}
</style>