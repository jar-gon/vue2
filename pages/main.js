import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@store';
import http from '@helper/http';
import track from '@helper/track';
import filters from '@filters';
import '@styles/base.scss';
import '@base/ui-vant';

// 埋点配置
track.setConfig();
track.setDefaults();

Vue.config.productionTip = false;

// http请求方法
Vue.prototype.$http = http;

// vue过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
