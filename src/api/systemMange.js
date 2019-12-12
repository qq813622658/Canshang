import axios from '@/libs/api.request'
import {
  format
} from 'path';
import {
  getToken,
  URL
} from "@/libs/util";
import form from "view-design/src/mixins/form";

// 以防命名冲突
const HOST = URL

/**
 * @param {*} token
 * @param {*} formData  数据
 * @param {*} objKey    对象的KEY
 * @returns
 */

// 单位分类
function userClassData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    weightList: formData.weightList,
    delList: formData.delList, // 删除考核事项list
    itemList: formData.itemList, // 考核事项
    id: formData.id, // 行id
    classId: formData.classId, // 分类id
    datetime: formData.datetime,
    classname: formData.classname, // 分类名
    indexWeigh: formData.indexWeigh, // 指标权重
    factWeigh: formData.factWeigh, // 实事重点权重
    puExamWeigh: formData.puExamWeigh, // 公众评议权重
    xwdcWeigh: formData.xwdcWeigh, // 县委督查权重
    xzfdcWeigh: formData.xzfdcWeigh, // 县政府的督查权重
    ldbzjsWeigh: formData.ldbzjsWeigh, // 领导班子建设权重
    jgdjWeigh: formData.jgdjWeigh, // 机关党建权重
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber ,// 页码

  }
  return data
}

// 账号管理
function userData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne] = {
    accUnit: formData.accUnit, // 批量修改单位分类
    id: formData.id,
    beginTime: formData.beginTime, // 搜索用户角色下拉id
    context: formData.context, // 用户名
    endTime: formData.endTime, // 用户名
    evolve: formData.evolve, // 用户职务
    departcode: formData.departcode, // 弹窗部门
    userDepartment: formData.userDepartment, // 搜索部门code
    userPermissions: formData.userPermissions, // 用户权限
    userPhone: formData.userPhone, // 用户手机
    department: formData.department, // 部门
    userPassword: formData.userPassword, // 用户密码
    departAddr: formData.departAddr, // 部门简称
    departType: formData.departType, // 部门类型
    departClas: formData.departClas, // 部门分类
    departOldName: formData.departOldName, // 部门旧名称
    departOldAddr: formData.departOldAddr, // 部门旧简称
    remark: formData.remark, // 备注
    isManger: formData.isManger, // 是否为管理员
    checkAllGroup: formData.checkAllGroup, // 权限值
    btnRights: formData.btnRights, // 增删改查权限值
    checkAllindexGroup: formData.checkAllindexGroup, // 所选中县指标集合
    checkCityGroup: formData.checkCityGroup, // 所选中市指标集合
    checkUnitGroup: formData.checkUnitGroup, // 所选中单位指标集合
    userFrom : formData.userFrom, // 修改后的数据提交
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber ,// 页码
    searchData : formData.searchData, // 查找
    plannedInvestment:formData.plannedInvestment,
    totalInvestment:formData.totalInvestment,
    target:formData.target,
    userName: formData.userName,
    nickName : formData.nickName,
    userPosition : formData.userPosition,
    roleid:formData.roleid,


  }
  return data
}

// 登录次数详情数据
function loginDetailData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne] = {
    id: formData.id,
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber // 页码
  }
  return data
}

// 角色管理数据
function roletMangeData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  };
  data[keyOne] = {
    id: formData.id, // id
    role: formData.role, // 角色
    checkAllGroup: formData.checkAllGroup, // 权限值
    btnRights: formData.btnRights, // 增删改查权限值
    checkAllindexGroup: formData.checkAllindexGroup, // 所选中指标集合
    checkCityGroup: formData.checkCityGroup, // 所选中市指标集合
    checkUnitGroup: formData.checkUnitGroup, // 所选中单位指标集合
    isManger: formData.isManger, // 是否为管理员
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber // 页码
  }
  return data
}
// 设置时间数据
function setTimeData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne] = {

    indexClass: formData.indexClass, // 标题code
    startTime: formData.startTime, // 开始时间
    endTime: formData.endTime, // 结束时间
    isThisMonth: formData.isThisMonth // 是否当月

  }
  return data
}

// 请求自定义时间数据
function queryTimeData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  };
  data[keyOne] = {
    indexClass: formData.indexClass // 标题code
  }
  return data
}

// 用户管理 编辑用户角色请求
function editorRoleData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  };
  data[keyOne] = {
    roleid: formData.roleid, // 标题code
    checkAllGroup: formData.checkAllGroup, // 菜单权限值
    btnRights: formData.btnRights, // 增删改查权限值
    checkAllindexGroup: formData.checkAllindexGroup, // 所选中指标集合
    checkCityGroup: formData.checkCityGroup, // 所选中市指标集合
    checkUnitGroup: formData.checkUnitGroup // 所选中单位指标集合
  }
  return data
}

