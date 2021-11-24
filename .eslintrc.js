module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint', // 采用 babel-eslint 作为语法解析器
    sourceType: 'module', // 指定来源的类型，有两种script或module
    ecmaVersion: 6, // 指定ECMAScript支持的版本，6为ES6
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // 扩展使用 vue 检查规则和eslint推荐规则,
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  // required to lint *.vue files
  // eslint-plugin-prettier 插件会调用 prettier对你的代码风格进行检查，
  // 其原理是先使用 prettier对你的代码进行格式化，然后与格式化之前的代码进行对比，如果过出现了不一致，这个地方就会被 prettier进行标记。
  plugins: [
    // 'vue',
    'prettier',
  ],
  // add your custom rules here
  rules: {
    // allow debugger during development
    // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // prettier error
    'prettier/prettier': 'error',
    // allow async-await
    'generator-star-spacing': 'off',
    // 最后一个属性后允许有个空格
    'comma-dangle': 'off',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    // 属性换行
    'vue/max-attributes-per-line': 'off',
    // html标签自关闭
    'vue/html-self-closing': 'off',
    // html标签占一行
    'vue/singleline-html-element-content-newline': 'off',
    // vue prop 定义类型
    'vue/require-prop-types': 'off',
    // html缩进
    'vue/html-indent': 'off',
  },
};
