<style lang="less"  scoped>
@import "./company.less";
@import "../../assets/css/flex.less";
</style>

<template>
  <div class="mains">
    <!--    标题-->
    <div class="title-head">"智能仓山"产业监测平台</div>
    <div class="title-head-two">
      <div>12510 行动体系</div>
    </div>
    <!-- 返回按钮 -->
    <div class="back-btn" @click="backIndex"></div>
    <!--各大公司LOGo淡入淡出 -->
    <transition name="my">
      <div class="company-logo" v-if="show"></div>
    </transition>
    <!-- 切换表格 -->
    <transition name="my" >
      <div class="wrraper" v-if="settimeshow">
      <div class="tab-title-bg"></div>
      <Tabs value="name1" id="tab-title"  >
        <!-- 龙头企业汇总表表格 -->
        <TabPane class="title-content" label="龙头企业汇总表" name="name1" >

          <Row>
              <!-- 饼状图表 -->
              <Col span="6" class="chart-content">
                <h3 class="type-title">行业分类</h3>
                <longtoupie :data="lonPieData" style="height: 300px;width:90%;margin:25px 15px;" />
<!--                <div class="pie-name" style="color: #ffffff" >{{this.biglei}}</div>-->
                <h3 class="type-title">产值占比</h3>
                <zhanbilong  style="height: 270px;width:90%;margin:25px 15px;" />
<!--                  <div class="pie-name" >-->
<!--                    <div class="changes">-->
<!--                      <div :class="comenput ===  0 ? 'comenput' : '' "  @click="changeClass(0)">{{this.medium}}</div>-->
<!--                      <div :class="comenput ===  1 ? 'comenput' : '' "  @click="changeClass(1)" v-if="medium1!='暂无'">{{this.medium1}}</div>-->
<!--                    </div>-->
<!--                </div>-->
              </Col>
            <Col span="18">
              <!-- 龙头企业汇总表表格分类标签页-->
              <div class="company-tabs-enterprise faucet" v-if="showLongtouTab">
                <div
                  :class="activeClassfaucet == index ? 'active':''"
                  v-for="(item,index) in itemListfaucet"
                  :key="index"
                  @click="getItemfauect(index)"
                >{{item.text}}</div>
              </div>
              <br/>
              <Scroll :on-reach-bottom="handleReachBottom" :height=630  v-if="showTable" :distance-to-edge="[14,14]">
                <Table
                  :height="620"
                  class="company-table"
                  :row-class-name="rowClassName"
                  :columns="tableHead2"
                  :data="tableData2"
                ></Table>
              </Scroll>
              <div class="foot-end" v-if="showTable" >
                <p v-if="showfooters">_____________已经到最底了，数据已全部加载完_____________</p>
              </div>
              <transition name="bounce">
                <div v-if="!showTable">
                  <div class="details">
                    <div class="details-div div-one">
                      <div>所属城市</div>
                      <div>
                        {{subform.city}}
                      </div>
                    </div>
                    <div class="details-div div-two ">
                      <div>企业名称</div>
                      <div>{{subform.campanyName}}</div>
                    </div>
                    <div class="details-div div-three">
                      <div>细分领域产品或服务情况</div>
                      <div>{{subform.productField}}</div>
                    </div>
                    <div class="details-div div-four">
                      <div>细分领域类别</div>
                      <div>{{subform.categoryField}}</div>
                    </div>
                  </div>
                  <div class="details-footer">
                    <div class="details-div div-one">
                      <div>细分领域类别</div>
                      <div>{{subform.categoryField}}</div>
                    </div>
                    <div class="details-div div-three">
                      <div>法人</div>
                      <div>{{subform.legalPerson}}</div>
                    </div>
                    <div class="details-div div-two ">
                      <div>联系人</div>
                      <div>{{subform.linkman}}</div>
                    </div>
                    <div class="details-div div-four">
                      <div>联系电话</div>
                      <div>
                        {{subform.phone}}
                      </div>
                    </div>
                    <div class="details-div div-four">
                      <div>2016年营业收入（亿元）</div>
                      <div>{{subform.assetsLastYear}} </div>
                    </div>
                    <div class="details-div div-four">
                      <div>2017年营业收入（亿元）</div>
                      <div>
                        {{subform.assetsBeforeLastYear}}
                      </div>
                    </div>
                    <div class="details-div div-four">
                      <div>2018年营业收入（亿元）</div>
                      <div>
                        {{subform.taking}}
                      </div>
                    </div>
                    <div class="details-div div-four">
                      <div>细分领域研发投入（万元）</div>
                      <div>
                        {{subform.fieldExploit}}
                      </div>
                    </div>
                  </div>
                  <div class="details-footer">
                    <div class="details-div div-four">
                      <div>2018年细分领域营业（亿元）</div>
                      <div>
                        {{subform.fieldRevenue}}
                      </div>
                    </div>
                    <div class="details-div div-one">
                      <div>2018年在全球排名</div>
                      <div>
                        {{subform.globalRanked}}
                      </div>
                    </div>
                    <div class="details-div div-two ">
                      <div>2018年在全国排名</div>
                      <div>{{subform.nationalRanked}}</div>
                    </div>
                    <div class="details-div div-three">
                      <div>2018年全省排名</div>
                      <div>{{subform.provinceRanked}}</div>
                    </div>
                    <div class="details-div div-four">
                      <div>2018年全市排名</div>
                      <div>{{subform.cityRanked}} </div>
                    </div>
                    <div class="details-div div-four">
                      <div>细分领域从业人员（人）</div>
                      <div>
                        {{subform.fieldEmployee}}
                      </div>
                    </div>
                    <div class="details-div div-four">
                      <div>2018年研发投入（万元）</div>
                      <div>
                        {{subform.exploit}}
                      </div>
                    </div>
                    <div class="details-div div-four">
                      <div>2018年从业人员（人）</div>
                      <div>
                        {{subform.employee}}
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </Col>
          </Row>
