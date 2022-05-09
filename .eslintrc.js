module.exports = {
  root: true,
  globals: {
    window: true,
    document: true,
    wx: true,
    uni: true,
    plus: true,
    uniCloud: true,
    getCurrentPages: true,
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/prettier',
    // eslint-config-prettier 的缩写
    'prettier',
  ],
  parserOptions: {},
  plugins: [],
  rules: {
    'vue/multi-word-component-names': 'off', // 关闭组件命名约束
    // 'vue/require-default-prop': 'off',
    'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: false }], // 未使用变量约束
    'comma-dangle': ['warn', 'always-multiline'], // 末端逗号
    'arrow-parens': ['error', 'as-needed'], // 箭头函数，参数括号
  },
}
