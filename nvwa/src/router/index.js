// import Vue from "vue";
// import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import Article from "../views/article.vue";
// import AboutView from "../views/AboutView.vue";
// Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // component: AboutView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/article/manager",
    name: "article-manager",
    component: Article,
    // component: () =>
    //   import(/* webpackChunkName: "article-manager" */ "../views/article.vue"),
  },
];

// const router = new VueRouter({
//   mode: "history",
//   base: process.env.BASE_URL,
//   routes,
// });

export default routes;
