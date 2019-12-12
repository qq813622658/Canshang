<style lang="less"  scoped>
@import "./index.less";
</style>

<template>
  <div class="main">
<!--    标题-->
    <div class="title-head">"智能仓山"产业监测平台</div>
    <div class="title-head-two">
      <div>12510 行动体系</div>
    </div>
    <Row class="content">
      <!--左边容器 -->
      <Col span="6">
        <div class="left-content">
          <Row class="develop-score">
            <Col span="12">
              <h2>发展指数得分</h2>
              <p>Development Index Score</p>
            </Col>
            <Col span="12">
              <h1 @click="viewExponent">{{fraction}}</h1>
            </Col>
          </Row>
          <div class="industrial-scale box">
            <div class="small-title">
              <h3>仓山区智能产业规模</h3>
            </div>
            <!-- 双柱状图图表区域 -->
            <bar-stack :data="industrialData" style="height: 300px;width:90%;margin:25px 15px;" />
          </div>
          <div class="new-industrial box">
            <div class="small-title">
              <h3>培育新动能 升级旧产业</h3>
              <span @click="viewCompony">企业列表</span>
            </div>
            <!-- 饼状图图表区域 -->
            <pie :data="pieData" style="height: 280px;width:90%;margin:25px 15px;" />
          </div>
        </div>
      </Col>
      <!-- 中间容器 -->
      <Col span="12">
        <div class="middle-content">
          <div class="map-content">
            <!-- 地图上方按钮 -->
            <ul class="map-btn">
              <li
                :class="activeClass == index ? 'active':''"
                v-for="(item,index) in itemList"
                :key="index"
                @click="getItem(index)"
              >{{item.text}}</li>
            </ul>
            <!--地图 -->
            <div class="map">
              <img v-show="activeClass == 0" src="../../assets/img/index/map1.png" alt="图片加载中" />
              <img v-show="activeClass == 1" src="../../assets/img/index/map2.png" alt="图片加载中" />
              <img v-show="activeClass == 2" src="../../assets/img/index/map3.png" alt="图片加载中" />
              <!--    金山工业园区手指点击模块-->
              <div class="js-finger" @click="iundustrialModel = !iundustrialModel" v-show="jsfinger"></div>
              <!--    新区功能区手指点击模块-->
              <div class="js-finger cs-finger" @click="cangshaArea = !cangshaArea" v-show="csfinger"></div>
              <!--    橘园洲手指点击模块-->
              <div class="js-finger gardenIsland" @click="gardenIsland = !gardenIsland" v-show="jyfiner"></div>
<!--              六大实验室手机点击 中国5G-->
              <div class="chinafiveG" v-show="chinaFiveG" @click="chinafiG(0)"></div>
              <!--              六大实验室手机点击 中国通信-->
              <div class="chinacommunication" v-show="chinacommunication" @click="chinafiG(1)"></div>
              <!--              六大实验室手机点击 中国电子-->
              <div class="chinaElectronics" v-show="chinaElectronics" ></div>
              <!--              六大实验室手机点击 中国智能-->
              <div class="chainaZZ" v-show="chainaZZ" @click="chinafiG(3)"></div>
              <!--              六大实验室手机点击 百度云-->
              <div class="baiduyun" v-show="baiduyun" @click="chinafiG(4)"></div>
              <!--              六大实验室手机点击 北大详情-->
              <div class="beidaxianqing" v-show="beidaxianqing" @click="chinafiG(2)"></div>

<!--              五大产业链弹窗  互联网+-->
              <div class="bigfivein" v-show="bigfivein" @click="fivemajor(4)"></div>
              <!--              五大产业链弹窗  5G链+-->
              <div class="bigfiveG" v-show="bigfiveG" @click="fivemajor(1)"></div>
              <!--              五大产业链弹窗  虚拟+-->
              <div class="bigfivevirtual" v-show="bigfivevirtual"@click="fivemajor(5)" ></div>
              <!--              五大产业链弹窗  互联网+-->
              <div class="bigfiveartificial" v-show="bigfiveartificial" @click="fivemajor(2)" ></div>
              <!--              五大产业链弹窗  互联网+-->
              <div class="bigfiveBeidou" v-show="bigfiveBeidou" @click="fivemajor(3)"></div>

<!--              领导走访按钮-->
              <div class="leadervisit" @click="modalleader = !modalleader">
<!--                <img src="../../assets/img/index/lvers.png" alt="">-->
                <span>领导走访</span>
              </div>
            </div>
            <!-- 弹窗跳转 -->
            <div class="map-right">
              <div @click="viewTenTarget">
                <img src="../../assets/img/index/zxbtn.png" alt="图片加载中" />
                <h5>十大专项行动</h5>
              </div>
              <div @click="openpolicyModal">
                <img src="../../assets/img/index/zsbtn.png" alt="图片加载中" />
                <h5>招商政策</h5>
              </div>
            </div>
            <!-- 轮播区域 -->
            <div class="shuffling">
              <Carousel autoplay v-model="value" arrow="hover" :autoplay-speed="speed">
                <CarouselItem>
                  <div class="carousel-content">
                    <Row>
                      <Col span="8">
                      <div class="small-title">
                        <h3>智能产业制造</h3>
                      </div>
                      <div class="small-box">
                        <p>{{arouselc.intelligenceOne}}</p>
                      </div>
                      </Col>
                      <Col span="8">
                      <!-- 柱状图 -->
                      <bar :data="smartData" style="height: 200px;width:90%;" />
                      </Col>
                      <Col span="8">
                      <div class="small-title">
                        <h3>智能产业制造</h3>
                      </div>
                      <div class="small-box">
                        <p>{{arouselc.intelligenceTwo}}</p>
                      </div>
                      </Col>
                    </Row>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div class="carousel-content shuffling1">
                    <div class="small-title" style="width:300px;">
                      <h3>数字服务业务</h3>
                    </div>
                    <Row class="digital-service">
                      <Col span="8">
                        <div class="img-bg">
                          <h3 style="margin-top:40px;width: 100px">{{arouselc.service}}</h3>
                        </div>
                        <h2>软件和信息服务行业</h2>
                      </Col>
                      <Col span="8">
                        <div class="img-bg">
                          <h3 style="margin-top:40px;width: 100px">{{arouselc.context}}</h3>
                        </div>
                        <h2>数字内容产业</h2>
                      </Col>
