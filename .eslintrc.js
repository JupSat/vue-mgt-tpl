module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'space-before-function-paren': 0,
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unreachable': 2, // 不能有无法执行的代码
    'no-unsafe-finally': 2,
    'no-unused-vars': [
      2,
      // 不能有声明后未被使用的变量或参数
      {
        vars: 'all',
        args: 'none'
      }
    ]
  }
}
