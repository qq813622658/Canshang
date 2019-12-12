<template>
  <div>
    <Form :model="formRight" label-position="right" :label-width="220">
      <div class="head-km">
        <FormItem label="金山工业区简介">
          <Input v-model="formRight.JinshanJJ"
                 style="width: 1200px"
                 type="textarea"
          ></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="厂房(栋)">
          <Input v-model="formRight.JinshancCF" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="企业(家)">
          <Input v-model="formRight.JinshancQY"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="工业产值(亿元)">
          <Input v-model="formRight.JinshanGY" type="number" style="width: 450px"></Input>
        </FormItem>
        <FormItem label="年税收约(亿元)">
          <Input v-model="formRight.JinshanSS"  type="number" style="width: 450px"></Input>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="金山片区厂房（栋）">
          <Input v-model="formRight.JinshanQUCF"  type="number"  style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="金山片区工业用地面积（亩）">
          <Input v-model="formRight.JinshanQUGY"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="金山片区规上工业企业(家)">
          <Input v-model="formRight.JSSG"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="金山片区规上服务业企业(家)">
          <Input v-model="formRight.JSFW"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="金山片区限上商贸企业(家)">
          <Input v-model="formRight.JSXS"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="金山片区其他类型企业(家)">
          <Input v-model="formRight.JSQT"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>

      <div class="head-km">
        <FormItem label="橘园洲片区厂房（栋）">
          <Input v-model="formRight.JUYUANQUCF"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="橘园洲片区工业用地面积（亩）">
          <Input v-model="formRight.JUYUANQUGY"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>

      <div class="head-km">
        <FormItem label="橘园洲片区规上工业企业(家)">
          <Input v-model="formRight.JYGY"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="橘园洲片区规上服务业企业(家)">
          <Input v-model="formRight.JYFW"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="橘园洲片区限上商贸企业(家)">
          <Input v-model="formRight.JYSS"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="橘园洲片区其他类型企业(家)">
          <Input v-model="formRight.JYQT"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>


      <div class="head-km">
        <FormItem label="浦上片区厂房（栋）">
          <Input v-model="formRight.PUSHANGCF"  style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="浦上片区工业用地面积（亩）">
          <Input v-model="formRight.PUSHANGGY"  style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>

      <div class="head-km">
        <FormItem label="浦上片区规上工业企业(家)">
          <Input v-model="formRight.PSGY"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="浦上片区规上服务业企业(家)">
          <Input v-model="formRight.PSFW"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="浦上片区限上商贸企业(家)">
          <Input v-model="formRight.PSSS"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="浦上片区其他类型企业(家)">
          <Input v-model="formRight.PSQT"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>

      <div class="head-km">
        <FormItem label="福湾片区厂房（栋）">
          <Input v-model="formRight.FUWANCGF"  style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="福湾片区工业用地面积（亩）">
          <Input v-model="formRight.FUWANGY"  style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>

      <div class="head-km">
        <FormItem label="福湾片区规上工业企业(家)">
          <Input v-model="formRight.FWGT"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="福湾片区规上服务业企业(家)">
          <Input v-model="formRight.FWFW"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="福湾片区限上商贸企业(家)">
          <Input v-model="formRight.FWSS"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="福湾片区其他类型企业(家)">
          <Input v-model="formRight.FWQT"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>


      <div class="head-km">
        <FormItem label="义序片区厂房（栋）">
          <Input v-model="formRight.YIXUCF"  style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="义序片区工业用地面积（亩）">
          <Input v-model="formRight.YIXUGY"  style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>

      <div class="head-km">
        <FormItem label="义序片区规上工业企业(家)">
          <Input v-model="formRight.YXGY"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="义序片区规上服务业企业(家)">
          <Input v-model="formRight.YXFW"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>
      <div class="head-km">
        <FormItem label="义序片区限上商贸企业(家)">
          <Input v-model="formRight.YXSS"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
        <FormItem label="义序片区其他类型企业(家)">
          <Input v-model="formRight.YXQT"  type="number" style="width: 450px ;margin-bottom: 10px"></Input><br/>
        </FormItem>
      </div>


    </Form>
    <div class="foot">
      <Button type="primary"
              :loading="loading2"
              icon="ios-power"
              @click="submitUserModal"
      >
        保存修改
      </Button>
    </div>

  </div>
</template>
<script>
    import { hasOneOf } from "@/libs/tools";
    import { jinshankAjax } from "@/api/systemMange";

    // 修改URL
    const UPDATE_URL = "/industrialPark/update";
    // 查询URL
    const QUERY_URL = "/industrialPark/queryById";
    // ------------------------------------

    // 批量修改单位分类
    const BULKCHANGE_URL = "/department/batchUpdateClass";
    const INSERT_TITLE = "添加";
    const UPDATE_TITLE = "编辑";
    export default {
        data() {
            return {
                loading2 : false,
                formRight: {
                    id : '',
                    JSSG: '',
                    JSFW: '',
                    JSXS : '' ,
                    JSQT : '' ,
                    JYGY : '' ,
                    JYFW : '' ,
                    JYSS : '' ,
                    JYQT : '' ,
                    PSGY : '' ,
                    PSFW : '' ,
                    PSSS : '' ,
                    PSQT : '' ,
                    FWGT : '' ,
                    FWFW : '' ,
                    FWSS : '' ,
                    FWQT : '' ,
                    YXGY : '' ,
                    YXFW : '' ,
                    YXSS : '' ,
                    YXQT : '' ,
                    JUYUANQUCF : '',
                    JUYUANQUGY : '',
                    FUWANCGF : '' ,
                    FUWANGY : '' ,
                    PUSHANGCF : '' ,
                    PUSHANGGY : '' ,
                    JinshanJJ: '',
                    JinshancCF: '',
                    JinshancQY: '',
                    JinshanGY : '',
                    JinshanSS : '',
                    JinshanQUCF : '',
                    JinshanQUGY : '',
                    YIXUCF : '' ,
                    YIXUGY : '' ,
                }
            }

        },
        methods: {

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
                const keyOne = "industrialParkEntity";
                return new Promise((resolve, reject) => {
                    jinshankAjax({ formData, url, keyOne })
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
            _getUserData(formData, url,id) {
                this.tabelLoading = true;
                formData = Object.assign(formData, {id});
                const keyOne = "industrialParkEntity";
                jinshankAjax({ formData, url, keyOne })
                    .then(result => {
                        if (result.data.code === "200") {
                            this.formRight.id = result.data.results.industrialParkEntity.id;
                            this.$Message.success("查询成功");
                            this.formRight = JSON.parse(result.data.results.industrialParkEntity.orther);
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
            // 获取按钮权限
            // let btnAccess = sessionStorage.getItem("btnaccess");
            this._getUserData(2,QUERY_URL,2);
            // this.globalFunction(btnAccess);
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
  @import "./Jinshan-park.less";
</style>
