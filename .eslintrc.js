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
    'import/first': 0, // 不允许将导入声明放置在标有setup的script标签中
    'space-before-function-paren': 0, // 在函数定义左括号前强制保持一致间距
    'vue/multi-word-component-names': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unreachable': 2, // 不允许在return、throw、continue和break语句后出现无法访问的代码
    'no-unsafe-finally': 2, // 不允许finally块中的控制流语句
    'prefer-const': 0, // 对于声明后从未重新赋值的变量，需要常量声明
    'no-dupe-keys': 2, // 不允许对象文本中的重复键
    'no-dupe-args': 2, // 不允许函数定义中的重复参数
    'no-duplicate-case': 2, // 不允许重复大小写标签（switch语句中的case）
    'no-multi-spaces': 1, // 禁止多个空格
    // 不允许重复模块导入
    'no-duplicate-imports': [
      1,
      {
        includeExports: true
      }
    ],
    // 不允许使用的变量
    'no-unused-vars': [
      2,
      {
        vars: 'all',
        args: 'none'
      }
    ],
    // 强制一致使用反引号、双引号或单引号
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ]
  }
}
