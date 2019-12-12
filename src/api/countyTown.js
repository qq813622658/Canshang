import axios from '@/libs/api.request'
import {
  format
} from 'path';
import {
  getToken,
  URL
} from "@/libs/util";

// 以防命名冲突
const HOST = URL

/**
 * @param {*} token
 * @param {*} formData  数据
 * @param {*} objKey    对象的KEY
 * @returns
 */

/**
 *
 * @param {*} token
 * @param {*} formData 表单
 * @param {*} KEY_1 后台所需要的KEY 责任单位、牵头单位、指标
 * @param {*} KEY_2 各乡镇
 * @returns 按照后台的规则返回Data
 * 用于县对乡镇指标管理
 */
function countyData(formData, KEY_1, KEY_2) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  if (formData['list'] === undefined) {
    data[KEY_1] = {
      batchNum: formData.batchNum, // 导入批次号
      // 辨别是总表还是得分表
      tableType: formData.tableType, // 辨别是总表还是得分表
      id: formData.id === undefined ? '' : formData.id, // id
      indexName: formData.indexName, // 指标名称
      indexType: formData.indexType, // 指标类型
      leadUnit: formData.leadUnit, // 牵头单位
      leadUnitName: formData.leadUnitName, // 牵头单位
      superiorIndexId: formData.superiorIndexId, // 上级单位
      responsibilityUnit: formData.responsibilityUnit, // 责任单位
      score: formData.score, // 分数
      weight: formData.weight, // 招权重
      pageSize: formData.pageSize, // 显示页数
      pageNumber: formData.pageNumber, // 页码
      mainUnit: formData.mainUnit === undefined ? '' : formData.mainUnit, // 主要牵头单位
      audit: formData.audit === undefined ? '' : formData.audit, // 审核状态
      monthTime: formData.monthTime === undefined ? '' : formData.monthTime, // 月份
      dateTime: formData.dateTime, // 指标年份
      datetime: formData.dateTime, // 指标年份
      scoreType: formData.scoreType === undefined ? '' : formData.scoreType, // 分数类型
      reason: formData.reason === undefined ? '' : formData.reason, // 回退原因
      cell23: formData.cell23, // 牵头单位
      cell24: formData.cell24 // 责任单位
    }
    if (formData.indexType === '二级指标' && KEY_2 !== undefined) {
      data[KEY_2] = [{
          townName: '塘前乡',
          weight: formData['塘前乡'],
          departcode: "1001"
        },
        {
          townName: '葛岭镇',
          weight: formData['葛岭镇'],
          departcode: "1002"
        },
        {
          townName: '樟城镇',
          weight: formData['樟城镇'],
          departcode: "1003"
        },
        {
          townName: '城峰镇',
          weight: formData['城峰镇'],
          departcode: "1004"
        },
        {
          townName: '清凉镇',
          weight: formData['清凉镇'],
          departcode: "1005"
        },
        {
          townName: '富泉乡',
          weight: formData['富泉乡'],
          departcode: "1006"
        },
        {
          townName: '岭路乡',
          weight: formData['岭路乡'],
          departcode: "1007"
        },
        {
          townName: '盖洋乡',
          weight: formData['盖洋乡'],
          departcode: "1012"
        },
        {
          townName: '长庆镇',
          weight: formData['长庆镇'],
          departcode: "1013"
        },
        {
          townName: '东洋乡',
          weight: formData['东洋乡'],
          departcode: "1014"
        },
        {
          townName: '霞拔乡',
          weight: formData['霞拔乡'],
          departcode: "1015"
        },
        {
          townName: '同安镇',
          weight: formData['同安镇'],
          departcode: "1016"
        },
        {
          townName: '大洋镇',
          weight: formData['大洋镇'],
          departcode: "1017"
        },
        {
          townName: '盘谷乡',
          weight: formData['盘谷乡'],
          departcode: "1018"
        },
        {
          townName: '洑口乡',
          weight: formData['洑口乡'],
          departcode: "1011"
        },
        {
          townName: '红星乡',
          weight: formData['红星乡'],
          departcode: "1019"
        },
        {
          townName: '白云乡',
          weight: formData['白云乡'],
          departcode: "1020"
        },
        {
          townName: '丹云乡',
          weight: formData['丹云乡'],
          departcode: "1021"
        },
        {
          townName: '赤锡乡',
          weight: formData['赤锡乡'],
          departcode: "1093"
        },
        {
          townName: '梧桐镇',
          weight: formData['梧桐镇'],
          departcode: "1009"
        },
        {
          townName: '嵩口镇',
          weight: formData['嵩口镇'],
          departcode: "1010"
        }
      ]
    }
  } else {
    data[KEY_1] = {
      batchNum: formData.batchNum, // 导入批次号
      id: formData.id === undefined ? '' : formData.id, // id
      indexName: formData.indexName, // 指标名称
      indexType: formData.indexType, // 指标类型
      leadUnit: formData.leadUnit, // 牵头单位
      superiorIndexId: formData.superiorIndexId, // 上级单位
      responsibilityUnit: formData.responsibilityUnit, // 责任单位
      score: formData.score, // 分数
      weight: formData.weight, // 招权重
      pageSize: formData.pageSize, // 显示页数
      pageNumber: formData.pageNumber, // 页码
      mainUnit: formData.mainUnit === undefined ? '' : formData.mainUnit, // 主要牵头单位
      audit: formData.audit === undefined ? '' : formData.audit, // 审核状态
      monthTime: formData.monthTime === undefined ? '' : formData.monthTime, // 月份
      dateTime: formData.dateTime, // 指标年份
      scoreType: formData.scoreType === undefined ? '' : formData.scoreType, // 分数类型
      reason: formData.reason === undefined ? '' : formData.reason // 回退原因
    }
    data['list'] = formData['list']
  }
  return data
}

