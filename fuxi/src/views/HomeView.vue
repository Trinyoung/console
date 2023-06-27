<template>
  <div class="home">
    <el-container>
      <el-header height="56px" class="layout-header">
        <div class="layout-header-left">
          Trinyoung
          <i class="el-icon-s-unfold" @click="collapse = !collapse"></i>
        </div>
        <div class="layout-header-right">
          <el-button type="primary" plain size="small" @click="toLogin"
            >登 录</el-button
          >
          <el-button type="success" plain size="small" @click="toRegister"
            >注 册</el-button
          >
        </div>
      </el-header>
      <el-container>
        <div
          class="layout-aside-mask"
          :class="{ 'menu-collapse': collapse }"
          @click="collapse = true"
        ></div>
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
          <el-menu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-document-copy"></i>文档管理
              </template>
              <el-menu-item-group>
                <el-menu-item>
                  <i class="el-icon-document"></i>
                  文章管理
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-message"></i>分类管理
              </template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-container>
          <div id="nvwa"></div>
          <!-- <div id="xingtian"></div> -->
        </el-container>
      </el-container>
    </el-container>
    <div id="xingtian"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      collapse: false,
    };
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
    toRegister() {
      this.$router.push("/register");
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  background: #fff;
  .layout-header {
    display: flex;
    align-items: center;
    padding: 0 40px;
    justify-content: space-between;
    box-shadow: 2px 0px 12px 10px rgba(0, 0, 0, 0.04);
    .layout-header-left {
      font-weight: 600;
      font-size: 16px;
    }
  }
  .layout-aside-mask {
    display: block;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 199;
    background: rgba(0, 0, 0, 0.5);
  }
  .layout-aside-mask.menu-collapse {
    display: none;
  }
}
</style>