<!--                      <Col span="6">-->
<!--                        <div class="img-bg">-->
<!--                          <h3 style="margin-top:50px;">{{arouselc.chain}}</h3>-->
<!--                        </div>-->
<!--                        <h2>区块链产业</h2>-->
<!--                      </Col>-->
                      <Col span="8">
                        <div class="img-bg">
                          <h3 style="margin-top:30px;">{{arouselc.blockchain}}</h3>
                        </div>
                        <h2>下游产业链企业聚集</h2>
                      </Col>
                    </Row>
                  </div>
                  <ul></ul>
                </CarouselItem>
                <CarouselItem>
                  <div class="carousel-content">
                    <Row>
                      <Col span="8">
                        <div class="small-title">
                          <h3>智能技术赋能产业转型升级</h3>
                        </div>
                        <div class="small-box">
                          <p>{{arouselc.transition}}</p>
                        </div>
                      </Col>
                      <Col span="8">
                        <!-- 柱状图 -->
                        <bar :data="smartData1" style="height: 200px;width:90%;" />
                      </Col>
                      <Col span="8">
                        <div class="small-title">
                          <h3>企业情况</h3>
                        </div>
                        <div class="small-box">
                          <p>{{arouselc.company}}</p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CarouselItem>
              </Carousel>
            </div>
          </div>
        </div>
      </Col>
      <!-- 右边容器 -->
      <Col span="6">
        <div class="right-content">
          <div class="box investment-result">
            <div class="small-title bor-title">
              <div class="tittlest"
                   v-for="(item,index)  in titleList"
                   >
                <h3 :class="indexTilte == index ? 'active':''"
                    :key="index"
                    @click="getItemTile(index)">{{item.text}}</h3>
              </div>
              <p @click="viewZs" style="margin-left: 124px;">查看详细</p>
            </div>
<!--            style="overflow: hidden"-->
              <div class="result-content"  v-if="changeTitel">
                <div class="info" v-for="(item,index) in zsData" :key="index">
                  <div class="info-title overflow-font" :title="item.infoTitle" @click="viewZs">{{item.projectName}}</div>
                  <div class="detail-info">
                    <p>总投资</p>
                    <p>{{item.investment}}亿元</p>
                  </div>
                </div>
              </div>
<!--            style="overflow: hidden"-->
              <div class="result-content"  v-if="!changeTitel">
                <div class="info" v-for="(item,index) in jsData" :key="index">
                  <div class="info-title overflow-font" :title="item.infoTitle" @click="viewZs">{{item.projectName}}</div>
                  <div class="detail-info">
                    <p>总投资</p>
                    <p>{{item.totalInvestment}}亿元</p>
                  </div>
                </div>
              </div>

          </div>
          <div class="box construction-result">
            <div class="small-title">
              <h3>仓山区指标情况</h3>
               <div style="display: flex">
                 <h3>{{cstime}}</h3>
<!--                 <h3>年 / 月</h3>-->
               </div>
            </div>
            <div class="result-contents" style="overflow: scroll ">
              <div class="info" v-for="(item,index) in systeList" :key="index" @click="hrefLocation(item.indexName , item.totalTime)">
<!--                <div class="info-title overflow-font tits" :title="item.infoTitle" @click="viewZs">GDP</div>-->
                <div class="tits">{{item.indexName}}</div>
                <hr class="demo1"></hr>
                <div class="titleFonit">
                  <div>增长率</div>
                  <div>累计数</div>
                </div>
                <div class="titleFonit font-coloc">
                  <div>{{item.increase}}%</div>
                  <div>{{item.grandTotal}}亿元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
    <!-- 招商政策模态框 -->
    <Modal class="zsModal alls"  v-model="policyModal" width="1000px" :closable="false">
      <div class="chaimg" @click="policyModal=false" style="top: 50px;"></div>
      <div class="zspolicy-content">
        <p style="cursor: pointer" v-for="(item,index) in policyData" @click="tagelink(item.id)" :key="index">{{item.title}}</p>
      </div>
<!--      <div>-->
<!--           <quill-editor    v-if="!curporNew" v-model="t.context"></quill-editor>-->
<!--      </div>-->
    </Modal>
    <!-- 金山工业园区-->
    <Modal class="jsModal" v-model="iundustrialModel" width="1400px" :closable="false">
      <div class="zspolicy-content allss">
        <div class="chaimg" @click="iundustrialModel=false"></div>
        <Row>
          <i-col span="10">
            <div class="head-font">园区简介</div>
            <div class="backfimg"></div>
            <div class="jsmodal-introduction">
              <span>{{jsDatas.JinshanJJ}}</span>
            </div>
            <Row class="js-left-footer">
              <i-col span="6">
                <div> {{jsDatas.JinshancCF}} </div>
                <span>厂房{{jsDatas.JinshancCF}}栋</span>
              </i-col>
              <i-col span="6">
                <div> {{jsDatas.JinshancQY}} </div>
                <span>企业{{jsDatas.JinshancQY}}家</span>
              </i-col>
              <i-col span="6">
                <div> {{jsDatas.JinshanGY}} </div>
                <span> 工业产值{{jsDatas.JinshanGY}}亿元</span>
              </i-col>
              <i-col span="6">
                <div> ≈ {{jsDatas.JinshanSS}} </div>
                <span>年税收约{{jsDatas.JinshanSS}}亿元</span>
              </i-col>
            </Row>
          </i-col>
          <i-col span="14">
            <div class="head-font">五大片区建筑面积介绍</div>
            <jsbarStack  :data="jsDatas" v-if="iundustrialModel" style="height: 308px;width:100%;margin:25px 15px;" />
            <div class="head-font" style="margin-top:-48px;">五大片区企业分类介绍</div>
            <piefive @clickData="clickData" :data="jsDatas"  style="height: 320px;width:764px;margin:25px 15px;" />
            <div class="pie-possion">
              <span class="address-name">{{xiangqin.name}}</span>
              <div>规上工业: <span>{{xiangqin.GY}}家</span></div>
              <div>规上服务业: <span>{{xiangqin.FW}}家</span></div>
              <div>限上商贸: <span>{{xiangqin.SS}}家</span></div>
              <div>其他类型: <span>{{xiangqin.QT}}家</span></div>
            </div>
          </i-col>
        </Row>
      </div>
    </Modal>
