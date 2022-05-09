module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    //发布项目时不要输出console
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    //发布项目时不要输出debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 让eslint校验规则和prettier一致
    'prettier.prettier': 0,
    //单引号
    quotes: [2, 'single'],
  },
}