<!--          <div style="text-align:center;margin-top:20px">-->
<!--            <Page-->
<!--              class="tablePgae"-->
<!--              @on-change="pageNumberChangeLong"-->
<!--              :total="pageTotal1"-->
<!--              :page-size="pageSize1"-->
<!--              show-total/>-->
<!--          </div>-->
        </TabPane>
        <!-- 纳统企业库表格 -->
        <TabPane class="title-content" label="纳统企业库" name="name2">
          <Row :gutter="30">
            <!-- 饼状图表 -->
            <Col span="6" class="chart-content">
              <h3 class="type-title">大类</h3>
              <pie :data="pieData" style="height: 250px;width:90%;margin:25px 15px;" />
              <div class="pie-name" style="color: #ffffff" >{{this.biglei}}</div>
              <h3 class="type-title">中类</h3>
              <pie :data="pieData1" style="height: 250px;width:90%;margin:25px 15px;" />
              <div class="pie-name" >
                <div class="changes">
                  <div :class="comenput ===  0 ? 'comenput' : '' "  @click="changeClass(0)">{{this.medium}}</div>
                  <div :class="comenput ===  1 ? 'comenput' : '' "  @click="changeClass(1)" v-if="medium1!='暂无'">{{this.medium1}}</div>
                </div>
              </div>
            </Col>
            <!-- 表格 -->
            <Col span="18">
            <!-- 纳统企业库四大类分类标签页-->
            <div class="company-tabs-enterprise">
              <div
                :class="activeClass == index ? 'active':''"
                v-for="(item,index) in itemList"
                :key="index"
                @click="getItem(index)"
              >{{item.text}}</div>
            </div>
             <!-- 标签页切换-->
            <Scroll :on-reach-bottom="handleReachBottoms" :height=578 :distance-to-edge="[2,2]" >
              <Table
                :height=580
                class="company-table"
                :row-class-name="rowClassName"
                :columns="tableHead1"
                :data="tableData"
              ></Table>
            </Scroll>
            <div class="foot-end"  v-if="showfootersJS">
              <p >_____________已经到最底了，数据已全部加载完_____________</p>
            </div>
<!--              <div style="text-align:center;margin-top:20px">-->
<!--                <Page-->
<!--                  class="tablePgae"-->
<!--                  @on-change="pageNumberChange"-->
<!--                  :total="pageTotal"-->
<!--                  :page-size="pageSize"-->
<!--                  show-total/>-->
<!--              </div>-->
            </Col>
          </Row>
        </TabPane>

      </Tabs>
    </div>
    </transition>
    <!-- 龙头企业查看详情模态框-->
    <Modal class="jsModal1" v-model="gardenIsland" width="1400px" :closable="false" >
      <div class="zspolicy-content">
        <div class="chaimg" @click="gardenIsland=false"></div>
        <div class="Lontou-xiang">
<!--          详情左侧-->
          <div>
<!--            标题-->
            <div class="lon-title">
                <div>{{subform.campanyName}}</div>
                <div>{{subform.city}}</div>
            </div>
<!--            基本情况-->
            <div class="basic">基本情况</div>
<!--            基本信息内容-->
            <div class="conter-lontou">
              <div></div>
              <div>联系人</div>
              <div>{{subform.linkman}}</div>
            </div>
            <div class="conter-lontou">
              <div class="back-img2"></div>
              <div>电话</div>
              <div>{{subform.phone}}</div>
            </div>
            <div class="conter-lontou">
              <div class="back-img3"></div>
              <div>注册时间：</div>
              <div>{{subform.gmtModified}}</div>
            </div>
            <div class="conter-lontou">
              <div class="back-img4"></div>
              <div>2018年资产总额：</div>
              <div>{{subform.assetsNow}}亿元</div>
            </div>
            <div class="conter-lontou" style="margin-bottom: 20px">
              <div class="back-img5"></div>
              <div>细分领域类别:</div>
              <div>{{subform.categoryField}}</div>
            </div>
            <div class="conter-lontou">
              <div class="back-img6"></div>
              <div>企业地址:</div>
              <div>{{subform.companyAddress}}</div>
            </div>
<!--            细分领域产品或服务情况-->
            <div class="modal-foter">
                <div>细分领域产品或服务情况</div>
              <div class="lontou-conter">
                  <div>
                   {{subform.productField}}
                  </div>
              </div>
            </div>
          </div>