// 验证用户名是否重复
function verifyUserNameData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  };
  data[keyOne] = {
    userName: formData.userName
  }
  return data
}

// 用户管理 导入用户信息
function importUserData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  };
  data[keyOne] = {
    listUser: formData.list[0].listUser, // 表格数据
    checkCode: formData.checkCode // 校验code
  }
  return data
}
// 批量修改用户权限
function bulkChangeData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  };
  data[keyOne] = {
    ids: formData.ids, // 用户id
    checkAllGroup: formData.checkAllGroup, // 菜单权限值
    btnRights: formData.btnRights, // 增删改查权限值
    checkAllindexGroup: formData.checkAllindexGroup, // 所选中指标集合
    checkCityGroup: formData.checkCityGroup, // 所选中市指标集合
    checkUnitGroup: formData.checkUnitGroup // 所选中单位指标集合
  }
  return data
}

// 批量修改用户角色
function bathModifyRole(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  };
  data[keyOne] = {
    ids: formData.ids, // 用户id
    roleid: formData.roleid /// 用户角色
  }
  return data
}

// 单位分类
export const userClassificationAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = userClassData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 用户管理 and  单位管理 共用
export const userAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = '';
  data = userData(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 用户管理里的登录详情
export const loginDetailAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = userClassData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 *角色管理
 */
export const roleMangeAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = roletMangeData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 自定义填写时间
export const setTimeAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = setTimeData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 自定义填写时间QUERY
export const queryTimeAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = queryTimeData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 *用户管理 编辑用户角色请求
 */
export const editorRoleAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = editorRoleData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 *用户管理 用户名重复验证
 */
export const verifyUserNameAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = verifyUserNameData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 *用户管理 导入用户信息
 */
export const importUserInfotAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = importUserData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 *批量修改用户权限
 */
export const bulkChangeAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = bulkChangeData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 *批量修改用户权限
 */
export const bathModifyRoleAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = bathModifyRole(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 获取建设成果数据
export const getbuildAjax = ({formData,url,keyOne}) => {
    let data = ''
    data = userData(formData, keyOne)
    return axios.request({
      url: HOST + url,
      data,
      method: 'post'
    })
}


// 建设成果
export const buildAjax = ({
   formData,
   url,
   keyOne
 }) => {
  let data = '';
  data = buildData(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
// 建设管理
function buildData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne] = {
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber ,// 页码
    type:formData.type,
    id: formData.id,
    projectName: formData.projectName,//项目名称
    context: formData.context,//项目内容
    target: formData.target,//年度任务目标
    totalInvestment: formData.totalInvestment,//总投资（亿元）
    evolve: formData.evolve,//项目进展情况
    accUnit: formData.accUnit,//责任单位
    beginTime: formData.beginTime,//计划开工时间
    endTime: formData.endTime,//计划竣工时间
    plannedInvestment: formData.plannedInvestment,//今年计划投资（万元）

}
  return data
}

// 招商管理
export const invesdata = ({
    formData,
    url,
    keyOne
  }) => {
  let data = '';
  data = investment(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 招商管理
function investment(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne] = {
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber ,// 页码
    projectName: formData.projectName,//项目名称
    synopsis: formData.synopsis,//项目简介
    evolve: formData.evolve,//进展情况
    problem: formData.problem,//存在问题
    investment : formData.investment,//总投资额（亿元）
    accUnit: formData.accUnit,//责任单位
    accLead: formData.accLead,//责任领导
    mainLead : formData.mainLead,//主要领导
    companyLinkman: formData.companyLinkman,//企业方联系人
    companyPhone: formData.companyPhone,//企业方联系人联系方式
    linkman: formData.linkman,//项目对接人
    phone: formData.phone,//项目对接人联系方式
    status: formData.status,//项目状态
    id: formData.id,
    type : formData.type,
}
  return data
}

// 新区园区
export const newparkAjax = ({
      formData,
      url,
      keyOne
    }) => {
  let data = '';
  data =  district(formData, keyOne);
  return axios.request({
    url: HOST + url,
     data,
    method: 'post'
  })
}

// 新区园区or 橘园工业区
function district(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne]= {
    id : formData.id,
    kilometer : formData.kilometer,  //核心园区用地面积（公里）
    planning :formData.planning, //规划区用地面积（公里）
    introduction :formData.introduction, //园区简介
    advantage :formData.advantage, //优势
    twodomestic:formData.twodomestic, //二产-园内共有企业(家)
    twoscale:formData.twoscale, //二产-规模以上工业企业(家)
    twoShang:formData.twoShang, //二产-限上商贸企业(家)
    twoHightech:formData.twoHightech, //二产-省级高新企业(家)
    biomedicine:formData.biomedicine, //生物医药
    industry:formData.industry, //信息软件设备开发业
    financialplatform:formData.financialplatform, //金融产业-金融平台(家)
    financialintroduction:formData.financialintroduction, //金融产业-引进金融、类金融业企业累计(家)
    financialcheckin :formData.financialcheckin, //金融产业-实体入驻(家)
    financialsuccess:formData.financialsuccess, //金融产业-成功列入自贸区金融创新案例(家)"签约面积
    contractedarea:formData.contractedarea ,// 跨境项目-签约面积(万平方米)
    commerce:formData.commerce ,// 跨境项目-已签约大型跨境出口电商企(家)
    negotiate:formData.negotiate ,// 跨境项目-正在洽谈意向大型跨境企业(家)
    intention:formData.intention ,// 跨境项目-意向面积约(万平方米)
    projectsone :formData.projectsone ,// 商业项目1
    projectstwo:formData.projectstwo ,// 商业项目2
    projectsthree :formData.projectsthree ,// 商业项目3
    projectsfour :formData.projectsfour,// 商业项目4
    productionone:formData.productionone ,// 三产-成功事列- 1
    productiontwo:formData.productiontwo  ,// 三产-成功事列- 2

    // 橘园信息
        delivery: formData.delivery,
        business: formData.business,
        Othertypes:formData.Othertypes,
      }
  data[keyOne]['orther'] = JSON.stringify(data[keyOne]);
  return  data
}


// 新金山工业园区
export const jinshankAjax = ({
      formData,
      url,
      keyOne
    }) => {
  let data = '';
  data =  jinshan(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 纳统企业
export const EponaAjax = ({
     formData,
     url,
     keyOne
   }) => {
  let data = '';
  data =  Epona(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 龙头企业
export const leadAjax = ({
    formData,
    url,
    keyOne
  }) => {
  let data = '';
  data =  leading(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 新金山工业区
function jinshan(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne]= {
    id : formData.id,
    JSSG : formData.JSSG,
    JSFW : formData.JSFW,
    JSXS : formData.JSXS,
    JSQT : formData.JSQT,
    JYGY : formData.JYGY,
    JYFW : formData.JYFW,
    JYSS : formData.JYSS,
    JYQT : formData.JYQT,
    PSGY : formData.PSGY,
    PSFW : formData.PSFW,
    PSSS : formData.PSSS,
    PSQT : formData.PSQT,
    FWGT : formData.FWGT,
    FWFW : formData.FWFW,
    FWSS : formData.FWSS,
    FWQT : formData.FWQT,
    YXGY : formData.YXGY,
    YXFW : formData.YXFW,
    YXSS : formData.YXSS,
    YXQT : formData.YXQT,
    JUYUANQUCF : formData.JUYUANQUCF,
    JUYUANQUGY : formData.JUYUANQUGY,
    FUWANCGF : formData.FUWANCGF,
    FUWANGY : formData.FUWANGY ,
    PUSHANGCF : formData.PUSHANGCF ,
    PUSHANGGY : formData.PUSHANGGY,
    JinshanJJ: formData.JinshanJJ,
    JinshancCF: formData.JinshancCF,
    JinshancQY: formData.JinshancQY,
    JinshanGY : formData.JinshanGY ,
    JinshanSS : formData.JinshanSS ,
    JinshanQUCF : formData.JinshanQUCF,
    JinshanQUGY : formData.JinshanQUGY,
    YIXUCF : formData.YIXUCF ,
    YIXUGY : formData.YIXUGY ,
  }
  data[keyOne]['orther'] = JSON.stringify(data[keyOne]);
  return  data
}
// 纳统企业
function Epona(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne]= {
    id : formData.id,
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber ,// 页码
    address : formData.address,
    business : formData.business,
    companyName : formData.companyName,
    district : formData.district,
    firstType : formData.firstType ,
    gmtCreate : formData.gmtCreate,
    gmtModified : formData.gmtModified,
    industryCode : formData.industryCode,
    industryCodeSecond : formData.industryCodeSecond,
    legalPerson : formData.legalPerson,
    organization : formData.organization,
    secondType : formData.secondType
  }
  return  data
}
// 龙头企业
function leading(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[keyOne]= {
    id : formData.id,
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber ,// 页码
    city: formData.city,//所属地市
    campanyName: formData.campanyName,//企业名称
    registerTime: formData.registerTime,//注册时间
    assetsNow : formData.assetsNow,//2018年资产总额（亿元）
    assetsLastYear: formData.assetsLastYear,//2016年营业收入（亿元）
    assetsBeforeLastYear: formData.assetsBeforeLastYear,//2017年营业收入（亿元）
    taking: formData.taking,//2018年营业收入（亿元）
    cityRanked : formData.cityRanked,//2018年全市排名
    provinceRanked : formData.provinceRanked,//2018年全省排名
    nationalRanked: formData.nationalRanked,//2018年在全国排名
    globalRanked: formData.globalRanked,//2018年在全球排名
    fieldRevenue: formData.fieldRevenue,//其中2018年细分领域营业收入（亿元）
    employee: formData.employee,//2018年从业人员（人）
    fieldEmployee: formData.fieldEmployee,//其中：细分领域从业人员（人）
    exploit: formData.exploit,//2018年研发投入（万元）
    fieldExploit: formData.fieldExploit,//其中：细分领域研发投入（万元）
    categoryField: formData.categoryField,//细分领域类别
    productField: formData.productField,//细分领域产品或服务情况（200字以内）
    companyAddress : formData.companyAddress,//企业地址
    linkman: formData.linkman,//联系人
    phone : formData.phone,//联系人电话
    type : formData.type,
    legalPerson : formData.legalPerson,
    businessScope : formData.businessScope

}
  return  data
}


// 监测平台树形
function tree(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne]= {
    id : formData.id,
    actualScore : formData.actualScore,
    level:formData.level,
    name : formData.name,
    parentId : formData.parentId,
    score : formData.score
  }
  return  data
}
// 监测平台树形
export const treeAjax = ({
     formData,
     url,
     keyOne
   }) => {
  let data = '';
  data =  tree(formData, keyOne);
  console.log(data);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}



// 首页轮播图数据
function mange(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne]= {
    id : formData.id,
    transitionYear : formData.transitionYear,
    transitionPlan:formData.transitionPlan,
    transition : formData.transition,
    service : formData.service,
    manufactureYear : formData.manufactureYear,
    manufacturePlan : formData.manufacturePlan,
    intelligenceTwo : formData.intelligenceTwo,
    intelligenceOne : formData.intelligenceOne,
    gmtModified : formData.gmtModified,
    gmtCreate : formData.gmtCreate,
    context : formData.context,
    company : formData.company,
    chain : formData.chain,
    blockchain : formData.blockchain,
  }
  return  data
}
// 监测平台树形
export const manageAjax = ({
   formData,
   url,
   keyOne
 }) => {
  let data = '';
  data =  mange(formData, keyOne);
  console.log(data);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

//纳统企业分类大类中类
function classtion(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne]= {
    id : formData.id,
    five : formData.five,
    fiveRatio:formData.fiveRatio,
    name : formData.name,
    parentId : formData.parentId,
    score : formData.score,
    gmtCreate: formData.gmtCreate,
    gmtModified : formData.gmtModified,
    sum : formData.sum
  }
  return  data
}
// 监测平台树形
export const classAjax = ({
     formData,
     url,
     keyOne
   }) => {
  let data = '';
  data =  classtion(formData, keyOne);
  console.log(data);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}


//招商政策
function  policy(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne]= {
    id : formData.id,
    title :formData.title ,
    context : formData.context,
    parentId : formData.parentId,
    childList : formData.childList,
    gmtModified : formData.gmtModified
  }
  return  data
}
//招商优惠政策
export const policyAjax = ({
    formData,
    url,
    keyOne
  }) => {
  let data = '';
  data =  policy(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 监测平台树形
export const zhienngAJax = ({
   formData,
   url,
   keyOne
 }) => {
  let data = '';
  data =  cnashanpingtai(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

//仓山智能产业平台
function  cnashanpingtai(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne]= {
    id : formData.id,
    capacity : formData.capacity,
    figure : formData.figure,
    year : formData.year
  }
  return  data
}


// 升级旧产业
export const upAjax = ({
    formData,
    url,
    keyOne
  }) => {
  let data = '';
  data =  upold(formData, keyOne);
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

//仓山智能产业平台
function  upold(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne]= {
    digitalIndustry : formData.digitalIndustry,
    digitalIndustryPercent : formData.digitalIndustryPercent,
    industryDigital : formData.industryDigital,
    industryDigitalPercent : formData.industryDigitalPercent
  }
  return  data
}
