<style lang="less">
@import "./investment-results.less";
@import "../../assets/css/flex.less";
</style>

<template>
  <div class="zsmain">
    <!--    标题-->
    <div class="title-head">"智能仓山"产业监测平台</div>
    <div class="title-head-two">
      <div>12510 行动体系</div>
    </div>

    <div class="back-btn" @click="backIndex"></div>
    <!-- 表格 -->
    <div class="zsResult">
      <div class="small-title">
        <h3>{{reutus}}</h3>
      </div>

      <transition  name="bounce">
        <Scroll :on-reach-bottom="handleReachBottom" :height=641 v-if="showTable" style="overflow: hidden">
          <Table class="zsResultTable" :columns="tableHead" :data="tableData" :height="642" style="overflow: hidden;">
            <Button type="error" size="small" @click="remove(index)">Delete</Button>
          </Table>
        </Scroll>
      </transition>
      <div class="foot-end"  v-if="showfootersJS">
        <p >_____________已经到最底了，数据已全部加载完_____________</p>
      </div>
      <transition name="bounce">
          <div v-if="!showTable">
        <div class="details">
          <div class="details-div div-one">
            <div>项目</div>
            <div>
              {{subform.projectName}}
            </div>
          </div>
          <div class="details-div div-two ">
            <div>项目简介</div>
            <div>{{subform.synopsis}}</div>
          </div>
          <div class="details-div div-three">
            <div>进展情况</div>
            <div>{{subform.evolve}}</div>
          </div>
          <div class="details-div div-four">
            <div>存在情况</div>
            <div>{{subform.problem}}</div>
          </div>
        </div>
        <div class="details-footer">
          <div class="details-div div-one">
            <div>总投资额</div>
            <div>
              {{subform.investment}}亿元
            </div>
          </div>
          <div class="details-div div-two ">
            <div>责任单位</div>
            <div>{{subform.accUnit}}</div>
          </div>
          <div class="details-div div-three">
            <div>责任领导</div>
            <div>{{subform.accLead}}</div>
          </div>
          <div class="details-div div-four">
            <div>主要领导</div>
            <div>{{subform.mainLead}} </div>
          </div>
          <div class="details-div div-four">
            <div>企业方联系人</div>
            <div>
              {{subform.companyLinkman}}
              <br />
              {{subform.companyPhone}} </div>
          </div>
          <div class="details-div div-four">
            <div>项目对接人</div>
            <div>
              {{subform.linkman}}
              <br />
              {{subform.phone}}
            </div>
          </div>
        </div>
      </div>
      </transition>

<!--        <div style="text-align:center;">-->
<!--          <Page-->
<!--            class="tablePgae"-->
<!--            @on-change="pageNumberChange"-->
<!--            :total="pageTotal"-->
<!--            :page-size="pageSize"-->
<!--            show-total/>-->
<!--        </div>-->
    </div>
  </div>
</template>

