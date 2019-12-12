<template>
  <div>
    <!-- 搜索添加栏 -->
<!--    <Row>-->
<!--      <Card>-->
<!--        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">-->
<!--          <Row>-->
<!--            &lt;!&ndash;            <i-col :xs="24" :md="12" :lg="6">&ndash;&gt;-->
<!--            &lt;!&ndash;              <FormItem label="中类">&ndash;&gt;-->
<!--            &lt;!&ndash;                <Input&ndash;&gt;-->
<!--            &lt;!&ndash;                  v-model="searchData.secondType"&ndash;&gt;-->
<!--            &lt;!&ndash;                  suffix="ios-search"&ndash;&gt;-->
<!--            &lt;!&ndash;                  placeholder="请输入项目中类"&ndash;&gt;-->
<!--            &lt;!&ndash;                  style="width: auto"&ndash;&gt;-->
<!--            &lt;!&ndash;                >&ndash;&gt;-->
<!--            &lt;!&ndash;                <Icon type="ios-search" slot="suffix" />&ndash;&gt;-->
<!--            &lt;!&ndash;                </Input>&ndash;&gt;-->
<!--            &lt;!&ndash;              </FormItem>&ndash;&gt;-->
<!--            &lt;!&ndash;            </i-col>&ndash;&gt;-->
<!--            <i-col :xs="24" :md="12" :lg="6">-->
<!--              <FormItem label="项目名称">-->
<!--                <Input-->
<!--                  v-model="searchData.companyName"-->
<!--                  suffix="ios-search"-->
<!--                  placeholder="请输入项目名称"-->
<!--                  style="width: auto"-->
<!--                >-->
<!--                <Icon type="ios-search" slot="suffix" />-->
<!--                </Input>-->
<!--              </FormItem>-->
<!--            </i-col>-->
<!--          </Row>-->
<!--          <FormItem>-->
<!--            <Button-->
<!--              v-if="btnAccess.query"-->
<!--              type="primary"-->
<!--              style="marigin:0 20px"-->
<!--              :loading="searchLoading"-->
<!--              @click="searchSubmit(10,1)"-->
<!--            >提交搜索</Button>-->
<!--            <Button @click="submitReset">重置搜索</Button>-->
<!--          </FormItem>-->
<!--        </Form>-->
<!--      </Card>-->
<!--    </Row>-->


    <Collapse accordion hide-arrow v-for="(item,key) of formRight " :key=key>
      <Panel name="1">
        {{item.title}}
        <div slot="content">
          <!--          <Button type="dashed" style="margin-bottom: 20px" @click="modal10 = true" >添加</Button>-->
<!--          <Modal-->
<!--            v-model="modal10"-->
<!--            title="Custom width"-->
<!--            :mask-closable="false"-->
<!--            width="300">-->
<!--            <p>Customize width, unit px, default 520px.</p>-->
<!--            <p>The width of the dialog box is responsive, and the width becomes <code>auto</code> when the screen size is less than 768px.</p>-->
<!--          </Modal>-->
             <quill-editor v-model="item.context"
                               @change="onEditorChange(item)">
             </quill-editor>

<!--            <Panel name="1-1">-->
<!--              <Icon type="md-trash"  @click.stop="deles(t)"/>-->
<!--              <div slot="content">-->
<!--                &lt;!&ndash;                 :options="editorOption"&ndash;&gt;-->
<!--                &lt;!&ndash;                 @blur="onEditorBlur($event)"&ndash;&gt;-->
<!--                &lt;!&ndash;                 @focus="onEditorFocus($event)"&ndash;&gt;-->

<!--              </div>-->
<!--            </Panel>-->

        </div>
      </Panel>
    </Collapse>


  </div>