<!--    详情模态框-->
    <Modal class="chinaModal" v-model="chinaModal" width="800px" :closable="false">
      <div class="zspolicy-content allss">
        <div class="chaimg" @click="chinaModal=false" style="top: 46px"></div>
        <h1 class="xq-title">{{xqConter.title}}</h1>
        <div class="xq-conter">{{xqConter.conter}}</div>
      </div>
    </Modal>
    <!--    五大产业链详情-->
    <Modal class="industrialchains chinaModal" v-model="industrialchains" width="1000px" :closable="false">
      <div class="zspolicy-content allss">
        <div class="chaimg" @click="industrialchains=false" style="top: 66px"></div>
        <h1 class="xq-title">{{fiveConter.title}}</h1>
        <div class="xq-conter" v-for="item in fiveConter.conter" style="margin-bottom: 60px;">{{item}}</div>
      </div>
    </Modal>
    <!-- 菊园工业区模态框-->
    <Modal class="jsModal gardenIsland" v-model="gardenIsland" width="1400px" :closable="false">
      <div class="zspolicy-content allss">
        <div class="chaimg" @click="gardenIsland=false"></div>
        <Row>
          <i-col span="10">
            <div class="head-font">园区简介</div>
            <div class="gardenImg"></div>
            <div class="jsmodal-introduction" style="width: 83%">
              <span style="font-size: 18px">{{jyDatas.introduction}}</span>
            </div>
          </i-col>
          <i-col span="14">
            <div style="height: 400px;">
              <i-col span="8">
                <div class="flex-mu">
                  <div class="juyuan-font">{{jyDatas.twodomestic}}</div>
                  <div > 工业用地面积{{jyDatas.twodomestic}}亩 </div>
                </div>
                <div class="flex-mu">
                  <div class="juyuan-font">{{jyDatas.delivery}}</div>
                  <div > 产房{{jyDatas.delivery}}栋 </div>
                </div>
                <div class="flex-mu">
                  <div class="juyuan-font">{{jyDatas.business}}</div>
                  <div > 现有企业{{jyDatas.business}}家 </div>
                </div>
              </i-col>
              <i-col span="16">
                <garden  :data="jyPieData"  v-if="gardenIsland" style="height: 400px; width: 100%; margin-top: 30px;"/>
              </i-col>
            </div>
            <div class="foot-Img"></div>
          </i-col>
        </Row>
      </div>
    </Modal>
    <!--              //领导图-->
    <transition name="my">
    <div class="modal-leader" v-if="modalleader" style="background: rgba(0,0,0,0.5)">
      <div class="modale-divone">
        <div v-for="(item,index) in leaderList "
             :class="indexTiltes == index ? 'active':''"
             :key="index"
             @click="modelLeader(index)"
        >{{item.name}}</div>
      </div>
      <div class="leimg-dw" :style="[dingwei]">
            <img :src=leaderImg alt="">
        <div class="dwcha" :style="[styleObject]" @click="modalleader = false"></div>
      </div>
    </div>
    </transition>
    <!-- 新区仓山功能区-->
    <canshan :data="csfingerData" v-if="cangshaArea"/>
<!--    仓山经济指标-->
    <div class="backs" v-if="showJJ">
      <div class="font">{{CanshanName}}</div>
      <div class="backDW" @click="showJJ = !showJJ"></div>
      <div class="gettimes">
        <DatePicker type="month" placeholder="可选择查看日期" style="width: 200px;" @on-change="getTimeX" :transfer="true"></DatePicker>
      </div>
      <pies :data="CanshanList"  style="height: 560px;width:96%;margin:25px 15px;" />
    </div>
    <!-- 新闻详情工业区-->
    <Modal class="jsModal newDetails" v-model="newDetails" width="1400px" :closable="false">
      <div class="zspolicy-content">
        <div class="chaimg" @click="newDetails=false;policyModal=true"></div>
        <Row style="height: 300px;">
<!--             <quill-editor v-model="t.context"></quill-editor>-->
          <div v-html="t.context" style="color: #ffffff">{{t.context}}</div>
        </Row>
      </div>
    </Modal>

  </div>
</template>

