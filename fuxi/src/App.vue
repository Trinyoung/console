<template>
  <div id="app">
    <!-- 注册，登录 -->
    <router-view v-if="!isSubApp"></router-view>
    <!-- 后台管理系统 -->
    <home-view v-if="isSubApp"></home-view>
    <!-- 编辑器 -->
    <div id="cangjie"></div>
    <div id="person"></div>
    <div id="xingtian"></div>
    <!-- <div id=""></div> -->
  </div>
</template>
<script>
import HomeView from "./views/HomeView.vue";
export default {
  components: {
    HomeView,
  },
  data() {
    return {
      applications: ["nvwa", "cangjie", "xingtian"],
      // app: "",
    };
  },
  computed: {
    app() {
      return this.$route.fullPath.split("/")[1];
    },
    isSubApp() {
      return this.applications.includes(this.app);
    },
  },
  created() {
    console.log(this.$route.fullPath, "path is heeheheeheh");
    const app = this.$route.fullPath.split("/")[1];
    this.applications.includes(app);
    console.log(app, "app is hehehehehe");
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
body {
  margin: 0;
}
</style>
