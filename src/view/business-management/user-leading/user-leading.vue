<template>
  <div>
    <!-- 搜索添加栏 -->
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <!--            <i-col :xs="24" :md="12" :lg="6">-->
            <!--              <FormItem label="中类">-->
            <!--                <Input-->
            <!--                  v-model="searchData.secondType"-->
            <!--                  suffix="ios-search"-->
            <!--                  placeholder="请输入项目中类"-->
            <!--                  style="width: auto"-->
            <!--                >-->
            <!--                <Icon type="ios-search" slot="suffix" />-->
            <!--                </Input>-->
            <!--              </FormItem>-->
            <!--            </i-col>-->
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="项目名称">
                <Input
                  v-model="searchData.campanyName"
                  suffix="ios-search"
                  placeholder="请输入项目名称"
                  style="width: auto"
                >
                <Icon type="ios-search" slot="suffix" />
                </Input>
              </FormItem>
            </i-col>
          </Row>
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
          <Button type="info" v-if="btnAccess.add" @click="showUserModal">添加企业</Button>
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
      <Form ref="userManagement" :model="userForm"  :label-width="151">
        <FormItem label="请选择公司分类">
          <Select v-model="userForm.type" style="width:200px" @on-change="typeLists">
            <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <div v-if="addPanduan">
          <FormItem label="所属城市" >
            <Input v-model="userForm.city" placeholder="请输入所属城市" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="项目名称" prop="departAddr" >
            <Input v-model="userForm.campanyName" placeholder="请输入项目名称" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="2018年资产总额(亿元)" prop="context"  >
            <Input v-model="userForm.assetsNow" placeholder="请输入2018年资产总额(亿元)" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="公司地址" prop="departClas" >
            <Input
              v-model="userForm.companyAddress"
              placeholder="请输入公司地址"
              style="width: 300px"
              type="textarea"
            />
          </FormItem>
          <FormItem label="	联系人电话" prop="departOldName" >
            <Input v-model="userForm.phone" type="number" placeholder="请输入联系人电话" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="细分领域类别" prop="departOldAddr" >
            <Input v-model="userForm.categoryField" placeholder="请输入细分领域类别" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="营业收入" prop="departOldAddr" >
            <Input v-model="userForm.taking" placeholder="请输入营业收入" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="细分产品或服务情况" prop="departOldAddr" >
            <Input
              v-model="userForm.productField"
              placeholder="请输入细分产品或服务情况"
              style="width: 300px"
              type="textarea"
            />
          </FormItem>
        </div>
        <div v-if="addTypePanduan">
          <FormItem label="企业名称" prop="departAddr" >
            <Input v-model="userForm.campanyName" placeholder="请输入企业名称" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="公司地址" prop="departClas" >
            <Input
              v-model="userForm.companyAddress"
              placeholder="请输入公司地址"
              style="width: 300px"
              type="textarea"
            />
          </FormItem>
          <FormItem label="法人姓名" prop="departOldName" >
            <Input v-model="userForm.legalPerson" placeholder="请输入法人姓名" style="width: 300px"></Input>
          </FormItem>
          <FormItem label="细分产品或服务情况" prop="departOldAddr" >
            <Input
              v-model="userForm.businessScope"
              placeholder="请输入细分产品或服务情况"
              style="width: 300px"
              type="textarea"
            />
          </FormItem>
        </div>
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
    // 纳统企业库
    import { hasOneOf } from "@/libs/tools";
    import { leadAjax } from "@/api/systemMange";
    // 删除URL
    const DELETE_URL = "/emphasis/delete";
    // 修改URL
    const UPDATE_URL = "/emphasis/update";
    // 添加URL
    const INSERT_URL = "/emphasis/insert";
    // 查询URL/company/query
    const QUERY_URL = "/emphasis/query";
    // ------------------------------------

    // 批量修改单位分类
    const BULKCHANGE_URL = "/department/batchUpdateClass";
    const INSERT_TITLE = "添加";
    const UPDATE_TITLE = "编辑";
    export default {
        data() {
            // 验证手机号码
            return {
                // 企业分类
                typeList : [
                    { label : '龙头企业',value : '01'},
                    { label : '人工智能',value : '02'},
                    { label : '互联网+',value : '03'},
                    { label : '北斗应用',value : '04'},
                    { label : '5G+',value : '05'},
                    { label : '虚拟现实',value : '06'},
                ],
                addPanduan : false,
                addTypePanduan : false ,
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
                    // id : ''
                    city: "",
                    campanyName: "",
                    assetsNow: "",
                    companyAddress: "", //
                    phone: "", //
                    categoryField: "", //
                    taking: "" ,
                    productField :  "" ,
                },
                searchData: {
                    campanyName : '',
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
                        width: 60,
                        align: "center"
                    },
                    {
                        title: "所属城市",
                        key: "city",
                        align: "center"
                    },
                    {
                        title: "企业名称",
                        key: "campanyName",
                        align: "center"
                    },
                    {
                        title: "2018年资产总额(亿元)",
                        key: "assetsNow",
                        align: "center"
                    },
                    {
                        title: "公司地址",
                        key: "companyAddress",
                        width:260,
                        align: "center"
                    },
                    {
                        title: "联系人电话",
                        key: "phone",
                        align: "center"
                    },
                    {
                        title: "细分领域类别",
                        key: "categoryField",
                        align: "center"
                    },
                    {
                        title: "营业收入",
                        key: "taking",
                        align: "center"
                    },
                    {
                        title: "细分产品或服务情况",
                        key: "productField",
                        align: "center",
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
                                        title: params.row.productField
                                    }
                                }, params.row.productField)
                            ]);
                        }
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
                                                console.log(this.userForm)
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
                isSelectEdit: true ,// 是否选中批量修改
                cityList: [
                    {
                        value: '计算机、通信和其他电子设备制造业',
                        label: '计算机、通信和其他电子设备制造业'
                    },
                    {
                        value: '电信、广播电视和卫星传输服务',
                        label: '电信、广播电视和卫星传输服务'
                    },
                    {
                        value: '软件和信息技术服务业',
                        label: '软件和信息技术服务业'
                    },
                    {
                        value: '其他行业',
                        label: '其他行业'
                    }
                ],
            };
        },
        methods: {
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
                            this._updaAjax(this.userForm, UPDATE_URL).then(result => {
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
                const keyOne = "emphasisCompanyFilter";
                return new Promise((resolve, reject) => {
                    leadAjax({ formData, url, keyOne })
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
            _updaAjax(formData, url) {
                const keyOne = "emphasisCompanyEntity";
                return new Promise((resolve, reject) => {
                    leadAjax({ formData, url, keyOne })
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
                const keyOne = "emphasisCompanyEntity";
                return new Promise((resolve, reject) => {
                    leadAjax({ formData, url, keyOne })
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
                const keyOne = "emphasisCompanyEntity";
                return new Promise((resolve, reject) => {
                    leadAjax({ formData, url, keyOne })
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
                const keyOne = "emphasisCompanyFilter";
                leadAjax({ formData, url, keyOne })
                    .then(result => {
                        this.tabelLoading = false;
                        if (result.data.code === "200") {
                            // this.searchLoading = false;
                            console.log(result.data.results.list)
                            this.userData = result.data.results.list;
                            this.pageTotal = result.data.results.pageTotal;
                            // this.departclssArr = result.data.results.departclssList; // 单位分类赋值
                            this.$Message.success("查询成功");
                        } else {
                            this.$Message.error("查询失败");
                        }
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
            },
            //添加企业大类
            typeLists(value) {
                console.log(value)
                if (value === '01' ) {
                    this.addPanduan = true
                    this.addTypePanduan = false
                }else {
                    this.addPanduan = false
                    this.addTypePanduan = true
                }
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
