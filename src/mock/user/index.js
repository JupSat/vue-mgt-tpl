import Mock from "mockjs";

Mock.setup({
  timeout: "200-600",
});

Mock.mock('api/user/register', 'post', () => ({
  status: 0,
  data: {},
  success: true,
  message: '成功'
}))


Mock.mock('api/user/requestCaptcha', 'post', () => ({
  status: 0,
  data: {
    code: '123456'
  },
  success: true,
  message: '成功'
}))
