主要是业务性的页面组件，基本不具备通用性
基本与路由一一对应（例如 /pages/auth/login.vue 对应着路由 /auth/login）
各功能模块（如 msg/）内部可分离出通用部分（如 components/、mixins/
若多个功能模块通用的，则建议移到全局，即 src/components/、src/mixins/ 等