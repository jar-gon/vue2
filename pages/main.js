import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '@store';
import filters from '@filters';
import '@styles/base.scss';
import '@base/ui-vant';

Vue.config.productionTip = false;

// vue过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
