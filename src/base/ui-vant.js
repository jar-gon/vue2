// 预留一个 统一配置UI的地方，比如以后换底层 ui 库了，可以在这里做桥接
import { Button, Dialog, Empty, Icon, Image, Loading, Notify, Popover, Popup, Toast } from 'vant';

const BaseUi = [Button, Dialog, Empty, Icon, Image, Loading, Notify, Popover, Popup, Toast];

let UiVant = { Toast };

UiVant.install = function (Vue, uiArr) {
  // Empty props default image
  Empty.props.image.default = 'https://web-data.zmlearn.com/image/f660c9f5-b5d0-4384-bec6-3bd0f264f318.png';
  Button.props.size.default = 'small';
  Vue.prototype.$loading = Loading.service;
  Vue.prototype.$alert = Dialog.alert;
  Vue.prototype.$confirm = Dialog.confirm;
  Vue.prototype.$toast = Toast;
  Vue.prototype.$notify = Notify;

  [...BaseUi, ...uiArr].forEach(item => {
    if (item.install) {
      Vue.use(item);
    } else if (item.name) {
      Vue.component(item.name, item);
    }
  });
};

export default UiVant;
