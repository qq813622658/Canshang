<template>
  <div>
    <Form :model="formRight" label-position="right" :label-width="180">
      <div class="head-km">
        <FormItem label="橘园区简介">
          <Input v-model="formRight.introduction"
                 style="width: 450px"
                 autosize
                 type="textarea"
          ></Input>
        </FormItem>
        <FormItem label="工业用地面积(亩)">
          <Input v-model="formRight.twodomestic" type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="产房(栋)">
          <Input v-model="formRight.delivery" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="现有企业(家)">
          <Input v-model="formRight.business"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="服务企业(家)">
          <Input v-model="formRight.twoShang" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="工业企业(家)">
          <Input v-model="formRight.twoHightech"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="其他类型(家)">
          <Input v-model="formRight.Othertypes" type="number" style="width: 450px"></Input>
        </FormItem>
        <div style="width: 38%;"></div>
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
                    id: '3',
                    introduction : '', // 园区简介
                    twodomestic: '', // 工业地
                    delivery: '', // 产房
                    business: '', // 现有企业家
                    twoShang: '', //服务企业家
                    twoHightech: '', // 工业企业
                    Othertypes: '', //其他类型
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
            this._getUserData(3,QUERY_URL,3);
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
