const path = require("path");

const resolve = dir => {
  return path.join(__dirname, dir);
};

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === "production" ? "" : "/";

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  // configureWebpack: config => {
  //   config.entry.app = ["babel-polyfill", "./src/main.js"];
  // },
  baseUrl: BASE_URL,
  // tweak internal webpack configuration.+中文正文
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src")) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set("_c", resolve("src/components"));
  },
  // 打包时不生成.map文件
  productionSourceMap: true,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    proxy: {
      // 当你请求是以/api开头的时候，则我帮你代理访问到http://localhost:3000
      // 例如：
      // /api/users  http://localhost:3000/api/users
      // 我们真是服务器接口是没有/api的
      // 正式线上  http://120.78.158.120:8001
      // 测试地址  http://120.78.158.120:8989
      // 小强公司地址  http://192.168.8.185:8001/  小强花生壳:http://193135wa08.iask.in:54553
      "/api": {
        target: 'http://120.77.38.5:8989/',
        // target: 'http://192.168.0.76:8989/',
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
