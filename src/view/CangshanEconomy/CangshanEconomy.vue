<style lang="less"  scoped>
  @import "./CangshanEconomy.less";
  @import "../../assets/css/flex.less";
</style>

<template>
  <div class="mains">
    <!-- 返回按钮 -->
<!--    <div class="back-btn" @click="backIndex"></div>-->

<!--      <pie style="height: 950px;width:90%;margin:25px 15px;" />-->
    <div class="backs">
          <div class="font">GDP</div>
    </div>
  </div>
</template>

<script>
    // 公用css
     import "@/assets/css/common.css";
    import  { getBuildData } from "@/api/city";
    import pie from "../index/CangShanstack";
    export default {
        components: {
            pie
        },
        data() {
            return {
                arrList : [],
                parameter : [],
            };
        },
        methods: {
            //   返回首页
            backIndex() {
                 this.$router.push({ path: "/index" });
            },
            //仓山经济指标
            _Economic (formData,  indexName, totalTime) {
                var that = this;
                formData = Object.assign(formData, {
                    indexName,
                    totalTime,
                });
                const keyOne = "economyFilter";
                const url = '/economy/query';
                getBuildData({formData , url, keyOne })
                    .then(result => {
                        console.log(result)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },

        },
        created(){
            this.parameter[0] = this.$route.params.city;
            this.parameter[1] = this.$route.params.time;
        },
        mounted() {
            this._Economic({},this.parameter[0],this.parameter[1])
        }
    };
</script>

<style lang="less">


</style>