<!--          详情右侧-->
          <div>
              <div class="right-long">
                <div>营业收入</div>
                <div>(亿元)</div>
              </div>
<!--            图表-->
            <div class="long-height">
              <div><lineModal :data="modalDataPie"  v-if="gardenIsland" style="height: 300px; margin-top: 20px; width: 100%"/></div>
              <div><rangking  :data="modalDataPie"  v-if="gardenIsland" style="height: 300px; margin-top: 20px; width: 100%"/></div>
            </div>
<!--      细分领域情况-->
              <div class="xifen-right">细分领域情况</div>
            <div class="echarts-three">
              <div><fivepie  :data="modalDataPie" v-show="gardenIsland" style="margin-top: 20px; height: 270px ; width: 100%;" /></div>
              <div><piePeop  :data="modalDataPie" v-show="gardenIsland" style="margin-top: 20px; height: 270px ; width: 100%;" /></div>
              <div><rdchart  :data="modalDataPie" v-show="gardenIsland" style="margin-top: 20px; height: 270px ; width: 100%;" /></div>
            </div>
          </div>
        </div>
      </div>
    </Modal>-

  </div>
</template>
<script>
// 公用css

// import "@/assets/css/common.css";
import  { getBuildData } from "@/api/city";
// 龙头查询URL
const QUERY_URL = "/emphasis/query";
// 纳统企业查询
const  Longtou_URL = '/company/query';
// 纳统企业分类查询
const classsion = '/typeRatio/queryById';

//行业分类
const Category = '/emphasis/groupByEmphasis';