<script>
// 公用css
import "@/assets/css/common.css";
// 图表组件
import barStack from "./bar-stack";
import jsbarStack from './js-stack';
import piefive from './piefive-stack';
import pies from "./CangShanstack";
import pie from "./pie";
import bar from "./bar";
import canshan from "./CangshanArea";
import  garden from './gardenIsland';
import  { construction , getBuildData, getTimes} from "@/api/city";
export default {
  components: {barStack,pie,bar,jsbarStack, piefive, canshan, pies,garden},
  data() {
    return {
        newDetails : false , // 新闻详情框
        curporNew : true , // 新闻详情
        jyPieData : '' ,// 橘园洲模态框的饼图数据
        jyfiner : false , // 橘园洲手指显示隐藏
        gardenIsland : false , //橘园洲区模态框
        dingwei: {right : '65px'},
        modalleader : false ,
        styleObject : {top:'80px', right: '43px'},
        leaderImg : require('../../assets/img/index/ld1.png'),
        indexTiltes : 0,
        leaderList : [
            {name : '县领导走访服务登记流转表'},
            {name : '县领导走访挂钩联系企业情况登记表'},
            {name : '县领导走访挂钩联系企业情况汇总表'}
        ],
        industrialchains : false ,
        bigfivein : true , // 五大产业互联网+
        bigfiveBeidou:true,// 五大产业详情
        bigfiveartificial: true , // 五大产业详情
        bigfivevirtual: true , // 五大产业详情
        bigfiveG: true , // 五大产业详情
        chinaModal : false, //中国详情模态框
        chinaFiveG : false, //中国五G详情
        chinacommunication : false , // 中国通信详情
        chinaElectronics : false , // 中国电子
        chainaZZ : false , // 中国智能
        baiduyun : false , // 中国百度云详情
        beidaxianqing : false , // 北大闲情
        cstime : '',
        CanshanName : '', // 仓山经济标题
        jyDatas : '' , // 橘园洲数据
        CanshanList : [
            [342],
            [543],
            [567567]
        ], //仓山经济数据
        showJJ : false , // 经济指标模态框
        systemDate : '', // 仓山经济指标时间
        systeList : [] , // 仓山经济数组
      changeTitel : true,
      activeClass: 0,
        itemList: [
        {
          text: "五大产业链"
        },
        {
          text: "六大实验室"
        },
        {
          text: "三大园区 + 三大产业小镇"
        }
      ],
        indexTilte : 0,
        titleList : [
            {text:'招商成果'},
            {text:'重点项目'}
        ], //招商成果和数字福州（仓山区）项目进展切换
        fraction : '', // 分数
      // 招商成功数据
      zsData: [],
      // 建设成果
      jsData: [],
      // 产业规模图表数据
      industrialData: {
        xData: ["2017", "2020"], // x轴name
        data1: [2.0, 2.2], // 蓝色柱子数据
        data2: [5, 9] // 红色柱子数据
      },
      // 升级旧产业图表数据
      pieData: {
        data: [64.06, 144.55]
      },
      value: 0,
      speed: 5000,
      // 智能制造图表数据
      smartData: {
        xData: ["2017", "计划2020"], // x轴name
        data: [15.6, 20] // 蓝色柱子数据
      },
      smartData1: {
          xData: ["2017", "计划2020"], // x轴name
          data: [15.6, 20] // 蓝色柱子数据
      },
      policyModal: false,
      iundustrialModel : false , // 金山工业园区模态框
      cangshaArea : false , // 新区仓山区功能区显示隐藏
        // 招商政策
      policyData: [],
      jsfinger : false , // 金山工业园区点击
      csfinger : false , // 新区仓山功能区
        datapie: [] ,//饼图图列数据
        arouselc: [], // 轮播数据
        csfingerData : [] , // 新区功能区数据
        jsDatas: [], // 金山工业园区数据
        xiangqin : {
          name : '金山片区',
            GY: '',
            FW : '',
            SS: '',
            QT : ''
        },
        xqList: [
            {index : 0 , title : '中国移动5G联创开放实验室' , conter : '福建移动将“5G联合创新实验室”落地仓山挂牌运营，并在仓山区建设5G基站，搭建5G实验网，用以承载VR/AR、远程医疗、外场支援、物联网、智慧城市、智能家居、智能物流、VR教育等连接量较大的应用，打造5G网络试点区。5G联合创新实验室”将展示VR+教育、智慧社区、智慧园区等相关应用。'},
            {index : 1 , title : '中国信通院数字经济创新发展研究中心' , conter : '信通院拟与仓山区政府、福建移动在仓山成立数字经济创新发展研究中心。研究中心初期将主要围绕人工智能技术产业及应用辐射产业，为实现“智能仓山”打造“三个一”工程。具体为：制定智能仓山产业发展规划及行动计划，搭建智能产业公共服务平台，开展智能产品认证服务、智能产业大数据监测、产业政策解读服务、智能产业招商评估服务、企业转型提升全面服务，打造智能产业峰会品牌。'},
            {index : 2 , title : '北大-旋极伏羲智能空间创新实验室' ,conter : '北京大学工学院与旋极伏羲（福州）大数据技术有限公司共同指导下的联合研发平台。主要进行智能空间标识编码研究、智能空间大数据技术研究、城市公共智能空间应用模式研究、智能空间基础信息设施建设关键技术研究、智能空间互联互通服务技术研究，给予福州、仓山在智能空间时空创新应用研究方面的理论和技术支持。'},
            {index : 3 , title : '华为（福州）人工智能孵化中心' , conter: '挂牌成立“华为（福州）人工智能孵化中心”， 协议期生效后在当地组建一支不少于10人的专业支持团队，并基于业务发展情况逐步扩展。创新中心负责智能仓山建设及企业数字化转型云服务平台等方向的业务创新、持续运营、制造企业上云及运营策略优化等。'},
            {index : 4 , title : '百度云（福州）AI实验室' , conter : '百度云（福州）AI实验室项目是基于ABC（AI+Big Data+Cloud Computing）+ IOT 生态平台建设的目前中国最完整、最全面、最前沿、最有活力和最具影响力的智能实验室。实验室落地将辐射福建省，影响东南地区（江西、粤东、浙西、台湾），推进跨区域示范性开发与应用服务的深入合作、落地，加快整合创新资源与要素集聚。与福州及周边区域共同打造并带动AI+技术创新的氛围环境，助力福建并影响东南地区的企业推进AI赋能与技术创新以及实体经济转型升级。'},
            // {index : 0 , title : '中国移动5G联创开放实验室' , conter : '福建移动将“5G联合创新实验室”落地仓山挂牌运营，并在仓山区建设5G基站，搭建5G实验网，用以承载VR/AR、远程医疗、外场支援、物联网、智慧城市、智能家居、智能物流、VR教育等连接量较大的应用，打造5G网络试点区。5G联合创新实验室”将展示VR+教育、智慧社区、智慧园区等相关应用。'},
        ],
        xqConter: [],
        fivemajorList : [
            {index : 1 ,  title : '人工智能产业链' , conter :
                    ['1、发展重点\n' +'积极推动AI基础算法、计算机视觉、语义分析、人机交互等前沿人工智能技术发展。加快AI芯片、类脑芯片的生产与封测技术研发。支持智能手表、智能音响、智能台灯、智能门铃、智能摄像头等消费电子产品发展，着力推进人工智能与工业制造、安防、交通运输、商业服务、消费品等领域的融合。加强区块链与人工智能的融合发展，率先在隐私数据保护、可信智能决策、分布式数据集等重点领域突破一批行业应用与解决方案。\n',
                        '2、发展路径\n' + '依托百度云（福州）AI实验室和华为人工智能孵化中心，统筹布局人工智能算法理论、计算机视听觉等关键技术研究。依托华为鲲鹏计算产业基地、中软国际等主体强化底层算力支撑，不断加快软硬件平台建设，构筑开放多样的AI产业生态。依托瑞达精工、宜美电子等企业，加快发展人工智能消费电子产品。立足福顺半导体等本地半导体产业基础，加快推动AI领域细分芯片类型的研发与生产。鼓励首台套设备、首版次软件在本地市场化应用，支持人工智能设备的政府采购向本地企业与产品倾斜，推动形成多维创新协作的人工智能产业发展格局。\n'
                    ] },
            {index : 2 , title: '互联网+产业链' , conter:
                    [
                        '1、发展重点\n' +
                        '着力加快“互联网+”制造业发展，重点推进传感器、数控机床等高精度、高感知制造装备与工业互联网平台、工业APP、嵌入式控制系统等软件发展，支持在纺织鞋服、高端装备制造、生物医药等优势行业领域率先开展示范，从而不断带动其它行业转型升级。支持发展车载传感器、车载智能终端和自动驾驶平台，加快推动“车联网”应用落地。鼓励发展文学、音乐、电台、动漫、短视频、影视剧等不同类型的互联网内容产品，以及电竞、直播、社交、艺术、运动等网络文娱产品及服务。发展政务、民生“互联网+”解决方案及成套设备。大力发展新型可信基础设施，利用区块链技术释放互联网数据资源价值，加速推动信息互联网向价值互联网转变。\n',
                        '2、发展路径\n' +
                        '依托富士康工业富联拥有的丰富制造经验，通过综合运用工业物联（IIoT）和工业人工智能（IAi）等技术，并结合电子柔性制造、金属加工等专业云应用，持续赋能本地龙头企业，加速推进企业上云。在金山工业园区、企业中积极推广“互联网+”制造、智能制造，不断优化管理与生产各环节工作效率，切实推动互联网、人工智能与制造业的深度融合。加快新石器、智行者网联车项目落地，推动网联车技术研发与产品生产。依托字节跳动、宝宝巴士等互联网企业，创作多样化数字内容产品。依托游龙网络、渠动网络、中国电信电子竞技提速实验室，积极发展网络文娱产品及服务。稳步推进数字政务平台建设，深化教育、医疗、养老等民生事业与互联网有机融合。\n'
                    ] },
            {index : 3 , title : '北斗技术应用产业链' , conter : [
                    '1、发展重点\n' +
                    '着力推进北斗网格码、空间信息大数据等技术研发。积极开发应用于空间信息的数据采集软件、信息传输软件、数据处理软件。支持加快北斗定位定位芯片、移动终端、测绘仪等设备研发生产。推动北斗网格技术与车船定位、交通导航、城市管理、商品溯源等领域的深度融合。\n',
                    '2、发展路径\n' +
                    '统筹推进北京大学北斗网格智能空间协同创新实验室建设，发挥旋极伏羲技术优势，探索研究北斗网格前沿技术，推动北斗空间位置信息大数据产业发展。依托福顺半导体、福顺微、合顺微等半导体产业基础，积极参与北斗功能模块的生产与制造。围绕北斗网格技术，研发高精度定位软件与设备。推动北斗行业应用发展，发挥“北斗+车联网”示范作用，加快北斗网格高精度时空信息服务在交通定位、溯源追踪、道路救援等方面的广泛应用。\n'
                ]},
            {index : 4 , title : '5G+产业链' , conter: [
                    '1、发展重点\n' +
                    '加速5G通信设施部署，持续推进骨干网、室外网、室内网建设。发展5G通信机房、基站天线、光通信模块、配套网络接入箱等基础设备，研发新通信设备、新移动终端、新数据传输软件。推动5G与环境监测、安防监控、智慧生产、智能服务等领域深度融合。积极布局8K超高清视频、超高清显示设备、防眩光玻璃面板等衍生领域。\n',
                    '2、发展路径\n' +
                    '依托中邮科及移动、联通、电信三大运营商技术与市场优势，研发配套设施，加快5G基站、机房等通信设备大规模部署，加速实现仓山5G信号全覆盖，促进4G、5G协同发展。依托中国移动5G联创开发实验室，完善5G创新创业体系。重点加速5G+VR、5G+车联网等新兴领域结合发展。利用5G推动制造业自动化、服务业智能化，持续加速传统产业优化升级。依托欧浦登，积极研发高清显示设备与防眩光玻璃，抢占5G时代超高清显示设备市场。\n'
                ]},
            {index : 5  , title: '虚拟增强产现实业链' , conter : [
                    '1、发展重点\n' +
                    '加快在VR数据采集设备领域布局，推动数据衣、数据手套等动作采集设备，全景摄像头、三维扫描仪等图像采集设备，高清麦克风、浸入式声场采集麦克风等音频采集设备发展。支持OLED、MicroLED等VR显示技术，六轴传感器、定位追踪等感知交互技术发展。加快VR图像渲染与处理技术与内容制作技术研发，推动图像渲染加速算法、图形接口等渲染处理技术，超高分辨率、高帧率、三维实景拼接等制作技术在VR领域的应用。\n',
                    '2、发展路径\n' +
                    '充分发挥互联网小镇VR内容创作团队聚集优势，以中国信通院VR/AR实验室、中国移动云VR实验室为主体，打造覆盖范围广泛、展现形式灵活的的VR内容产品集群。鼓励本地企业向VR软件硬件研发拓展，支持新技术、新设备在本地VR内容创作团队中的推广应用。依托中国移动VR内容分发优势，加快拓宽分发渠道，抢占VR内容制作市场，推动形成内容+软硬协同的VR市场发展格局。\n'
                ]}
        ],
        fiveConter :[] ,
        t : '', // 招商优惠政策内容
    };
  },
  methods: {
      modelLeader (index) {
          this.indexTiltes = index ;
          if(index === 0 ) {
              this.leaderImg = require('../../assets/img/index/ld1.png');
              this.styleObject = {top:'80px', right: '43px'};
              this.dingwei = {right:'58px'};
          }else if (index === 2 ) {
              this.leaderImg = require('../../assets/img/index/ld3.png');
              this.styleObject = {top: '83px',right: '45px'}
              this.dingwei = {right : '619px'};
          }

      },
      getTimeX : function (index) {  // 仓山经济时间选择
          let time = index.slice(0,4) ;
          time += index.slice(5,7);
          this._CanShanData({},this.CanshanName,time);
      },
      fivemajor : function(index) {
          this.industrialchains = true ;
          for (let item of this.fivemajorList ) {
              if ( index === item.index ) {
                  this.fiveConter = item ;
              }
          }
      },
      chinafiG:function (index) {
          this.chinaModal = true;
          for (let item of this.xqList ) {
              if ( index === item.index ) {
                  this.xqConter = item ;
              }
          }
      },
      routpages:function () {
          this.$router.push({ path: "/company" });
      },
      //仓山经济指标
      _Economic:function (formData,  city, totalTime) {
          var that = this;
          formData = Object.assign(formData, {
              city,
              totalTime,
          });
          const keyOne = "economyFilter";
          const url = '/economy/query';
          getBuildData({formData , url, keyOne })
              .then(result => {
                  let time = '';
                  that.systeList = result.data.results.list;
                  time = result.data.results.list[0].totalTime.slice(0,4) + '年';
                  time += result.data.results.list[0].totalTime.slice(4,6) + '月';
                  that.cstime = time;
              })
              .catch(err => {
                  console.log(err);
              });
      },
      //经济最新时间数据
      _getNewtime:function () {
          var that = this;
          const keyOne = "";
          const url = '/economy/getNewTime';
          construction({ url, keyOne })
              .then(result => {
                  this._Economic({},'仓山区',result.data.results.time.total_time); // 仓山经济指标
              })
              .catch(err => {
                  console.log(err);
              });
      },
      //建设成果接口
      _conInterFace:function () {
          var that = this;
          const keyOne = "projectFilter";
          const url = '/project/query';
          construction({ url, keyOne })
              .then(result => {
                  for (let item of result.data.results.list ) {
                      that.jsData.push(item);
                  }
              })
              .catch(err => {
                  console.log(err);
              });
      },
      //招商成果接口
      _Investment :function() {
          var that = this;
          const keyOne = "investmentResultsFilter";
          const url = '/investment/query';
          construction({ url, keyOne })
              .then(result => {
                  for (let item of result.data.results.list ) {
                      // if (item.phone != null ) {
                      //     // item.companyPhone = item.companyPhone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                      //     item.phone = item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                      // }
                      // if (item.linkman != "" ) {
                      //     item.linkman = item.linkman.trim().replace(/^(.+).(.)$/, "$1*$2");
                      // }
                      that.zsData.push(item);
                  }
                  // console.log(that.zsData)
              })
              .catch(err => {
                  console.log(err);
              })
      },
      //招商政策接口
      _policy:function () {
          var that = this;
          const keyOne = "favorablePolicyFilter";
          const url = '/favorable/query';
          construction({ url, keyOne })
              .then(result => {
                  console.log(result)
                  for (let item of result.data.results.list ) {
                      that.policyData.push(item);
                  }
              })
              .catch(err => {
                  console.log(err);
              });
      },
      // 商业监测分数接口
      _Industrytest:function () {
          var that = this;
          const keyOne = "industrialMonitorFilter";
          const url = '/monitor/getTopIndustrial';
          construction({ url, keyOne })
              .then(result => {
                  this.fraction = result.data.results.industrialMonitor.actualScore;
              })
              .catch(err => {
                  console.log(err);
              });
      },
      // 首页仓山区仓山区智能产业规模接口
      _DistrictIntelligent :function() {
          var that = this;
          const keyOne = "intelligenceFilter";
          const url = '/intelligence/query';
          construction({ url, keyOne })
              .then(result => {
                  var data = result.data.results.list;
                  this.industrialData.xData = [data[0].year,data[1].year];
                  this.industrialData.data1 = [data[0].figure,data[1].figure];
                  this.industrialData.data2 = [data[0].capacity,data[1].capacity];
                  this.industrialData.data2[0] = result.data.results.list[0].capacity;
              })
              .catch(err => {
                  console.log(err);
              });
      },
      // 首页升级企业列表左下角 接口
      _upgradeIndustry:function() {
          var that = this;
          const keyOne = "upgradeIndustryFilter";
          const url = '/upgradeIndustry/query';
          construction({ url, keyOne })
              .then(result => {
                  this.pieData.data = [
                      result.data.results.list[0].digitalIndustry,
                      result.data.results.list[0].industryDigital,
                      result.data.results.list[0].digitalIndustryPercent,
                      result.data.results.list[0].industryDigitalPercent
                  ];
                  this.datapie = result.data.results.list[0]; // 图列饼图数据
              })
              .catch(err => {
                  console.log(err);
              });
      },
      //首页轮播接口数据
      _carousel:function() {
          var that = this;
          const keyOne = "industryContentFilter";
          const url = '/industryContent/query';
          construction({ url, keyOne })
              .then(result => {
                  // console.log('轮播数据',result.data.results.list[0]);
                  this.arouselc = result.data.results.list[0];
                  this.smartData.data = [this.arouselc.manufactureYear,this.arouselc.manufacturePlan];
                  this.smartData1.data = [this.arouselc.transitionYear,this.arouselc.transitionPlan];
              })
              .catch(err => {
                  console.log(err);
              });
      },
      //新区功能区
      _modelindustrialPark:function() {
          var that = this;
          const keyOne = "industrialParkFilter";
          const url = '/industrialPark/query';
          construction({ url, keyOne })
              .then(result => {
                  // console.log(result.data.results)
                  this.jsDatas = JSON.parse(result.data.results.list[2].orther);
                  this.csfingerData = JSON.parse(result.data.results.list[1].orther);
                  this.jyDatas = JSON.parse(result.data.results.list[0].orther);
                  this.xiangqin.GY = this.jsDatas.JSQT;
                  this.xiangqin.FW = this.jsDatas.JSFW;
                  this.xiangqin.SS = this.jsDatas.JSXS;
                  this.xiangqin.QT = this.jsDatas.JSQT;
                  let arr = [] ;
                  arr[0] = this.jyDatas.twoShang ; // 服务企业
                  arr[1] = this.jyDatas.twoHightech ;// 工业企业
                  arr[2] = this.jyDatas.Othertypes ; // 其他企业
                  this.jyPieData  = arr ;
              })
              .catch(err => {
                  console.log(err);
              });
      },
    // 切换首页地图上方tab栏
    getItem:function(index) {
      this.activeClass = index; // 把当前点击元素的index，赋值给activeClass
        // console.log(typeof  index)
        if (index == 2 ) {
            this.jsfinger = true;
            this.csfinger = true;
            this.jyfiner = true ;
            this.chinaFiveG = false ; // 中国五G详情
            this.chinacommunication = false ; // 中国通信详情
            this.chinaElectronics = false ;
            this.chainaZZ = false ;
            this.baiduyun = false ;
            this.beidaxianqing = false ;
           this.bigfivein =false;
           this.bigfiveBeidou = false;
           this.bigfiveartificial = false;
           this.bigfivevirtual=false;
           this.bigfiveG =false;
        }else  if (index === 1 ) {
            this.chinaFiveG = true ; // 中国五G详情
            this.chinacommunication = true ; // 中国通信详情
            this.chinaElectronics = true ;
            this.chainaZZ = true ;
            this.baiduyun = true ;
            this.beidaxianqing = true ;
            this.bigfivein = false ;
            this.bigfiveBeido = false ;
            this.bigfiveartificial  = false ;
            this.bigfivevirtua = false ;
            this.bigfiveG = false ;
            this.bigfivevirtual = false;
            this.jyfiner = false ;

        }
        else if ( index === 0 ) {
           this.bigfivein = true ;
           this.bigfiveBeido = true ;
           this.bigfiveartificial  = true ;
           this.bigfivevirtua = true ;
           this.bigfiveG = true ;
            this.jsfinger = false;
            this.csfinger = false;
            this.chinaFiveG = false ; // 中国五G详情
            this.chinacommunication = false ; // 中国通信详情
            this.chinaElectronics = false ;
            this.chainaZZ = false ;
            this.baiduyun = false ;
            this.jyfiner = false ;
            this.beidaxianqing = false ;
        }
    },
    getItemTile:function(index) {
          var that = this ;
          this.indexTilte = index; // 招商成果 建设成果 标题切换
         if (index === 0 ) {
             that.changeTitel = true;
         }else {
             that.changeTitel = false;
         }
      },
    openpolicyModal:function() {
      this.policyModal = true;
    },
      // 跳转公司详情页
      routpage:function(name) {
          // his.$router.push({ path: "/corporate"});
          var params = name;//企业名称
          var userId = 123;//用户id
          var userMd5 = hex_md5(userId);
          var sign = hex_md5(userMd5 + "7d44f079e9051033d4e08626a865f2bf");
          var url = "https://www.qichacha.com/search?key=" + params;
          window.open(url.replace(/\s*/g,""));//跳转企查查页面 replae：去除参数空格问题
      },
      //链接跳转
      tagelink:function(id) {
          // window.open(href)  //新窗口打开
          // this.curporNew = !this.curporNew;
          this.policyModal = false ;
          this.newDetails = true;
          this.policyData.forEach((value,index) => {
                if (value.id == id ) {
                   this.t = value;
                }
          })
          console.log(this.t)
      },
    // 查看建设成果详情
      viewZs:function() {
        if (!this.changeTitel){
            this.$router.push({ path: "/construction-results" });
        }else {
            this.$router.push({ path: "/investment-results" });
        }
    },
    // 查看企业列表
    viewCompony() {
      this.$router.push({ path: "/company" });
    },
    // 跳转发展指数页面
    viewExponent() {
      this.$router.push({ path: "/exponent" });
    },
    // 跳转十大专项行动
    viewTenTarget() {
      this.$router.push({ path: "/ten-target" });
    },
      // 五个饼图点击事件
      clickData:function(data){
          let num = data.seriesIndex;
          console.log(this.jsDatas);
          if (num === 0 ) {
              this.xiangqin.name = '金山片区';
              this.xiangqin.GY = this.jsDatas.JSQT;
              this.xiangqin.FW = this.jsDatas.JSFW;
              this.xiangqin.SS = this.jsDatas.JSXS;
              this.xiangqin.QT = this.jsDatas.JSQT;
          }else if (num === 1) {
              this.xiangqin.name = '橘园洲片区'
              this.xiangqin.GY = this.jsDatas.JYGY;
              this.xiangqin.FW = this.jsDatas.JYFW;
              this.xiangqin.SS = this.jsDatas.JYSS;
              this.xiangqin.QT = this.jsDatas.JYQT;
          }else if (num === 2 ){
              this.xiangqin.name = '浦上片区'
              this.xiangqin.GY = this.jsDatas.PSGY;
              this.xiangqin.FW = this.jsDatas.PSFW;
              this.xiangqin.SS = this.jsDatas.PSSS;
              this.xiangqin.QT = this.jsDatas.PSQT;
          }else if ( num === 3) {
              this.xiangqin.name = '福湾片区'
              this.xiangqin.GY = this.jsDatas.FWGT;
              this.xiangqin.FW = this.jsDatas.FWFW;
              this.xiangqin.SS = this.jsDatas.FWSS;
              this.xiangqin.QT = this.jsDatas.FWQT;
          }else {
              this.xiangqin.name = '义序片区'
              this.xiangqin.GY = this.jsDatas.YXGY;
              this.xiangqin.FW = this.jsDatas.YXFW;
              this.xiangqin.SS = this.jsDatas.YXSS;
              this.xiangqin.QT = this.jsDatas.YXQT;
          }
      },
      // 显示仓山指标情况
      hrefLocation(name,time) {
        this._CanShanData({},name,time);
          this.CanshanName = name ;
          // this.$router.push({
          //     path: '/CangshanEconomy',
          //     name: 'CangshanEconomy',
          //     params: {
          //         city: name,
          //         time: time
          //     }
          // })
      },
      //仓山经济指标单条数据
      _CanShanData:function (formData,  indexName, totalTime ) {
          var that = this;
          formData = Object.assign(formData, {
              indexName,
              totalTime
          });
          const keyOne = "economyFilter";
          const url = '/economy/query';
          getBuildData({formData , url, keyOne })
              .then(result => {
                  // console.log(result.data.results.list)
                  let cityList = [];  // 城市数组
                  let uplv = [] ; // 增长率
                  let num = [] ; // 累计数
                  let ass = [] ;
                  if (result.data.results.list.length === 0 ) {
                      ass[0] = ["仓山区", "福州市", "鼓楼区", "晋安区", "长乐区", "福清市", "闽侯县", "连江县", "罗源县", "闽清县", "永泰县", "马尾区", "台江区"];
                      ass[1] = [0,0,0,0,0,0,0,0,0,0,0,0];
                       ass[2] = [0,0,0,0,0,0,0,0,0,0,0,0];
                  }else {
                      for (let item of result.data.results.list) {
                          cityList.push(item.city)
                          uplv.push(item.increase)
                          num.push(item.grandTotal)
                      }
                      ass[0] = cityList;
                      ass[1] = uplv;
                      ass[2] = num;
                  }
                  that.CanshanList = ass ;
                  that.showJJ = true;
              })
              .catch(err => {
                  console.log(err);
              });
      },
  },
  created() {
      this._conInterFace(); // 首页建设成果接口调用。
      this._Investment(); //首页招商成果接口调用
      this._policy(); //首页招商政策接口调用
      this._Industrytest(); //首页发展指数得分接口调用
       this._DistrictIntelligent(); // 首页仓山区智能产业规模接口
      this._upgradeIndustry(); // 首页左下角企业列表饼图接口
      this._carousel(); // 首页轮播数据
      this._modelindustrialPark();// 模态框金山 新区工业区数据
      this._getNewtime();  // 获取仓上经济指标
  },
};
</script>

