<template>
  <div>
    <Form :model="formRight" label-position="right" :label-width="180">
      <div class="head-km">
        <FormItem label="软件和信息服务行业">
          <Input v-model="formRight.service"  style="width: 450px"></Input>
        </FormItem>
        <FormItem label="数字内容产业">
          <Input v-model="formRight.context"  style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="区块链产业">
          <Input v-model="formRight.chain"  style="width: 450px"></Input>
        </FormItem>
        <FormItem label="下游产业链企业聚集">
          <Input v-model="formRight.blockchain"  style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="智能产业制造">
            <Input
              v-model="formRight.intelligenceOne"
              autosize
              type="textarea"
              style="width: 450px"
            ></Input>
        </FormItem>
        <FormItem label="智能产业制造">
          <Input
            v-model="formRight.company"
            autosize
            type="textarea"
            style="width: 450px"
          ></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="智能产业制造(柱状图蓝色2017年数据)">
          <Input v-model="formRight.manufactureYear" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="智能产业制造(柱状图红色计划2020年数据)">
          <Input v-model="formRight.manufacturePlan"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="技能技术赋能产业转型升级">
          <Input
            v-model="formRight.transition"
            autosize
            type="textarea"
            style="width: 450px"
          ></Input>
        </FormItem>
        <FormItem label="企业情况">
          <Input
            v-model="formRight.intelligenceTwo"
            autosize
            type="textarea"
            style="width: 450px"
          ></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="技能技术赋能产业转型(柱状图蓝色2017年数据)">
          <Input v-model="formRight.transitionYear" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="技能技术赋能产业转型(柱状图红色计划2020年数据)">
          <Input v-model="formRight.transitionPlan"  type="number" style="width: 450px"></Input>
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
    import { manageAjax} from "@/api/systemMange";

    // 修改URL
    const UPDATE_URL = "/industryContent/update";
    // 查询URL
    const QUERY_URL = '/industryContent/query';
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
                const keyOne = "industryContentEntity";
                return new Promise((resolve, reject) => {
                    manageAjax({ formData, url, keyOne })
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
                const keyOne = "industryContentFilter";
                manageAjax({ formData, url, keyOne })
                    .then(result => {
                        if (result.data.code === "200") {
                            this.$Message.success("查询成功");
                            this.formRight = result.data.results.list[0];
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
    @import "industry-management.less";
</style>

