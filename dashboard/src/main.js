import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './routes'
import './public-path.js'
Vue.config.productionTip = false

let router = null;
let instance = null;
console.log(Router, 'router is hhhhehhhhhhh');
Vue.use(Router);
function render(props) {
  const container = props;
  router = new Router({
    base: window.__POWERED_BY_QIANKUN__ ? '/app-vue/' : '/',
    mode: 'history',
    routes,
  })
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app'): '#app')
}


if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  console.log('[vue] props from main framework', props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}
// new Vue({
//   render: h => h(App),
// }).$mount('#app')
