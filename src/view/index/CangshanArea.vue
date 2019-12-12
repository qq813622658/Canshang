<template>
    <div>
        <!-- 福州新区仓山功能区 -->
        <Modal class="zsModals" v-model="cangshaArea" width="95%" :closable="false">
            <div class="zspolicy-content allss">
              <div class="chaimg" @click="cangshaArea=false"></div>
                <Row>
                    <Col span="8">
                        <div class="head-font">园区简介</div>
                        <div class="echarts" >
                          <canshanStack  :data="data" style="height: 308px;width:100%;margin:0px 15px; margin-top: -20px" />
                        </div>
                          <div class="jsmodal-introduction">
<!--                            <span>福州新区仓山功能区属于三江口组团的组团级中心，涉及城门、盖山两镇，依托原福州高新区仓山园发展第二产业。-->
                            <span class="font-style">{{data.introduction}}</span>
                            </span>
                        </div>
                        <!-- 五圈-->
                        <div class="fivemaps" style="display: flex;justify-content: center;margin-left: 10px;height: 185px" >
                          <img src="../../assets/img/index/fivequan.png" alt="">
                          </div>
                          <div class="jsmodal-introduction">
                            <span>{{data.advantage}}</span>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="head-font">二产</div>
                        <div style="height:160px;">
                            <Row :gutter="16" class="two-head">
                                <Col span="6">
                                    <div>
                                        <p>{{data.twodomestic}}</p>
                                        <span> 园内共有<br />企业{{data.twodomestic}}家</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.twoscale}}</p>
                                        <span> 规模以上<br />{{data.twoscale}}家</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.twoShang}}</p>
                                        <span> 限上商贸<br />企业{{data.twoShang}}家</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.twoHightech}}</p>
                                        <span> 省级<br />高新企业{{data.twoHightech}}家</span>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div class="title">生物医药</div>
                        <div class="jsmodal-introduction">
                            <span>
                            {{data.biomedicine}}
                            </span>
                        </div>
                        <div class="title" style="width:160px;">信息软件设备开发业</div>
                        <div class="jsmodal-introduction">
                            <span>{{data.industry}}</span>
                        </div>
                        <div class="title" style="width:160px;">信息软件设备开发业</div>
                        <div class="jsmodal-introduction">
                            <span>{{data.industry}}</span>
                        </div>
                    </Col>
                    <Col span="8">
                        <div class="head-font">三产</div>
                        <div clas="three-head" style="font-size:16px;margin-bottom:10px;">
                            福州新区仓山功能区第三产业主要发展总部经济、金融产业、商业项目、会展经济、跨境贸易、互联网产业等
                        </div>
                        <div class="three-ul">
                            <ul>
                                <li>{{data.productionone}}</li>
                                <li>{{data.productiontwo}}  </li>
<!--                              <span class="three-check"> 查看详情</span>-->
                            </ul>
                        </div>
                        <div class="title">金融产业</div>
                        <Row :gutter="16" class="two-head" style=" margin-top:-20px">
                                <Col span="6">
                                    <div>
                                        <p>{{data.financialplatform}}</p>
                                        <span>金融平台</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.financialintroduction}}</p>
                                        <span> 引进金融、类金融业<br />企业累计{{data.financialintroduction}}家</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.financialcheckin}}</p>
                                        <span> 实体入住<br />{{data.financialcheckin}}余家</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.financialsuccess}}</p>
                                        <span> {{data.financialsuccess}}项成功列入自贸<br />区金融创新案例</span>
                                    </div>
                                </Col>
                            </Row>
                            <div class="title">商业项目</div>
                            <div class="jsmodal-introduction">
                                <span>{{data.projectsone}} <br />{{data.projectstwo}} <br />{{data.projectsthree}} <br /> {{data.projectsfour}} </span>
                            </div>
                            <div class="title" style="margin-bottom:0px;">跨境项目</div>
                             <Row :gutter="16" class="two-head" >
                                <Col span="6">
                                    <div>
                                        <p>{{data.commerce}}</p>
                                        <span> 已签约{{data.commerce}}家大型<br />跨境出口电商企</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.contractedarea}}</p>
                                        <span> 签约面积<br />{{data.contractedarea}}万平方米</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.commerce}}</p>
                                        <span> 限上商贸<br />企业{{data.commerce}}家</span>
                                    </div>
                                </Col>
                                <Col span="6">
                                     <div>
                                        <p>{{data.negotiate}}</p>
                                        <span> 正在洽谈意向<br/>大型跨境企业{{data.negotiate}}家</span>
                                    </div>
                                </Col>
                            </Row>
                            <div class="title">会展经济</div>
                            <span style="margin-left:30px;">引进会展企业16家，2018年至今举办展会60场</span>
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
</template>
<script>
import   canshanStack  from './cangshanpie';
//新区仓山功能区
export default {

    components : {
        canshanStack
    },
    props: {
        data : {
            // type: Object,
        },
    },
    watch: {
        data: {
            deep: true,  // 深度监听
            handler(newVal,oldVal) {
                console.log(newVal,oldVal)
                // this.bar();
            }
        }
    },
    mounted(){
        console.log(this.data)
    },
    data(){
        return {
            cangshaArea : true,
        }
    },
}
</script>
<style scoped lang="less">
  @import "./CangshanArea.less";
</style>
