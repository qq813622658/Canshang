// 全局函数
function globalFunction(str) {
  if (str.indexOf("query") !== -1) {
    console.log("有查询按钮");
  } else {
    console.log("没有查询按钮");
  }
}

// param为传入参数
// function packageFunc(param) {
//   alert(param)
// }

// export default {
//   // Vue.js的插件应当有一个公开方法 install。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象。
//   install: function (Vue) {
//     Vue.prototype.global_func = (param) => globalFunction(param)
//   }
// }
