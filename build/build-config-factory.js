const fs = require('fs');
const path = require('path');
const packageJson = require('../package.json');
const webpack = require('webpack');
const apiMocker = require('mocker-api');
const appConfig = require('../src/config');
const cd = require('../cd.json');

const flexibleScript = fs.readFileSync(path.resolve('src/lib/flexible.min.js'));

// 多页构建
// //t-fat.zmlearn.com/12411/20200922-013/
const cdnPath = cd['cdn-path'];
let { publicPath } = appConfig;
if (cdnPath) {
  publicPath = cdnPath;
}
/**
 *
 * @param {*} appName 一定要考虑下为空的情况
 * @param {*} op
 * @returns
 */
function getBuildConfig(appName, op) {
  console.log('getBuildConfig', appName);
  let config = null;
  const configPath = path.resolve(
    appName ? `pages/${appName}/config/index.js` : 'src/config/index.js'
  );
  if (fs.existsSync(configPath)) {
    config = require(configPath);
  } else {
    console.error('请检查项目或者项目配置文件是否存在！');
    return;
  }

  // 本地服务启动的端口号
  let port = configPath.port;
  if (op.port && op.port !== 'undefined') {
    port = op.port;
  }

  // 检查模版是否存在
  let template = config.template || (appName ? `pages/${appName}/index.html` : 'pages/index.html');
  let filename = config.filename || (appName ? `${appName}/index.html` : 'index.html');
  if (!fs.existsSync(template)) {
    template = 'public/index.html';
    filename = 'index.html';
  }

  // 随机端口号6000～7000
  const buildConfig = {
    // 项目部署的子路径，如应用被部署在 https://p-test.zmlearn.com/my-app，则设置为 /my-app
    publicPath: `${publicPath ? publicPath : '/'}`,
    // outputDir: `dist/${appName}`,
    assetsDir: `${appName}`,
    // 生产构建时禁用
    // lintOnSave: process.env.NODE_ENV !== 'production',

    // 是否使用包含运行时编译器的 Vue 构建版本
    // 设置为 true 后就可以在 Vue 组件中使用 template 选项，但是这会让应用额外增加 10kb 左右
    // runtimeCompiler: true,
    // babel后编译@zm-op/zmop-utils
    // transpileDependencies: [/[/\\]node_modules[/\\][@\\]zm-op[/\\]zmop-utils[/\\]/],

    pages: {
      [appName ? appName : 'app']: {
        // page 的入口
        entry: config.entry || (appName ? `pages/${appName}/main.js` : 'pages/main.js'),
        // 模板来源
        template,
        // 在 dist/index.html 的输出
        filename,
        // 当使用 title 选项时，
        // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
        title: config.title || appName,
        // favicon:
        //   config.favicon || 'https://web-data.zmlearn.com/image/jukmcbe5hH5XhVq8Jw1SE1/favicon.ico',
        // 在这个页面中包含的块，默认情况下会包含
        // 提取出来的通用 chunk 和 vendor chunk。
        // chunks: ['chunk-vendors', 'main'],
        templateParameters: {
          env: process.env,
          flexibleScript: config.flexible ? flexibleScript : '',
          vuefilename: process.env.NODE_ENV === 'development' ? 'vue.js' : 'vue.min.js',
          timestamp: Date.now(),
        },
      },
    },

    configureWebpack: () => {
      const plugins = [
        // 埋点相关配置
        new webpack.DefinePlugin({
          'process.env': {
            CDN_PATH: JSON.stringify(cdnPath),
            APP_NAME: JSON.stringify(appName),
            APPVERSION: JSON.stringify(packageJson.version),
          },
        }),
      ];
      return {
        externals: {
          vue: 'Vue',
          ...(config.externals || {}),
        },
        plugins,
        resolve: {
          alias: {
            '@src': path.resolve('src'),
            '@api': path.resolve('src/api'),
            '@base': path.resolve('src/base'),
            '@components': path.resolve('src/components'),
            '@config': path.resolve('src/config'),
            '@filters': path.resolve('src/filters'),
            '@helper': path.resolve('src/helper'),
            '@mixins': path.resolve('src/mixins'),
            '@store': path.resolve('src/store'),
            '@styles': path.resolve('src/styles'),
            '@utils': path.resolve('src/utils'),
            '@main': path.resolve('pages/main'),
          },
        },
        output: {
          // 把子应用打包成 umd 库格式
          library: `${appName}-[name]`,
          libraryTarget: 'umd',
          jsonpFunction: `webpackJsonp_${appName}`,
        },
      };
    },
    chainWebpack: config => {
      config.module
        .rule('fonts')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { publicPath }));
      config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.compilerOptions.directives = {
            html(node, directiveMeta) {
              (node.props || (node.props = [])).push({
                name: 'innerHTML',
                value: `xss(_s(${directiveMeta.value}))`,
              });
            },
          };
          return options;
        });
    },
    css: {
      loaderOptions: {
        less: {
          // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
          lessOptions: {
            modifyVars: {
              // 直接覆盖变量
              // 'text-color': '#111',
              // 'border-color': '#eee',
              // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
              hack: `true; @import "${path.resolve('src/styles/vant-modify.less')}";`,
            },
          },
        },
      },
    },
    devServer: {
      host: 'b.zmlearn.com',
      https: {
        key: path.resolve(__dirname, '../ssl/server.key'),
        cert: path.resolve(__dirname, '../ssl/server.pem'),
      },
      open: true,
      port,
      openPage: appName,
      before(app) {
        apiMocker(app, path.resolve('mock/index.js'));
      },
      proxy: {
        '/api': {
          target: 'https://p-test.zmlearn.com',
          changeOrigin: true,
        },
      },
    },
  };
  if (appName) {
    buildConfig.devServer.historyApiFallback = {
      rewrites: [
        {
          from: new RegExp(`^${publicPath ? `\\${publicPath}` : ''}\\/${appName}\\/`),
          to: `${publicPath}/${appName}/index.html`,
        },
      ],
    };
  }
  return buildConfig;
}

module.exports = {
  getBuildConfig,
};
