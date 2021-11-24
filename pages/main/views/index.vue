<template>
  <router-view />
</template>

<script>
import { getStudentInfo } from '@api/common';
import { mapMutations } from 'vuex';

export default {
  name: 'StuCard',
  computed: {
    query() {
      return this.$route.query;
    },
  },
  created() {
    const appInfo = {
      token: this.query.token,
    };
    this.$setAppInfo(appInfo);
    // this.getStudentInfo();
  },
  methods: {
    getStudentInfo() {
      getStudentInfo().then(resData => {
        this.setStudentInfo(resData || {});
      });
    },
    ...mapMutations({
      setStudentInfo: 'SET_STUDENT_INFO',
    }),
  },
};
</script>
