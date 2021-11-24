import Vue from 'vue';
import { commonErrorMessage } from '@helper/http-error-message';

export function commonTip(msg) {
  const $vantMessage = Vue.prototype.$toast;
  const message = msg || commonErrorMessage[1];
  $vantMessage ? $vantMessage.fail(message) : alert(message);
}
