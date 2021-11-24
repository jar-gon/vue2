import Vue from 'vue';
import track from '@helper/track';
import filters from '@filters';
import xss from 'xss';
import { debounce, throttle } from 'lodash';

// Vue.config.productionTip = false;

// 全局存储一些默认的 appinfo 信息
Vue.prototype.$appInfo = {};
Vue.prototype.$setAppInfo = setAppInfo;
Vue.prototype.$track = track;
Vue.prototype.xss = xss;

function setAppInfo(obj) {
  const $appInfo = Vue.prototype.$appInfo || {};
  Vue.prototype.$appInfo = Object.assign($appInfo, obj);
}

// vue过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 全局防抖截流
Vue.prototype.$debounce = function () {
  if (arguments.length < 1) {
    throw Error('Must have a function');
  }
  const args = Array.from(arguments);
  if (!args[1]) {
    args[1] = 500;
  }
  return debounce.apply(this, args);
};
Vue.prototype.$throttle = function () {
  if (arguments.length < 1) {
    throw Error('Must have a function');
  }
  const args = Array.from(arguments);
  if (!args[1]) {
    args[1] = 500;
  }
  return throttle.apply(this, args);
};

// 埋点配置
track.setConfig();
track.setDefaults();
