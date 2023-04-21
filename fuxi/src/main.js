import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { registerMicroApps, start } from "qiankun";
// import ElementUI from "element-ui";
import element from "element-ui";

Vue.config.productionTip = false;
Vue.use(element);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

registerMicroApps([
  {
    entry: "http://localhost:8081",
    container: "#nvwa",
    name: "nvwa",
    activeRule: "/nvwa",
  },
]);

start();
