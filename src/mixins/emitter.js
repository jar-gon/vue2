function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    if (componentName === true || componentName === child.$options.name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(eventName, ...params) {
      let parent = this.$parent || this.$root;

      while (parent) {
        const { captureEvents } = parent.$options;
        if (
          captureEvents === true ||
          (Array.isArray(captureEvents) && captureEvents.includes(eventName)) ||
          (typeof captureEvents === 'function' && captureEvents(this))
        ) {
          params.push(this);
          parent.$emit.call(parent, eventName, ...params);
        }
        parent = parent.$parent;
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    },
    getDispatchListeners(eventName) {
      const listeners = [];
      let parent = this.$parent || this.$root;

      while (parent) {
        const listener = parent.$listeners[eventName];
        if (listener) {
          listeners.push(listener);
        }
        parent = parent.$parent;
      }
      return listeners;
    },
  },
};
