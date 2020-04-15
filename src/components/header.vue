<template>
  <div id="elHeader">
    <ul class="navbar flex-vertical">
      <li v-for="(item,index) in Menu" :key="index" class="flex-vertical">
        <router-link
          :to="item.href"
          class="menu-item"
        >{{item.title}}</router-link>
      </li>
    </ul>
    <div class="qq">
      <img
        class="avatar"
        src="../assets/img/qq.png"
        alt
        width="30"
        height="30"
        @click="QQ_Login"
        v-show="!isLogin"
      />
      <img
        class="avatar"
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
      Menu: [
        {
          title: "首页",
          href: "/"
        },
        {
          title: "博客",
          href: "/menu/blogs"
        },
        {
          title: "留言",
          href: "/menu/leaveMessage"
        },
        {
          title: "日记",
          href: "/menu/diary"
        },
        {
          title: "关于",
          href: "/menu/about"
        },
        {
          title: "链接",
          href: "/menu/otherLink"
        }
      ],
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
    },
  },
  created() {
    this.isQQ_Login();
  }
};
</script>
<style lang="less" >
.router-link-exact-active {
  background-color: limegreen;
  color: darkred;
}
</style>