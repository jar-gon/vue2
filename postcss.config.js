module.exports = {
  plugins: {
    // TODO 这个通过 vue-cli 的 API 配置
    autoprefixer: {
      overrideBrowserslist: ['Android >= 4.0', 'iOS >= 8'],
    },
    'postcss-pxtorem': {
      // vant-UI的官方根字体大小是37.5，设计稿宽度的1/10，根据UI提供的375尺寸来，如果设置rootValue等于75，那么按照UI提供的750尺寸来
      // 之所以设为37.5，是为了引用像vant、mint-ui这样的第三方UI框架，因为第三方框架没有兼容rem，用的是px单位，将rootValue的值设置为设计图宽度（这里为750px）75的一半，即可以1:1还原vant、mint-ui的组件，否则会样式会有变化，例如按钮会变小。
      // 既然设置成了37.5 那么我们必须在写样式时，也将值改为设计图的一半（比如设计稿尺寸是750px，字体大小是22px的话，css的样式字体大小就写12px）。
      rootValue: 37.5,
      // 需要做转化处理的属性，如`hight`、`width`、`margin`等，`*`表示全部
      propList: ['*'],
      // 注意：如果有使用第三方UI如VUX，则需要配置下忽略选择器不转换。
      // 规则是class中包含的字符串，如vux中所有的class前缀都是weui-。也可以是正则。
      selectorBlackList: [],
      minPixelValue: 1,
    },
  },
};
