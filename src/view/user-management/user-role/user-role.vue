<template>
  <div>
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="角色名" prop="role">
                <Input
                  v-model="searchData.role"
                  suffix="ios-search"
                  placeholder="请输入角色名称"
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
    <Row style="margin-top:20px">
      <Card>
        <div class="btn-arrs">
          <Button type="info" v-if="btnAccess.add" @click="showModal">添加角色</Button>
        </div>
        <Table border :loading="tabelLoading" :columns="userHead" :data="userData" height="500"></Table>
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
    <!-- 添加角色/编辑角色 -->
    <Modal
      v-model="isUserModal"
      :title="userModalTitle"
      :loading="userModalLoading"
      @on-cancel="cancelUserModal"
      width="1000px"
    >
      <Form ref="userManagement" :model="userForm" :rules="userReg" :label-width="100">
        <Row>
          <Col span="11">
            <FormItem label="角色" prop="role">
              <Input v-model="userForm.role" placeholder="请输入角色"></Input>
            </FormItem>
          </Col>
          <!-- <Col span="11">
            <FormItem label="是否为管理员" prop="isManger">
              <Select v-model="userForm.isManger" placeholder="请选择是否为管理员">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
            </FormItem>
          </Col>-->
        </Row>

        <FormItem label="菜单权限">
          <div style="padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll"
            >全选</Checkbox>
          </div>
          <CheckboxGroup v-model="userForm.checkAllGroup" @on-change="checkAllGroupChange">
            <Checkbox
              v-for="item in this.userForm.haveRights"
              :label="item.code+''"
              :key="item.code"
            >{{item.codename}}</Checkbox>
          </CheckboxGroup>
        </FormItem>

<!--        <FormItem label="市级指标权限">-->
<!--          <div style="padding-bottom:6px;margin-bottom:6px;">-->
<!--            <Checkbox-->
<!--              :indeterminate="indeterminate4"-->
<!--              :value="checkAll4"-->
<!--              @click.prevent.native="handleCheckAll4"-->
<!--            >全选</Checkbox>-->
<!--          </div>-->
<!--          &lt;!&ndash; id 数字型字符串会自动转为数字 &ndash;&gt;-->
<!--          <CheckboxGroup v-model="userForm.checkCityGroup" @on-change="checkAllGroupChange4">-->
<!--            <div class="index-title">市对县考核指标</div>-->
<!--            <Checkbox-->
<!--              v-for="items1 in this.indexData.cityIndex"-->
<!--              :label="items1.id +''"-->
<!--              :key="items1.id"-->
<!--            >{{items1.indexName}}</Checkbox>-->
<!--          </CheckboxGroup>-->
<!--        </FormItem>-->

<!--        <FormItem label="县指标权限">-->
<!--          <div style="padding-bottom:6px;margin-bottom:6px;">-->
<!--            <Checkbox-->
<!--              :indeterminate="indeterminate3"-->
<!--              :value="checkAll3"-->
<!--              @click.prevent.native="handleCheckAll3"-->
<!--            >全选</Checkbox>-->
<!--          </div>-->
<!--          &lt;!&ndash; id 数字型字符串会自动转为数字 &ndash;&gt;-->
<!--          <CheckboxGroup v-model="userForm.checkAllindexGroup" @on-change="checkAllGroupChange3">-->
<!--            <div class="index-title">县对乡镇考核指标</div>-->
<!--            <Checkbox-->
<!--              v-for="items2 in this.indexData.indexRights"-->
<!--              :label="items2.id +''"-->
<!--              :key="items2.id"-->
<!--            >{{items2.indexName}}</Checkbox>-->
<!--          </CheckboxGroup>-->
<!--        </FormItem>-->

