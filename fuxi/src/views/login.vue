<template>
  <div class="loginForm-container">
    <div class="loginForm">
      <div class="loginHead loginTitle">登录</div>
      <el-form>
        <el-form-item>
          <el-input v-model="username" placeholder="请输入用户名/手机/邮箱">
            <template slot="prepend">
              <i class="el-icon-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="small-d">
          <el-input v-model="password" placeholder="请输入密码" show-password>
            <template slot="prepend">
              <i class="el-icon-lock"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item v-model="rememberMe" class="small-d">
          <el-checkbox>记住我？</el-checkbox>
          <router-link
            to="forgetPassword"
            class="link form-check-label d-inline-block"
          >
            忘记密码？
          </router-link>
        </el-form-item>
        <el-form-item class="small-d">
          <el-button
            type="success"
            class="width-8 line-input-button"
            @click="login"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <router-link to="/register" class="link text-center">
            还没有注册？ 申请注册
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "LOGIN",
  computed: {},
  data: function () {
    return {
      username: "",
      password: "",
      rememberMe: "",
    };
  },
  methods: {
    async login() {
      const request = {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe,
      };
      try {
        const { code, result } = await this.$axios.$post(
          "/api/user/login",
          request
        );
        if (code === "000") {
          this.$store.commit("setLogin", result);
        }
        const uid = this.$store.state.userInfo.uid;
        localStorage.setItem("userInfo", JSON.stringify(result.userInfo));
        localStorage.setItem("token", result.token);
        this.$router.push(`/person/${uid}`);
      } catch (err) {
        this.$message.error(err.message);
      }
    },
  },
};
</script>
<style scoped>
.loginForm-container {
  display: flex;
  width: 100%;
  align-items: center;
  height: 100vh;
  justify-content: center;
}
.loginForm {
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  text-align: center;
}
.el-form {
  width: 80%;
  align-self: center;
}
.small-d {
  margin-bottom: 0px;
}
.font-8 {
  font-size: 0.8rem;
}
.input-group-text {
  color: #41b904;
  font-size: 1.1rem;
  background-color: white;
  border-right: none;
}
.link {
  text-decoration: none;
  color: #8fc475 !important;
}
.link:hover {
  color: #41b904 !important;
}
.form-check-label {
  margin-top: 2px;
}

.loginHead {
  text-align: center;
  border-radius: 0.5rem 0.5rem 0 0;
}

.login-item {
  margin: 0 auto;
  width: 80%;
  font-size: 1.1rem;
}
.width-8 {
  width: 80%;
  margin: 0 auto;
}
.outline-none {
  border-left: none;
}
.line-text-middle {
  display: inline-block;
  line-height: 2.5rem;
  height: 100%;
  font-size: 1.1rem;
  font-weight: bold;
}
.line-input-middle {
  display: inline-block;
  line-height: 1.2rem;
  height: 100%;
  font-size: 1.1rem;
}

.loginTitle {
  font-size: 1.5rem;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  line-height: 3.2rem;
}

.line-input-button {
  font-size: 1.2rem;
  padding: 0.5rem;
}
#rememberMe {
  margin-top: 2px;
}

@media (min-width: 30rem) {
  .loginForm {
    background-color: white;
    border: 1px solid rgb(202, 201, 201);
    border-radius: 0.5rem;
    max-width: 30rem;
    box-shadow: rgb(243, 239, 239);
  }
}
</style>
