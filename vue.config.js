const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: true,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    proxy: {
      // '/api': {
      //   target: 'https://httpbin.org/',
      //   pathRewrite: {
      //     ['^/api']: ''
      //   },
      //   changeOrigin: true,
      //   secure: false
      // },
      ['/api']: {
        target: "https://demo.gin-vue-admin.com",  //  此处借用flipped-aurora/gin-vue-admin 的url来获取验证码图片
        changeOrigin: true, // 允许跨域
        logLevel: 'debug',
        ws: false,
        secure: false
      }
    },

  },
  transpileDependencies: true
})
