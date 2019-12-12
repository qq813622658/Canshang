<template>
  <div>
    <!-- 搜索栏 -->
    <Row>
      <Card>
        <Form ref="search" :model="searchData" :rules="searchReg" :label-width="80">
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户名" prop="name">
                <Input
                  v-model="searchData.userName"
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
                <Select
                  clearable
                  placeholder="请输入用户单位"
                  v-model="searchData.userDepartment"
                  style="width: 150px"
                >
                  <Option
                    v-for="item in getDepartmentList"
                    :value="item.departcode"
                    :key="item.departcode"
                  >{{ item.department }}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="用户角色" prop="name">
                <Select v-model="searchData.roleid" style="width:150px">
                  <Option
                    v-for="item in userPermissionsArr"
                    :value="item.id"
                    :key="item.id"
                  >{{item.role}}</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="职务" prop="userPosition">
                <Input
                  v-model="searchData.userPosition"
                  suffix="ios-search"
                  placeholder="请输入职务"
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

    <!-- 导入错误提示信息 -->
    <Row v-if="remindMessage.isHide">
      <Card>
        <div>
          <Alert
            banner
            closable
            type="warning"
            v-for="item1 in remindMessage.warn"
            :key="item1"
          >{{item1}}</Alert>
          <Alert
            banner
            closable
            type="error"
            v-for="item2 in remindMessage.error"
            :key="item2"
          >{{item2}}</Alert>
        </div>
      </Card>
    </Row>

    <!-- Excel导入 -->