<style>

  .xq-title {
    margin-top: 20px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 3rem;
  }
  .xq-conter {
    color: #fff0f6;
    font-size: 20px;
    text-indent : 2rem;
  }

  .chinaModal .ivu-modal {
    top: 208px;
  }

  .chinaModal .ivu-modal-footer {
    font-size: 50px;
    display: none !important;
  }
  .industrialchains  .ivu-modal {
    top: 150px;
  }
  .industrialchains .ivu-modal-content {
    height: 700px!important;
  }
  .chinaModal .ivu-modal-content {
    height: 400px;
    border-radius: 0;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-image: url("../../assets/img/index/groupss.png");
    background-color: transparent;
  }
/* // 招商政策模态框 */
.zsModal , .jsModal  .chinaModal{
  color: #fff;
  font-size: 22px;
}
.zsModal .ivu-modal-footer ,   .jsModal .ivu-modal-footer  {
  font-size: 50px;
  display: none !important;
}

.zsModal .ivu-modal-content ,  .jsModal .ivu-modal-content   {
  height: 800px;
  border-radius: 0;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-image: url("../../assets/img/index/zsModal.png");
  background-color: transparent;
}

.jsModal .ivu-modal-content {
  background: url("../../assets/img/index/jshan.png") no-repeat;
  background-size: 100% 100%;
}
.gardenIsland .ivu-modal-content {
  background: url("../../assets/img/index/juyuanmotai.png") no-repeat;
  background-size: 100% 100%;
}

  .newDetails .ivu-modal-content {
    background: url("../../assets/img/index/newxq.png") no-repeat;
    background-size: 100% 100%;
  }


