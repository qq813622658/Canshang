<template>
  <div>
        <Form :model="data6" label-position="right" :label-width="180" style="margin-top: 50px">
          <div class="head-km">
            <FormItem label="数字产业化规模(亿元)">
              <Input v-model="data6.digitalIndustry" type="number"  style="width: 450px"></Input>
            </FormItem>
            <FormItem label="产业数字化规模(亿元)">
              <Input v-model="data6.industryDigital"  type="number" style="width: 450px"></Input>
            </FormItem>
          </div>
          <div class="head-km">
            <FormItem label="数字产业化规模百分比">
              <Input v-model="data6.digitalIndustryPercent"   style="width: 450px"></Input>
            </FormItem>
            <FormItem label="产业数字化规模百分比">
              <Input v-model="data6.industryDigitalPercent"  style="width: 450px"></Input>
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
    import { upAjax} from "@/api/systemMange";
    // 修改URL
    const UPDATE_URL = "/upgradeIndustry/update";
    // 查询URL
    const QUERY_URL = '/upgradeIndustry/query';
    // ------------------------------------

    // 批量修改单位分类
    const BULKCHANGE_URL = "/department/batchUpdateClass";
    const INSERT_TITLE = "添加";
    const UPDATE_TITLE = "编辑";
    export default {
        data() {
            return {
                loading2 : false,
                data6: {},
                formRight : {
                    year : '',
                    capacity : '',
                    figure : '',
                },
                Judge : '添加'
            }
        },
        methods: {
            getDate(value) {
                this.formRight.year = value ;
            },
            remove (id) {
                this._userAjax({id},DELE_URL);
                this.$Message.success("删除成功");
            },

            // 提交
            submitUserModal() {
                this.loading2 = true;
                this._userAjax(this.data6, UPDATE_URL).then(result => {
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
                const keyOne = "upgradeIndustryEntity";
                return new Promise((resolve, reject) => {
                    upAjax({ formData, url, keyOne })
                        .then(result => {
                            console.log(result)
                            if (result.data !== undefined) {
                                this._getUserData({},QUERY_URL,{});
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
                formData = Object.assign(formData, {id});
                const keyOne = "upgradeIndustryFilter";
                upAjax({ formData, url, keyOne })
                    .then(result => {
                        if (result.data.code === "200") {
                            // this.$Message.success("查询成功");
                            this.data6 = result.data.results.list[0];
                        } else {
                            this.$Message.error("查询失败");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        },
        created() {
            this._getUserData({},QUERY_URL,{});
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
  /*@import "industry-management.less";*/
  .head-km {
    display: flex;
    justify-content: space-around;
  }
  .foot {
    display: flex;
    justify-content: center;
  }

</style>

