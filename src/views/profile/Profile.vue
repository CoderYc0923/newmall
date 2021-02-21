<template>
  <div id="Profile">
    <nav-bar class="profile-nav">
      <div slot="center">我的</div>
    </nav-bar>
    <login
      class="login"
      :login-show="loginshows"
      @LoginSuccess="LoginSuccess"
    />
    <profile-user
      @click.native="userClick"
      :user-list="loginOnLoad ? user1 : user0"
    />
    <profile-item-bar />
    <profile-list>
      <div slot="icon" class="icon"></div>
      <div slot="content" class="content">收货地址</div>
    </profile-list>
     <profile-list>
      <div slot="icon" class="icon icon-collect"></div>
      <div slot="content" class="content">我的收藏</div>
    </profile-list>
     <profile-list>
      <div slot="icon" class="icon icon-mall"></div>
      <div slot="content" class="content">金币商城</div>
    </profile-list>
     <profile-list>
      <div slot="icon" class="icon"></div>
      <div slot="content" class="content">我的客服</div>
    </profile-list>
     <profile-list>
      <div slot="icon" class="icon"></div>
      <div slot="content" class="content">欢迎评分</div>
    </profile-list>
     <profile-list>
      <div slot="icon" class="icon"></div>
      <div slot="content" class="content">加盟合作</div>
    </profile-list>
    <div class="mask"></div>
  </div>
</template>
<script>
import NavBar from "../../components/common/navbar/NavBar";
import Login from "../../components/common/login/Login";

import ProfileUser from "./childCops/ProfileUser";
import ProfileItemBar from "./childCops/ProfileItemBar";
import ProfileList from"./childCops/ProfileList"

export default {
  name: "Profile",
  components: {
    NavBar,
    Login,
    ProfileUser,
    ProfileItemBar,
    ProfileList
  },
  data() {
    return {
      loginshows: false,
      user0: {
        // 不在static下的图片传递要用require()
        imageUrl: require("../../assets/img/common/user.jpg"),
        userName: "立即登录",
      },
      user1: {
        imageUrl: require("../../assets/img/common/user1.jpg"),
        userName: "X",
      },
      loginOnLoad: false,
    };
  },
  methods: {
    userClick() {
      this.loginshows = true;
    },
    LoginSuccess() {
      this.loginshows = false;
      this.loginOnLoad = true;
    },
  },
};
</script>
<style scoped>
@font-face {
  font-family: "icomoon";
  src: url("../../assets/fonts/icomoon.eot?vwfeba");
  src: url("../../assets/fonts/icomoon.eot?vwfeba#iefix")
      format("embedded-opentype"),
    url("../../assets/fonts/icomoon.ttf?vwfeba") format("truetype"),
    url("../../assets/fonts/icomoon.woff?vwfeba") format("woff"),
    url("../../assets/fonts/icomoon.svg?vwfeba#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.icon,.content {
  text-align: center;
  line-height: 35px;
}
.icon {
  font-family: "icomoon";
  margin: 0 5px;
  color: var(--color-high-text);
}
.content {
  color: black;
  font-size: 14px;
  font-weight: 700;
  margin-left: 5px;
}
.icon-collect {
  color: red;
}
.icon-mall {
  color: yellowgreen;
}
.profile-nav {
  background-color: #fb7299;
  color: #fff;
  position: relative;
}
.mask {
  width: 100%;
  height: 95px;
  background-color: #eee;
}
</style>