<template>
  <div>
    <Row>
      <Card>
        <Form ref="formData3" :model="formData3" :label-width="100">
          <Row style="margin:15px 0;">
            <h3>当前考核年份</h3>
          </Row>
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem prop="startTime" label="当前考核年份">
                <DatePicker
                  type="year"
                  format="yyyy"
                  v-model="formData3.startTime"
                  @on-change="handlerFormat"
                  placeholder="请选择年份"
                ></DatePicker>
              </FormItem>
            </i-col>

            <i-col :xs="24" :md="12" :lg="6">
              <FormItem>
                <Button v-if="btnAccess.upd" type="primary" @click="handleSubmit('当前考核年份')">提交</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </Card>
      <!-- 县对乡镇 -->
      <Card>
        <Form ref="formData1" :model="formData1" :rules="formReg" :label-width="80">
          <Row style="margin:15px 0;">
            <h3>县对乡镇指标填写时间</h3>
          </Row>
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="当月" prop="startTime">
                <InputNumber
                  placeholder="请选择"
                  :max="31"
                  :min="1"
                  v-model="formData1.startTime"
                  style="width:200px;"
                ></InputNumber>&nbsp;&nbsp;&nbsp;号
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem prop="isThisMonth" label="至">
                <Select v-model="formData1.isThisMonth" style="width:200px;">
                  <Option value="1">当月</Option>
                  <Option value="2">次月</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem prop="endTime">
                <InputNumber
                  placeholder="请选择"
                  :max="31"
                  :min="1"
                  v-model="formData1.endTime"
                  style="width:200px;"
                ></InputNumber>&nbsp;&nbsp;&nbsp;号
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem>
                <Button v-if="btnAccess.upd" type="primary" @click="handleSubmit('县对乡')">提交</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </Card>
      <!-- 市对县 -->
      <Card>
        <Form ref="formData2" :model="formData2" :rules="formReg2" :label-width="80">
          <Row style="margin:15px 0;">
            <h3>市对县指标填写时间</h3>
          </Row>
          <Row>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem label="当月" prop="startTime">
                <InputNumber
                  placeholder="请选择"
                  :max="31"
                  :min="1"
                  v-model="formData2.startTime"
                  style="width:200px;"
                ></InputNumber>&nbsp;&nbsp;&nbsp;号
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem prop="isThisMonth" label="至">
                <Select v-model="formData2.isThisMonth" style="width:200px;">
                  <Option value="1">当月</Option>
                  <Option value="2">次月</Option>
                </Select>
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem prop="endTime">
                <InputNumber
                  placeholder="请选择"
                  :max="31"
                  :min="1"
                  v-model="formData2.endTime"
                  style="width:200px;"
                ></InputNumber>&nbsp;&nbsp;&nbsp;号
              </FormItem>
            </i-col>
            <i-col :xs="24" :md="12" :lg="6">
              <FormItem>
                <Button v-if="btnAccess.upd" type="primary" @click="handleSubmit('市对县')">提交</Button>
              </FormItem>
            </i-col>
          </Row>
        </Form>
      </Card>
    </Row>
  </div>
</template>
<script>
// import { hasOneOf } from "@/libs/tools";
import { setTimeAjax, queryTimeAjax } from "@/api/systemMange";

// 设置时间URL
const SETTIME_URL = "/setTime/update";
// 查询设置时间
const QUERY_URL = "/setTime/select";
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
      // 县对乡数据
      formData1: {
        indexClass: "1", // 标识code
        startTime: null, // 当月时间
        endTime: null, // 次月或当月时间
        isThisMonth: "" // 当月或次月
      },
      // 市对县数据
      formData2: {
        indexClass: "2", // 标识code
        startTime: null, // 当月时间
        endTime: null, // 次月或当月时间
        isThisMonth: "" // 当月或次月
      },
      // 当前考核年份
      formData3: {
        indexClass: "3", // 标识code
        startTime: ""
      },
      // 表单验证
      formReg: {
        startTime: [
          {
            type: "number",
            required: true,
            message: "请输入时间",
            trigger: "blur"
          }
        ],
        isThisMonth: [
          {
            type: "string",
            required: true,
            message: "请选择当月或次月",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "number",
            required: true,
            message: "请输入时间",
            trigger: "blur"
          }
        ]
      },
      formReg2: {
        startTime: [
          {
            type: "number",
            required: true,
            message: "请输入时间",
            trigger: "blur"
          }
        ],
        isThisMonth: [
          {
            type: "string",
            required: true,
            message: "请选择当月或次月",
            trigger: "change"
          }
        ],
        endTime: [
          {
            type: "number",
            required: true,
            message: "请输入时间",
            trigger: "blur"
          }
        ]
      },
      formReg3: {
        startTime: [
          {
            type: "date",
            required: true,
            message: "请输入时间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 年份选择框
    handlerFormat(year) {
      this.formData3.startTime = year;
    },
    // 提交按钮
    handleSubmit(params) {
      console.log(params);
      if (params === "县对乡") {
        this.$refs["formData1"].validate(valid => {
          if (valid) {
            this._handInData(this.formData1, SETTIME_URL);
          } else {
            this.$Message.error("请填写完整");
          }
        });
      } else if (params === "市对县") {
        this.$refs["formData2"].validate(valid => {
          if (valid) {
            this._handInData(this.formData2, SETTIME_URL);
          } else {
            this.$Message.error("请填写完整");
          }
        });
      } else if (params === "当前考核年份") {
        this.$refs["formData3"].validate(valid => {
          if (valid) {
            this._handInData(this.formData3, SETTIME_URL);
          } else {
            this.$Message.error("请填写完整");
          }
        });
      }
    },

  },
  created() {
    this._queryData(this.formData1, QUERY_URL, "县对乡");
    this._queryData(this.formData2, QUERY_URL, "市对县");
    this._queryData(this.formData3, QUERY_URL, "当前考核年份");
    // 获取按钮权限
    let btnAccess = sessionStorage.getItem("btnaccess");
    this.globalFunction(btnAccess);
  }
};
</script>
<style scoped>
</style>
