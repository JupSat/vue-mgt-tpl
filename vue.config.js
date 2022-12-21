const { defineConfig } = require('@vue/cli-service')
// 使用gzip压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['html', 'js', 'css']
const path = require('path')
const resolve = (dir) => path.resolve(__dirname, dir)

module.exports = defineConfig({
  publicPath: './',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== 'production',
  runtimeCompiler: false,
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    hot: true,
    proxy: {
      '/debug': {
        target: 'http://localhost:8082/',
        pathRewrite: {
          '^/debug': ''
        },
        changeOrigin: true,
        secure: false
      }
      // '/api': {
      //   target: 'https://demo.gin-vue-admin.com', //  此处借用flipped-aurora/gin-vue-admin 的url来获取验证码图片
      //   changeOrigin: true, // 允许跨域
      //   logLevel: 'debug',
      //   ws: false,
      //   secure: false
      // }
    }
  },
  chainWebpack: (config) => {
    // if (process.env.OPEN_ANALYZER && process.env.NODE_ENV === 'production') {
    //   config
    //     .plugin('webpack-bundle-analyzer')
    //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    //     .end()

    //   // 移除 prefetch 插件
    //   config.plugins.delete('prefetch')
    // }
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionWebpackPlugin({
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        })
      )
    }

    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@img', resolve('src/assets/img'))
      .set('@config', resolve('src/config'))
      .set('@utils', resolve('src/utils'))
      .set('@language', resolve('src/language'))

    config.optimization.splitChunks({
      chunks: 'all',
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      minChunks: 1,
      hidePathInfo: true,
      minSize: 30000,
      cacheGroups: {
        api: {
          name: 'chunk-api',
          test: resolve('src/api'),
          minChunks: 1,
          priority: 10,
          reuseExistingChunk: true
        },
        components: {
          name: 'chunk-components',
          test: resolve('src/components'),
          minChunks: 1,
          priority: 10,
          reuseExistingChunk: true
        },
        elementPlus: {
          name: 'chunk-elementPlus',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-plus(.*)/
        },
        elementIcon: {
          name: 'chunk-elementIcon',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?@element-plus(.*)/
        },
        echarts: {
          name: 'chunk-echarts',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?echarts(.*)/
        },
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 5,
          chunks: 'initial'
        }
      }
    })
  },
  configureWebpack: {
    plugins: []
  }
})
