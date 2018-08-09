const rimraf = require('rimraf');
const Config = require('../config');
const WebpackDll = require('./webpack.dll.conf');
const WebpackDev = require('./webpack.dev.conf');
const WebpackPrd = require('./webpack.prd.conf');
const webpack = require("webpack");
let env = process.argv[2];
// 获得配置
let config = Config(env);
// 清空打包目标路径
rimraf.sync(config.assetsRoot);
// 打包dll
let dllWebPackConfig = WebpackDll(config);


webpack(dllWebPackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 错误处理
  }
  let pageWebPackConfig = null;
  if (config.isProduction) {
    pageWebPackConfig = WebpackPrd(config);
  } else {
    pageWebPackConfig = WebpackDev(config);
  }
  // 打包业务代码
  webpack(pageWebPackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      // 错误处理
    }

  });
});
