import appConfig from '../config';

var _toString = Object.prototype.toString;
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
const _saleTrackCommonDataKey = Symbol('sale-qw-track-common-data');
window[_saleTrackCommonDataKey] = {};

const { ZM_JSSDK: JSSDK } = window;

function setConfig(params) {
  JSSDK.setConfig({
    // environment: 'prod',
    environment: process.env.VUE_APP_RUN_ENV,

    // debug模式, 可选值:error / debug。调试阶段，可以在console查看打印信息
    logLevel: 'error',

    // histroy模式
    history: true,

    // 默认不上报PV/UV
    // autoReport: false,

    // 默认开启错误采集
    alarmEnable: process.env.NODE_ENV !== 'development',

    // 对XMLHttpRequest异常自动上报
    interceptor: true,
    ...params,
  });
}

function setDefaults(params = {}) {
  if (!params.appId && process.env.VUE_APP_RUN_ENV != 'prod') {
    console.warn('appId will be set default', appConfig.appId);
  }
  JSSDK.setDefaults({
    appId: params.appId || appConfig.appId,
    appVersion: process.env.APPVERSION,
    cSource: 'h5',
    ...params,
  });
}

// 上报接口异常埋点
function sendEvent(eventId, params = {}) {
  setDefaults();
  JSSDK.sendEvent(eventId, {
    eventParam: { ...params },
  });
}

function _sendLog(params = {}) {
  setDefaults();
  JSSDK.sendLog({
    ...params,
    appId: params.appId || appConfig.appId,
  });
}

function sendLog(code, message, level = 'info', common = true) {
  if (!code || !message) {
    return false;
  }
  if (common) {
    if (isPlainObject(message)) {
      message = Object.assign({}, window[_saleTrackCommonDataKey], message);
    } else {
      message = {
        ...window[_saleTrackCommonDataKey],
      };
    }
  }
  _sendLog({
    code,
    message,
    level,
  });
}

// 设置公共字段，
// 所以，尽量避开一些简单的关键词，eg: userId, studentId, name, stuId ....
// sendLog 会 merge 到 message 中
// sendEvent 会 merge 到 eventParam 中
function setCommonData(data) {
  if (!isPlainObject(data)) {
    if (process.env.VUE_APP_RUN_ENV != 'prod') {
      console.warn('track common data must a object!');
    }
    return false;
  }
  window[_saleTrackCommonDataKey] = data;
}

export default {
  setConfig,
  sendEvent,
  setDefaults,
  sendLog,
  pageReport: JSSDK.pageReport.bind(JSSDK),
  setCommonData,
};