<!--    <div style="margin-top:20px;">-->
<!--      <Card>-->
<!--        <h3>导入EXCEL</h3>-->
<!--        <div style="margin:5px 0;">* 导入用户时请先下载用户信息,参照模板导入</div>-->
<!--        <Row>-->
<!--          <i-col :xs="24" :md="8" :lg="3">-->
<!--            <Upload action :before-upload="handleBeforeUpload" accept=".xls, .xlsx">-->
<!--              <Button-->
<!--                icon="ios-cloud-upload-outline"-->
<!--                :loading="uploadLoading"-->
<!--                @click="handleUploadFile"-->
<!--              >选择文件</Button>-->
<!--            </Upload>-->
<!--          </i-col>-->
<!--          <i-col :xs="24" :md="8" :lg="3">-->
<!--            <Button type="primary" :loading="UploadLoadingBtn" @click="validationExcel">-->
<!--              <span v-if="!UploadLoadingBtn">校验文件</span>-->
<!--              <span v-else>Loading...</span>-->
<!--            </Button>-->
<!--          </i-col>-->
<!--          <i-col :xs="24" :md="8" :lg="3">-->
<!--            <Button type="primary" @click="updateExcel">导入用户</Button>-->
<!--          </i-col>-->
<!--          <i-col :xs="24" :md="8" :lg="3">-->
<!--            <Button type="success" @click="downLoadUser" style="margin:0 20px;">下载用户信息</Button>-->
<!--          </i-col>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <div class="ivu-upload-list-file" v-if="file !== null">-->
<!--            <Icon type="ios-stats"></Icon>-->
<!--            {{ file.name }}-->
<!--            <Icon-->
<!--              v-show="showRemoveFile"-->
<!--              type="ios-close"-->
<!--              class="ivu-upload-list-remove"-->
<!--              @click.native="handleRemove()"-->
<!--            ></Icon>-->
<!--          </div>-->
<!--        </Row>-->
<!--        <Row>-->
<!--          <transition name="fade">-->
<!--            <Progress v-if="showProgress" :percent="progressPercent" :stroke-width="2">-->
<!--              <div v-if="progressPercent == 100">-->
<!--                <Icon type="ios-checkmark-circle"></Icon>-->
<!--                <span>成功</span>-->
<!--              </div>-->
<!--            </Progress>-->
<!--          </transition>-->
<!--        </Row>-->
<!--      </Card>-->
<!--      <Row class="margin-top-10">-->
<!--        <Table :columns="tableTitle" :data="tableData1" :loading="tableLoading"></Table>-->
<!--      </Row>-->
<!--    </div>-->

    <!-- 表格数据 -->
    <Row style="margin-top:20px">
      <Card>
        <div class="btn-arrs">
          <Button type="info" v-if="btnAccess.add" @click="showUserModal('userForm')">添加用户</Button>
          <Button
            v-if="btnAccess.upd"
            :disabled="isSelectEdit"
            @click="showEditPermissions"
            type="primary"
            style="margin-bottom:10px"
          >批量编辑权限</Button>
          <Button
            v-if="btnAccess.upd"
            type="primary"
            @click="showEditRole"
            :disabled="isSelectEdit"
            style="margin-left:10px;margin-bottom:10px;"
          >批量编辑角色</Button>
        </div>
        <Table
          @on-selection-change="selectChange"
          :loading="tabelLoading"
          :columns="userHead"
          :data="userData"
          height="500"
        ></Table>
        <div style="margin-top:20px;text-align:center;">
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
      @on-cancel="cancelUserModal('userForm')"
      width="1000"
    >
      <Form ref="userForm" :model="userForm" :rules="userReg" :label-width="100">
        <Row>
          <Col span="11">
            <FormItem label="用户名" prop="userName" v-if="isShowForm">
              <Input v-model="userForm.userName" @on-blur="verifyRequest" placeholder="请输入用户名称"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="用户昵称" prop="nickName" v-if="isShowForm">
              <Input v-model="userForm.nickName" placeholder="请输入用户昵称"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="用户密码" prop="userPassword" v-if="isShowForm">
              <Input v-model="userForm.userPassword" type="password" placeholder="请输入用户密码"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="联系电话" prop="userPhone" v-if="isShowForm">
              <Input :number="true" v-model="userForm.userPhone" placeholder="请输入联系电话"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="用户单位" prop="departcode" v-if="isShowForm">
              <Select v-model="userForm.departcode">
                <Option
                  v-for="item in getDepartmentList"
                  :value="item.departcode"
                  :key="item.departcode"
                >{{ item.department }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="职务" prop="userPosition" v-if="isShowForm">
              <Input v-model="userForm.userPosition" type="text" placeholder="请输入职务"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="isShowPermissions ==='1'">
          <Col span="11">
            <FormItem label="角色" prop="roleid" v-if="isShowForm">
              <Select v-model="userForm.roleid" @on-change="requestPermissions">
                <Option
                  v-for="item in userPermissionsArr"
                  :value="item.id"
                  :key="item.id"
                >{{item.role}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="是否为管理员" prop="isManger" v-if="isShowForm">
              <Select v-model="userForm.isManger" placeholder="请选择是否为管理员">
                <Option value="1">是</Option>
                <Option value="0">否</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
<!--        <Row v-if="isShowPermissions==='1'">-->
<!--          <Row style="font-weight:bold;font-size:15px;margin-left:20px;">以下为自定义角色权限</Row>-->
<!--          <Row style="color:red;font-size:15px;margin-left:20px;">选择了自定义角色，用户角色将失效！</Row>-->
<!--          <FormItem label="菜单权限">-->
<!--            <div style="padding-bottom:6px;margin-bottom:6px;">-->
<!--              <Checkbox-->
<!--                :indeterminate="indeterminate"-->
<!--                :value="checkAll"-->
<!--                @click.prevent.native="handleCheckAll"-->
<!--              >全选</Checkbox>-->
<!--            </div>-->
<!--            <CheckboxGroup v-model="userForm.checkAllGroup" @on-change="checkAllGroupChange">-->
<!--              <Checkbox-->
<!--                v-for="item in this.userForm.haveRights"-->
<!--                :label="item.code+''"-->
<!--                :key="item.code"-->
<!--              >{{item.codename}}</Checkbox>-->
<!--            </CheckboxGroup>-->
<!--          </FormItem>-->
<!--&lt;!&ndash;          <FormItem label="市级指标权限">&ndash;&gt;-->
<!--&lt;!&ndash;            <div style="padding-bottom:6px;margin-bottom:6px;">&ndash;&gt;-->
<!--&lt;!&ndash;              <Checkbox&ndash;&gt;-->
<!--&lt;!&ndash;                :indeterminate="indeterminate4"&ndash;&gt;-->
<!--&lt;!&ndash;                :value="checkAll4"&ndash;&gt;-->
<!--&lt;!&ndash;                @click.prevent.native="handleCheckAll4"&ndash;&gt;-->
<!--&lt;!&ndash;              >全选</Checkbox>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash; id 数字型字符串会自动转为数字 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;            <CheckboxGroup v-model="userForm.checkCityGroup" @on-change="checkAllGroupChange4">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="index-title">市对县考核指标</div>&ndash;&gt;-->
<!--&lt;!&ndash;              <Checkbox&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="items1 in this.indexData.cityIndex"&ndash;&gt;-->
<!--&lt;!&ndash;                :label="items1.id +''"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="items1.id"&ndash;&gt;-->
<!--&lt;!&ndash;              >{{items1.indexName}}</Checkbox>&ndash;&gt;-->
<!--&lt;!&ndash;            </CheckboxGroup>&ndash;&gt;-->
<!--&lt;!&ndash;          </FormItem>&ndash;&gt;-->

<!--&lt;!&ndash;          <FormItem label="县级指标权限">&ndash;&gt;-->
<!--&lt;!&ndash;            <div style="padding-bottom:6px;margin-bottom:6px;">&ndash;&gt;-->
<!--&lt;!&ndash;              <Checkbox&ndash;&gt;-->
<!--&lt;!&ndash;                :indeterminate="indeterminate3"&ndash;&gt;-->
<!--&lt;!&ndash;                :value="checkAll3"&ndash;&gt;-->
<!--&lt;!&ndash;                @click.prevent.native="handleCheckAll3"&ndash;&gt;-->
<!--&lt;!&ndash;              >全选</Checkbox>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash; id 数字型字符串会自动转为数字 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;            <CheckboxGroup v-model="userForm.checkAllindexGroup" @on-change="checkAllGroupChange3">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="index-title">县对乡镇考核指标</div>&ndash;&gt;-->
<!--&lt;!&ndash;              <Checkbox&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="items2 in this.indexData.indexRights"&ndash;&gt;-->
<!--&lt;!&ndash;                :label="items2.id +''"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="items2.id"&ndash;&gt;-->
<!--&lt;!&ndash;              >{{items2.indexName}}</Checkbox>&ndash;&gt;-->
<!--&lt;!&ndash;            </CheckboxGroup>&ndash;&gt;-->
<!--&lt;!&ndash;          </FormItem>&ndash;&gt;-->

<!--&lt;!&ndash;          <FormItem label="单位指标权限">&ndash;&gt;-->
<!--&lt;!&ndash;            <div style="padding-bottom:6px;margin-bottom:6px;">&ndash;&gt;-->
<!--&lt;!&ndash;              <Checkbox&ndash;&gt;-->
<!--&lt;!&ndash;                :indeterminate="indeterminate5"&ndash;&gt;-->
<!--&lt;!&ndash;                :value="checkAll5"&ndash;&gt;-->
<!--&lt;!&ndash;                @click.prevent.native="handleCheckAll5"&ndash;&gt;-->
<!--&lt;!&ndash;              >全选</Checkbox>&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            &lt;!&ndash; id 数字型字符串会自动转为数字 &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;            <CheckboxGroup v-model="userForm.checkUnitGroup" @on-change="checkAllGroupChange5">&ndash;&gt;-->
<!--&lt;!&ndash;              <div class="index-title">单位考核指标</div>&ndash;&gt;-->
<!--&lt;!&ndash;              <Checkbox&ndash;&gt;-->
<!--&lt;!&ndash;                v-for="items3 in this.indexData.departIndex"&ndash;&gt;-->
<!--&lt;!&ndash;                :label="items3.id +''"&ndash;&gt;-->
<!--&lt;!&ndash;                :key="items3.id"&ndash;&gt;-->
<!--&lt;!&ndash;              >{{items3.indexName}}</Checkbox>&ndash;&gt;-->
<!--&lt;!&ndash;            </CheckboxGroup>&ndash;&gt;-->
<!--&lt;!&ndash;          </FormItem>&ndash;&gt;-->

<!--          <FormItem label="按钮权限">-->
<!--            <div style="padding-bottom:6px;margin-bottom:6px;">-->
<!--              <Checkbox-->
<!--                :indeterminate="indeterminate1"-->
<!--                :value="btnCheckall"-->
<!--                @click.prevent.native="handlebtnCheckall"-->
<!--              >全选</Checkbox>-->
<!--            </div>-->
<!--            <CheckboxGroup v-model="userForm.btnRights" @on-change="checkAllGroupChange1">-->
<!--              <Checkbox label="add">增加</Checkbox>-->
<!--              <Checkbox label="del">删除</Checkbox>-->
<!--              <Checkbox label="upd">修改</Checkbox>-->
<!--              <Checkbox label="query">查询</Checkbox>-->
<!--            </CheckboxGroup>-->
<!--          </FormItem>-->
<!--        </Row>-->
      </Form>
      <div slot="footer">
        <Button
          type="primary"
          v-if="btnAccess.upd"
          size="large"
          :loading="userModalLoading"
          @click="submitUserModal('userForm')"
        >提交</Button>
        <Button size="large" @click="cancelUserModal('userForm')">取消</Button>
      </div>
    </Modal>
    <!-- 登录次数详情模态框 -->
    <Modal v-model="isloginModal" :title="detailTitle" :width="630">
      <Row>
        <Card>
          <Table border :columns="loginDetailHead" :data="loginDetailData" height="500"></Table>
          <div style="text-align:center;">
            <Page
              @on-change="pageNumberChange2"
              @on-page-size-change="pageSizeChange2"
              :page-size="pageSize"
              :total="pageTotal"
              show-elevator
              show-sizer
            />
          </div>
        </Card>
      </Row>
      <div slot="footer">
        <Button size="large" @click="cancelLoginModal">关闭</Button>
      </div>
    </Modal>

    <!-- 批量选择角色模态框 -->
    <Modal v-model="roleModal" title="批量选择用户角色" @on-ok="submitRole" @on-cancel="cancelRoleModal">
      <Form :model="userForm">
        <FormItem label="角色">
          <Select v-model="userForm.roleid">
            <Option v-for="item in userPermissionsArr" :value="item.id" :key="item.id">{{item.role}}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import excel from "@/libs/excel";
import { hasOneOf } from "@/libs/tools";
import { URL } from "@/libs/util";
import {
  userAjax,
  loginDetailAjax,
  editorRoleAjax,
  verifyUserNameAjax,
  importUserInfotAjax,
  bulkChangeAjax,
  bathModifyRoleAjax
} from "@/api/systemMange";
// 以防命名冲突
const HOST = URL;
// 删除URL
const DELETE_URL = "/user/delete";
// 修改URL
const UPDATE_URL = "/user/update";
// 添加URL
const INSERT_URL = "/user/insert";
// 查询URL
const QUERY_URL = "/user/query";
// 登录次数模态框表格查询查询URL
const LOGINQUERY_URL = "/user/loginLog";
// 角色权限请求URL
const PERMISSION_URL = "/user/getCheckValue";
// 验证用户重复请求URL
const VERIFYUSER_URL = "/user/checkUserIsExist";
// 批量修改用户权限URL
const BULKCHANGE_URL = "/user/batchUpdateRight";
// 批量修改角色URL
const BATHROLE_URL = "/user/batchUpdRole";
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
      } else if (!PHONE_REG.test(this.userForm.userPhone)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    return {
      // 增删改查权限按钮
      btnAccess: {
        add: true,
        add2: "inline-block",
        del: "inline-block",
        upd: true,
        query: true
      },
      isSelectEdit: true, // 是否选中批量自定义
      isShowForm: true, // 点击添加或编辑是否显示input框
      isShowPermissions: "", // 是否显示权限菜单
      roleModal: false, // 角色模态框
      // 角色权限数据
      permissionsData: {
        roleid: ""
      },
      // 菜单数据
      indeterminate: true, // 负责样式控制
      checkAll: true, // 是否全选
      // 增删改查数据
      indeterminate1: true,
      btnCheckall: true,
      // 县级指标数据
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
      isloginModal: false, // 登录次数莫态框
      loginFormData: {
        userNames: "", // 用户名
        id: "" // 用户id
      }, // 登陆次数
      detailTitle: "登录次数详情",
      // 上传表格
      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData1: [],
      tableTitle: [],
      tableLoading: false,
      UploadLoadingBtn: false,
      // 登录次数详情表头
      loginDetailHead: [
        {
          title: "IP地址",
          key: "ipAddr"
        },
        {
          title: "登陆日期",
          key: "loginDate"
        },
        {
          title: "登陆时间",
          key: "loginTime"
        }
      ],
      // 登录次数详情表数据
      loginDetailData: [
        {
          ipAddr: "192.168.8.102",
          loginDate: "20190625",
          loginTime: "19:50"
        }
      ],
      isResponsible: "",
      pageSize: 40,
      pageNumber: 1,
      pageTotal: 10,
      userPermissionsArr: [], // 用户角色
      menArr: [], // 初始化时获取菜单权限
      indexAllArr: [], // 初始化所有指标集合
      userForm: {
        userName: "", // 用户名
        departcode: "", // 用户单位
        roleid: "", // 用户角色
        isManger: "", // 是否管理员
        userPhone: "", // 手机号
        userPassword: "", // 密码
        userPosition: "", // 职务
        nickName: "", // 用户昵称
        haveRights: [], // 所有菜单集合
        indexRights: [], // 所有指标集合
        checkAllGroup: [], // 所选中菜单
        checkAllindexGroup: [], // 所选中县级指标集合
        btnRights: [], // 所选中增删改查按钮权限
        checkCityGroup: [], // 所选中市级指标集合
        checkUnitGroup: [] // 所选中单位指标集合
      },
      // 指标分类数据
      indexData: {
        cityIndex: [], // 市级指标
        indexRights: [], // 县级指标
        departIndex: [] // 单位指标
      },
      searchData: {
        userName: "", // 用户名
        userDepartment: "", // 用户单位
        roleid: "", // 用户角色
        userPosition: "", // 职务
        nickName: "" // 用户昵称
      },
      searchReg: {},
      userReg: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        userDepartment: [
          {
            required: true,
            message: "请输入用户单位",
            trigger: "blur"
          }
        ],
        userPhone: [
          {
            required: true,
            message: "请输入正确的手机号码",
            validator: phoneReg,
            trigger: "blur"
          }
        ],
        userPassword: [
          {
            required: true,
            message: "请输入用户密码",
            trigger: "blur"
          }
        ],
        departcode: [
          {
            required: true,
            message: "请选择用户单位",
            trigger: "change"
          }
        ],
        isManger: [
          {
            required: true,
            message: "请选择是否为管理员",
            trigger: "change"
          }
        ]
      },
      userData: [], // 用户数据
      userHead: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "用户名",
          key: "userName"
        },
        {
          title: "用户昵称",
          key: "nickName"
        },
        {
          title: "联系电话",
          key: "userPhone"
        },
        {
          title: "用户密码",
          key: "userPassword",
          render: (h, params) => {
            return h("div", {}, "*********");
          }
        },
        {
          title: "用户单位",
          key: "userDepartment"
        },
        {
          title: "用户角色",
          key: "userPermissions"
        },
        {
          title: "职务",
          key: "userPosition"
        },
        {
          title: "登录次数",
          key: "loginTimes",
          render: (h, params) => {
            return h(
              "Button",
              {
                props: {
                  type: "default"
                },
                style: {
                  width: "60px"
                },
                on: {
                  click: () => {
                    this.isloginModal = true;
                    this.detailTitle = params.row.userName;
                    this.loginFormData = JSON.parse(JSON.stringify(params.row));
                    // 请求登录请求模态框表格
                    this._loginTableData(
                      this.loginFormData,
                      LOGINQUERY_URL,
                      this.pageSize,
                      this.pageNumber
                    );
                  }
                }
              },
              params.row.loginTimes
            );
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
                      this.userForm.haveRights = this.menArr; // 获取所有菜单值
                      this.userForm.indexRights = this.indexAllArr; // 获取指标值
                      console.log("查看行值");
                      console.log(this.userForm);
                      this.userModalTitle = "编辑用户";
                      this.isShowForm = true;
                      this.isUserModal = true;
                      // 如果编辑时候可以显示出来， 但是不可填写
                      if (!this.accessAdmin) {
                        this.roleSelect = true;
                      }
                      this.isResponsible = true;
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
      departcode: "", // 用户单位code(下载时需要的参数)
      userInfo: {}, // 上传用户信息
      // 提示信息
      remindMessage: {
        isHide: true, // 校验不合格显示
        warn: [], // 警告提示
        error: [] // 错误提示
      }
    };
  },
  methods: {
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
              this.$Message.info(result.message);
              this._getUserData(
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
    showUserModal(name) {
      this.$refs[name].resetFields();
      // 添加用户时清空选中集合
      this.userForm.checkAllGroup = [];
      this.userForm.checkAllindexGroup = [];
      this.userForm.btnRights = [];
      this.userForm.checkCityGroup = [];
      this.userForm.checkUnitGroup = [];
      // 获取菜单权限值
      this.userForm.haveRights = this.menArr;
      // 获取指标值
      this.userForm.indexRights = this.indexAllArr;
      this.userModalTitle = "添加用户";
      this.isUserModal = true;
      this.roleSelect = false;
      this.isShowForm = true;
    },
    // 显示批量自定义用户权限框
    showEditPermissions() {
      // 添加用户时清空选中集合
      this.userForm.checkAllGroup = [];
      this.userForm.checkAllindexGroup = [];
      this.userForm.btnRights = [];
      this.userForm.checkCityGroup = [];
      this.userForm.checkUnitGroup = [];
      // 获取菜单权限值
      this.userForm.haveRights = this.menArr;
      // 获取指标值
      this.userForm.indexRights = this.indexAllArr;
      this.userModalTitle = "批量自定义用户权限";
      this.isUserModal = true;
      this.isShowForm = false;
    },
    // 显示批量用户角色
    showEditRole() {
      this.userForm.roleid = "";
      this.roleModal = true;
    },
    // 批量用户表勾选
    selectChange(selection) {
      let arr = []; // 用户id
      selection.forEach(item => {
        arr.push(item.id);
      });
      this.selectArrr = arr;
      if (this.selectArrr.length === 0) {
        this.isSelectEdit = true;
      } else {
        this.isSelectEdit = false;
      }
      this.userForm.ids = this.selectArrr;
    },
    // 批量修改用户权限
    _sendRightsData(formData, url) {
      const keyOne = "userFilter";
      bulkChangeAjax({ formData, url, keyOne })
        .then(result => {
          this.userModalLoading = true;
          if (result.data.code === "200") {
            // 批量改完重新更新表格数据
            this._getUserData(
              this.searchData,
              QUERY_URL,
              this.pageSize,
              this.pageNumber
            );
            this.userModalLoading = false;
            this.isUserModal = false;
            this.$Message.success(res.data.message);
          } else {
            this.$Message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 用户角色模态框事件
    _bathModifyRoleData(formData, url) {
      const keyOne = "userFilter";
      bathModifyRoleAjax({ formData, url, keyOne })
        .then(result => {
          if (result.data.code === "200") {
            // 批量改完重新更新表格数据
            this._getUserData(
              this.searchData,
              QUERY_URL,
              this.pageSize,
              this.pageNumber
            );
            this.roleModal = false;
            this.$Message.success(result.data.message);
          } else {
            this.$Message.error(result.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitRole() {
      this._bathModifyRoleData(this.userForm, BATHROLE_URL);
      this.roleModal = false;
    },
    cancelRoleModal() {
      this.roleModal = false;
    },
    // 提交
    submitUserModal(name) {
      if (this.userModalTitle === "批量自定义用户权限") {
        this._sendRightsData(this.userForm, BULKCHANGE_URL);
        return;
      }
      this.$refs["userForm"].validate(valid => {
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
                this.$Message.error("添加失败！");
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
    cancelUserModal(name) {
      this.$refs[name].resetFields();
      this.userModalLoading = false;
      this.isUserModal = false;
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
    // 添加/修改
    _userAjax(formData, url) {
      const keyOne = "userEntity";
      return new Promise((resolve, reject) => {
        userAjax({ formData, url, keyOne })
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
      const keyOne = "userFilter";
      userAjax({ formData, url, keyOne })
        .then(result => {
          this.tabelLoading = false;
          if (result.data.code === "200") {
            this.searchLoading = false;
            let item = result.data.results;
            this.userData = item.list; // 用户数据
            this.pageTotal = item.pageTotal; // 总条数
            this.userPermissionsArr = item.roles; // 用户角色
            this.userForm.haveRights = item.haveRights; // 菜单权限
            this.menArr = item.haveRights; // 菜单权限值
            this.indexAllArr = item.indexRights; // 指标值
            this.isShowPermissions = item.isManager; // 是否显示权限值

            this.indexData.cityIndex = item.cityIndex; // 赋值市级指标
            this.indexData.indexRights = item.indexRights; // 赋值县级指标
            this.indexData.departIndex = item.departIndex; // 赋值单位指标

            this.departcode = item.departcode; // 下载所需的单位code参数

            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 关闭详情模态框
    cancelLoginModal() {
      this.isloginModal = false;
    },
    // 页码
    pageNumberChange2(pageNumber) {
      this.pageNumber = pageNumber;
      this._loginTableData(
        this.loginFormData,
        LOGINQUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 页数
    pageSizeChange2(pageSize) {
      this.pageSize = pageSize;
      this._loginTableData(
        this.loginFormData,
        LOGINQUERY_URL,
        this.pageSize,
        this.pageNumber
      );
    },
    // 登录次数模态框表格查询
    _loginTableData(formData, url, pageSize, pageNumber) {
      this.tabelLoading = true;
      formData = Object.assign(formData, {
        pageSize,
        pageNumber
      });
      const keyOne = "userFilter";
      loginDetailAjax({ formData, url, keyOne })
        .then(result => {
          this.tabelLoading = false;
          if (result.data.code === "200") {
            this.loginDetailData = result.data.results.list;
            this.pageTotal = result.data.results.pageTotal;
            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 请求角色权限
    requestPermissions() {
      this._getEditorRoleData(this.userForm, PERMISSION_URL);
    },
    _getEditorRoleData(formData, url) {
      const keyOne = "userEntity";
      editorRoleAjax({ formData, url, keyOne })
        .then(result => {
          // 用户角色为空时，保留上次的数据不重新赋值
          if (this.userForm.roleid === undefined) {
            return;
          }
          if (result.data.code === "200") {
            let item = result.data.results;
            this.userForm.btnRights = item.btnRight; // 赋值按钮权限
            this.userForm.checkAllindexGroup = item.checkAllindexGroup; // 赋值县指标权限
            this.userForm.checkAllGroup = item.roleRight; // 赋值菜单权限
            this.userForm.checkCityGroup = item.checkCityGroup; // 赋值单位指标
            this.userForm.checkUnitGroup = item.checkUnitGroup; // 赋值市级指标

            this.$Message.success("查询成功");
          } else {
            this.$Message.error("查询失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 验证方法
    verifyRequest() {
      this._verifyUserNameData(this.userForm, VERIFYUSER_URL);
    },
    // 验证用户名是否重复
    _verifyUserNameData(formData, url) {
      const keyOne = "userFilter";
      verifyUserNameAjax({ formData, url, keyOne })
        .then(result => {
          if (result.data.results.success === false) {
            this.$Notice.error({
              title: result.data.results.msg,
              duration: 3.5
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 菜单方法
    handleCheckAll() {
      this.userForm.roleid = "";
      let menuCodeArrs = []; // 全选菜单的code集合
      for (let i = 0; i < this.userForm.haveRights.length; i++) {
        let item = this.userForm.haveRights[i].code;
        menuCodeArrs.push(item + ""); // 需要转为字符串
      }
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.userForm.checkAllGroup = menuCodeArrs;
      } else {
        this.userForm.checkAllGroup = [];
      }
    },
    // 菜单
    checkAllGroupChange(data) {
      this.userForm.roleid = "";
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
    // 县级指标权限
    handleCheckAll3() {
      this.userForm.roleid = "";
      let indexArrs = [];
      for (let i = 0; i < this.indexAllArr.length; i++) {
        let item = this.indexAllArr[i].id;
        indexArrs.push(item + ""); // 需要转为字符串
      }
      if (this.indeterminate3) {
        this.checkAll3 = false;
      } else {
        this.checkAll3 = !this.checkAll3;
      }
      this.indeterminate3 = false;

      if (this.checkAll3) {
        this.userForm.checkAllindexGroup = indexArrs;
      } else {
        this.userForm.checkAllindexGroup = [];
      }
    },
    checkAllGroupChange3(data) {
      this.userForm.roleid = "";
      let indexLength = this.indexAllArr.length;
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
      this.userForm.roleid = "";
      let cityArrs = [];
      for (let i = 0; i < this.indexData.cityIndex.length; i++) {
        let item = this.indexData.cityIndex[i].id;
        cityArrs.push(item + ""); // 需要转为字符串
      }
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
      this.userForm.roleid = "";
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
      this.userForm.roleid = "";
      let unitArrs = [];
      for (let i = 0; i < this.indexData.departIndex.length; i++) {
        let item = this.indexData.departIndex[i].id;
        unitArrs.push(item + ""); // 需要转为字符串
      }
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
      this.userForm.roleid = "";
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
      this.userForm.roleid = "";
      if (this.indeterminate1) {
        this.btnCheckall = false;
      } else {
        this.btnCheckall = !this.btnCheckall;
      }
      this.indeterminate1 = false;

      if (this.btnCheckall) {
        this.userForm.btnRights = ["add", "del", "upd", "query"];
      } else {
        this.userForm.btnRights = [];
      }
    },
    checkAllGroupChange1(data) {
      this.userForm.roleid = "";
      if (data.length === 4) {
        this.indeterminate1 = false;
        this.btnCheckall = true;
      } else if (data.length > 0) {
        this.indeterminate1 = true;
        this.btnCheckall = false;
      } else {
        this.indeterminate1 = false;
        this.btnCheckall = false;
      }
    },
    // 上传文件
    // Excel导入
    initUpload() {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData1 = [];
      this.tableTitle = [];
    },
    // 点击上传触发函数
    handleUploadFile() {
      this.initUpload();
    },
    // 删除Excel
    handleRemove() {
      this.initUpload();
      this.$Message.info("上传的文件已删除！");
    },
    handleBeforeUpload(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "xlsx" || fileExt === "xls") {
        this.readFile(file);
        this.file = file;
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" +
            file.name +
            "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。"
        });
      }
      return false;
    },
    // 读取文件
    readFile(file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadstart = e => {
        this.uploadLoading = true;
        this.tableLoading = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error("文件读取出错");
      };
      reader.onload = e => {
        this.$Message.info("文件读取成功");
        const data = e.target.result;
        var { header, results } = excel.read(data, "array");
        header = header.slice(0, 27);
        var tableTitle = header.map((item, i) => {
          return { title: results[0][item], key: item };
        });
        // 验证表头
        const regExcel = err => {
          this.$Notice.error({
            title: "Excel格式错误",
            desc: 'Excel："' + err + '"   格式错误,请核对Excel模块。'
          });
          results = ""; // 表内容
          tableTitle = ""; // 表头
          this.uploadLoading = false;
          this.tableLoading = false;
          this.showRemoveFile = true;
        };

        // 截取有效数据
        this.tableData1 = results.slice(1);
        this.tableTitle = tableTitle;
        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;
        // console.log(this.tableData1);
      };
    },
    validationExcel() {
      this.UploadLoadingBtn = true;
      if (!this.tableData1.length) {
        this.$Message.error("请选择上传文件");
        this.UploadLoadingBtn = false;
        return;
      }
      this.userInfo = { list: [] }; // 指标
      let userList = {};
      userList["listUser"] = [];
      for (let i = 0; i < this.tableData1.length; i++) {
        let data1 = {
          id: this.tableData1[i]["id"],
          userName: this.tableData1[i]["userName"],
          nickName: this.tableData1[i]["nickName"],
          userPassword: this.tableData1[i]["userPassword"],
          department: this.tableData1[i]["department"],
          roleName: this.tableData1[i]["roleName"],
          roleId: this.tableData1[i]["roleId"],
          isManage: this.tableData1[i]["isManage"],
          userPosition: this.tableData1[i]["userPosition"],
          userPhone: this.tableData1[i]["userPhone"]
        };
        userList["listUser"].push(data1);
      }
      // 根据后端要求 用户EXCEL上传的数据放在LIST里面
      this.userInfo["list"].push(userList);
      this.userInfo.checkCode = "0"; // 0 为校验，1 为上传
      this._importUserData(this.userInfo).then(res => {
        this.UploadLoadingBtn = false;
        let item = res.results;
        // 没有错误和警告就隐藏
        if (item.warn.length === 0 && item.error.length === 0) {
          this.remindMessage.isHide = false;
        } else {
          this.remindMessage.isHide = true;
        }
        if (res.code === "200") {
          this.$Notice.success({
            title: res.message,
            duration: 5
          });

          this.remindMessage.warn = item.warn;
          this.remindMessage.error = item.error;
          console.log(this.remindMessage);
        } else {
          this.$Notice.error({
            title: res.message,
            duration: 5
          });
        }
      });
    },
    updateExcel() {
      this.userInfo.checkCode = "1"; // 0 为校验，1 为上传
      this._importUserData(this.userInfo).then(res => {
        this.tableData1 = [];
        this.tableTitle = [];
        if (res.code === "200") {
          this.remindMessage.isHide = false;
          this.userInfo.list[0].listUser = []; // 上传成功清空excel表格数据防止重新提交
          this.$Notice.success({
            title: res.message,
            duration: 5
          });
          // 上传成功重新查询用户信息
          this._getUserData(
            this.searchData,
            QUERY_URL,
            this.pageSize,
            this.pageNumber
          );
        } else {
          this.$Notice.error({
            title: res.message,
            duration: 5
          });
          this.tableData1 = [];
          this.tableTitle = [];
        }
      });
    },
    _importUserData(formData) {
      const url = "/user/batchImportUser";
      const keyOne = "userEntity";
      return new Promise((resolve, reject) => {
        importUserInfotAjax({ formData, url, keyOne }).then(res => {
          if (res.data.code === "200") {
            resolve(res.data);
          } else {
            reject(eer);
          }
        });
      });
    },
    /**
     *下载用户信息
     */
    downLoadUser() {
      window.open(HOST + "/user/exportUser?departcode=" + this.departcode);
    }
  },
  mounted() {},
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
