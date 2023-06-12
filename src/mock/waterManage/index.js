import Mock from 'mockjs'

// 设置拦截请求的响应参数；
Mock.setup({
  timeout: '200-600'
})

// 查询水井列表
// /\/api\/well\/find/
Mock.mock(/\/api\/well\/find/, 'post', (options) => {
  const nodeList = new Array(100).fill(1).map((_, index) => {
    let nodeStatus = 'warn'
    if (index % 2 === 0) {
      nodeStatus = 'good'
    }
    if (index % 3 === 0) {
      nodeStatus = 'error'
    }
    return {
      nodeName: `名称`,
      nodeId: `node${index}`,
      nodeStatus,
      nodeType: 0
    }
  })

  const wellList = new Array(10)
    .fill(1)
    .map((_, index) => ({ wellId: String(index), wellName: `${index + 1}段标`, wellNodeList: nodeList }))
  return {
    data: wellList,
    success: true,
    message: '成功'
  }
})

// 水井详情信息查询
// 水井详情信息修改
// 新增
