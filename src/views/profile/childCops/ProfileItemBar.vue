<template>
  <div class="item-bar">
    <div class="wallet">
      <span class="icomoon ico-wallet"></span>
      钱包
    </div>
    <div class="hongbao">
      <span class="icomoon ico-hongbao"></span>
      红包
    </div>
    <div class="coin">
      <span class="icomoon ico-coin"></span>
      金币
    </div>
  </div>
</template>
<script>
export default {
  name: "ProfileItemBar",
};
</script>
<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("../../../assets/fonts/icomoon.eot?vwfeba");
  src: url("../../../assets/fonts/icomoon.eot?vwfeba#iefix")
      format("embedded-opentype"),
    url("../../../assets/fonts/icomoon.ttf?vwfeba") format("truetype"),
    url("../../../assets/fonts/icomoon.woff?vwfeba") format("woff"),
    url("../../../assets/fonts/icomoon.svg?vwfeba#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.icomoon {
  font-family: "icomoon";
  display: block;
  font-size: 20px;
  margin: 15px 0px 5px 0px;
}
.ico-wallet {
  color: var(--color-high-text);
}
.ico-hongbao {
  color: red;
}
.ico-coin {
  color: gold;
}
.item-bar {
  display: flex;
  width: 100%;
  height: 70px;
  background-color: #fff;
  border-bottom: 5px solid #eee;
}
.wallet,
.hongbao,
.coin {
  flex: 1;
  text-align: center;
  font-size: 13px;
}
.hongbao {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
</style>