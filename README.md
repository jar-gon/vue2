# vue2
h5模板

基础模版来自vue-cli， 并做了一些适应性修改。

## 功能点

- 通用目录结构
- 通用编辑器配置
- 通用 eslint 规则，以及 eslint 构建时验证
- git commit 提交时验证 commit 规范
- 执行命令：npm run log，生成 Change log，
- 使用 git cz 命令代替 git commit
- 构建环境配置
- 内置常用公共功能模块（vant 、axios 等)
- 通用 css 功能模块
- 通用 api 功能模块
- api mock 功能
- filters 通用 vue 过滤器
- 埋点功能模块
- @zm-op/zmop-utils 通用工具方法，支持按需引入
- 预渲染（发布系统支持不好，暂时取消支持）

## 模板项目技术栈

- zm-cli 脚手架
- vue-router 前端路由
- vuex 跨组件通信
- persistedState 本地存储 store
- rem 适配
- axios 拦截器
- vant-ui 可按需引入

## 多页面支持
只需在pages下面创建相应的页面文件夹，文件目录参考pages/app1即可。

## vscode 同步通用编辑器配置

1. 安装 code settings sync 插件
2. setting.json 文件添加配置项

```
"gitee.gist": "7iw3lczgxn5192pretfjq54",
"gitee.access_token": "f3c7009bccd87295eca9af2f247dcd97",
```

3. Ctrl+P 执行命令: > download setting，等插件安装完成后重启编辑器

注意：这个操作会覆盖原有的 setting 配置，所以同步前最好备份本地的 setting 配置

## git cz 用法

**用 git cz 代替 git commit**

_git cz 用法_

- feat 新功能
- fix Bug 修复
- docs 文档更新
- style 代码的格式，标点符号的更新
- refactor 代码重构
- perf 性能优化
- test 测试更新
- build 构建系统或者包依赖更新
- ci CI 配置，脚本文件等更新
- chore 非 src 或者测试文件的更新
- revert commit 回退
- WIP work in progress 的缩写，表示该分支正在进行，不可合并（gitlab 也不允许合并）

## npm run 命令

- npm run dev # 启动默认应用
- npm run dev xxx # 启动某个应用
- npm run build # 构建所有应用
- npm run build xxx # 构建某个应用
- npm run lint # 执行项目 eslint 检测
- npm run changelog # 更新 changelog 文件
- npm run fat # fat 环境构建

## 项目环境地址

- https://XXX/student-course/main
- https://XXX/student-course/main
- https://XXX/student-course/main

## api配置地址

- TOB VUE_APP_API_BASE_URL
- TOC VUE_APP_API_BASE_TOC_URL

## 项目增加一个多页面如main， nginx需配置
## student-course是在[src/config/index.js]里面设置

```
location /student-course/main {
  add_header 'Access-Control-Allow-Origin' '*';
  add_header 'Access-Control-Allow-Credentials' 'true';
  alias /opt/tars/apps/13741/current/main/;
  try_files $uri $uri/ /student-course/main/index.html;
}
```
