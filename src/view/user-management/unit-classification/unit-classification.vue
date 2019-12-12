<template>
  <div>
    <!-- 搜索添加栏 -->
    <Row>
      <Card>
        <Form ref="searchData" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="单位分类" prop="classname">
                <Input
                  v-model="searchData.classname"
                  suffix="ios-search"
                  placeholder="请输入单位分类"
                  style="width: auto"
                >
                  <Icon type="ios-search" slot="suffix" />
                </Input>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="年份" prop="datetime">
                <Col span="12">
                  <DatePicker
                    type="year"
                    format="yyyy"
                    v-model="searchData.datetime"
                    @on-change="handlerFormat"
                    placeholder="请选择年份"
                    style="width: auto"
                  ></DatePicker>
                </Col>
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
            <Button @click="submitReset('searchData')">重置搜索</Button>
          </FormItem>
        </Form>
      </Card>
    </Row>

    <!-- 表格 -->
    <Row style="margin-top:20px">
      <Card>
        <div class="btn-arrs">
          <Button type="info" v-if="btnAccess.add" @click="showUserModal">添加单位分类</Button>
          <Button
            type="primary"
            v-if="btnAccess.add"
            @click="showHeadModal"
            style="margin-left:10px;"
          >编辑权重类型</Button>
        </div>
        <Table :loading="tabelLoading" :columns="tableHead" :data="tableData" border height="500"></Table>
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
    <!-- 编辑权重类型模态框 -->
    <Modal v-model="isShowHeadModal" title="编辑权重类型" @on-cancel="cancelHeadModal" width="1000">
      <Form ref="headeForm" :model="headeForm" :label-width="150" :rules="headeFormReg">
        <Row>
          <Col span="11">
            <FormItem label="年份" prop="datetime">
              <DatePicker
                type="year"
                format="yyyy"
                @on-change="weightModalFormat"
                :value="headeForm.datetime"
                placeholder="请选择年份"
                style="width: 150px;"
              ></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <!-- ----无限增加---------- -->
        <Row>
          <Col
            span="12"
            v-for="(item, index) in headeForm.itemList"
            v-if="item.status"
            :key="index"
          >
            <Row>
              <!-- :prop="'itemList.' + index + '.weightName'"
              :rules="{required: true, message: '权重类型'  +'不能为空', trigger: 'blur'}"-->
              <Col span="15">
                <FormItem label="权重类型">
                  <Input
                    :disabled="item.id  < 5"
                    type="text"
                    v-model="item.weightName"
                    placeholder="请输入权重类型(必填)"
                  ></Input>
                </FormItem>
              </Col>

              <Col span="2" offset="2">
                <Button :disabled="item.id  < 5" type="error" @click="handleRemove(index)">删除</Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <!-- 增加按钮 -->
        <Row>
          <Col span="12" offset="3">
            <Button
              type="success"
              long
              ghost
              @click="handleAdd"
              icon="md-add"
              style="width:220px;"
            >添加选项</Button>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button size="large" @click="cancelHeadModal">取消</Button>
        <!-- 增加按钮 -->
        <Button
          v-if="!this.headeFormList.length"
          type="primary"
          size="large"
          @click="submitHeadModal1('headeForm')"
        >提交</Button>
        <!-- 修改按钮 -->
        <Button
          v-if=" this.headeFormList.length"
          type="primary"
          size="large"
          @click="submitHeadModal2('headeForm')"
        >提交</Button>
      </div>
    </Modal>

    <!-- 添加单位分类模态框 -->
    <Modal
      v-model="isUserModal"
      :title="userModalTitle"
      :loading="userModalLoading"
      @on-cancel="cancelUserModal"
      width="1000"
    >
      <Form ref="userManagement" :model="userForm" :rules="formReg" :label-width="250">
        <Row>
          <Col span="21">
            <FormItem label="单位分类" prop="classname">
              <Input v-model="userForm.classname" placeholder="请输入单位分类"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11" v-for="(itemes, index) in userForm.weightList" :key="index">
            <FormItem
              :label="itemes.weightName"
              :prop="'weightList.' + index + '.weightName'"
              :rules="{required: true, message: itemes.weightName  +'不能为空', trigger: 'blur'}"
            >
              <InputNumber :max="1000" :min="0" v-model="itemes.weight" style="width: 150px;"></InputNumber>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button size="large" @click="cancelUserModal">取消</Button>
        <Button
          type="primary"
          v-if="btnAccess.upd"
          size="large"
          :loading="userModalLoading"
          @click="submitUserModal"
        >提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { hasOneOf } from "@/libs/tools";
