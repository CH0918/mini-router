import install from './install';
import Vue from 'vue';
class VueRouter {
  constructor(options) {
    const { routes, mode } = options;
    this.routes = routes;
    this.mode = mode || 'hash';
    this.init();
    Vue.util.defineReactive(this, 'current', '/');
    console.log('current=', this);
  }

  init() {
    if (this.mode === 'hash') {
      window.addEventListener('load', () => {
        this.current = location.hash.slice(1);
      });
      window.addEventListener('popstate', () => {
        console.log('llll', location.hash);
        this.current = location.hash.slice(1);
      });
    }
  }
}

VueRouter.install = install;
export default VueRouter;
