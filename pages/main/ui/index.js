import Vue from 'vue';
import { NavBar, Sticky } from 'vant';
import UiVant from '@base/ui-vant';

// vant组件
const uiArr = [NavBar, Sticky];

Vue.use(UiVant, uiArr);
