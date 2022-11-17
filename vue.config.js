const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  lintOnSave: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    proxy: {
      '/api': {
        target: 'https://httpbin.org/',
        pathRewrite: {
          ['^/api']: ''
        },
        changeOrigin: true,
        secure: false
      }
    },

  },
  transpileDependencies: true
})
