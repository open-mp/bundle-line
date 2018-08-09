const getEntry = require("./entry.js");
const getModule = require("./webpack.module.js");
const getPlugin = require("./webpack.plugin.js");
const getResolve = require("./webpack.resolve.js");

module.exports = function (config) {
  return {
    mode: "production", 
    entry: getEntry(config),
    output: {
      path: config.assetsRoot,
      filename: 'js/[name].js'
    },
    module:  getModule(config),
    resolve: getResolve(config),
    plugins: getPlugin(config)
  };
};
