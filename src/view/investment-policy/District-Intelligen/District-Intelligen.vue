<template>
  <div>
<!--    <Form :model="formRight" label-position="right" :label-width="180">-->
<!--      <div class="head-km">-->
<!--        <FormItem label="智能产业规模占全区GDP（2017年）">-->
<!--          <Input v-model="formRight[0].capacity" type="number"  style="width: 450px"></Input>-->
<!--        </FormItem>-->
<!--        <FormItem label="智能产业规模占全区GDP（2020年）">-->
<!--          <Input v-model="formRight[0].figure"  type="number" style="width: 450px"></Input>-->
<!--        </FormItem>-->
<!--      </div>-->
<!--      <div class="head-km">-->
<!--        <FormItem label="数字经济规模占全市区GDP（2017）">-->
<!--          <Input v-model="formRight[1].capacity"  type="number" style="width: 450px"></Input>-->
<!--        </FormItem>-->
<!--        <FormItem label="数字经济规模占全市区GDP（2020）">-->
<!--          <Input v-model="formRight[1].figure"  type="number" style="width: 450px"></Input>-->
<!--        </FormItem>-->
<!--      </div>-->
<!--    </Form>-->
<!--    <div class="foot">-->
<!--      <Button type="primary"-->
<!--              :loading="loading2"-->
<!--              icon="ios-power"-->
<!--              @click="submitUserModal"-->
<!--      >-->
<!--        保存修改-->
<!--      </Button>-->
<!--    </div>-->
    <!-- 表格 -->
    <Row style="margin:40px 0px">
      <Card>
        <div class="btn-arrs">
          <Button type="info" @click="modal5 = !modal5; Judge = '添加'" >添加数据</Button>
        </div>
      </Card>
    </Row>
    <Table border :columns="columns7" :data="data6"></Table>
    <!-- 添加/编辑 -->
    <Modal
      v-model="modal5"
      title="信息"
      ok-text = '确定'
      @on-ok = "addok"
    >
      <Form :model="formRight" label-position="right" :label-width="220">
          <FormItem label="日期选择">
             <DatePicker type="year" placeholder="请选择年份"  style="width: 250px" @on-change="getDate"></DatePicker>
          </FormItem>
          <FormItem label="智能产业规模占全区GDP(%)">
            <Input v-model="formRight.capacity" type="number" ></Input>
          </FormItem>
        <FormItem label="数字经济规模占全区GDP(%)">
          <Input v-model="formRight.figure"  type="number"></Input>
        </FormItem>
      </Form>
<!--      <div slot="footer">-->
<!--        <Button-->
<!--          v-if="btnAccess.upd"-->
<!--          type="primary"-->
<!--          size="large"-->
<!--          :loading="userModalLoading"-->
<!--          @click="submitUserModal"-->
<!--        >提交</Button>-->
<!--        <Button size="large" @click="cancelUserModal">取消</Button>-->
<!--      </div>-->
    </Modal>

  </div>
</template>
<script>
    import { hasOneOf } from "@/libs/tools";
    import { zhienngAJax} from "@/api/systemMange";
    // 添加url
    const ADDDATE = '/intelligence/insert';
    // 删除url
    const DELE_URL = '/intelligence/delete';
    // 修改URL
    const UPDATE_URL = "/intelligence/update";
    // 查询URL
    const QUERY_URL = '/intelligence/query';
    // ------------------------------------

    // 批量修改单位分类
    const BULKCHANGE_URL = "/department/batchUpdateClass";
    const INSERT_TITLE = "添加";
    const UPDATE_TITLE = "编辑";
    export default {
        data() {
            return {
                loading2 : false,
                modal5: false,
                columns7: [
                    {
                        title: '年份',
                        key: 'year',
                    },
                    {
                        title: '智能产业规模占全区GDP(%)',
                        key: 'capacity'
                    },
                    {
                        title: '数字经济规模占全区GDP(%)',
                        key: 'figure'
                    },
                    {
                        title: '操作',
                        key: 'id',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal5 = true;
                                            this.Judge = '编辑'
                                            this.formRight  = params.row ;
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [  ],
                formRight : {
                    year : '',
                    capacity : '',
                    figure : '',
                },
                Judge : '添加'
            }
        },
        methods: {
            getDate(value) {
                this.formRight.year = value ;
            },
            //提交
            addok() {
                if (this.Judge == '添加') {
                    this._userAjax(this.formRight,ADDDATE);
                    this.$Message.success("添加成功！");
                }else{
                   this._userAjax(this.formRight,UPDATE_URL);
                    this.$Message.success("修改成功！");
                }

            },
            remove (id) {
                this._userAjax({id},DELE_URL);
                this.$Message.success("删除成功");
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
                const keyOne = "intelligenceEntity";
                return new Promise((resolve, reject) => {
                    zhienngAJax({ formData, url, keyOne })
                        .then(result => {
                            console.log(result)
                            if (result.data !== undefined) {
                                this._getUserData({},QUERY_URL,{});
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
                formData = Object.assign(formData, {id});
                const keyOne = "intelligenceFilter";
                zhienngAJax({ formData, url, keyOne })
                    .then(result => {
                        if (result.data.code === "200") {
                            // this.$Message.success("查询成功");
                            this.data6 = result.data.results.list;
                            // console.log(this.data6)
                        } else {
                            this.$Message.error("查询失败");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        },
        created() {
            this._getUserData({},QUERY_URL,{});
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
  @import "industry-management.less";
</style>

