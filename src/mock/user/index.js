import Mock from 'mockjs'

Mock.setup({
  timeout: '200-600'
})

Mock.mock('/api/user/register', 'post', () => ({
  status: 0,
  data: {},
  success: true,
  message: '注册成功'
}))

Mock.mock('/api/user/sendCodeToEmail', 'post', () => ({
  status: 0,
  data: {
    code: '123456'
  },
  success: true,
  message: '发送验证码成功'
}))

Mock.mock('/api/user/login', 'post', () => ({
  status: 0,
  data: {},
  success: true,
  message: '登录成功'
}))

// Mock.mock('/api/user/getGraphCaptchaApi', 'post', () => ({
//   status: 0,
//   data: {
//     code: '123456'
//   },
//   success: true,
//   message: '成功'
// }))

Mock.mock('/api/user/resetPassword', 'post', () => ({
  status: 0,
  data: {},
  success: true,
  message: '重置密码成功'
}))
