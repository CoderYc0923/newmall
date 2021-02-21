<template>
<div class="profile-list">
  <div class="icon"><slot name="icon"></slot></div>
  <div class="content"><slot name="content"></slot></div>
</div>
</template>
<script>
export default {
name:'ProfileList'
}
</script>
<style scoped>
.profile-list {
  width: 100%;
  height: 35px;
  border-bottom: 2px solid #eee;
}
.icon {
  float: left;
}
.content {
  float: left;
}
</style>