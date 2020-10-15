const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

const paroxyTarget = process.env.VUE_APP_DOMAIN;
module.exports = {
  configureWebpack: (config) => {},
  chainWebpack: (config) => {
    config.resolve.alias.set("@assets", resolve("src/assets"));
  },
  // devServer: {
  //   port: 8000,
  //   proxy: {
  //     "/api": {
  //       target: paroxyTarget,
  //       ws: false,
  //       changeOrigin: true,
  //       // pathRewrite: {
  //       //   '^/api': '/'
  //       // }
  //     },
  //   },
  // },

  publicPath: "./",
  productionSourceMap: false,
  transpileDependencies: [],
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [resolve("src/assets/css/var.less"), resolve("src/assets/css/mixins.less")],
    },
  },
};