.zsModal .zspolicy-content::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border: 1px solid transparent;
  background-color: #03222e;
}
.zspolicy-content {
  height: 700px;
  overflow-y: scroll;
  margin-top: 55px;
  padding: 0 20px;
}
.allss {
  overflow-y: hidden;
}

.zspolicy-content p {
  font-size: 20px;
  font-family: PingFang SC;
  padding: 8px 10px;
}

.zspolicy-content p:nth-child(odd) {
  background-color: #03222e;
}

.zspolicy-content p:nth-child(even) {
  background-color: #001720;
}


  /* 金山园区模态框*/
  .head-font {
    font-size:23px;
    font-family:PangMenZhengDao;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .jsmodal-introduction {
    box-sizing : border-box;
    padding: 20px;
    width: 89%;
    border: 1px solid white;
    background-color : #095876FF;
    margin-top: 20px;
  }

  .jsmodal-introduction span {
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  .js-left-footer { /*金山工业区左下*/
      margin-top: 50px;
      text-algin : center;
      width: 97%;
  }
  .js-left-footer div {
    font-size:56px;
    font-family:Impact;
    font-weight:400;
    color:rgba(32,194,255,1);
    text-align: center;
    height: 30px;
    margin-left: -8px;
  }
  .js-left-footer span {
    font-size:8px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
    /* 饼图模块中间部分定位*/
  .pie-possion {
    height: 44px;
    width: 615px;
    border-radius: 10px 10px 0px 0px;
    border: 1px solid #ccc;
    position: absolute;
    bottom: 252px;
    margin: 0px auto;
    display: flex;
    left: 10%;
    align-items: center;
    background: #095876FF;
    text-align: center;
    color: #fff0f6;
  }
  .address-name {
    width: 100px;
    height: 44px;
    line-height: 44px;
    border-right:1px solid #ccc;
    margin-right : 20px;
    font-weight: 700;
    font-size: 18px;
  }
  .pie-possion div {
    width:113px;
  }
  /*仓山新区功能区*/
    .zsModals {
        color: #fff;
        font-size: 22px;
    }
    .zsModals .ivu-modal-footer  {
        font-size: 50px;
        display: none !important;
    }
    .zsModals .ivu-modal-content {
        height: 900px;
        border-radius: 0;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-image: url("../../assets/img/index/csgnpng.png");
        background-color: transparent;
    }
  .backfimg {
    height: 340px;
    background: url("../../assets/img/index/sixs.png") no-repeat center;
    background-size: 90% 90%;
    width: 84%;
  }
  .gardenImg {
    height: 340px;
    background: url("../../assets/img/index/juyuan.png") no-repeat center;
    background-size: 90% 90%;
    width: 84%;
  }
  /*//橘园洲图背景*/
  .foot-Img {
    background: url("../../assets/img/index/juyuantwo.png") no-repeat center bottom;
    background-size: 99% 75%;
    height: 280px;

  }
  .chaimg {
    background: url("../../assets/img/index/cha.png") no-repeat center center;
    height: 20px;
    width: 20px;
    cursor: pointer;
    position: absolute;
    right: 22px;
  }
  /*橘园洲模态框样式*/
     .flex-mu {
       text-align: center;
       margin-bottom: 36px;
     }
      .juyuan-font {
        font-size:56px;
        font-family:Impact;
        font-weight:400;
        color:rgba(32,194,255,1);
        text-align: center;
      }
  .flex-mu > div:nth-child(2) {
    font-size:21px;
    font-family:Microsoft YaHei;
    font-weight:700;
    color:rgba(255,255,255,1);
  }
  .ql-align-center {
    text-align: center!important;
  }

</style>