/**
 *
 * @param {*} token
 * @param {*} formData 表单 数据
 * @param {*} KEY_1 后台所需要的KEY
 * @returns 按照后台的规则返回Data
 * 用于填写分数页面导入
 */
function importScoreData(formData, KEY_1) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }

  data[KEY_1] = {
    townList: formData.list[0].townList, // 乡镇得分
    id: formData.list[0].uploadId, // 行id
    // indexName: formData.indexName, // 指标名称
    // indexType: formData.indexType, // 指标类型
    // leadUnit: formData.leadUnit, // 牵头单位
    // superiorIndexId: formData.superiorIndexId, // 上级单位
    // responsibilityUnit: formData.responsibilityUnit, // 责任单位
    // score: formData.score, // 分数
    // weight: formData.weight, // 招权重
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber, // 页码

    dateTime: formData.dateTime // 当月还是上月

  }
  return data
}

// 县对乡考核数据drawer页面数据展示
function townData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  console.log(formData);
  data[keyOne] = {
    id: formData.rowId,
    dateTime: formData.dateTime, // 是否当月
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber // 页码
  }
  return data
}

function indexAnalysData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  };
  data[keyOne] = {
    id: formData.id, // id
    dateTime: formData.dateTime, // 年份
    townName: formData.townName, // 乡镇名
    townListData: formData.townListData, // 选中对比乡镇code结合
    pageSize: formData.pageSize, // 显示页数
    pageNumber: formData.pageNumber // 页码
  }
  return data
}

// 请求乡镇指标分析
function townIndexAnalysData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    dateTime: formData.dateTime, // 年月
    departcode: formData.departcode, // 乡镇code
    topNum: formData.topNum, // 前几名
    badNum: formData.badNum // 后几名
  }
  return data
}

//  市对县，县对乡镇，县直单位报送情况 共用
function countrySubmitData(formData, keyOne) {
  let data = {}
  data['tokenEntity'] = {
    value: getToken()
  }
  data[keyOne] = {
    indexClass: formData.indexClass // 县对乡报送id
  }
  return data
}

// 县对各乡镇、六抓六赛
export const countyAjax = ({
  formData,
  url,
  keyOne,
  keyTwo
}) => {
  let data = ''
  data = countyData(formData, keyOne, keyTwo)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 县对各乡镇分数导入请求
export const importScoreyAjax = ({
  formData,
  url,
  keyOne,
  keyTwo
}) => {
  let data = ''
  data = importScoreData(formData, keyOne, keyTwo)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

// 县对乡镇指标考核数据drawer
export const townDataAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = townData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 * 指标分析
 */
export const indexAnalysAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = indexAnalysData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 * 请求乡镇指标分析
 */
export const townIndexAnalysAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = townIndexAnalysData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}

/**
 * 市对县，县对乡镇，县直单位报送情况 共用
 */
export const countrySubmitAjax = ({
  formData,
  url,
  keyOne
}) => {
  let data = ''
  data = countrySubmitData(formData, keyOne)
  return axios.request({
    url: HOST + url,
    data,
    method: 'post'
  })
}
