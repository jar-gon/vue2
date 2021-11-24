import baseRouter from '@base/router';

const BasePath = '/main';

const routers = [
  {
    path: BasePath,
    component: () => import('@main/views'),
    children: [
      {
        path: '',
        redirect: 'course',
      },
      {
        path: 'course',
        name: 'course',
        component: () => import('@main/views/course'),
      },
      {
        path: 'default',
        name: 'default',
        component: () => import('@main/views/default'),
      },
    ],
  },
];

export default baseRouter(routers, BasePath);
