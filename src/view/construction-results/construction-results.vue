<style lang="less">
@import "./construction-results.less";
@import "../../assets/css/flex.less";
</style>

<template>
  <div class="jsmain">
    <div class="back-btn" @click="backIndex"></div>
    <!-- 表格 -->
    <div class="jsResult">
      <div class="small-title">
        <h3>{{reutus}}</h3>
      </div>
      <transition name="bounce">
      <Scroll :on-reach-bottom="handleReachBottom" :height=630  style="overflow: hidden" v-if="showTable">
        <Table
          :height="630"
          class="jsResultTable"
          :row-class-name="rowClassName"
          :columns="tableHead"
          :data="tableData"
        ></Table>
      </Scroll>
      </transition>
      <div class="foot-end"  v-if="showfootersJS">
        <p >_____________已经到最底了，数据已全部加载完_____________</p>
      </div>
      <transition name="bounce">
        <div v-if="!showTable">
          <div class="details">
            <div class="details-div div-one">
              <div>项目分类</div>
              <div>
                {{subform.type}}
              </div>
            </div>
            <div class="details-div div-two ">
              <div>项目名名称</div>
              <div>{{subform.projectName}}</div>
            </div>
            <div class="details-div div-three">
              <div>项目内容</div>
              <div>{{subform.context}}</div>
            </div>
            <div class="details-div div-four">
              <div>年度任务目标</div>
              <div>{{subform.target}}</div>
            </div>
          </div>
          <div class="details-footer">
            <div class="details-div div-one">
              <div>总投资（亿元）</div>
              <div>{{subform.totalInvestment}}亿元</div>
            </div>
            <div class="details-div div-two ">
              <div>项目进展情况</div>
              <div>{{subform.evolve}}</div>
            </div>
            <div class="details-div div-three">
              <div>责任单位</div>
              <div>{{subform.accUnit}}</div>
            </div>
            <div class="details-div div-four">
              <div>计划开工时间</div>
              <div>{{subform.beginTime}} </div>
            </div>
            <div class="details-div div-four">
              <div>计划竣工时间</div>
              <div>{{subform.endTime}} </div>
            </div>
            <div class="details-div div-four">
              <div>今年计划投资（万元）</div>
              <div>{{subform.plannedInvestment}}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
<!--    <div style="text-align:center;">-->
<!--      <Page-->
<!--            class="tablePgae"-->
<!--            @on-change="pageNumberChange"-->
<!--            :total="pageTotal"-->
<!--            :page-size="pageSize"-->
<!--              show-total/>-->
<!--    </div>-->
  </div>
</template>

<script>
// 公用css
import "@/assets/css/common.css";
import  { getBuildData } from "@/api/city";
// 查询URL
const QUERY_URL = "/project/query";

export default {
  data() {
    return {
        showfootersJS : false ,
        showTable : true ,
        reutus : '数字福州（仓山区）项目进展', // 标题
        subform : [],
      tableHead: [
        {
          title: "项目分类",
          key: "type",
            align : 'center',
            width:180

        },
        {
          title: "项目名称",
          key: "projectName",
            align : 'center',
            width : 320,
            className : 'xiangmu',
            render: (h, params) => {
                return h('span', {
                    style: {
                        color: '#FFFFFF'
                    },
                    on: {
                        click: () => {
                            console.log(params.row.projectName)
                            var paramss = params.row.projectName;//企业名称
                            var userId = 123;//用户id
                            var userMd5 = hex_md5(userId);
                            var sign = hex_md5(userMd5 + "7d44f079e9051033d4e08626a865f2bf");
                            var url = "https://link.qichacha.com/open/index.html#/search-company/59b25af198055be06d6908b4376829c8/" + sign + "/" + userMd5 + "?searchKey=" + paramss;
                            window.open(url.replace(/\s*/g,""));//跳转企查查页面 replae：去除参数空格问题
                        }
                    }
                }, params.row.projectName);
            }
        },
        {
          title: "年度任务目标",
          key: "target",
            align : 'center',
            width : 400,
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
                            title: params.row.target
                        }
                    }, params.row.target)
                ]);
            }
        },
        // {
        //   title: "总投资(亿元)",
        //   key: "totalInvestment",
        //     align : 'center'
        // },
        {
          title: "项目进展情况",
          key: "evolve",
            width : 300,
            align : 'center',
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
                            title: params.row.evolve
                        }
                    }, params.row.evolve)
                ]);
            }
        },
        {
          title: "责任单位",
          key: "accUnit",
            align : 'center'
        },
        // {
        //   title: "计划开工",
        //   key: "beginTime",
        //     align : 'center'
        // },
        // {
        //   title: "计划竣工",
        //   key: "endTime",
        //     align : 'center'
        // },
        // {
        //   title: "今年计划投资(万元)",
        //   key: "plannedInvestment",
        //     align : 'center'
        // },
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
                                      this.showTable = !this.showTable;
                                      this.showfootersJS = false;
                                      this.reutus = '数字福州（仓山区）项目进展详情'
                                      console.log(this.subform);
                                  }
                              }
                          },
                          "查看详情"
                      ),
                      // h(
                      //     "Button",
                      //     {
                      //         props: {
                      //             type: "error"
                      //         },
                      //         style: {
                      //             display: this.btnAccess.del
                      //         },
                      //         on: {
                      //             click: () => {
                      //                 this.deleteUser(params.row);
                      //             }
                      //         }
                      //     },
                      //     "删除"
                      // )
                  ]);
              }
          }
      ],
      tableData: [],
      pageSize: 10,
      pageNumber: 1,
      pageTotal: 1,
    };
  },
  methods: {
      // 滑动
      handleReachBottom (){
          this.pageNumber++;
          this._conInterFace(this.tableData,QUERY_URL,this.pageSize,this.pageNumber); // 招商成果接口。
      },

    //   返回首页
    backIndex() {
        if (!this.showTable) {
            this.showTable = !this.showTable ;
            this.reutus = '数字福州（仓山区）项目进展'
        }else {
            this.$router.push({ path: "/index" });
        }
    },
    // 改变行颜色
    rowClassName(row, index) {
      if (index % 2 === 0) {
        return "demo-table-info-row";
      } else {
        return "demo-table-error-row";
      }
    },
      //建设成果接口
      _conInterFace (formData, url, pageSize, pageNumber) {
          var that = this;
          formData = Object.assign(formData, {
              pageSize,
              pageNumber
          });
          const keyOne = "projectFilter";
          getBuildData({ formData, url, keyOne })
              .then(result => {
                  console.log(result.data.results.list);
                  if(result.data.results.list.length===0) {
                      that.showfootersJS = true ;
                  }
                  for (let item of result.data.results.list ) {
                      that.tableData.push(item);
                  }
                  that.pageTotal = result.data.results.pageTotal;
              })
              .catch(err => {
                  console.log(err);
              });
      },
      // 页码
      pageNumberChange(pageNumber) {
        this.tableData = [] ;
          this.pageNumber = pageNumber;
          this._conInterFace(
              this.tableData,
              QUERY_URL,
              this.pageSize,
              this.pageNumber
          );
      },
  },
  created() {
    this.tableHead.forEach(item => {
      // item.align = "center";
    });
      this._conInterFace(this.tableData,QUERY_URL,this.pageSize,this.pageNumber); // 首页建设成果接口调用。
  }
};
</script>

<style style="less"  scoped>
  .details .details-div > div:nth-child(2) {
    height: 348PX;
  }
</style>
<style>
  . xiangmu {
    cursor: pointer;
  }
</style>
