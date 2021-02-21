<template>
  <div class="profile-user-unload">
    <div class="user-img">
      <img :src="userList.imageUrl" alt="" />
    </div>
    <h2>{{ userList.userName }}</h2>
  </div>
</template>
<script>
export default {
  name: "ProfileUser",
  props: {
    userList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style scoped>
.profile-user-unload {
  width: 100%;
  height: 100px;
  position: relative;
  background-color: var(--color-tint);
}
.user-img {
  float: left;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 10px;
  border-color: #fff;
}
img {
  width: 100%;
  border-radius: 50%;
}
h2 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}
</style>