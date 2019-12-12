<template>
  <div>
    <!-- 搜索添加栏 -->
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户名" prop="name">
                <Input
                  v-model="searchData.name"
                  suffix="ios-search"
                  placeholder="请输入用户名称"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix" />
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户单位" prop="name">
                <Select v-model="searchData.departCode" placeholder="请输入用户单位" style="width:200px">
                  <Option
                    v-for="item in getDepartmentList"
                    :value="item.departcode"
                    :key="item.departcode"
                  >{{ item.department }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户性别" prop="name">
                <Select v-model="searchData.gender" style="width:200px">
                  <Option value="男">男</Option>
                  <Option value="女">女</Option>
                </Select>
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

    <!-- 上传测评对象 -->
    <Row v-if="btnAccess.add" style="margin-top:20px">
      <Card title="导入EXCEL">
        <!--
          本地  action="api/evaluateUser/importEvaluateUser"
          线上  action="/evaluateUser/importEvaluateUser"
        -->
        <Upload
          ref="upload"
          :before-upload="handleUpload"
          :on-success="handleSuccess"
          :format="['xls','xlsx']"
          :on-format-error="handleFormatError"
          :action="importUrl"
        >
          <Button type="success" @click="downloadTemplate" style="margin-right: 20px;">下载测评对象模板</Button>
          <Tooltip content="温馨提示：上传文件前请先下载模板，依照模板格式上传" placement="top-start" max-width="220">
            <Button type="primary" icon="ios-cloud-upload-outline">上传测试对象</Button>
          </Tooltip>
        </Upload>
        <div v-if="file !== null">
          文件名: {{ file.name }}
          <Button type="primary" @click="upload">点击上传</Button>
        </div>
        <!-- 上传错误提示 -->
        <div>
          <Alert banner closable type="error" v-for="item in errorMessage" :key="item">{{item}}</Alert>
        </div>
      </Card>
    </Row>

    <!-- 表格 -->
    <Row style="margin-top:20px">
      <Card>
        <div class="btn-arrs">
          <Button type="info" v-if="btnAccess.add" @click="showUserModal">添加测评对象</Button>
          <Button v-if="btnAccess.del2" type="error" @click="batchDelete" :disabled="isDisable">批量删除</Button>
          <Button
            v-if="btnAccess.upd"
            type="primary"
            @click="showTypeModal"
            :disabled="isDisable"
            style="margin-left:15px;"
          >批量修改用户分类</Button>
        </div>
        <Table
          border
          @on-selection-change="selectChange"
          @on-select-all="tabelBatchSelect"
          @on-select-all-cancel="TableCancelSelect"
          :loading="tabelLoading"
          :columns="userHead"
          :data="userData"
          height="530"
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

    <!-- 添加用户/编辑用户 -->
    <Modal
      v-model="isUserModal"
      :title="userModalTitle"
      :loading="userModalLoading"
      @on-cancel="cancelUserModal"
    >
      <Form ref="userManagement" :model="userForm" :rules="userReg" :label-width="80">
        <FormItem label="用户名" prop="name">
          <Input v-model="userForm.name" placeholder="请输入用户名称" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="phone">
          <Input :number="true" v-model="userForm.phone" placeholder="请输入联系电话" style="width: 300px"></Input>
        </FormItem>
        <FormItem label="用户年龄">
          <InputNumber :max="100" :min="1" v-model="userForm.age" style="width: 300px"></InputNumber>
        </FormItem>
        <FormItem label="用户单位" prop="departCode">
          <Select v-model="userForm.departCode" style="width:300px">
            <Option
              v-for="item in getDepartmentList"
              :value="item.departcode"
              :key="item.departcode"
            >{{ item.department }}</Option>
          </Select>
        </FormItem>
        <FormItem label="用户分类">
          <Select v-model="userForm.userType" style="width:300px">
            <Option value="0">无限制</Option>
            <Option value="2">党代表</Option>
            <Option value="3">人大代表</Option>
            <Option value="4">政协委员</Option>
            <Option value="5">企业家代表</Option>
            <Option value="6">城乡代表</Option>
          </Select>
        </FormItem>
        <FormItem label="性别">
          <Select v-model="userForm.gender" style="width:300px">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
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

    <!-- 批量修改用户分类 -->
    <Modal
      v-model="userTypeModal"
      title="批量修改用户分类"
      @on-ok="submitUserType"
      @on-cancel="cancelTypeModal"
    >
      <Form :model="userTypeForm">
        <FormItem label="用户分类">
          <Select v-model="userTypeForm.userType" style="width:300px">
            <Option value="0">无限制</Option>
            <Option value="2">党代表</Option>
            <Option value="3">人大代表</Option>
            <Option value="4">政协委员</Option>
            <Option value="5">企业家代表</Option>
            <Option value="6">城乡代表</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { URL } from "@/libs/util";
import { userAjax, userTestAjax } from "@/api/city";
// 以防命名冲突
const HOST = URL;
// 删除URL
const DELETE_URL = "/evaluateUser/delete";
// 修改URL
const UPDATE_URL = "/evaluateUser/update";
// 添加URL
const INSERT_URL = "/evaluateUser/insert";
// 查询URL
const QUERY_URL = "/evaluateUser/query";
// 批量修改用户分类
const UPDATE_USERTYPEURL = "/evaluateUser/batchUpdate";
// 手机验证
const PHONE_REG = new RegExp("^1(3|4|5|7|8)\\d{9}$");
const INSERT_TITLE = "添加用户";
const UPDATE_TITLE = "编辑用户";
export default {
  data() {
    // 验证手机号码
    const phoneReg = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入联系电话"));
      } else {
        if (!PHONE_REG.test(value)) {
          callback(new Error("请输入正确的手机号码"));
        }
      }
      callback();
    };
    return {
      // 增删改查权限按钮
      btnAccess: {
        add: true,
        add2: "inline-block",
        del: "inline-block",
        del2: true,
        upd: true,
        query: true
      },
      deleteArr: { list: [] }, // 批量删除
      isUserModal: false, // 模态框
      searchLoading: false, // 搜索Loading
      userModalLoading: false, // 提交loading
      tabelLoading: false, // 表格loading
      userModalTitle: "", // 模态框title
      pageSize: 10,
      pageNumber: 1,
      pageTotal: 10,
      userForm: {
        name: "",
        departCode: "",
        userType: "",
        gender: "",
        phone: "",
        age: null
      },
      searchData: {
        name: "",
        department: "",
        departCode: "",
        gender: ""
      },
      searchReg: {},
      userReg: {
        name: [
          {
            required: true,
            message: "请输入指标名称",
            trigger: "blur"
          }
        ],
        departCode: [
          {
            required: true,
            message: "请输入用户单位",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: phoneReg,
            trigger: "blur"
          }
        ]
      },
      userData: [],
      userHead: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "用户名称",
          key: "name"
        },
        {
          title: "联系电话",
          key: "phone"
        },
        // {
        //   title: "用户年龄",
        //   key: "age"
        // },
        {
          title: "用户性别",
          key: "gender"
        },
        {
          title: "用户单位",
          key: "department"
        },
        {
          title: "用户分类",
          key: "userType",
          render: (h, params) => {
            let texts = "";
            let item = params.row.userType;
            if (item === "0") {
              texts = "无限制";
            } else if (item === "2") {
              texts = "党代表";
            } else if (item === "3") {
              texts = "人大代表";
            } else if (item === "4") {
              texts = "政协委员";
            } else if (item === "5") {
              texts = "企业家代表";
            } else if (item === "6") {
              texts = "城乡代表";
            }
            return h("div", {}, texts);
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
                      this.userForm = JSON.parse(JSON.stringify(params.row));
                      this.userModalTitle = "编辑用户";
                      this.isUserModal = true;
                      // 如果编辑时候可以显示出来， 但是不可填写
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
                      this.deleteArr = { list: [] };
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      errorMessage: [], // 上传错误提示
      file: null,
      importUrl: URL + "/evaluateUser/importEvaluateUser", // 导入测试对象url
      isDisable: true,
      selectArrr: [],
      // 用户分类模态框
      userTypeModal: false,
      userTypeForm: {
        userType: ""
      }
    };
  },
  methods: {
    // 表格取消全选
    TableCancelSelect(selection) {
      this.deleteArr["list"] = [];
    },
    // 表格全选
    tabelBatchSelect(selection) {
      selection.forEach(item => {
        this.deleteArr["list"].push(item.id); // 获取Id
      });
    },
    // 搜索
    searchSubmit(pageSize, pageNumber) {
      this.searchLoading = true;
      this._getUserData(this.searchData, QUERY_URL, pageSize, pageNumber);
    },
    // 重置搜索
    submitReset() {
      this.searchLoading = false;
      this.searchData = {
        userName: "",
        userDepartment: "",
        userPermissions: ""
      };
    },
    // 删除用户
    deleteUser(row) {
      this.$Modal.confirm({
        title: "删除用户",
        content: "<p>删除完成后将无法恢复</p>",
        loading: true,
        onOk: () => {
          if (row.id !== undefined) {
            this.deleteArr["list"].push(row.id);
          }
          this._userAjax(this.deleteArr, DELETE_URL).then(result => {
            this.$Modal.remove();
            if (result.code === "200") {
              this.$Message.info("删除成功!");
              this.deleteArr = { list: [] };
              this._getUserData(
                this.userData,
                QUERY_URL,
                this.pageSize,
                this.pageNumber
              );
            } else {
              this.$Message.error("删除失败！");
            }
          });
        }
      });
    },
    // 批量删除用户
    batchDelete() {
      this.$Modal.confirm({
        title: "批量删除用户",
        content: "<p>删除完成后将无法恢复</p>",
        loading: true,
        onOk: () => {
          this.deleteArr["list"] = this.selectArrr;
          this._userAjax(this.deleteArr, DELETE_URL).then(result => {
            this.$Modal.remove();
            if (result.code === "200") {
              this.$Message.info("删除成功!");
              this.isDisable = true;
              this.deleteArr = { list: [] };
              this._getUserData(
                this.userData,
                QUERY_URL,
                this.pageSize,
                this.pageNumber
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
      this.userModalTitle = "添加用户";
      this.isUserModal = true;
    },
    // 提交
    submitUserModal() {
      this.$refs["userManagement"].validate(valid => {
        if (valid) {
          this.userModalLoading = true;
          if (this.userModalTitle === INSERT_TITLE) {
            this._userAjax(this.userForm, INSERT_URL).then(result => {
              this.cancelUserModal();
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
                this.$Message.error("添加失败！");
              }
            });
          } else if (this.userModalTitle === UPDATE_TITLE) {
            this._userAjax(this.userForm, UPDATE_URL).then(result => {
              this.cancelUserModal();
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
                this.$Message.error("添加失败！");
              }
            });
          }
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    // 关闭模态框
    cancelUserModal() {
      this.$refs["userManagement"].resetFields();
      this.isUserModal = false;
      this.userModalLoading = false;
      this.userForm = {
        name: "",
        department: "",
        gender: "",
        phone: "",
        age: null
      };
    },
    // 页码
    pageNumberChange(pageNumber) {
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
    // 阻止自动上传文件
    handleUpload(file) {
      this.file = file;
      return false;
    },
    // 上传文件
    handleSuccess(res, file) {
      if (res.code === "200") {
        this.$Notice.success({
          title: res.message
        });
        this._getUserData(
          this.searchData,
          QUERY_URL,
          this.pageSize,
          this.pageNumber
        );
      } else if (res.code === "500") {
        let errorArr = res.results.error;
        this.errorMessage = errorArr;
        this.$Notice.error({
          title: res.message
        });
      }
    },
    // 点击上传文件
    upload() {
      this.$refs.upload.post(this.file);
      setTimeout(() => {
        this.file = null;
      }, 1500);
    },
    // 验证上传格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式错误",
        desc: "文件" + file.name + " 格式错误, 请选择xls或者xlsx"
      });
    },
    // 添加/修改
    _userAjax(formData, url) {
      const keyOne = "evaluateUserEntity";
      return new Promise((resolve, reject) => {
        userTestAjax({ formData, url, keyOne })
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
      const keyOne = "evaluateUserFilter";
      userTestAjax({ formData, url, keyOne })
        .then(result => {
          this.tabelLoading = false;
          if (result.data.code === "200") {
            this.searchLoading = false;
            this.userData = result.data.results.list;
            this.pageTotal = parseInt(result.data.results.pageTotal) * 10;
            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 批量勾选
    selectChange(selection) {
      let arr = []; // 用户id
      selection.forEach(item => {
        arr.push(item.id);
      });
      this.selectArrr = arr;
      if (this.selectArrr.length === 0) {
        this.isDisable = true;
      } else {
        this.isDisable = false;
      }
    },
    /**
     * 下载测评对象模板
     */
    downloadTemplate() {
      window.open(
        HOST +
          "/townScore/downTownScoreMoudle?fileName=cePingMould.xls&chinaName=测评对象导入模板.xls"
      );
    },
    showTypeModal() {
      this.userTypeModal = true;
    },
    cancelTypeModal() {
      this.userTypeModal = false;
    },
    // 批量修改用户类型
    submitUserType() {
      this.userTypeForm.userIds = this.selectArrr;
      let formData = this.userTypeForm;
      const keyOne = "evaluateUserEntity";
      let url = UPDATE_USERTYPEURL;
      userTestAjax({ formData, url, keyOne })
        .then(result => {
          this.isDisable = true;
          if (result.data.code === "200") {
            // 重新查询表格
            this._getUserData(
              this.searchData,
              QUERY_URL,
              this.pageSize,
              this.pageNumber
            );

            this.$Message.success(result.message);
          } else {
            this.$Message.error(result.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this._getUserData(
      this.searchData,
      QUERY_URL,
      this.pageSize,
      this.pageNumber
    );

    // 获取按钮权限
    let btnAccess = sessionStorage.getItem("btnaccess");
    this.globalFunction(btnAccess);
  },
  computed: {
    getDepartmentList() {
      return this.$store.state.user.departmentList;
    }
  }
};
</script>
<style scoped>
</style>
