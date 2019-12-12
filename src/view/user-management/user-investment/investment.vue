<template>
  <div>
    <!-- 搜索添加栏 -->
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="项目">
                <Input
                  v-model="searchData.projectName"
                  suffix="ios-search"
                  placeholder="请输入项目"
                  style="width: auto"
                >
                <Icon type="ios-search" slot="suffix" />
                </Input>
              </FormItem>
            </i-col>
<!--            <i-col :xs="24" :md="12" :lg="6">-->
<!--              <FormItem label="项目名称">-->
<!--                <Input-->
<!--                  v-model="searchData.departAddr"-->
<!--                  suffix="ios-search"-->
<!--                  placeholder="请输入项目名称"-->
<!--                  style="width: auto"-->
<!--                >-->
<!--                <Icon type="ios-search" slot="suffix" />-->
<!--                </Input>-->
<!--              </FormItem>-->
<!--            </i-col>-->
            <!--            <i-col :xs="24" :md="12" :lg="6">-->
            <!--              <FormItem label="部门类型">-->
            <!--                <Select v-model="searchData.departType" placeholder="请输入部门类型">-->
            <!--                  <Option value="乡镇">乡镇</Option>-->
            <!--                  <Option value="县直单位">县直单位</Option>-->
            <!--                </Select>-->
            <!--              </FormItem>-->
            <!--            </i-col>-->
          </Row>
          <!--          <Row>-->
          <!--            <i-col :xs="24" :md="12" :lg="6">-->
          <!--              <FormItem label="单位分类">-->
          <!--                <Input-->
          <!--                  v-model="searchData.departClas"-->
          <!--                  suffix="ios-search"-->
          <!--                  placeholder="请输入单位分类"-->
          <!--                  style="width: auto"-->
          <!--                >-->
          <!--                  <Icon type="ios-search" slot="suffix" />-->
          <!--                </Input>-->
          <!--              </FormItem>-->
          <!--            </i-col>-->
          <!--            <i-col :xs="24" :md="12" :lg="6">-->
          <!--              <FormItem label="部门旧名称">-->
          <!--                <Input-->
          <!--                  v-model="searchData.departOldName"-->
          <!--                  suffix="ios-search"-->
          <!--                  placeholder="请输入部门旧名称"-->
          <!--                  style="width: auto"-->
          <!--                >-->
          <!--                  <Icon type="ios-search" slot="suffix" />-->
          <!--                </Input>-->
          <!--              </FormItem>-->
          <!--            </i-col>-->
          <!--            <i-col :xs="24" :md="12" :lg="6">-->
          <!--              <FormItem label="部门旧简称">-->
          <!--                <Input-->
          <!--                  v-model="searchData.departOldAddr"-->
          <!--                  suffix="ios-search"-->
          <!--                  placeholder="请输入部门旧简称"-->
          <!--                  style="width: auto"-->
          <!--                >-->
          <!--                  <Icon type="ios-search" slot="suffix" />-->
          <!--                </Input>-->
          <!--              </FormItem>-->
          <!--            </i-col>-->
          <!--          </Row>-->
          <FormItem>
            <Button
              v-if="btnAccess.query"
              type="primary"
              style="marigin:0 20px"
              :loading="searchLoading"
              @click="searchSubmit(10,1)"
            >提交搜索</Button>
            <Button @click="submitReset">重置搜索</Button>
          </FormItem>
        </Form>
      </Card>
    </Row>

    <!-- 表格 -->
    <Row style="margin-top:20px">
      <Card>
        <div class="btn-arrs">
          <Button type="info" v-if="btnAccess.add" @click="showUserModal">添加招商成果</Button>
          <Button
            v-if="btnAccess.upd"
            type="primary"
            @click="showEditClass"
            :disabled="isSelectEdit"
            style="margin-left:10px;margin-bottom:10px;"
          >批量编辑单位分类</Button>
        </div>
        <Table
          @on-selection-change="selectChange"
          :loading="tabelLoading"
          :columns="userHead"
          :data="userData"
          border
          height="500"
        ></Table>
        <div style="margin-top:20px;margin-left:35%">
          <Page
            @on-change="pageNumberChange"
            :page-size="pageSize"
            :total="pageTotal"
            @on-page-size-change="pageSizeChange"
            show-elevator
            show-sizer
          />
        </div>
      </Card>
    </Row>
    <!-- 添加/编辑 -->
    <Modal
      v-model="isUserModal"
      :title="userModalTitle"
      :loading="userModalLoading"
      @on-cancel="cancelUserModal"
    >
      <Form ref="userManagement" :model="userForm"  :label-width="160">
        <FormItem label="项目" prop="department">
          <Input v-model="userForm.projectName" placeholder="请输入项目" style="width: 300px"></Input>
        </FormItem>
