<template>
  <div class="main">
    <div class="back-btn" @click="backIndex"></div>
  </div>
</template>

<script>
// 公用css
import "@/assets/css/common.css";
export default {
  data() {
    return {};
  },
  methods: {
    //   返回首页
    backIndex() {
      this.$router.push({ path: "/index" });
    }
  },
  created() {}
};
</script>

<style lang="less"  scoped>
.main {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/img/public/company-bg.png");
  background-size: 100% 100%;
  position: relative;
  margin: 0 auto;
  color: #fff;

  &:before {
    content: "";
    display: table;
  }

  .back-btn {
    position: absolute;
    top: 40px;
    left: 60px;
    width: 60px;
    height: 30px;
    background-image: url("../../assets/img/public/back-btn.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    cursor: pointer;
  }
}
</style>
