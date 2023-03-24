// 子应用的入口main.js (动态设置 webpack publicPath，防止资源加载出错)
if (window.__POWERED_BY_QIANKUN__) {
  // 设置publicPath
  // eslint-disable-next-line
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}
