// 全局翻译
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { Locale } from 'vant';

import { getLocale } from '@/utils';
import localeLang from './locale';

// 获取缓存默认语言
const localeStr = getLocale();

// vant初始化语言
Locale.use(localeStr, localeLang.vant);

Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: localeStr,
  messages: localeLang,
  // silentTranslationWarn: true,
});

export default i18n;