</template>
<script>
    // 纳统企业库
    import { hasOneOf } from "@/libs/tools";
    import { policyAjax } from "@/api/systemMange";
    // 删除URL
    const DELETE_URL = "/favorable/delete";
    // 修改URL
    const UPDATE_URL = "/favorable/update";
    // 添加URL
    const INSERT_URL = "/company/insert";
    // 查询URL/company/query
    const QUERY_URL = "/favorable/queryTree";
    // ------------------------------------
    // 批量修改单位分类
    const BULKCHANGE_URL = "/department/batchUpdateClass";
    const INSERT_TITLE = "添加";
    const UPDATE_TITLE = "编辑";
    export default {
        data() {
            // 验证手机号码
            return {
                modal10: false,
                content:'',
                editorOption:{},
                // 增删改查权限按钮
                btnAccess: {
                    add: true,
                    add2: "inline-block",
                    del: "inline-block",
                    upd: true,
                    query: true
                },
                // roleSelect: false, // 权限管理
                classModal: false, // 修改单位分类模态框
                isUserModal: false, // 模态框
                searchLoading: false, // 搜索Loading
                userModalLoading: false, // 提交loading
                tabelLoading: false, // 表格loading
                userModalTitle: "", // 模态框title
                isResponsible: "",
                pageSize: 10,
                pageNumber: 1,
                pageTotal: 10,
                currentPage: 1, // 记录当前页数
                departclssArr: [],
                userForm: {
                    // id : '' , // 序号
                    type: "", // 项目分类
                    companyName: "", // 项目名称
                    context: "", // 项目内容
                    target: "", // 年度任务目标
                    totalInvestment: "", // 总投资（亿元）
                    evolve: "", // 项目进展情况
                    accUnit: "" ,// 责任单位
                    beginTime :  "" , //计划开工时间
                    endTime :  "" , //计划竣工时间
                    plannedInvestment :  "" ,//今年计划投资（万元）
                    firstType : '',
                },
                searchData: {
                    companyName : '',
                    secondType : '',
                },
                userData: [], // 表格数据
                searchReg: {},
                isSelectEdit: true ,// 是否选中批量修改
                formRight : [],
            };
        },
        methods: {

            deles(e){
                console.log(e)
                this._delesAjax(e,DELETE_URL);
                this.$Message.success("删除成功");
                this._getUserData(this.searchData,QUERY_URL);
            },
            onEditorChange(conter){//编辑器文本发生变化
                this._userAjax(conter,UPDATE_URL);
            },
            // 搜索
            searchSubmit(pageSize, pageNumber) {
                console.log(this.searchData)
                this.searchLoading = true;
                this._getUserData(this.searchData, QUERY_URL, pageSize, pageNumber);
            },
            // 重置搜索
            submitReset() {
                this.searchLoading = false;
                this.searchData = {};
                this._getUserData(this.searchData,QUERY_URL,this.pageSize, this.pageNumber);
            },
            // 删除用户
            deleteUser(row) {
                if (this.accessAgent) {
                    this.$Message.error("权限不足！");
                    return;
                }
                this.$Modal.confirm({
                    title: "删除用户",
                    content: "<p>删除完成后将无法恢复</p>",
                    loading: true,
                    onOk: () => {
                        this._delesAjax(row, DELETE_URL).then(result => {
                            this.$Modal.remove();
                            if (result.code === "200") {
                                this.$Message.info("删除成功!");
                                this._getUserData(
                                    this.userData,
                                    QUERY_URL,
                                    this.pageSize,
                                    this.currentPage
                                );
                            } else {
                                this.$Message.error("删除失败！");
                            }
                        });
                    }
                });
            },
            // 显示模态框
            showUserModal() {
                this.userModalTitle = "添加";
                this.isUserModal = true;
            },
            // 提交
            submitUserModal() {
                this.$refs["userManagement"].validate(valid => {
                    if (valid) {
                        this.userModalLoading = true;
                        if (this.userModalTitle === INSERT_TITLE) {
                            console.log(123,this.userForm)
                            this._addAjax(this.userForm, INSERT_URL).then(result => {
                                this.isUserModal = false;
                                this.userModalLoading = false;
                                if (result.code === "200") {
                                    this.$Message.success("添加成功！");
                                    this._getUserData(
                                        this.searchData,
                                        QUERY_URL,
                                        this.pageSize,
                                        this.pageNumber
                                    );
                                } else {
                                    this.$Message.error(result.message);
                                }
                            });
                        } else if (this.userModalTitle === UPDATE_TITLE) {
                            this._userAjax(this.userForm, UPDATE_URL).then(result => {
                                this.isUserModal = false;
                                this.userModalLoading = false;
                                if (result.code === "200") {
                                    this.$Message.success("添加成功！");
                                    this._getUserData(
                                        this.searchData,
                                        QUERY_URL,
                                        this.pageSize,
                                        this.currentPage
                                    );
                                } else {
                                    this.$Message.error("添加失败！");
                                }
                            });
                        }
                    } else {
                        this.$Message.error("请填写完整！");
                    }
                });
            },
            cancelUserModal() {
                this.$refs["userManagement"].resetFields();
                this.userModalLoading = false;
                this.isUserModal = false;
                this.userForm = {
                    department: "" // 用户部门
                };
            },
            // 添加/修改
            _userAjax(formData, url) {
                const keyOne = "favorablePolicyEntity";
                return new Promise((resolve, reject) => {
                    policyAjax({ formData, url, keyOne })
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
            // 添加
            _addAjax(formData, url) {
                const keyOne = "companyEntity";
                return new Promise((resolve, reject) => {
                    policyAjax({ formData, url, keyOne })
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
            //删除
            _delesAjax(formData, url) {
                const keyOne = "favorablePolicyEntity";
                return new Promise((resolve, reject) => {
                    policyAjax({ formData, url, keyOne })
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
            _getUserData(formData, url) {
                this.tabelLoading = true;
                formData = Object.assign(formData, {});
                const keyOne = "favorablePolicyFilter";
                policyAjax({ formData, url, keyOne })
                    .then(result => {
                        this.tabelLoading = false;
                        if (result.data.code === "200") {
                            console.log(result.data.results.list)
                            this.formRight = result.data.results.list;
                            this.$Message.success("查询成功");
                        } else {
                            this.$Message.error("查询失败");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            cancelClassModal() {
                this.classModal = false;
            },
            // 显示批量修改模态框
            showEditClass() {
                this.classModal = true;
            }
        },
        mounted() {},
        created() {
            this._getUserData(this.searchData,QUERY_URL);
            // 获取按钮权限
            let btnAccess = sessionStorage.getItem("btnaccess");
            this.globalFunction(btnAccess);
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
<style scoped>
  .flexsa {
    display: flex;
    justify-content: space-between;
  }
</style>
