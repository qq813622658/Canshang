<style lang="less"  scoped>
@import "./ten-target.less";
</style>
<template>
  <div class="main">
    <div class="back-btn" @click="backIndex"></div>
    <Row>
      <Col span="12">
        <div class="left-containers">
          <!-- 行动按钮 -->
          <ul class="btn-arr">
            <li
              @click="getItem(index)"
              :id="'btn' + index"
              :class="activeClass == index ? 'active':''"
              v-for="(item,index) in actionBtnData"
              :key="index"
            >
              <p>{{item.text}}</p>
            </li>
          </ul>
          <!-- 圆心背景 -->
          <div class="title-bg"></div>
          <div class="big-titles">
            <h1>2019年</h1>
            <h1>“智能仓山”</h1>
            <h1>十项重点行动</h1>
          </div>
          <!-- 指引背景 -->
          <div class="point"></div>
        </div>
      </Col>
      <Col span="12">
        <img
          style="height: 1055px;"
          v-show="activeClass == indexs"
          v-for="(items,indexs) in actionBtnData"
          :key="'key'+indexs"
          :src="items.imgUrl"
          alt="图片加载中"
        />
      </Col>
    </Row>
  </div>
</template>

<script>
// 公用css
import "@/assets/css/common.css";
export default {
  data() {
    return {
      number: 999,
      activeClass: 0,
      // 行动按钮数据
      actionBtnData: [
        {
          text: "精准招商引资行动",
          imgUrl: require("../../assets/img/ten-target/01.png")
        },
        {
          text: "企业转型引导行动",
          imgUrl: require("../../assets/img/ten-target/02.png")
        },
        {
          text: "典型应用示例行动",
          imgUrl: require("../../assets/img/ten-target/03.png")
        },
        {
          text: "智能制造行动",
          imgUrl: require("../../assets/img/ten-target/04.png")
        },
        {
          text: "5G部署推广行动",
          imgUrl: require("../../assets/img/ten-target/05.png")
        },
        {
          text: "智能产业载体提升行动",
          imgUrl: require("../../assets/img/ten-target/06.png")
        },
        {
          text: "创新平台搭建行动",
          imgUrl: require("../../assets/img/ten-target/07.png")
        },
        {
          text: "营商环境提升行动",
          imgUrl: require("../../assets/img/ten-target/08.png")
        },
        {
          text: "产业人才聚集行动",
          imgUrl: require("../../assets/img/ten-target/09.png")
        },
        {
          text: "智能仓山名片行动",
          imgUrl: require("../../assets/img/ten-target/10.png")
        }
      ]
    };
  },
  methods: {
    //   返回首页
    backIndex() {
      this.$router.push({ path: "/index" });
    },
    // 点击行动按钮切换
    getItem(index) {
      this.activeClass = index;
    }
  },
  created() {}
};
</script>

<style>
</style>
