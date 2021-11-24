module.exports = {
  // 项目部署的子路径，如应用被部署在 https://p-test.zmlearn.com/my-app，则设置为 /my-app
  publicPath: {
    // 开发环境
    development: '',
    // development: '/fe-op-vue-mobile-template',

    // fat/uat/prod环境
    production: '/student-course',
  }[process.env.NODE_ENV],

  // 发布系统对应的应用ID，埋点使用
  appId: '13741',
  apiHost: process.env.VUE_APP_API_BASE_URL,
};
