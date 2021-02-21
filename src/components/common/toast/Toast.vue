<template>
  <div class="toast" v-show="isShow">
    <div>{{ massage }}</div>
  </div>
</template>
<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      massage: ''
    };
  },
  methods: {
    show(massage, duration = 2000) {
      this.isShow = true;
      this.massage = massage;
      setTimeout(() => {
        this.isShow = false;
        this.massage = "";
      },duration)
    }
  }
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.6);
  z-index: 10;
}
</style>