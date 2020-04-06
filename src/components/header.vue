<template>
  <div id="elHeader">
    <ul class="navbar">
      <li>
        <router-link to="/">首页</router-link>
      </li>
      <li>
        <router-link to="/menu/blogs">博客</router-link>
      </li>
      <li>
        <router-link to="/menu/leaveMessage">留言</router-link>
      </li>
      <li>
        <router-link to="/menu/diary">日记</router-link>
      </li>
      <li>
        <router-link to="/menu/about">关于</router-link>
      </li>
      <li>
        <router-link to="/menu/otherLink">链接</router-link>
      </li>
    </ul>
    <div class="qq">
      <img
        src="../assets/img/qq.png"
        alt
        width="30"
        height="30"
        @click="QQ_Login"
        v-show="!isLogin"
      />
      <img
        :src="user.avatar"
        alt="头像"
        :title="user.userName"
        @click="outLogin"
        v-show="isLogin"
        width="30"
        height="30"
      />
    </div>
    <a class="githubLink" href="https://github.com/wangjirong/Personal_Blog">
      <img src="../assets/img/github.png" alt="Github" title="Github" width="30" height="30" />
    </a>
  </div>
</template>

<script>
import JSONP from "jsonp";
import { Message } from "element-ui";
export default {
  name: "Header",
  inject: ["reload"],
  data() {
    return {
      isLogin: false,
      user: {
        userName: "",
        avatar: require("../assets/img/avatar/avatar2.jpg")
      },
      oAuth_uri: "https://github.com/login/oauth/authorize",
      client_id: "8a2dab880fac3819c843",
      GitHub_redirect_uri: "http://localhost:8080/oAuth/github_redirect",
      QQ_appID: "101862127",
      QQ_redirect_uri: "http://cirev.cn/oAuth/qq_redirect",
      get_user_info: "https://graph.qq.com/user/get_user_info"
    };
  },
  methods: {
    async isQQ_Login() {
      if (QC.Login.check()) {
        //获取access_token和openId
        QC.Login.getMe(async (openId, accessToken) => {
          //获取user_info
          const res = await this.$axios.get(
            `/api/user/qq_oAuth?access_token=${accessToken}&openId=${openId}`
          );
          this.isLogin = true;
          this.user.userName = res.data.userName;
          this.user.avatar = res.data.avatar;
          this.$store.dispatch("setUser", res.data);
        });
      }
    },
    GitHubLogin() {
      const isLogin = this.$store.getters.getUserIsAuth;
      //未登录，进行github授权登录
      if (!isLogin) {
        sessionStorage.setItem("redirect", this.$route.path);
        document.location.href = `${this.oAuth_uri}?client_id=${this.client_id}&redirect_uri=${this.GitHub_redirect_uri}`;
      }
    },
    QQ_Login() {
      QC.Login.showPopup({
        appId: this.QQ_appID,
        redirectURI: this.QQ_redirect_uri
      });
    },
    outLogin() {
      QC.Login.signOut();
      this.reload();
    }
  },
  created() {
    this.isQQ_Login();
  }
};
</script>

<style lang="less" scoped>
#elHeader {
  display: flex;
  align-items: center;
  // justify-content: center;
  background-color: #484348;
  background: rgba(48, 43, 48, .95);
  // position: fixed;
  width: 100vw;
  .logo {
    font-size: 0.2rem;
    color: #fff;
    position: absolute;
    top: 50%;
    margin-top: -0.1rem;
    left: 10%;
    font-family: "Helvetica Neue";
  }
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    // margin: 0 1rem 0 3.3rem;
    li {
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        font-size: 0.16rem;
        padding: 0.2rem 0.32rem;
        color: #fff;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        &:hover {
          background-color: limegreen;
          color: darkred;
        }
        &:active {
          background-color: limegreen;
        }
      }
    }
  }
  .qq {
    position: absolute;
    right: 10em;
    z-index: 10;
    opacity: 1;
    img {
      border-radius: 50%;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .githubLink {
    position: absolute;
    right: 3em;
    &:hover {
      cursor: pointer;
    }
  }
}
@media only screen and (max-width: 500px) {
  #elHeader {
    align-items: flex-start;
    .logo {
      display: none;
    }
    ul {
      width: 85%;
      margin-left: 0;
      li {
        flex: 1;
        a {
          width: 100%;
          display: block;
          font-size: 0.1rem;
        }
      }
    }
    .qq {
      right: 0.75em;
      top: 1.2em;
      img {
        height: 2em;
        width: 2em;
      }
    }
    .githubLink {
      display: none;
    }
  }
}
</style>