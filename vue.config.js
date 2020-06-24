const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

// vue.config.js
const vueConfig = {
  publicPath: "./",
  configureWebpack: {
    plugins: []
  },

  chainWebpack: config => {
    config.resolve.alias.set("@", resolve("src"));

    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("inline")
      .resourceQuery(/inline/)
      .use("vue-svg-icon-loader")
      .loader("vue-svg-icon-loader")
      .end()
      .end()
      .oneOf("external")
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "assets/[name].[hash:8].[ext]"
      });
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme
          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },

  // 代理跨域
  devServer: {
    // development server port 8000
    port: 8001,
    // If you want to turn on the proxy, please remove the mockjs /src/main.jsL11
    proxy: {
      "/api": {
        // target: 'http://192.168.0.155:8002',
        target: "http://127.0.0.1:8002",
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/" // 重写
        }
      }
    }
  },

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  // lintOnSave: undefined,
  lintOnSave: false,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
};

module.exports = vueConfig;