<!--        <FormItem label="项目简介" prop="departAddr">-->
<!--          <Input v-model="userForm.synopsis" placeholder="请输入项目简介" style="width: 300px"></Input>-->
<!--        </FormItem>-->
<!--        <FormItem label="进展情况" prop="context" >-->
<!--          <Input-->
<!--            autosize-->
<!--            v-model="userForm.evolve"-->
<!--            placeholder="请输入进展情况"-->
<!--            style="width:300px"-->
<!--            type="textarea"-->
<!--          />-->
<!--        </FormItem>-->

<!--        <FormItem label="存在问题" prop="departClas">-->
<!--          <Input v-model="userForm.problem" placeholder="请输入存在问题" style="width: 300px"></Input>-->
<!--        </FormItem>-->

        <FormItem label="总投资额	" prop="departOldName">
          <Input v-model="userForm.investment" placeholder="请输入总投资额	" style="width: 300px"></Input>
        </FormItem>

        <FormItem label="责任单位" prop="departOldAddr">
          <Input
            v-model="userForm.accUnit"
            placeholder="请输入责任单位"
            style="width: 300px"
            type="textarea"
          />
        </FormItem>
        <FormItem label="责任领导人" prop="departOldAddr">
          <Input v-model="userForm.accLead" placeholder="请输入责任领导人" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="主要领导人" prop="departOldAddr">
          <Input v-model="userForm.mainLead" placeholder="请输入主要领导人" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="企业方联系人" prop="departOldAddr">
          <Input v-model="userForm.companyLinkman" placeholder="请输入企业方联系人" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="企业方联系人联系方式" prop="departOldAddr">
          <Input v-model="userForm.companyPhone" placeholder="请输入企业方联系人联系方式" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="项目对接人" prop="departOldAddr">
          <Input v-model="userForm.linkman" placeholder="请输入项目对接人" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="项目对接人联系方式" prop="departOldAddr">
          <Input v-model="userForm.phone" placeholder="请输入项目对接人联系方式" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="项目状态" prop="departOldAddr">
          <Select v-model="userForm.status" placeholder="请输入分类" style="width:300px" >
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>

      </Form>
      <div slot="footer">
        <Button
          v-if="btnAccess.upd"
          type="primary"
          size="large"
          :loading="userModalLoading"
          @click="submitUserModal"
        >提交</Button>
        <Button size="large" @click="cancelUserModal">取消</Button>
      </div>
    </Modal>
    <!-- 批量选择单位分类 -->
    <Modal v-model="classModal" title="批量选择单位分类" @on-ok="submitClass" @on-cancel="cancelClassModal">
      <Form :model="userForm">
        <FormItem label="单位分类">
          <Select v-model="userForm.departClas" style="width:300px" placeholder="请选择单位分类">
            <Option
              v-for="item in departclssArr"
              :value="item.id"
              :key="item.classname"
            >{{ item.classname }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
    import { hasOneOf } from "@/libs/tools";
    import { invesdata } from "@/api/systemMange";
    // 删除URL
    const DELETE_URL = "/investment/delete";
    // 修改URL
    const UPDATE_URL = "/investment/update";
    // 添加URL
    const INSERT_URL = "/investment/insert";
    // 查询URL
    const QUERY_URL = "/investment/query";
    // ------------------------------------

    // 批量修改单位分类
    const BULKCHANGE_URL = "/department/batchUpdateClass";
    const INSERT_TITLE = "添加";
    const UPDATE_TITLE = "编辑";
    export default {
        data() {
            // 验证手机号码
            return {
                cityList: [
                    {
                        value: '1',
                        label: '落地项目'
                    },
                    {
                        value: '2',
                        label: '线索项目'
                    },
                    {
                        value: '3',
                        label: '有望项目'
                    },
                ],

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
                    id : '' , // 序号
                    type: "", // 项目分类
                    projectName: "", // 项目名称
                    context: "", // 项目内容
                    target: "", // 年度任务目标
                    totalInvestment: "", // 总投资（亿元）
                    evolve: "", // 项目进展情况
                    accUnit: "" ,// 责任单位
                    beginTime :  "" , //计划开工时间
                    endTime :  "" , //计划竣工时间
                    plannedInvestment :  "" //今年计划投资（万元）
                },
                searchData: {
                    projectName :  ''
                },
                userData: [], // 表格数据
                searchReg: {},
                userHead: [
                    {
                        type: "selection",
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "序号",
                        key: "id",
                        align: "center"
                    },
                    {
                        title: "项目",
                        key: "projectName",
                        algin:'center',
                        width: 200
                    },
                    // {
                    //     title: '项目简介',
                    //     key: "synopsis",
                    //     algin:'center',
                    // },
                    // {
                    //     title: "进展情况",
                    //     key: "evolve"
                    // },
                    // {
                    //     title: "存在问题",
                    //     key: "problem",
                    //     align: "center"
                    // },
                    {
                        title: "总投资额",
                        key: "investment",
                        align: "center",
                    },
                    {
                        title: "责任单位",
                        key: "accUnit",
                        align: "center"
                    },
                    {
                        title: "责任负责人",
                        key: "accLead",
                        align: "center"
                    },
                    {
                        title: "主要领导",
                        key: "mainLead",
                        align: "center"
                    },
                    {
                        title: "企业方联系人",
                        key: "companyLinkman",
                        align: "center"
                    },
                    {
                        title: "企业方联系人联系方式",
                        key: "companyPhone",
                        align: "center"
                    },
                    {
                        title: "项目对接人",
                        key: "linkman",
                        align: "center"
                    },
                    {
                        title: "项目对接人联系方式",
                        key: "phone",
                        align: "center"
                    },
                    {
                        title: "项目状态",
                        key: "status",
                        align: "center"
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
                                            type: "primary"
                                        },
                                        style: {
                                            marginRight: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.userForm = JSON.parse(JSON.stringify(params.row)); // 深拷贝
                                                this.userModalTitle = "编辑";
                                                this.isUserModal = true;
                                            }
                                        }
                                    },
                                    "查看或编辑"
                                ),
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "error"
                                        },
                                        style: {
                                            display: this.btnAccess.del
                                        },
                                        on: {
                                            click: () => {
                                                this.deleteUser(params.row);
                                            }
                                        }
                                    },
                                    "删除"
                                )
                            ]);
                        }
                    }
                ],
                isSelectEdit: true // 是否选中批量修改
            };
        },
        methods: {
            // 搜索
            searchSubmit(pageSize, pageNumber) {
                console.log(this.searchData);

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
                        this._userAjax(row, DELETE_URL).then(result => {
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
                            this._userAjax(this.userForm, INSERT_URL).then(result => {
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
                            console.log(this.userForm)
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
            // 页码
            pageNumberChange(pageNumber) {
                this.currentPage = pageNumber;
                this.pageNumber = pageNumber;
                this._getUserData(
                    this.searchData,
                    QUERY_URL,
                    this.pageSize,
                    this.pageNumber
                );
            },
            // 页数
            pageSizeChange(pageSize) {
                this.pageSize = pageSize;
                this._getUserData(
                    this.searchData,
                    QUERY_URL,
                    this.pageSize,
                    this.pageNumber
                );
            },
            // 添加/修改
            _userAjax(formData, url) {
                const keyOne = "investmentResultsEntity";
                return new Promise((resolve, reject) => {
                    invesdata({ formData, url, keyOne })
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
            _getUserData(formData, url, pageSize, pageNumber) {
                this.tabelLoading = true;
                formData = Object.assign(formData, {
                    pageSize,
                    pageNumber
                });
                const keyOne = "investmentResultsFilter";
                invesdata({ formData, url, keyOne })
                    .then(result => {
                        this.tabelLoading = false;
                        if (result.data.code === "200") {
                            // this.searchLoading = false;
                            for ( let  item of result.data.results.list ) {
                                if (item.status === '1' ) {
                                    item.status = '落地项目'
                                }else if (item.status === '2' ) {
                                    item.status = '线索项目'
                                }else {
                                    item.status = '有望项目'
                                }
                            }
                            // console.log(result.data.results.list)

                            this.userData = result.data.results.list;
                            this.pageTotal = result.data.results.pageTotal;
                            // this.departclssArr = result.data.results.departclssList; // 单位分类赋值
                            this.$Message.success("查询成功");
                        } else {
                            this.$Message.error("查询失败");
                        }
                        console.log(result)
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            // 批量修改分类
            selectChange(selection) {
                let arr = []; // 用户id
                selection.forEach(item => {
                    arr.push(item.id);
                });

                if (arr.length === 0) {
                    this.isSelectEdit = true;
                } else {
                    this.isSelectEdit = false;
                }
                this.userForm.listId = arr; // 选中的id
            },
            // 提交批量修改
            submitClass() {
                console.log(this.userForm.listId);
                this._userAjax(this.userForm, BULKCHANGE_URL).then(result => {
                    if (result.code === "200") {
                        this.$Message.success(result.message);
                        this._getUserData(
                            this.searchData,
                            QUERY_URL,
                            this.pageSize,
                            this.currentPage
                        );
                    } else {
                        this.$Message.error(result.message);
                    }
                });
                this.classModal = false;
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
            this._getUserData(this.searchData,QUERY_URL,this.pageSize, this.pageNumber);
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
</style>