import pie from "./pie";
import zhanbilong from './zhanbilong'
import longtoupie from './longtou';
import fivepie from  './fivepie';
import  piePeop from './piePeop'
import  rdchart from './rdchart'
import  lineModal from  './lineModal'
import  rangking from './Ranking'
export default {
  components: {pie,longtoupie,zhanbilong,fivepie,piePeop,rdchart,lineModal,rangking},
  data() {
    return {
        PageNumXuhao : 0 , // 每个页面的自增排序
        modalDataPie : '' , // 模态框饼图数据
        subform : [],
        gardenIsland : false , // 龙头企业模态框详情
        showTable : true ,
        comenput : 0,
      settimeshow : true, // 公司logo和表格切换
      // 公司logo 背景淡入淡出
      show: false,
      // 纳统表格数据
      tableHead1: [
          {
              title: "序号",
              key: "id",
              align:"center",
              width:80
          },
        {
          title: "中类",
            align:"center",
          key: "industryCode"
        },
        {
          title: "项目名称",
          key: "companyName",
            align:"center",
            className : 'xiangmu',
            render: (h, params) => {
                return h('span', {
                    style: {
                        color: '#FFFFFF'
                    },
                    on: {
                        click: () => {
                            console.log(params.row.companyName)
                            var paramss = params.row.companyName;//企业名称
                            var userId = 123;//用户id
                            var userMd5 = hex_md5(userId);
                            var sign = hex_md5(userMd5 + "7d44f079e9051033d4e08626a865f2bf");
                            var url = "https://link.qichacha.com/open/index.html#/search-company/59b25af198055be06d6908b4376829c8/" + sign + "/" + userMd5 + "?searchKey=" + paramss;
                            window.open(url.replace(/\s*/g,""));//跳转企查查页面 replae：去除参数空格问题
                        }
                    }
                }, params.row.companyName);
            }
        },
        {
          title: "法定代表人",
          key: "legalPerson",
            align:"center",
            width:200
        },
        {
          title: "主要业务活动",
          key: "business",
            align:"center",
        },
        {
          title: "详细地址",
          key: "address",
            align:"center",
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.address
                        }
                    }, params.row.address)
                ]);
            }
        },
        {
          title: "行业代码",
          key: "industryCodeSecond",
            align:"center",
            width: 100
        }
      ],
      tableData: [],
      // 龙头表格数据
      tableHead2: [
        // {
        //   title: "增长趋势",
        //   key: "city",
        //   align:"center",
        //     width: 150,
        //     // render: (h) => {
        //     //     return h('img', {
        //     //         attrs: {
        //     //             src: '../../../assets/img/public/redD.png',
        //     //         },
        //     //         style: {
        //     //             marginRight: '5px'
        //     //         },
        //     //         on: {
        //     //             click: () => {
        //     //                 this.menu2('/');
        //     //             }
        //     //         }
        //     //     });
        //     // }
        // },
          {
              title: "序号",
              key: "id",
              align:"center",
              width:80
          },
          {
              title: '增长趋势',
                align:"center",
                  width: 100,
              render: (h, params) => {
                  // console.log(params.row)
                      return h('div', [
                          h('img', {
                              attrs: {
                                  src: params.row.img,
                              },
                              style: {
                                  width: '40px',
                                  height: '40px'
                              }
                          }),
                      ]);
              }
          },
        {
          title: "企业名称",
          key: "campanyName",
          align:"center",
            className : 'xiangmu',
            render: (h, params) => {
                return h('span', {
                    style: {
                        color: '#FFFFFF'
                    },
                    on: {
                        click: () => {
                            console.log(params.row.campanyName)
                            var paramss = params.row.campanyName;//企业名称
                            var userId = 123;//用户id
                            var userMd5 = hex_md5(userId);
                            var sign = hex_md5(userMd5 + "7d44f079e9051033d4e08626a865f2bf");
                            var url = "https://link.qichacha.com/open/index.html#/search-company/59b25af198055be06d6908b4376829c8/" + sign + "/" + userMd5 + "?searchKey=" + paramss;
                            window.open(url.replace(/\s*/g,""));//跳转企查查页面 replae：去除参数空格问题
                        }
                    }
                }, params.row.campanyName);
            }
        },
        {
          title: "公司地址",
          key: "companyAddress",
          align:"center",
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.companyAddress
                        }
                    }, params.row.companyAddress)
                ]);
            }
        },
        {
          title: "细分领域类别",
          key: "categoryField",
          align:"center",
        },
          {
            title:'细分领域研发投入（万元）',
            key: 'fieldExploit',
              align:'center',
          },
        {
          title: "细分产品或服务情况",
          key: "productField",
          align:"center",
          width: 280,
            render: (h, params) => {
                return h('div', [
                    h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        },
                        domProps: {
                            title: params.row.productField
                        }
                    }, params.row.productField)
                ]);
            }
        },
        {
              title: "操作",
              key: "action",
              width: 220,
              align: "center",
              render: (h, params) => {
                  return h("div", [
                      h(
                          "Button",
                          {
                              props: {
                                  type: "info"
                              },
                              style: {
                                  marginRight: "5px"
                              },
                              on: {
                                  click: () => {
                                      this.subform = JSON.parse(JSON.stringify(params.row));
                                      this.gardenIsland = !this.gardenIsland;
                                      // this.showLongtouTab = false;
                                      // // this.reutus = '招商项目成果详情'
                                      let arr = [] ;
                                      arr = [
                                          {taking : this.subform.taking , fieldRevenue : this.subform.fieldRevenue},  // 收入亿元
                                          {employee : this.subform.employee , fieldEmployee : this.subform.fieldEmployee}, //从业人员
                                          {exploit : this.subform.exploit , fieldExploit : this.subform.fieldExploit} ,// 研发投入
                                          {assetsBeforeLastYear : this.subform.assetsBeforeLastYear , assetsLastYear : this.subform.assetsLastYear, taking : this.subform.taking},
                                          {cityRanked : this.subform.cityRanked , provinceRanked : this.subform.provinceRanked,
                                           nationalRanked : this.subform.nationalRanked, globalRanked : this.subform.globalRanked}
                                      ];
                                      this.modalDataPie = arr ;
                                  }
                              }
                          },
                          "查看详情"
                      ),
                  ]);
              }
          }
      ],
        tableHead4: [
            // {
            //   title: "增长趋势",
            //   key: "city",
            //   align:"center",
            //     width: 150,
            //     // render: (h) => {
            //     //     return h('img', {
            //     //         attrs: {
            //     //             src: '../../../assets/img/public/redD.png',
            //     //         },
            //     //         style: {
            //     //             marginRight: '5px'
            //     //         },
            //     //         on: {
            //     //             click: () => {
            //     //                 this.menu2('/');
            //     //             }
            //     //         }
            //     //     });
            //     // }
            // },
            {
                title: "序号",
                key: "id",
                align:"center",
                width:80,
            },
            {
                title: '增长趋势',
                align:"center",
                width: 100,
                render: (h, params) => {
                    // console.log(params.row)
                    return h('div', [
                        h('img', {
                            attrs: {
                                src: params.row.img,
                            },
                            style: {
                                width: '40px',
                                height: '40px'
                            }
                        }),
                    ]);
                }
            },
            {
                title: "企业名称",
                key: "campanyName",
                align:"center",
                className : 'xiangmu',
                render: (h, params) => {
                    return h('span', {
                        style: {
                            color: '#FFFFFF'
                        },
                        on: {
                            click: () => {
                                console.log(params.row.campanyName)
                                var paramss = params.row.campanyName;//企业名称
                                var userId = 123;//用户id
                                var userMd5 = hex_md5(userId);
                                var sign = hex_md5(userMd5 + "7d44f079e9051033d4e08626a865f2bf");
                                var url = "https://link.qichacha.com/open/index.html#/search-company/59b25af198055be06d6908b4376829c8/" + sign + "/" + userMd5 + "?searchKey=" + paramss;
                                window.open(url.replace(/\s*/g,""));//跳转企查查页面 replae：去除参数空格问题
                            }
                        }
                    }, params.row.campanyName);
                }
            },
            {
                title: "公司地址",
                key: "companyAddress",
                align:"center",
                render: (h, params) => {
                    return h('div', [
                        h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            },
                            domProps: {
                                title: params.row.companyAddress
                            }
                        }, params.row.companyAddress)
                    ]);
                }
            },
            {
                title: "细分领域类别",
                key: "categoryField",
                align:"center",
            },
            {
                title:'细分领域研发投入（万元）',
                key: 'fieldExploit',
                align:'center',
            },
            {
                title: "细分产品或服务情况",
                key: "productField",
                align:"center",
                width: 280,
                render: (h, params) => {
                    return h('div', [
                        h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            },
                            domProps: {
                                title: params.row.productField
                            }
                        }, params.row.productField)
                    ]);
                }
            },
            {
                title: "操作",
                key: "action",
                width: 220,
                align: "center",
                render: (h, params) => {
                    return h("div", [
                        h(
                            "Button",
                            {
                                props: {
                                    type: "info"
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.subform = JSON.parse(JSON.stringify(params.row));
                                        this.gardenIsland = !this.gardenIsland;
                                        // this.showLongtouTab = false;
                                        // // this.reutus = '招商项目成果详情'
                                        let arr = [] ;
                                        arr = [
                                            {taking : this.subform.taking , fieldRevenue : this.subform.fieldRevenue},  // 收入亿元
                                            {employee : this.subform.employee , fieldEmployee : this.subform.fieldEmployee}, //从业人员
                                            {exploit : this.subform.exploit , fieldExploit : this.subform.fieldExploit} ,// 研发投入
                                            {assetsBeforeLastYear : this.subform.assetsBeforeLastYear , assetsLastYear : this.subform.assetsLastYear, taking : this.subform.taking},
                                            {cityRanked : this.subform.cityRanked , provinceRanked : this.subform.provinceRanked,
                                                nationalRanked : this.subform.nationalRanked, globalRanked : this.subform.globalRanked}
                                        ];
                                        this.modalDataPie = arr ;
                                    }
                                }
                            },
                            "查看详情"
                        ),
                    ]);
                }
            }
        ],
       tableHead6: [
           {
               title: "序号",
               key: "id",
               align:"center",
               width:80
           },
            {
                title: "企业名称",
                key: "campanyName",
                align:"center",
                className : 'xiangmu',
                render: (h, params) => {
                    return h('span', {
                        style: {
                            color: '#FFFFFF'
                        },
                        on: {
                            click: () => {
                                console.log(params.row.campanyName)
                                var paramss = params.row.campanyName;//企业名称
                                var userId = 123;//用户id
                                var userMd5 = hex_md5(userId);
                                var sign = hex_md5(userMd5 + "7d44f079e9051033d4e08626a865f2bf");
                                var url = "https://link.qichacha.com/open/index.html#/search-company/59b25af198055be06d6908b4376829c8/" + sign + "/" + userMd5 + "?searchKey=" + paramss;
                                window.open(url.replace(/\s*/g,""));//跳转企查查页面 replae：去除参数空格问题
                            }
                        }
                    }, params.row.campanyName);
                }
            },
            {
                title: "法人姓名",
                key: "legalPerson",
                align:"center",
                width : 150
            },
            {
                title: "公司地址",
                key: "companyAddress",
                align:"center",
                render: (h, params) => {
                    return h('div', [
                        h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            },
                            domProps: {
                                title: params.row.companyAddress
                            }
                        }, params.row.companyAddress)
                    ]);
                }
            },
            {
                title: "细分产品或服务情况",
                key: "businessScope",
                align:"center",
                width: 580,
                render: (h, params) => {
                    return h('div', [
                        h('span', {
                            style: {
                                display: 'inline-block',
                                width: '100%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            },
                            domProps: {
                                title: params.row.businessScope
                            }
                        }, params.row.businessScope)
                    ]);
                }
            },
        ],
      tableData2: [],
         // 饼状图数据
        pieData: {},
        pieData1: {},
        //统计表格的标签页
        activeClass : 0,
        itemList : [
            {text : '计算机、通信和其他电子设备制造业'},
            {text : '电信、广播电视和卫星传输服务'},
            {text : '软件与信息服务业'},
            {text : '其他行业'}
        ],
        activeClassfaucet : 0 ,
        itemListfaucet : [
            {text : '龙头企业'},
            {text : '人工智能'},
            {text : '互联网+'},
            {text : '北斗应用'},
            {text : '5G+'},
            {text : '虚拟现实'}
        ],
        pageSize: 10, // 纳统企业
        pageSize1 : 11 , // 龙头每页显示几条
        pageNumber: 1,
        pageTotal: 1,
        biglei : '', // 大类
        medium : '', //中类
        medium1 : '',
        firstType : 1,  // 纳统企业分类
        pageTotal1: 1, // 龙头企业
        pageNumber1: 1 ,// 龙头企业
        mediusList : [],
        mediusListone : [],
        showfooters : false, // 龙头到底没有数据提示
        showfootersJS : false , // 建设到底没有数据提示
        typeLongtou : '01' ,
        showLongtouTab : true,
        lonPieData : '', // 龙头企业行业分类数据
    };
  },
  methods: {
      //   返回首页
      backIndex() {
          // if (!this.showTable) {
          //     this.showTable = !this.showTable ;
          //     this.showLongtouTab = !this.showLongtouTab
          // }else {
          //     this.$router.push({ path: "/index" });
          // }
          this.$router.push({ path: "/index" });
      },
      // 改变行颜色
      rowClassName(row, index) {
      if (index % 2 === 0) {
          return "demo-table-info-row";
      } else {
          return "demo-table-error-row";
      }
    },
      getItem(index) {
        this.activeClass = index ; // 把当前点击元素的index，赋值给activeClass
          this.firstType = index + 1 ;
          this.pageSize = 10 ;
          this.pageNumber = 1 ;
          this.tableData = [];
          this.PageNumXuhao = 0 ;
          this.showfootersJS = false ;
          this._intelligence(this.tableData,Longtou_URL,this.pageSize,this.pageNumber,this.firstType); // 纳统企业库接口
          this._misclassifications(this.tableData2,classsion,index+1); // 纳统企业分类接口
      },
      getItemfauect(index) {
          var that = this;
          that.tableData2 = [];
          that.showfooters = false ;
          that.pageNumber1 = 1 ;
          that.PageNumXuhao = 0 ;
          that.activeClassfaucet = index ; // 把当前点击元素的index，赋值给activeClass (龙头报表)
          that.typeLongtou = '0'+ (index+1) ;
          if (index !== 0 ) {
              that.tableHead2 = that.tableHead6;
          }else {
              that.tableHead2 = that.tableHead4;
          }

          this._conInterFace(this.tableData2,QUERY_URL,this.pageSize1,this.pageNumber1,this.typeLongtou); // 龙头企业汇总表接口

      },
      // 纳统企业接口
      _intelligence(formData, url,pageSize, pageNumber,firstType) {
              var that = this;
              formData = Object.assign(formData, {
                  pageSize,
                  pageNumber,
                  firstType
              });
            const keyOne = "companyFilter";
              getBuildData({ formData, url, keyOne })
                  .then(result => {
                      // console.log(result.data.results.list);
                      if (result.data.results.list.length === 0    ) {
                          // console.log(11111)
                          that.showfootersJS = true ;
                      }
                      // for (let item of result.data.results.list ) {
                          result.data.results.list.forEach((item,index) => {
                              this.PageNumXuhao = this.PageNumXuhao + 1;
                              if (item.legalPerson != null && item.legalPerson.length > 0 ) {
                                  var addname = '';
                                  let name = item.legalPerson.trim().split("、");
                                  if(name.length > 0) {
                                      for (let items of name) {
                                          if (items.length == 2 ) {
                                              let names = items.trim().replace(/(?<=.)./g, "*");
                                              addname += names;
                                          }else {
                                              let names = items.trim().replace(/^(.+).(.)$/, "$1*$2");
                                              addname += names;
                                          }
                                      }
                                  }
                                  item.id = this.PageNumXuhao;
                                  item.legalPerson = addname;
                              }
                              this.tableData.push(item)
                          })

                      // }

                      that.pageTotal = result.data.results.pageTotal;
                  })
                  .catch(err => {
                      console.log(err);
                  });
      },
      //龙头企业汇总表
      _conInterFace (formData, url, pageSize, pageNumber,type) {
          var that = this;
          formData = Object.assign(formData, {
              pageSize,
              pageNumber,
              type
          });
          const keyOne = "emphasisCompanyFilter";
          getBuildData({ formData, url, keyOne })
              .then(result => {
                  if (result.data.results.list.length === 0 || result.data.results.list.length < 10 ) {
                      that.showfooters = true ;
                  }
                  // for (let [item,index] of result.data.results.list) {
                      result.data.results.list.forEach((item,index) => {
                          this.PageNumXuhao = this.PageNumXuhao +1;
                          if (item.phone != null ) {
                              item.phone = item.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                          }
                          if (item.linkman != null && item.linkman.length > 0 ) {
                              var addname = '';
                              let name = item.linkman.trim().split("、");
                              if(name.length > 0) {
                                  for (let items of name) {
                                      if (items.length == 2 ) {
                                          let names = items.trim().replace(/(?<=.)./g, "*");
                                          addname += names;
                                      }else {
                                          let names = items.trim().replace(/^(.+).(.)$/, "$1*$2");
                                          addname += names;
                                      }
                                  }
                              }
                              item.linkman = addname;
                          }
                          if (item.phone != null) {
                              var addname = '';
                              let name = item.phone.trim().split("/");
                              if(name.length > 0) {
                                  for (let items of name) {
                                      if (items.length > 11 ) {
                                          let nam = [...items];
                                          nam[7] = "*";nam[8] = "*";nam[9] = "*";nam[10] = "*";
                                          // let name5 = name4.join('');
                                          addname += nam.join('');
                                      }else {
                                          let names = items.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                                          addname += names;
                                      }
                                  }
                              }
                              item.phone = addname;
                          }
                          if (item.legalPerson != null && item.legalPerson.length > 0 ) {
                              var addname = '';
                              let name = item.legalPerson.trim().split("、");
                              if(name.length > 0) {
                                  for (let items of name) {
                                      if (items.length == 2 ) {
                                          let names = items.trim().replace(/(?<=.)./g, "*");
                                          addname += names;
                                      }else {
                                          let names = items.trim().replace(/^(.+).(.)$/, "$1*$2");
                                          addname += names;
                                      }
                                  }
                              }
                              item.legalPerson = addname;
                          }
                          item.id = this.PageNumXuhao;
                          this.tableData2.push(item)
                      })

                  // }

                  if (this.tableData2[0].taking != null ) {
                      // 判断每家企业的增长率
                      this.tableData2.forEach((value, index) => {
                          // 防止金额为"/" 转成0
                          if (value.assetsBeforeLastYear == "/") {
                              this.tableData2[index].assetsBeforeLastYear = 0;
                          }
                          if (value.assetsLastYear == "/") {
                              this.tableData2[index].assetsLastYear = 0;
                          }
                          if (value.taking == "/") {
                              this.tableData2[index].taking = 0;
                          }
                          if ((value.taking - value.assetsBeforeLastYear) > 2) {
                              this.tableData2[index].img = require('../../assets/img/public/greenD.png');
                          } else if ((value.taking - value.assetsBeforeLastYear) > -2) {
                              console.log(value.taking, value.assetsBeforeLastYear)
                              this.tableData2[index].img = require('../../assets/img/public/yellowD.png');
                          } else {
                              this.tableData2[index].img = require('../../assets/img/public/redD.png');
                          }
                      });
                  }

                  that.pageTotal1 = result.data.results.pageTotal;
                  console.log(this.tableData2)
              })
              .catch(err => {
                  console.log(err);
              });
      },
      // 纳统页码
      pageNumberChange(pageNumber) {
          this.tableData = [] ;
          this.pageNumber = pageNumber;
          this._intelligence(
              this.tableData,
              Longtou_URL,
              this.pageSize,
              this.pageNumber,
              this.firstType
          );
      },
      //龙头页码
      pageNumberChangeLong(pageNumber){
          this.tableData2 = [] ;
          this.pageNumber1 = pageNumber;
          this._conInterFace(
              this.tableData2,
              QUERY_URL,
              this.pageSize1,
              this.pageNumber1
          );
      },
      // 纳统企业分类接口
      _misclassifications(formData, url,id) {
          var that = this;
          formData = Object.assign(formData, {id});
          const keyOne = "typeRatioEntity";
          getBuildData({ formData, url, keyOne })
              .then(result => {
                  this.biglei = result.data.results.typeRatioEntity.name;
                  this.medium = result.data.results.childList[0].name;
                  if(result.data.results.childList.length === 1 ) {
                      this.medium1 = '暂无';
                      this.mediusList = [];
                  }else {
                      this.medium1 =  result.data.results.childList[1].name ;
                      this.mediusList = result.data.results.childList[1];
                  }
                  this.pieData = result.data.results.typeRatioEntity; // 大类数据
                  this.pieData1 = result.data.results.childList[0]; // 大类数据
                  this.mediusListone = result.data.results.childList[0];
                  // console.log(this.mediusListone)
                  this.comenput = 0 ;
              })
              .catch(err => {
                  console.log(err);
              });
      },
      // 行业分类接口
      _Category(formData, url,id) {
          var that = this;
          formData = Object.assign(formData, {id});
          const keyOne = "typeRatioEntity";
          getBuildData({ formData, url, keyOne })
              .then(result => {
                  that.lonPieData = result.data.results.list;
              })
              .catch(err => {
                  console.log(err);
              });
      },
      // 龙头企业滑动
      handleReachBottom (){
          this.pageNumber1++;
          this._conInterFace(this.tableData2,QUERY_URL,this.pageSize1,this.pageNumber1,this.typeLongtou); // 。
      },
      // 建设成果滑动
      handleReachBottoms (){
          this.pageNumber++;
          this._intelligence(this.tableData,Longtou_URL,this.pageSize,this.pageNumber,this.firstType); // 纳统企业库接口
      },
      changeClass(e) {
          this.comenput = e ;
          console.log(this.mediusListone)
          if (e === 1 ) {
              this.pieData1 = this.mediusList;
          }else {
              this.pieData1 = this.mediusListone;
          }


      }
  },
  mounted() {
      // location.reload();
      var that = this;
      // setTimeout(function () {
      //     that.show = !that.show;
      //     that.settimeshow = !that.settimeshow;
      // },2000)
  },
  created() {
      this._intelligence(this.tableData,Longtou_URL,this.pageSize,this.pageNumber,this.firstType); // 纳统企业库接口
      this._conInterFace(this.tableData2,QUERY_URL,this.pageSize1,this.pageNumber1,this.typeLongtou); // 龙头企业汇总表接口
      this._misclassifications(this.tableData2,classsion,1); // 纳统企业分类接口
      this._Category({},Category,{}); // 行业分类
  }
};
</script>

