// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import iView from 'iview'
import ViewUI from 'view-design';
import iEditor from 'iview-editor';
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'
import 'iview-editor/dist/iview-editor.css';
import 'view-design/dist/styles/iview.css';
import '@/assets/css/public.css';
//富文本
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'


// import 'babel-polyfill'

// import infiniteScroll from 'vue-infinite-scroll'
// Vue.use(infiniteScroll)
Vue.use(VueQuillEditor)

// 实际打包时应该不引入mock
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')


Vue.use(ViewUI, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(iEditor);
Vue.use(ViewUI);
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/**
 * 全局变量函数
 * 判断是否有增删改查按钮权限
 */
Vue.prototype.globalFunction = function (str) {
  //增
  if (str.indexOf("add") == -1) {
    this.btnAccess.add = false;
    this.btnAccess.add2 = "none";
  } else {
    this.btnAccess.add = true;
    this.btnAccess.add2 = "inline-block";
  }
  //删
  if (str.indexOf("del") == -1) {
    this.btnAccess.del = "none";
    this.btnAccess.del2 = false;
  } else {
    this.btnAccess.del = "inline-block";
    this.btnAccess.del2 = true;
  }
  //改
  if (str.indexOf("upd") == -1) {
    this.btnAccess.upd = false;
  } else {
    this.btnAccess.upd = true;
  }
  //查
  if (str.indexOf("query") == -1) {
    this.btnAccess.query = false;
  } else {
    this.btnAccess.query = true;
  }

}

/**
 * 判断是否为超级管理员
 * 不是超级管理员 指标管理不可操作
 * params {string}
 */
Vue.prototype.globalFunction2 = function (params) {
  if (params === "admin") {
    this.isSpuerAdmins.add = true; //添加
    this.isSpuerAdmins.query = true; //查看
    this.isSpuerAdmins.action = "inline-block"; //操作
  } else {
    this.isSpuerAdmins.add = false;
    this.isSpuerAdmins.query = false;
    this.isSpuerAdmins.action = "none";
  }
}

/**
 * 全局判断按钮权限
 */
Vue.prototype.globalBtnAccess = function () {
  // 获取按钮权限
  let btnAccess = sessionStorage.getItem("btnaccess");
  let isSuperAdmin = sessionStorage.getItem("isSuperAdmin");
  let departType = sessionStorage.getItem("departType");
  // let isMangers = sessionStorage.getItem("isManager");
  if (departType === "乡镇") {
    btnAccess = btnAccess.replace("add", "");
    btnAccess = btnAccess.replace("delete", "");
    btnAccess = btnAccess.replace("upd", "");
  } else if (isSuperAdmin === "admin") {
    btnAccess = "add,del,upd,query";
  }
  // else if (isMangers === "0") {
  //   //isMangers =0 不是管理员
  //   btnAccess = btnAccess.replace("add", "");
  // }
  console.log(btnAccess);
  this.globalFunction(btnAccess);
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
