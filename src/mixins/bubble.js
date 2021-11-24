import emitter from './emitter';

export default {
  mixins: [emitter],
  methods: {
    bubble(eventName, ...values) {
      values = values || this.value;
      this.$emit(eventName, ...values);
      this.dispatch(eventName, ...values);
    },
  },
};