<!--        <FormItem label="单位指标权限">-->
<!--          <div style="padding-bottom:6px;margin-bottom:6px;">-->
<!--            <Checkbox-->
<!--              :indeterminate="indeterminate5"-->
<!--              :value="checkAll5"-->
<!--              @click.prevent.native="handleCheckAll5"-->
<!--            >全选</Checkbox>-->
<!--          </div>-->
<!--          &lt;!&ndash; id 数字型字符串会自动转为数字 &ndash;&gt;-->
<!--          <CheckboxGroup v-model="userForm.checkUnitGroup" @on-change="checkAllGroupChange5">-->
<!--            <div class="index-title">单位考核指标</div>-->
<!--            <Checkbox-->
<!--              v-for="items3 in this.indexData.departIndex"-->
<!--              :label="items3.id +''"-->
<!--              :key="items3.id"-->
<!--            >{{items3.indexName}}</Checkbox>-->
<!--          </CheckboxGroup>-->
<!--        </FormItem>-->

        <FormItem label="按钮权限">
          <div style="padding-bottom:6px;margin-bottom:6px;">
            <Checkbox
              :indeterminate="indeterminate1"
              :value="btnCheckall"
              @click.prevent.native="handlebtnCheckall"
            >全选</Checkbox>
          </div>
          <CheckboxGroup v-model="userForm.btnRights" @on-change="checkAllGroupChange1">
            <Checkbox label="add">增加</Checkbox>
            <Checkbox label="del">删除</Checkbox>
            <Checkbox label="upd">修改</Checkbox>
            <Checkbox label="query">查询</Checkbox>
          </CheckboxGroup>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          v-if="btnAccess.upd"
          size="large"
          :loading="userModalLoading"
          @click="submitUserModal"
        >提交</Button>
        <Button size="large" @click="cancelUserModal">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { hasOneOf } from "@/libs/tools";
