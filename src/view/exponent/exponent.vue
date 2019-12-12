<style lang="less"  scoped>
@import "./exponent.less";
</style>
<template>
  <div class="main">
    <!--    标题-->
    <div class="title-head">"智能仓山"产业监测平台</div>
    <div class="title-head-two">
      <div>12510 行动体系</div>
    </div>

    <div class="back-btn" @click="backIndex"></div>
    <div class="tree-back">

        <div class="container clearFloat">
          <!-- 球体外发光效果 -->
          <div class="ball">
            <div class="ball-container">
              <div class="ball-1 public-style"></div>
              <div class="ball-2 public-style"></div>
              <div class="ball-3 public-style"></div>
              <div class="ball-4 public-style"></div>
              <div class="ball-5 public-style"></div>
              <div class="ball-6 public-style"></div>
              <div class="ball-7 public-style"></div>
              <div class="ball-8 public-style"></div>
              <div class="ball-9 public-style"></div>
              <div class="ball-10 public-style"></div>
              <div class="ball-11 public-style"></div>
              <div class="ball-12 public-style"></div>
              <div class="ball-13 public-style" ></div>

              <h1 class="dw1">仓山智能<br />产业发展指数</h1>
              <h2 class="dw2">发展基础</h2>
              <h2 class="dw3">发展环境</h2>
              <h2 class="dw4">数字经济</h2>
              <h2 class="dw5">经济发展<br/>贡献</h2>
              <h2 class="dw6">用户<br />基础</h2>
              <h2 class="dw7">人才<br />基础</h2>
              <h2 class="dw8">产业<br />环境</h2>
              <h2 class="dw9">政策<br />环境</h2>
              <h2 class="dw10">数字产<br />业规模</h2>
              <h2 class="dw11">产业数字<br />化规模</h2>
              <h2 class="dw12">经济带<br />动作用</h2>
              <h2 class="dw13">网络<br />基础</h2>

              <div class="tree-boss">
                <div class="shuzhi1"></div>
                <div class="shuzhi2"></div>
                <div class="shuzhi3"></div>
                <div class="shuzhi4"></div>
                <div class="shuzhi5"></div>
                <div class="shuzhi6"></div>
                <div class="shuzhi7"></div>
                <div class="shuzhi8"></div>
              </div>


            </div>
          </div>
          <!-- 左边容器 -->
          <div class="left-container lf">
            <template v-for="(item,key) in leftArr" >
              <div class="fg-div1">
                <ul>
                  <li>
                    <p class="overflow-font" title="政策环境">政策环境</p>
                    <p>分数</p>
                    <p>实得分</p>
                  </li>
                  <li v-for="index in item.childList[1].childList[1].childList" >
                    <p class="overflow-font" title="政策扶持">{{index.name}}</p>
                    <!--              <countTo :startVal=0 :endVal=index.score :duration='9000'></countTo>-->
                    <!--              <countTo :startVal=0 :endVal=index.actualScore :duration='9000'></countTo>-->
                    <p>{{index.score}}</p>
                    <p>{{index.actualScore}}</p>
                  </li>
                </ul>
              </div>
              <div class="fg-div1">
                  <ul>
              <li>
                <p class="overflow-font" title="产业环境">产业环境</p>
                <p>分数</p>
                <p>实得分</p>
              </li>
              <li v-for="index in item.childList[1].childList[0].childList">
                <p class="overflow-font" title="产业园区">{{index.name}}</p>
    <!--            <countTo :startVal=0 :endVal=index.score :duration='9000'></countTo>-->
    <!--            <countTo :startVal=0 :endVal=index.actualScore :duration='9000'></countTo>-->
                <p>{{index.score}}</p>
                <p>{{index.actualScore}}</p>
              </li>
            </ul>
                </div>
              <div class="fg-div1">
                  <ul>
              <li>
                <p class="overflow-font">网络基础</p>
                <p>分数</p>
                <p>实得分</p>
              </li>
              <li v-for="index in item.childList[0].childList[2].childList" >
                <p class="overflow-font" title="80M以上宽带用户占比">{{index.name}}</p>
    <!--            <countTo :startVal=0 :endVal=index.score :duration='9000'></countTo>-->
    <!--            <countTo :startVal=0 :endVal=index.actualScore :duration='9000'></countTo>-->
                <p>{{index.score}}</p>
                <p>{{index.actualScore}}</p>
              </li>
            </ul>
              </div>
              <div class="fg-div1">
            <ul>
              <li>
                <p class="overflow-font">用户基础</p>
                <p>分数</p>
                <p>实得分</p>
              </li>
              <li v-for="index in item.childList[0].childList[1].childList">
                <p class="overflow-font" title="移动电话用户渗透率" >{{index.name}}</p>
    <!--            <countTo :startVal=0 :endVal=index.score :duration='9000'></countTo>-->
    <!--            <countTo :startVal=0 :endVal=index.actualScore :duration='9000'></countTo>-->
                <p>{{index.score}}</p>
                <p>{{index.actualScore}}</p>
              </li>
            </ul>
              </div>
              <div class="fg-div1">
            <ul>
              <li>
                <p class="overflow-font">人才基础</p>
                <p>分数</p>
                <p>实得分</p>
              </li>
              <li v-for="index in item.childList[0].childList[0].childList">
                <p class="overflow-font" title="高中入学率">{{index.name}}</p>
    <!--            <countTo :startVal=0 :endVal=index.score :duration='9000'></countTo>-->
    <!--            <countTo :startVal=0 :endVal=index.actualScore :duration='9000'></countTo>-->
                <p>{{index.score}}</p>
                <p>{{index.actualScore}}</p>
              </li>
            </ul>
                </div>
            </template>
          </div>
          <!-- 中间容器 -->
          <div class="score">
            <div class="score-wraper">
                <h1>{{treeList}} <span>分</span></h1>
              <h2 class="environment">
                {{leftArr[0].childList[1].actualScore}}
                <span>分</span>
              </h2>
              <h2 class="contribution">
    <!--            <countTo :startVal=0 :endVal=leftArr[0].childList[3].actualScore :duration='9000' style="font-size: 30px"></countTo>-->
                {{leftArr[0].childList[3].actualScore}}
                <span>分</span>
              </h2>
              <h2 class="basis">
                {{leftArr[0].childList[0].actualScore}}
                <span>分</span>
              </h2>
              <h2 class="digital">
    <!--            <countTo :startVal=0 :endVal=leftArr[0].childList[2].actualScore :duration='9000' style="font-size: 30px"></countTo>-->
                {{leftArr[0].childList[2].actualScore}}
                <span>分</span>
              </h2>
            </div>
          </div>
          <!-- 右边容器 -->
          <div class="right-container rf">
            <template v-for="(item,key) in leftArr" >
              <div class="fg-div1">
            <ul>
              <li>
                <p class="overflow-font" title="数字产业规模">数字产业规模</p>
                <p>分数</p>
                <p>实得分</p>
              </li>
              <li v-for="index in item.childList[2].childList[0].childList">
                <p class="overflow-font" title="通信规模">{{index.name}}</p>
    <!--            <countTo :startVal=0 :endVal=index.score :duration='9000'></countTo>-->
    <!--            <countTo :startVal=0 :endVal=index.actualScore :duration='9000'></countTo>-->
                <p>{{index.score}}</p>
                <p>{{index.actualScore}}</p>
              </li>
            </ul>
              </div>
                <div class="fg-div1">
            <ul>
              <li>
                <p class="overflow-font" title="产业数字化规模">产业数字化规模</p>
                <p>分数</p>
                <p>实得分</p>
              </li>
              <li v-for="index in item.childList[2].childList[1].childList">
                <p class="overflow-font" title="第一产业数字化规模">{{index.name}}</p>
    <!--            <countTo :startVal=0 :endVal=index.score :duration='9000'></countTo>-->
    <!--            <countTo :startVal=0 :endVal=index.actualScore :duration='9000'></countTo>-->
                <p>{{index.score}}</p>
                <p>{{index.actualScore}}</p>
              </li>
            </ul>
                </div>
                  <div class="fg-div1">
            <ul>
              <li>
                <p class="overflow-font" title="经济带动作用">经济带动作用</p>
                <p>分数</p>
                <p>实得分</p>
              </li>
              <li v-for="index in item.childList[3].childList[0].childList">
                <p class="overflow-font" title="数字经济（智能产业）相关服务平台">{{index.name}}</p>
    <!--              <countTo :startVal=0 :endVal=index.score :duration='9000'></countTo>-->
    <!--              <countTo :startVal=0 :endVal=index.actualScore :duration='9000'></countTo>-->
                <p>{{index.score}}</p>
                <p>{{index.actualScore}}</p>
              </li>
            </ul>
                  </div>
            </template>
          </div>
        </div>
    </div>


<!--    <div id='stars'></div>-->

<!--    <div id='stars2'></div>-->
<!--    <div id='stars3'></div>-->
<!--    <div id='title'>-->
<!--    </div>-->
  </div>
</template>

<script>
// 公用css
import "@/assets/css/common.css";
import countTo from 'vue-count-to';
import  { construction } from "@/api/city";


export default {
    components : {
        countTo
    },
  data() {
    return {
        treeList : '',
        leftArr: [],
    };
  },
  methods: {
    //   返回首页
    backIndex() {
      this.$router.push({ path: "/index" });
    },
      // 首页升级企业列表左下角 接口
      _intelligence() {
          var that = this;
          const keyOne = "industrialMonitorEntity";
          const url = '/monitor/queryTree';
          construction({ url, keyOne })
              .then(result => {
                  this.treeList = result.data.results.list[0].actualScore; // 分数
                  this.leftArr = result.data.results.list;
              })
              .catch(err => {
                  console.log(err);
              });
      },
  },
  created() {
      this._intelligence();
  },
    mounted(){

    }
};
</script>

<style>
@import "./donghua.css";
</style>

