import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import store from '@store';
import '@base/main';
import '@base/vconfig';
import './styles/index.scss';
import './ui';

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#scheduled');