import { userClassificationAjax } from "@/api/systemMange";
// 删除URL
const DELETE_URL = "/departclass/delete";
// 修改URL
const UPDATE_URL = "/departclass/BeforeUpdateWeight";
// 添加单位分类URL
const INSERT_URL = "/departclass/addDepartClass";
// 查询URL
const QUERY_URL = "/departclass/queryDepartClass";
// 点击添加分类查询权重
const QUERYCLASS_URL = "/departclass/beforeAddDepartClass";
// 查询权重类型url
const QUERYHEAD_URL = "/departclass/queryHead";
// 增加权重类型表头url
const INSERTHEAD_URL = "/departclass/insertHead";
// 修改权重类型表头url
const UPDHEAD_URL = "/departclass/updateHead";

const INSERT_TITLE = "添加";
const UPDATE_TITLE = "编辑";
export default {
  data() {
    return {
      // 增删改查权限按钮
      btnAccess: {
        add: true,
        add2: "inline-block",
        del: "inline-block",
        upd: true,
        query: true
      },
      roleSelect: false, // 权限管理
      isUserModal: false, // 模态框
      searchLoading: false, // 搜索Loading
      userModalLoading: false, // 提交loading
      tabelLoading: false, // 表格loading
      userModalTitle: "", // 模态框title
      isResponsible: "",
      pageSize: 10,
      pageNumber: 1,
      pageTotal: 10,
      index: 1,
      userForm: {
        classname: "", // 分类名
        datetime: "" // 年份
      },
      searchData: {
        classname: "", // 分类名
        datetime: "" // 年份
      },
      searchReg: {},
      formReg: {
        classname: [
          {
            required: true,
            message: "请输入分类名",
            trigger: "blur"
          }
        ]
      },
      headeFormReg: {
        datetime: [
          {
            required: true,
            message: "请输入年份",
            trigger: "change",
            type: "string"
          }
        ]
      },
      // 单位分类表格表头
      tableHead: [],
      tableData: [],
      // 权重类型头部模态框
      isShowHeadModal: false,
      headeForm: {
        datetime: "",
        itemList: [
          {
            weightName: "", // 权重类型
            index: 1,
            status: 1
          }
        ],
        delList: [] // 删除的list
      },
      headeFormList: []
    };
  },
  methods: {
    // 搜索框年份
    handlerFormat(year) {
      this.searchData.datetime = year;
    },
    // 模态框年份
    modalHandleFormat(year) {
      this.userForm.datetime = year;
    },
    // 权重类型模态框
    weightModalFormat(year) {
      this.headeForm.datetime = year;
    },
    // 搜索
    searchSubmit(pageSize, pageNumber) {
      this.searchLoading = true;
      this._getClassData(this.searchData, QUERY_URL, pageSize, pageNumber);
    },
    // 重置搜索
    submitReset(name) {
      this.$refs[name].resetFields();
      this.searchLoading = false;
    },
    // 删除用户
    deleteUser(row) {
      this.$Modal.confirm({
        title: "删除此条信息",
        content: "<p>删除完成后将无法恢复</p>",
        loading: true,
        onOk: () => {
          this._userClassificationAjax(row, DELETE_URL).then(result => {
            this.$Modal.remove();
            if (result.code === "200") {
              this.$Message.info("删除成功!");
              this._getClassData(
                this.tableData,
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
      this.userModalTitle = "添加";
      this.userForm.classname = "";
      // 发送请求
      this._userClassificationAjax("", QUERYCLASS_URL).then(result => {
        if (result.code === "200") {
          this.userForm.weightList = result.results.weightList;
          this.isUserModal = true;
          this.$Message.success(result.message);
        } else {
          this.$Message.error(result.message);
        }
      });
    },
    // 单位分类提交
    submitUserModal() {
      this.$refs["userManagement"].validate(valid => {
        if (valid) {
          this.userModalLoading = true;
          if (this.userModalTitle === INSERT_TITLE) {
            this._classificationAjax(this.userForm, INSERT_URL).then(result => {
              this.isUserModal = false;
              this.userModalLoading = false;
              if (result.code === "200") {
                this.$Message.success(result.message);
                this._getClassData(
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
            this._classificationAjax(this.userForm, UPDATE_URL).then(result => {
              this.isUserModal = false;
              this.userModalLoading = false;
              if (result.code === "200") {
                this.$Message.success(result.message);
                this._getClassData(
                  this.searchData,
                  QUERY_URL,
                  this.pageSize,
                  this.pageNumber
                );
              } else {
                this.$Message.error(result.message);
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
      this.pageNumber = pageNumber;
      this._getClassData(
        this.searchData,
        QUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getClassData(
        this.searchData,
        QUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 添加/修改
    _userClassificationAjax(formData, url) {
      const keyOne = "departClassFilter";
      return new Promise((resolve, reject) => {
        userClassificationAjax({ formData, url, keyOne })
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
    // 添加/修改
    _classificationAjax(formData, url) {
      const keyOne = "departClass";
      return new Promise((resolve, reject) => {
        userClassificationAjax({ formData, url, keyOne })
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
    _getClassData(formData, url, pageSize, pageNumber) {
      this.tabelLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyOne = "departclass";
      userClassificationAjax({ formData, url, keyOne })
        .then(result => {
          this.tabelLoading = false;
          if (result.data.code === "200") {
            this.searchLoading = false;
            this.tableHead = result.data.results.tableHead;
            this.tableData = result.data.results.tableData;
            this.pageTotal = result.data.results.pageTotal;
            this.tableAction();
            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 移出权重类型
    handleRemove(index) {
      this.headeForm.itemList[index].status = 0;
      // 储存被删除的考核事项
      let items = this.headeForm.itemList[index].id;
      if (items !== undefined) {
        this.headeForm.delList.push(items);
      }
    },
    // 增加权重类型
    handleAdd() {
      this.index++;
      this.headeForm.itemList.push({
        weightName: "", // 权重类型
        index: this.index,
        status: 1
      });
    },
    showHeadModal() {
      this.isShowHeadModal = true;
      this._userClassificationAjax("", QUERYHEAD_URL).then(result => {
        if (result.code === "200") {
          let parent = result.results.list; // 选项数据
          let newList = []; // 重新组装数据
          parent.forEach(item => {
            newList.push({
              index: item.id,
              id: item.id,
              status: 1,
              weightName: item.weightName
            });
          });
          this.headeForm.itemList = newList;
          this.headeFormList = parent;
          this.headeForm.datetime = result.results.datetime;
          this.$Message.success(result.message);
        } else {
          this.$Message.error(result.message);
        }
      });
    },
    cancelHeadModal() {
      this.isShowHeadModal = false;
    },
    /**
     * @{name} form 表单name
     * 提交
     */
    submitHeadModal1(name) {
      // status为 1 的为未删除，status为 0 是已删除，只需要传未删除即可
      let arr = this.headeForm.itemList;
      let itemArr = [];
      arr.forEach(item => {
        if (item.status === 1) {
          itemArr.push(item);
        }
      });
      this.headeForm.itemList = itemArr;
      this.$refs[name].validate(valid => {
        if (valid) {
          this._userClassificationAjax(this.headeForm, INSERTHEAD_URL).then(
            result => {
              if (result.code === "200") {
                this.isShowHeadModal = false;
                this.$Message.success(result.message);
                this._getClassData(
                  this.searchData,
                  QUERY_URL,
                  this.pageSize,
                  this.pageNumber
                );
              } else {
                this.$Message.error(result.message);
              }
            }
          );
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    // 修改权重类型表头
    submitHeadModal2(name) {
      // status为 1 的为未删除，status为 0 是已删除，只需要传未删除即可
      let arr = this.headeForm.itemList;
      let itemArr = [];
      arr.forEach(item => {
        if (item.status === 1) {
          itemArr.push(item);
        }
      });
      this.headeForm.itemList = itemArr;
      this.$refs[name].validate(valid => {
        if (valid) {
          this._userClassificationAjax(this.headeForm, UPDHEAD_URL).then(
            result => {
              if (result.code === "200") {
                this.isShowHeadModal = false;
                this.$Message.success(result.message);
                this._getClassData(
                  this.searchData,
                  QUERY_URL,
                  this.pageSize,
                  this.pageNumber
                );
              } else {
                this.$Message.error(result.message);
              }
            }
          );
        } else {
          this.$Message.error("请填写完整！");
        }
      });
    },
    // 表格操作方法
    tableAction() {
      let action = {
        title: "操作",
        key: "action",
        width: 220,
        fixed: "right",
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
                    this.userForm.classname = params.row.cell0;
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
      };
      this.tableHead.push(action);
      let headArr = this.tableHead;
      // 给表头赋值宽度
      for (let i = 0; i < headArr.length - 1; i++) {
        headArr[i].width = 200;
      }
    }
  },
  mounted() {},
  created() {
    this._getClassData(
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
    },
    getDepartment() {
      return this.$store.state.user.department;
    },
    access() {
      return this.$store.state.user.access;
    }
  }
};
</script>
<style scoped>
</style>
