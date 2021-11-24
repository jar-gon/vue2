import bubble from './bubble';
import isEqual from 'lodash/isEqual';

export default {
  mixins: [bubble],
  computed: {
    value: {
      get() {
        return this.$attrs.value;
      },
      set(val) {
        if (!isEqual(val, this.value)) {
          // 支持v-model和sync
          this.bubble('update:value', val);
          this.bubble('input', val);
        }
      },
    },
  },
};
