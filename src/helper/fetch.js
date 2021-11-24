import service from './http';
import { commonTip } from '@utils/ui';

const ApiPrefix = '/api';

export default function fetch(options = {}, isReject = true) {
  return new Promise((resolve, reject) => {
    // 在这里可以统一设置些奇怪的东西
    service({
      ...options,
    })
      .then(response => {
        resolve(response.data);
      })
      // 注释错误透传
      .catch(error => {
        if (isReject) {
          reject(error);
        } else {
          console.error(error);
        }
      });
  });
}

function baseFetch(
  url,
  method,
  params = {},
  data = {},
  resolveData = true,
  isCustomProcessing = false
) {
  return new Promise((resolve, reject) => {
    fetch({
      url,
      method,
      data,
      params,
    })
      .then(res => {
        resolve(resolveData ? res.data : res);
      })
      .catch(err => {
        !isCustomProcessing && commonTip(err.message);
        reject(err);
      });
  });
}

export function get(url, params, resolveData, isCustomProcessing) {
  return baseFetch(`${ApiPrefix}${url}`, 'GET', params, {}, resolveData, isCustomProcessing);
}

export function post(url, data, resolveData, isCustomProcessing) {
  return baseFetch(`${ApiPrefix}${url}`, 'POST', {}, data, resolveData, isCustomProcessing);
}
