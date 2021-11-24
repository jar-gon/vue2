export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible;
      },
      set(visible) {
        this.$emit('update:visible', visible);
      },
    },
  },
};
