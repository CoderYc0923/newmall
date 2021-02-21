<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          @click="titleClick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "../../../components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      isActive: false,
    };
  },
  methods: {
    backClick() {
      this.$router.go(-1);
    },
    titleClick(index) {
      this.currentIndex = index;
     this.$emit("titleClick", index)
    },
  },
};
</script>
<style scoped>
.back img {
  margin-top: 12px;
  font-size: 13px;
}
.title {
  display: flex;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
</style>