<script>
// 公用css
import "@/assets/css/common.css";
import  { getBuildData } from "@/api/city";
// 查询URL
const QUERY_URL = '/investment/query';
export default {
  data() {
    return {
        showfootersJS : false ,
        reutus : '招商成果项目', // 标题
        showTable : true, // 表格查看详情切换
        subform : [], // 详情表格
      tableHead: [
        {
          title: "项目",
          key: "projectName",
          align : 'center',
            width : 300,
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
          title: "项目简介",
          key: "synopsis",
          width : 380,
          align : 'center',
          render: (h, params) => {
              return h('div', [
                  h('span', {
                      style: {
                          display: 'inline-block',
                          width: '100%',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                      },
                      domProps: {
                          title: params.row.synopsis
                      }
                  }, params.row.synopsis)
              ]);
          }
        },
        {
          title: "进展情况",
          key: "evolve" ,
          align : 'center',
            width: 260,
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
          title: "存在问题",
          key: "problem",
            width: 180,
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
                            title: params.row.problem
                        }
                    }, params.row.problem)
                ]);
            }
        },
        // {
        //   title: "总投资额(亿元)",
        //   key: "investment",
        //   align : 'center'
        // },
        {
          title: "责任单位",
          key: "accUnit",
          align : 'center',
            width: 235,
        },
        // {
        //   title: "责任领导人",
        //   key: "accLead",
        //   align : 'center',
        //     width: 80
        // },
        // {
        //   title: "主要领导",
        //   key: "mainLead",
        //     width: 80,
        //     align : 'center'
        // },
        // {
        //   title: "企业方联系人",
        //   key: "companyLinkman",
        //   align : 'center',
        //     width: 80,
        //     type:'html'
        // },
        // {
        //   title: "企业方联系人联系方式",
        //   key: "companyPhone",
        //   align : 'center',
        //   width: 120,
        //   type:'html'
        // },
        // {
        //     title: "项目对接人",
        //     key: "linkman",
        //     align : 'center',
        //     type:'html',
        //
        // },
        // {
        //     title: "项目对接人联系方式",
        //     key: "phone",
        //     align : 'center',
        //     width: 120,
        //     type:'html'
        // },
        {
            title: "项目状态",
            key: "status",
            align : 'center',
            type:'html',
            width: 100
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
                                      this.showTable = !this.showTable;
                                      this.reutus = '招商项目成果详情'
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
      pageSize: 11,
      pageNumber: 1,
      pageTotal: 1,
    };
  },
  methods: {
    //   返回首页
    backIndex() {
        if (!this.showTable) {
            this.showTable = !this.showTable ;
            this.reutus = '招商成果'
        }else {
            this.$router.push({ path: "/index" });
        }
    },
      handleReachBottom (){
          this.pageNumber++;
          this._conInterFace(this.tableData,QUERY_URL,this.pageSize,this.pageNumber); // 招商成果接口。
      },
      //建设成果接口
      _conInterFace (formData, url, pageSize, pageNumber) {
          var that = this;
          formData = Object.assign(formData, {
              pageSize,
              pageNumber
          });
          const keyOne = "investmentResultsFilter";
          getBuildData({ formData, url, keyOne })
              .then(result => {
                  console.log(result.data.results.list);
                  if (result.data.results.list.length === 0 ) {
                      that.showfootersJS = true;
                  }
                  for (let item of result.data.results.list ) {
                      if (item.status === '1') {
                          item.status = '落地项目'
                      }else if (item.status === '2') {
                          item.status = '线索项目'
                      }else {
                          item.status = '有望项目'
                      }
                      // if (item.phone != null) {
                      //     var addname = '';
                      //     let name = item.phone.trim().split("、");
                      //     if(name.length > 0) {
                      //         for (let items of name) {
                      //             if (items.length > 11 ) {
                      //                 let nam = [...items];
                      //                 nam[7] = "*";nam[8] = "*";nam[5] = "*";nam[6] = "*";
                      //                 addname += nam.join('');
                      //             }else {
                      //                 let names = items.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                      //                 addname += names;
                      //             }
                      //         }
                      //     }
                      //     item.phone = addname;
                      // }
                      if (item.companyPhone != null) {
                          let addname = '';
                          let name = item.companyPhone.trim().split("、");
                          if(name.length > 0) {
                              for (let items of name) {
                                  if (items.length > 11 ) {
                                      let nam = [...items];
                                      nam[7] = "*";nam[8] = "*";nam[5] = "*";nam[6] = "*";
                                      addname += nam.join('');
                                  }else {
                                      let names = items.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
                                      addname += names;
                                  }
                              }
                          }
                          item.companyPhone = addname;
                      }
                      // if (item.linkman != null && item.linkman.length > 0 ) {
                      //     var addname = '';
                      //     let name = item.linkman.trim().split("、");
                      //     if(name.length > 0) {
                      //         for (let items of name) {
                      //             if (items.length == 2 ) {
                      //                 let names = items.trim().replace(/(?<=.)./g, "*");
                      //                 addname += names;
                      //             }else {
                      //                 let names = items.trim().replace(/^(.+).(.)$/, "$1*$2");
                      //                 addname += names;
                      //             }
                      //         }
                      //     }
                      //     item.linkman = addname;
                      // }
                      // if (item.mainLead != null && item.mainLead.length > 0 ) {
                      //     var addname = '';
                      //     let name = item.mainLead.trim().split("、");
                      //     if(name.length > 0) {
                      //         for (let items of name) {
                      //             if (items.length == 2 ) {
                      //                 let names = items.trim().replace(/(?<=.)./g, "*");
                      //                 addname += names;
                      //             }else {
                      //                 let names = items.trim().replace(/^(.+).(.)$/, "$1*$2");
                      //                 addname += names;
                      //             }
                      //         }
                      //     }
                      //     item.mainLead = addname;
                      // }
                      // if (item.accLead != null && item.accLead.length > 0 ) {
                      //     var addname = '';
                      //     let name = item.accLead.trim().split("、");
                      //         if(name.length > 0) {
                      //             for (let items of name) {
                      //                 if (items.length == 2 ) {
                      //                     let names = items.trim().replace(/(?<=.)./g, "*");
                      //                     addname += names;
                      //                 }else {
                      //                     let names = items.trim().replace(/^(.+).(.)$/, "$1*$2");
                      //                     addname += names;
                      //                 }
                      //             }
                      //         }
                      //     item.accLead = addname;
                      // }
                      // if (item.companyLinkman != null && item.companyLinkman.length > 0 ) {
                      //     var addname = '';
                      //     let name = item.companyLinkman.trim().split("、");
                      //     if(name.length > 0) {
                      //         for (let items of name) {
                      //             if (items.length == 2 ) {
                      //                 let names = items.trim().replace(/(?<=.)./g, "*");
                      //                 addname += names;
                      //             }else {
                      //                 let names = items.trim().replace(/^(.+).(.)$/, "$1*$2");
                      //                 addname += names;
                      //             }
                      //
                      //         }
                      //       }
                      //         item.companyLinkman = addname;
                      //     }

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
      this._conInterFace(this.tableData,QUERY_URL,this.pageSize,this.pageNumber); // 招商成果接口。
  }

};
</script>

<style>
  .xiangmu {
    cursor: pointer;
  }
</style>
