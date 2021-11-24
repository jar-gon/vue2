import Vue from 'vue';
import Vuex from 'vuex';

// 持久化store，默认不开启，省流量
// import persistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [persistedState()],
  state: {
    permission: {},
    StudentInfo: {},
  },
  getters: {
    permission: state => state.permission,
    StudentInfo: state => state.StudentInfo,
  },
  actions: {},
  mutations: {
    updatePermission: (state, list) => {
      var hash = {};
      list.forEach(function (value) {
        hash[value] = 1;
      });
      state.permission = hash;
    },
    setStudentInfo: (state, data) => {
      state.StudentInfo = data; //学生信息
    },
  },
});
