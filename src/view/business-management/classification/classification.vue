<template>
  <div>
      <div  v-for="(item,key) in formRight" class="flexs">
              <div class="divwidth">{{item.name}}</div>
              <div class="margins"></div>
              <span>五上占比项目</span>
              <Input v-model="item.sum"    type="number" style="width: 200px" @on-blur="tips(item.id,item)"></Input>
              <div class="margins"></div>
              <span>非五上占比项目</span>
              <Input v-model="item.five"   type="number" style="width: 200px" @on-blur="tips(item.id,item)"></Input>
              <div class="margins"></div>
              <span>五上占比比列(%)</span>
              <Input v-model="item.fiveRatio" style="width: 200px" @on-blur="tips(item.id,item)"></Input>
      </div>
<!--    <div class="foot">-->
<!--      <Button type="primary"-->
<!--              :loading="loading2"-->
<!--              icon="ios-power"-->
<!--              @click="submitUserModal"-->
<!--      >-->
<!--        保存修改-->
<!--      </Button>-->
<!--    </div>-->

  </div>
</template>
<script>
    import { hasOneOf } from "@/libs/tools";
    import { classAjax} from "@/api/systemMange";
    // 修改URL
    const UPDATE_URL = "/typeRatio/update";
    // 查询URL
    const QUERY_URL = '/typeRatio/query';
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
            tips (id,data) {
                console.log(id,data);
                this._userAjax(data, UPDATE_URL,id).then(result => {
                    this.loading2 = false;
                    if (result.code === "200") {
                        this.$Message.success("修改成功！");
                    } else {
                        this.$Message.error(result.message);
                    }
                });
            },

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
            _userAjax(formData, url,id) {
                const keyOne = "typeRatioEntity";
                return new Promise((resolve, reject) => {
                    classAjax({ formData, url, keyOne })
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
                classAjax({ formData, url, keyOne })
                    .then(result => {
                        if (result.data.code === "200") {
                            this.$Message.success("查询成功");
                            this.formRight = result.data.results.list;
                            console.log(this.formRight)
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
            // 获取按钮权限
            // let btnAccess = sessionStorage.getItem("btnaccess");
            this._getUserData(1,QUERY_URL);
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
  @import "classification.less";
</style>

