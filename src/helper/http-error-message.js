const httpErrorMap = {
  400: '请求错误',
  401: '未授权，请重新登录',
  403: '拒绝访问',
  404: '访问的内容不存在',
  408: '请求超时',
  500: '服务器错误',
  501: '服务未实现',
  502: '网络错误',
  503: '服务不可用',
  504: '网络超时',
  505: 'HTTP版本不受支持',
};

const commonErrorMessage = ['哎呀，服务器累趴啦～', '哎呀，服务器开小差啦～'];

export { httpErrorMap, commonErrorMessage };
