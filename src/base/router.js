import Vue from 'vue';
import VueRouter from 'vue-router';
import appConfig from '@config';

Vue.use(VueRouter);

const baseRouter = function (routers, basePath = '') {
  const router = new VueRouter({
    mode: 'history',
    base: appConfig.publicPath,
    routes: [
      // 添加路由
      ...routers,
      {
        path: `${basePath}/403`,
        name: '403',
        component: () => import('@components/403'),
      },
      {
        path: '*',
        name: '404',
        component: () => import('@components/404'),
      },
    ],
  });

  // 获取权限，路由守护，权限拦截，设置PV埋点
  // router.beforeEach(async (to, from, next) => {
  //   next();
  // });

  return router;
};

export default baseRouter;
