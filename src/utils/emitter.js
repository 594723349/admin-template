function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.name;

    if (name === name) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [name, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        if (arguments.length > 3) {
          params = Array.from(arguments).slice(2);
        } else {
          Array.isArray(params) && (params = [params]);
        }
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