import { roleMangeAjax } from "@/api/systemMange";
// 删除URL
const DELETE_URL = "/userRole/delete";
// 修改URL
const UPDATE_URL = "/userRole/update";
// 添加URL
const INSERT_URL = "/userRole/insert";
// 查询URL
const QUERY_URL = "/userRole/query";
// 手机验证
const PHONE_REG = new RegExp("^1(3|4|5|7|8)\\d{9}$");
const INSERT_TITLE = "添加角色";
const UPDATE_TITLE = "编辑角色";
export default {
  data() {
    // 验证手机号码
    // const phoneReg = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入联系电话"));
    //   } else if (!PHONE_REG.test(this.userForm.userPhone)) {
    //     callback(new Error("请输入正确的手机号码"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      // 增删改查权限按钮
      btnAccess: {
        add: true,
        add2: "inline-block",
        del: "inline-block",
        upd: true,
        query: true
      },
      // 菜单数据
      indeterminate: true, // 负责样式控制
      checkAll: true, // 是否全选
      // 增删改查数据
      indeterminate1: true,
      btnCheckall: true,
      // 县指标数据
      indeterminate3: true,
      checkAll3: true,
      // 市指标数据
      indeterminate4: true,
      checkAll4: true,
      // 单位指标数据
      indeterminate5: true,
      checkAll5: true,
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
      menArr: [], // 初始化时获取菜单权限
      indexAllArr: [], // 初始化所有县指标集合
      userForm: {
        role: "", // 角色
        checkAllGroup: [], // 所选中菜单
        haveRights: [], // 所选中菜单集合
        btnRights: [], // 所选中增删改查按钮权限
        checkAllindexGroup: [], // 所选中县级指标集合

        checkCityGroup: [], // 所选中市级指标集合

        checkUnitGroup: [], // 所选中单位指标集合

        indexRights: [], // 所有指标集合
        isManger: "" // 是否管理员
      },
      // 指标分类数据
      indexData: {
        cityIndex: [], // 市级指标
        indexRights: [], // 县级指标
        departIndex: [] // 单位指标
      },
      searchData: {
        role: "", // 角色
        roleRight: "" // 角色权限
      },
      userReg: {
        role: [
          {
            required: true,
            message: "请输入选择用户",
            trigger: "blur"
          }
        ]
        // isManger: [
        //   {
        //     required: true,
        //     message: "请选择是否为管理员",
        //     trigger: "change"
        //   }
        // ]
      },
      userData: [
        {
          // userName: "111",
          // userPassword: "111",
          // userDepartment: "user",
          // userPermissions: "111"
        }
      ],
      userHead: [
        {
          title: "角色名",
          key: "role"
        },
        {
          title: "操作",
          key: "action",
          width: 250,
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
                      this.userForm.haveRights = this.menArr; // 获取所有菜单值
                      this.userForm.indexRights = this.indexAllArr; // 获取指标值
                      console.log("查看行值");
                      console.log(this.userForm);
                      this.userModalTitle = "编辑角色";
                      this.isUserModal = true;
                    }
                  }
                },
                "查看或编辑权限"
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
      ]
    };
  },
  methods: {
    // 搜索
    searchSubmit(pageSize, pageNumber) {
      this.searchLoading = true;
      this._getData(this.searchData, QUERY_URL, pageSize, pageNumber);
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
      if (this.accessAgent) {
        this.$Message.error("权限不足！");
        return;
      }
      this.$Modal.confirm({
        title: "删除用户",
        content: "<p>删除完成后将无法恢复</p>",
        loading: true,
        onOk: () => {
          this._addOrupdate(row, DELETE_URL).then(result => {
            this.$Modal.remove();
            if (result.code === "200") {
              this.$Message.info("删除成功!");
              this._getData(
                this.userData,
                QUERY_URL,
                this.pageSize,
                this.pageNumber
              );
            } else {
              this.$Message.error(result.message);
            }
          });
        }
      });
    },
    // 显示模态框
    showModal() {
      // 获取菜单权限值
      this.userForm.haveRights = this.menArr;
      // 获取县级指标值
      this.userForm.indexRights = this.indexAllArr;
      this.userModalTitle = "添加角色";
      this.isUserModal = true;
      this.roleSelect = false;
    },
    // 提交
    submitUserModal() {
      this.$refs["userManagement"].validate(valid => {
        if (valid) {
          this.userModalLoading = true;
          if (this.userModalTitle === INSERT_TITLE) {
            this._addOrupdate(this.userForm, INSERT_URL).then(result => {
              this.isUserModal = false;
              this.userModalLoading = false;
              console.log(result);
              if (result.code === "200") {
                this.$Message.success("添加成功！");
                this._getData(
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
            this._addOrupdate(this.userForm, UPDATE_URL).then(result => {
              this.isUserModal = false;
              this.userModalLoading = false;
              if (result.code === "200") {
                this.$Message.success("修改成功");
                this._getData(
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
        userName: "", // 角色名
        userDepartment: "", // 用户单位
        userPermissions: "", // 角色权限
        userPhone: "", // 手机号
        userPassword: "" // 密码
      };
    },
    // 页码
    pageNumberChange(pageNumber) {
      this.pageNumber = pageNumber;
      this._getData(this.searchData, QUERY_URL, this.pageSize, this.pageNumber);
    },
    // 页数
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this._getData(this.searchData, QUERY_URL, this.pageSize, this.pageNumber);
    },
    // 添加/修改
    _addOrupdate(formData, url) {
      const keyOne = "rolePerEntity";
      return new Promise((resolve, reject) => {
        roleMangeAjax({ formData, url, keyOne })
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
    _getData(formData, url, pageSize, pageNumber) {
      this.tabelLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyOne = "rolePerFilter";
      roleMangeAjax({ formData, url, keyOne })
        .then(result => {
          this.tabelLoading = false;
          if (result.data.code === "200") {
            let item = result.data.results;
            this.searchLoading = false;
            this.userData = item.list;
            this.userForm.haveRights = item.haveRights;
            this.pageTotal = item.pageTotal;
            this.menArr = item.haveRights; // 菜单权限值
            this.indexAllArr = item.indexRights; // 县指标值

            this.indexData.indexRights = item.indexRights; // 赋值县级指标
            this.indexData.cityIndex = item.cityIndex; // 赋值市级指标
            this.indexData.departIndex = item.departIndex; // 赋值单位指标
            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 菜单方法
    handleCheckAll() {
      let menuCodeArrs = []; // 全选菜单的code集合
      for (let i = 0; i < this.userForm.haveRights.length; i++) {
        let item = this.userForm.haveRights[i].code;
        menuCodeArrs.push(item + ""); // 需要转为字符串
      }
      console.log(menuCodeArrs);
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.userForm.checkAllGroup = menuCodeArrs;
        console.log(this.userForm.checkAllGroup);
      } else {
        this.userForm.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      console.log(data);
      console.log(this.userForm.checkAllGroup);
      let menLength = this.userForm.haveRights.length;
      if (data.length === menLength) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    // 县指标权限
    handleCheckAll3() {
      let indexArrs = [];
      for (let i = 0; i < this.indexAllArr.length; i++) {
        let item = this.indexAllArr[i].id;
        indexArrs.push(item + ""); // 需要转为字符串
      }
      console.log(indexArrs);
      if (this.indeterminate3) {
        this.checkAll3 = false;
      } else {
        this.checkAll3 = !this.checkAll3;
      }
      this.indeterminate3 = false;

      if (this.checkAll3) {
        this.userForm.checkAllindexGroup = indexArrs;
        console.log(this.userForm.checkAllindexGroup);
      } else {
        this.userForm.checkAllindexGroup = [];
      }
    },
    checkAllGroupChange3(data) {
      let indexLength = this.indexAllArr.length;
      console.log(data);
      console.log(this.userForm.checkAllindexGroup);
      if (data.length === indexLength) {
        this.indeterminate3 = false;
        this.checkAll3 = true;
      } else if (data.length > 0) {
        this.indeterminate3 = true;
        this.checkAll3 = false;
      } else {
        this.indeterminate3 = false;
        this.checkAll3 = false;
      }
    },
    // 市指标权限
    handleCheckAll4() {
      let cityArrs = [];
      for (let i = 0; i < this.indexData.cityIndex.length; i++) {
        let item = this.indexData.cityIndex[i].id;
        cityArrs.push(item + ""); // 需要转为字符串
      }
      console.log(cityArrs);
      if (this.indeterminate4) {
        this.checkAll4 = false;
      } else {
        this.checkAll4 = !this.checkAll4;
      }
      this.indeterminate4 = false;

      if (this.checkAll4) {
        this.userForm.checkCityGroup = cityArrs;
      } else {
        this.userForm.checkCityGroup = [];
      }
    },
    checkAllGroupChange4(data) {
      let indexLength = this.indexData.cityIndex.length;
      if (data.length === indexLength) {
        this.indeterminate4 = false;
        this.checkAll4 = true;
      } else if (data.length > 0) {
        this.indeterminate4 = true;
        this.checkAll4 = false;
      } else {
        this.indeterminate4 = false;
        this.checkAll4 = false;
      }
    },

    // 单位指标权限
    handleCheckAll5() {
      let unitArrs = [];
      for (let i = 0; i < this.indexData.departIndex.length; i++) {
        let item = this.indexData.departIndex[i].id;
        unitArrs.push(item + ""); // 需要转为字符串
      }
      console.log(unitArrs);
      if (this.indeterminate5) {
        this.checkAll5 = false;
      } else {
        this.checkAll5 = !this.checkAll5;
      }
      this.indeterminate5 = false;

      if (this.checkAll5) {
        this.userForm.checkUnitGroup = unitArrs;
        console.log(this.userForm.checkUnitGroup);
      } else {
        this.userForm.checkUnitGroup = [];
      }
    },
    checkAllGroupChange5(data) {
      let indexLength = this.indexData.departIndex.length;
      console.log(data);
      console.log(this.userForm.checkUnitGroup);
      if (data.length === indexLength) {
        this.indeterminate5 = false;
        this.checkAll5 = true;
      } else if (data.length > 0) {
        this.indeterminate5 = true;
        this.checkAll5 = false;
      } else {
        this.indeterminate5 = false;
        this.checkAll5 = false;
      }
    },
    // 增删改查方法
    handlebtnCheckall() {
      if (this.indeterminate1) {
        this.btnCheckall = false;
      } else {
        this.btnCheckall = !this.btnCheckall;
      }
      this.indeterminate1 = false;

      if (this.btnCheckall) {
        console.log(this.btnCheckall);

        this.userForm.btnRights = ["add", "del", "upd", "query"];
        console.log(this.userForm.btnRights);
      } else {
        this.userForm.btnRights = [];
      }
    },
    checkAllGroupChange1(data) {
      console.log(this.userForm.btnRights);
      if (data.length === 4) {
        console.log(11);
        this.indeterminate1 = false;
        this.btnCheckall = true;
      } else if (data.length > 0) {
        this.indeterminate1 = true;
        this.btnCheckall = false;
      } else {
        this.indeterminate1 = false;
        this.btnCheckall = false;
      }
    }
  },
  mounted() {},
  created() {
    this._getData(this.searchData, QUERY_URL, this.pageSize, this.pageNumber);
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
.index-title {
  font-size: 14px;
  font-weight: bold;
}
</style>
