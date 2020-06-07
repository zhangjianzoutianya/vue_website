const webpack = require('webpack')

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  productionSourceMap: false,
  assetsDir: 'assets',
  indexPath: 'index.html',
  filenameHashing:true,
  pages: {
    index: { //首页
      entry: "./src/views/index/index.js",
      template: "./src/views/index/index.html",
      filename: "index.html",
      title: "首页",
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    about: { //关于我们
      entry: "./src/views/about/about.js",
      template: "./src/views/about/about.html", 
      filename: "about.html",
      title: "关于我们",
      chunks: ['chunk-vendors', 'chunk-common', 'about']
    },      
  },
  devServer: {
    overlay: { // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    open: true, // 是否打开浏览器
    host: "localhost",
    port: "2021", // 代理端口
    https: false,
    hotOnly: false, // 热更新
    proxy: {
      "/api": {
        target: "/", // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        ws: false, // 是否启用websockets
        pathRewrite: {
          "^/api": "/api"
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }])
  },
}