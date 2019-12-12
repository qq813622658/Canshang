<template>
  <div>
	  <div class="title">
		  <h2 >{{formRight.name}} </h2>
		  <div style="width: 20px;"></div>
		  <Input  v-model="formRight.actualScore" type="number" placeholder="青请输入分数"  @on-blur="input(formRight.id,formRight)"  clearable style="width: 100px" />
		  <div style="width: 20px;"></div>
		  <h2>分</h2>
	  </div>
    <Collapse accordion hide-arrow v-for="(item,key) of formRight.childList " :key=key>
      <Panel name="1">
        {{item.name}} --  <Input  v-model="item.actualScore" type="number" placeholder="青请输入分数"  @on-blur="input(item.id,item)"  clearable style="width: 120px" />分
        <div slot="content">
          <Collapse accordion v-for="(t,key) in item.childList" :key=key>
            <Panel name="1-1">
              {{t.name}}
              <div slot="content">
                <div  v-for="(m,key) in t.childList"  :key=key>
                  标题： <Input v-model="m.name" placeholder="Enter something..." @on-blur="input(m.id,m)"   clearable style="width: 500px"  />
                  <span class="yang"></span>
                  分数 ：  <Input  v-model="m.score" type="number" placeholder="青请输入分数"  @on-blur="input(m.id,m)"  clearable style="width: 200px" />
                  <span class="yang"></span>
                  实得分 ： <Input  v-model="m.actualScore"  type="number" placeholder="青请输入分数"  @on-blur="input(m.id,m)"  clearable style="width: 200px" /><br/>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </Panel>
    </Collapse>

<!--    <div class="butt-flex">-->
<!--      <Button type="primary" @click="submitUserModal">保存修改</Button>-->
<!--    </div>-->

  </div>
</template>
<script>
    import { hasOneOf } from "@/libs/tools";
    import { treeAjax } from "@/api/systemMange";

    // 修改URL
    const UPDATE_URL = "/monitor/update";
    // 查询URL
    const QUERY_URL = "/monitor/queryTree";
    // ------------------------------------
    // 批量修改单位分类
    const BULKCHANGE_URL = "/department/batchUpdateClass";
    const INSERT_TITLE = "添加";
    const UPDATE_TITLE = "编辑";
    export default {
        data() {
            return {
                formRight: {},
                data : {},
            }
        },
        methods: {
            input(e,data) {
                console.log(e,data);
                this._userAjax(data, UPDATE_URL,e).then(result => {
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
            _userAjax(formData, url) {
                const keyOne = "industrialMonitorEntity";
                return new Promise((resolve, reject) => {
                    treeAjax({ formData, url, keyOne })
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
                const keyOne = "industrialMonitorEntity";
                treeAjax({ formData, url, keyOne })
                    .then(result => {
                        if (result.data.code === "200") {
                            this.$Message.success("查询成功");
                            console.log(result.data.results.list[0])
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
  /*@import "./new-park.less";*/
  .yang {
    display: inline-block;
    width: 150px;
    margin-bottom: 30px;
  }
  .butt-flex {
    display: flex;
    justify-content: center;
    margin: 50px ;
  }
  .title {
	  display: flex;
	  justify-content: center;
	  align-content: center;
  }
</style>
