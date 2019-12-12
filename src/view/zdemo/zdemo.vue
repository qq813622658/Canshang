<template>
  <div>
    <!-- <Form ref="userManagement"> -->
    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll"
      >全选</Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <Checkbox label="香蕉"></Checkbox>
      <Checkbox label="苹果"></Checkbox>
      <Checkbox label="西瓜"></Checkbox>
    </CheckboxGroup>
    <!-- </Form> -->
    <Button type="primary" @click="exportExcel">
      <Icon type="ios-download-outline"></Icon>导出年度绩效考核
    </Button>
    <Table ref="table" :columns="tableHead" :data="tableData"></Table>
  </div>
</template>

<script>
// import { cityAjax, checkAjax } from "@/api/city";
export default {
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ["香蕉", "苹果", "西瓜"],
      tableHead: [],
      tableData: []
    };
  },
  methods: {
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["香蕉", "苹果", "西瓜"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 3) {
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
    _queryCheckAjax(form, pageNumber, pageSize) {
      const url = "/yearSummaryScore/querydemo";
      const keyOne = "yearSummaryScoreFilter";
      let formData = Object.assign(form, {
        pageSize: pageSize,
        pageNumber: pageNumber
      });
      return new Promise((resolve, reject) => {
        checkAjax({ formData, url, keyOne }).then(res => {
          if (res.data.code === "200") {
            resolve(res.data);
          } else {
            reject(error);
          }
        });
      });
    },
    // 导出表格
    exportExcel() {
      this.$refs.table.exportCsv({
        filename: "年度绩效考核"
      });
    }
  },
  created() {}
};
</script>
