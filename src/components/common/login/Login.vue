<template>
  <div id="login" v-show="loginShow">
    <form action="" name="login">
      <div class="item"><i>用户名:</i><input type="text" ref="account" /></div>
      <div class="item">
        <i>密&nbsp;码:</i><input type="password" ref="password" />
      </div>
    </form>
    <drag-verify
      class="verify"
      :width="width"
      :height="height"
      :text="text"
      :success-text="successText"
      :background="background"
      :progress-bar-bg="progressBarBg"
      :completed-bg="completedBg"
      :handler-bg="handlerBg"
      :handler-icon="handlerIcon"
      :text-size="textSize"
      :success-icon="successIcon"
      :circle="false"
      ref="Verify"
    >
    </drag-verify>
    <button class="btn1" @click="loginClick">登录</button>
    <button>注册</button>
  </div>
</template>
<script>
import "font-awesome/css/font-awesome.min.css";
import dragVerify from "vue-drag-verify";

export default {
  name: "Login",
  props: {
    loginShow: {
      type: Boolean,
    },
  },
  components: {
    dragVerify,
  },
  data() {
    return {
      account: "",
      password: "",
      handlerIcon: "fa fa-angle-double-right",
      successIcon: "fa fa-check",
      background: "#cccccc",
      progressBarBg: "#4b0",
      completedBg: "#66cc66",
      handlerBg: "#fff",
      text: "请将滑块拖动到右侧",
      successText: "验证成功",
      width: 180,
      height: 32,
      textSize: "12px",
      isCircle: "false",
    };
  },
  methods: {
    loginClick() {
      this.account = this.$refs.account.value;
      this.password = this.$refs.password.value;
      if (this.account === "") {
        this.$toast.show("账号不能为空！", 2000);
      } else if (this.password === "") {
        this.$toast.show("密码不能为空！", 2000);
      } else if (this.account !== "" && this.password !== "") {
        if (this.account === "xjyyc0923" && this.password === "xjyyc0923") {
          if (this.$refs.Verify.isPassing === true) {
            this.$toast.show("登录成功！", 2000);
            this.$refs.account.value = "";
            this.$refs.password.value = "";
            this.$emit("LoginSuccess");
          } else {
            this.$toast.show("请完成验证！", 1000);
          }
        } else {
          this.$toast.show("账号或密码错误！", 2000);
          this.$refs.account.value = "";
          this.$refs.password.value = "";
        }
      }
    },
  },
};
</script>
<style scoped>
#login {
  width: 200px;
  height: 200px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #eee;
  border-radius: 10px;
  border: 3px solid black;
}
.item {
  width: 100%;
  margin: 20px;
}
.item i {
  display: inline-block;
  width: 40px;
  font-size: 12px;
}
.item input {
  display: inline-block;
  border: none;
  outline: none;
  width: 120px;
}
button {
  margin: 25px 23px;
  width: 50px;
  height: 30px;
  border-radius: 6px;
  outline: none;
}
.btn1 {
  background-color: #fb7299;
  color: #fff;
}
.verify {
  margin-left: 5px;
}
</style>