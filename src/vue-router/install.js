let _Vue;
export default function install(Vue) {
  console.log('install ');
  // 避免重复安装
  if (install.installed && _Vue === Vue) return;

  install.installed = true;

  _Vue = Vue;

  Vue.mixin({
    beforeCreate() {
      // console.log('name =  ', this.$options);
      if (this.$options.router) {
        // 表示该实例是根对象
        this._rootRouter = this;
        this._rootRouter._router = this.$options.router;

        Vue.prototype.$router = this.$options.router;
      } else {
        // 非根组件实例
        this._rootRouter = this.$parent && this.$parent._rootRouter;
      }
    },
  });

  Vue.component('router-link', {
    props: {
      to: {
        type: String,
        default: '/',
      },
    },
    render(h) {
      return h('a', { attrs: { href: this.to } }, this.$slots.default);
    },
  });

  // 找到对应的组件渲染
  Vue.component('router-view', {
    render(h) {
      const routes = this.$router.routes;
      const current = this.$router.current;
      const comp = routes.find((item) => item.path === current)?.component;
      return h(comp);
    },
  });
}