<style lang="less">

  /*//龙头企业详情*/
  .Lontou-xiang {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 35px!important;
  }
  .Lontou-xiang > div {
    height: 668px;
    margin-right: 10px;
    padding-left: 20px;
  }
  .Lontou-xiang >div:nth-child(1) {
      width: 40%;
  }
  .Lontou-xiang >div:nth-child(2) {
    width: 60%;
  }
  .basic {
    font-size: 24px;
    margin-bottom: 10px;
  }




  /*龙头详情框标题*/
  .lon-title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .lon-title > div:nth-child(1) {
    color: #ffffff;
    font-size: 24px;
  }
  .lon-title > div:nth-child(1):after {
    height: 10px;
    background: red;

  }


  .lon-title > div:nth-child(2) {
    margin-left: 20px;
    background: #FF4F3FFF;
    color: #ffffff;
    padding: 0px 5px;
  }
  /*龙头企业基本信息*/
    .conter-lontou {
      display: flex;
      line-height: 30px;

    }
    .conter-lontou > div {
      margin-bottom: 10px;
    }
      .conter-lontou > div:nth-child(1) {
        height: 30px;
        width: 30px;
        margin-right: 20px;
        background: url("../../assets/img/index/lontou1.png") no-repeat center center;
      }
  .back-img2 {
    background: url("../../assets/img/index/lontou2.png") no-repeat center center!important;
  }
  .back-img3 {
    background: url("../../assets/img/index/lontou3.png") no-repeat center center!important;
  }
  .back-img4 {
    background: url("../../assets/img/index/lontou4.png") no-repeat center center!important;
  }
  .back-img5 {
    background: url("../../assets/img/index/lontou5.png") no-repeat center center!important;
  }
  .back-img6 {
    background: url("../../assets/img/index/lonto6.png") no-repeat center center!important;
  }
    .conter-lontou > div:nth-child(2) ,
    .conter-lontou > div:nth-child(3) {
        color: #ffffff;
        font-size: 17px;
        width: 40%;
        height: 30px;
    }

    .modal-foter > div:nth-child(1) {
      font-size: 20px;
      color: #ffffff;
      margin-top: 60px;
      margin-bottom: 20px;
    }
    .lontou-conter {
      background: #002B3AFF;
      padding: 20px;
      width: 90%;
    }
    .long-height {
      height: 300px;
      display: flex;
      justify-content: space-around;
    }
    .long-height > div {
      width: 45%;
    }
    .xifen-right {
      color: #ffffff;
      font-size: 20px;
      margin-top: 30px;
    }


    /*右侧详情模态框*/
    .right-long {
      display: flex;
    }
    .right-long > div:nth-child(1) {
      color: #ffffff;
      font-size: 20px;
    }
  .right-long > div:nth-child(2) {
    color: #ffffff;
    font-size: 18px;
    opacity:0.5;
  }
  .echarts-three {
    display: flex;
    justify-content: space-around;

  }
  .echarts-three > div {
    width: 30%;
  }







  .jsModal1 .ivu-modal-content {
    color: #fff;
    font-size: 22px;
  }
  .jsModal1 .ivu-modal-footer  {
    font-size: 50px;
    display: none !important;
  }

  /*.zsModal .ivu-modal-content ,  .jsModal .ivu-modal-content   {*/
  /*  height: 800px;*/
  /*  border-radius: 0;*/
  /*  background-size: 100% 100%;*/
  /*  background-repeat: no-repeat;*/
  /*  background-image: url("../../assets/img/index/zsModal.png");*/
  /*  background-color: transparent;*/
  /*}*/

  .jsModal1 .ivu-modal-content {
    background: url("../../assets/img/index/xiangq.png") no-repeat;
    background-size: 100% 100%;
    height: 800px;
  }
  .chaimg {
    background: url("../../assets/img/index/cha.png") no-repeat center center;
    height: 20px;
    width: 20px;
    cursor: pointer;
    position: absolute;
    top: 59px;
    right: 24px;
  }


