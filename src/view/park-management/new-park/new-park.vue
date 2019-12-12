<template>
  <div>
    <Form :model="formRight" label-position="right" :label-width="180">
      <div class="head-km">
        <FormItem label="核心园区用地面积（公里）">
          <Input v-model="formRight.kilometer" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="规划区用地面积（公里）">
          <Input v-model="formRight.planning" type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="园区简介">
          <Input v-model="formRight.introduction"
             style="width: 450px"
             autosize
             type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="优势">
          <Input v-model="formRight.advantage"
           style="width: 450px"
           autosize
           type="textarea"
          ></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="二产-园内共有企业(家)">
          <Input v-model="formRight.twodomestic" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="二产-规模以上工业企业(家)">
          <Input v-model="formRight.twoscale"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="二产-限上商贸企业(家)">
          <Input v-model="formRight.twoShang" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="二产-省级高新企业(家)">
          <Input v-model="formRight.twoHightech"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="生物医药">
          <Input
            v-model="formRight.biomedicine"
            autosize
            type="textarea"
            style="width: 450px"
          ></Input>
        </FormItem>
        <FormItem label="信息软件设备开发业">
          <Input
            v-model="formRight.industry"
            autosize
            type="textarea"
            style="width: 450px"
          ></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="金融产业-金融平台(家)">
          <Input v-model="formRight.financialplatform" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="金融产业-引进金融、类金融业企业累计(家)">
          <Input v-model="formRight.financialintroduction"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="金融产业-实体入驻(家)">
          <Input v-model="formRight.financialcheckin" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="金融产业-成功列入自贸区金融创新案例(家)">
          <Input v-model="formRight.financialsuccess"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="跨境项目-已签约大型跨境出口电商企(家)">
          <Input v-model="formRight.commerce" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="跨境项目-签约面积(万平方米)">
          <Input v-model="formRight.contractedarea"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="跨境项目-正在洽谈意向大型跨境企业(家)">
          <Input v-model="formRight.negotiate" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="跨境项目-意向面积约(万平方米)">
          <Input v-model="formRight.intention"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="商业项目">
          <Input v-model="formRight.projectsone" type="textarea" style="width: 450px ;margin-bottom: 10px"></Input><br/>
          <Input v-model="formRight.projectstwo" type="textarea" style="width: 450px ;margin-bottom: 10px"></Input><br/>
          <Input v-model="formRight.projectsthree" type="textarea" style="width: 450px ;margin-bottom: 10px"></Input><br/>
          <Input v-model="formRight.projectsfour" type="textarea" style="width: 450px ;margin-bottom: 10px"></Input>
        </FormItem>
        <FormItem label="三产-成功事列">
          <Input v-model="formRight.productionone" type="textarea" style="width: 450px ;margin-bottom: 10px"></Input><br/>
          <Input v-model="formRight.productiontwo" type="textarea" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>
    </Form>
    <div class="foot">
      <Button type="primary"
              :loading="loading2"
              icon="ios-power"
              @click="submitUserModal"
              >
        保存修改
      </Button>
    </div>

  </div>
</template>
<script>
    import { hasOneOf } from "@/libs/tools";
    import { newparkAjax} from "@/api/systemMange";

    // 修改URL
    const UPDATE_URL = "/industrialPark/update";
    // 查询URL
    const QUERY_URL = "/industrialPark/queryById";
    // ------------------------------------

    // 批量修改单位分类
    const BULKCHANGE_URL = "/department/batchUpdateClass";
    const INSERT_TITLE = "添加";
    const UPDATE_TITLE = "编辑";
    export default {
        data() {
            return {
                loading2 : false,
                formRight: {
                    id: '',
                    kilometer: '', //核心园区用地面积（公里）
                    planning: '', //规划区用地面积（公里）
                    introduction: '', //园区简介
                    advantage: '', //优势
                    twodomestic: '', //二产-园内共有企业(家)
                    twoscale: '', //二产-规模以上工业企业(家)
                    twoShang: '', //二产-限上商贸企业(家)
                    twoHightech: '', //二产-省级高新企业(家)
                    biomedicine: '', //生物医药
                    industry: '', //信息软件设备开发业
                    financialplatform: '', //金融产业-金融平台(家)
                    financialintroduction: '', //金融产业-引进金融、类金融业企业累计(家)
                    financialcheckin: '', //金融产业-实体入驻(家)
                    financialsuccess: '', //金融产业-成功列入自贸区金融创新案例(家)"签约面积
                    contractedarea: '' ,// 跨境项目-签约面积(万平方米)
                    commerce: '' ,// 跨境项目-已签约大型跨境出口电商企(家)
                    negotiate: '' ,// 跨境项目-正在洽谈意向大型跨境企业(家)
                    intention: '' ,// 跨境项目-意向面积约(万平方米)
                    projects1one: '' ,// 商业项目1
                    projectstwo: '' ,// 商业项目2
                    projectsthree: '' ,// 商业项目3
                    projectsfour: '' ,// 商业项目4
                    productionone: '' ,// 三产-成功事列- 1
                    productiontwo: '' ,// 三产-成功事列- 2
                }
            }

        },
        methods: {

            // 提交
            submitUserModal() {
                console.log(this.formRight);
                        this.loading2 = true;
                            this._userAjax(this.formRight, UPDATE_URL).then(result => {
                                this.loading2 = false;
                                if (result.code === "200") {
                                    this.$Message.success("修改成功！");
                                } else {
                                    this.$Message.error(result.message);
                                }
                            });
            },
            // 添加/修改
            _userAjax(formData, url) {
                const keyOne = "industrialParkEntity";
                return new Promise((resolve, reject) => {
                    newparkAjax({ formData, url, keyOne })
                        .then(result => {
                            if (result.data !== undefined) {
                                resolve(result.data);
                            } else {
                                reject(err);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            },
            // 查询
            _getUserData(formData, url,id) {
                this.tabelLoading = true;
                formData = Object.assign(formData, {id});
                const keyOne = "industrialParkEntity";
                newparkAjax({ formData, url, keyOne })
                    .then(result => {
                        if (result.data.code === "200") {
                            this.formRight.id = result.data.results.industrialParkEntity.id;
                            this.$Message.success("查询成功");
                            this.formRight = JSON.parse(result.data.results.industrialParkEntity.orther);
                        } else {
                            this.$Message.error("查询失败");
                        }
                        console.log(result)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        },
        created() {
            // 获取按钮权限
            // let btnAccess = sessionStorage.getItem("btnaccess");
            this._getUserData(1,QUERY_URL,1);
            // this.globalFunction(btnAccess);
        },
        computed: {
            getDepartmentList() {
                return this.$store.state.user.departmentList;
            },
            getDepartment() {
                return this.$store.state.user.department;
            },
            access() {
                return this.$store.state.user.access;
            },
            // 管理员
            accessAdmin() {
                return hasOneOf(["admin"], this.access);
            },
            // 责任人
            accessRespons() {
                return hasOneOf(["responsible"], this.access);
            },
            // 经办人
            accessAgent() {
                return hasOneOf(["agent"], this.access);
            }
            //
        }
    };
</script>
<style lang="less">
  @import "./new-park.less";
</style>