#tab-title {
  .ivu-tabs-nav-scroll {
    font-size: 21px;
  }
  .ivu-tabs-nav .ivu-tabs-tab {
    color: gray;
  }
  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #fff;
  }

  .ivu-tabs-nav .ivu-tabs-tab:hover {
    color: #fff;
  }

  .ivu-tabs-ink-bar {
    background-color: transparent;
  }
}

/*// 修改表格颜色*/
.company-table {
  /*border: 1px solid #063d71;*/
  overflow: hidden;


  /*// 调整表格上边距*/
  .ivu-table-cell {
    padding-top: 10px;
    padding-bottom: 10px;

  }
  .ivu-table:after {
    content: "";
    width: 1px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background-color: transparent;
    z-index: 3;
  }
  .ivu-table {
    background: #062e53;
  }
  /*// 设置表格背景颜色*/
  .ivu-table-header thead tr th {
    background-color: #063d71;
    color: #fff;
  }

  .ivu-table td {
    background-color: #041f3c;
    color: #fff;
  }

   /*修改行颜色*/
  .ivu-table .demo-table-info-row td {
    background-color: #012e5d;
    color: #fff;
  }

  .ivu-table .demo-table-error-row td {
    background-color: #132c54;
    color: #fff;
  }

}

 /*修改表格页码*/
.tablePgae {
  .ivu-page-next,
  .ivu-page-prev,
  .ivu-page-item,
  .ivu-select-selection,
  .ivu-select .ivu-select-dropdown,
  .ivu-page-options-elevator input {
    background-color: #131c3f;
    border-color: #32caf6;
  }
}
.pie-name {
  text-align: center;
  margin-top: -20px;
}
  .pie-name>div{
    display: flex;
    justify-content: center;
  }

  /*表格地址溢出隐藏三个点省略号*/
  .hidden {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    color: #8BD5F7FF;
    text-decoration: underline;
  }
  .changes {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .changes > div {
    width: 143px;
    background: #00A0E9;
    opacity: 0.5;
    color: #ffffff;
    border-radius: 5px;
    margin-right: 30px;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
  }
  .comenput {
    opacity: 1!important;
  }
  .xiangmu {
    cursor: pointer;
  }
.table table{
  width: 98% !important;
}



</style>
