<template>
  <div id="register" class="background cover-size fixed">
    <div class="cover-bg" >
      <img src="" alt="" id="register-bg">
    </div>
    <ul class="container flex-just-column">
      <li>
        <input type="text" placeholder="请输入用户名" v-model="manager.userName" />
      </li>
      <li>
        <input type="password" placeholder="请输入密码" v-model="manager.password" />
      </li>
      <li>
        <input type="password" placeholder="确认密码" v-model="pwd2" />
      </li>
      <li>
        <input type="text" placeholder="请输入手机号码" v-model="manager.cellphone" />
      </li>
      <li class="emial" style="display:flex">
        <input
          type="email"
          placeholder="请输入邮箱"
          v-model="manager.email"
          style="width:60%;margin-right:.2rem"
        />
        <button @click="getVerificationCode" id="verificationCode">发送验证码</button>
      </li>
      <li>
        <input
          type="text"
          placeholder="请输入邀请码(必填)"
          v-model="manager.invitationCode"
          style="marginBottom:.15rem"
        />
        <input type="text" placeholder="请输入验证码(必填)" v-model="verificationCode" />
      </li>
      <li>
        <button @click="register" class="register">注册</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { getBgCoverImg } from "../JS/publicFunction";
import { setBackgroundByWidth } from "../JS/setBackgroundImage";
import { Message } from "element-ui";
export default {
  name: "register",
  data() {
    return {
      manager: {
        userName: "",
        password: "",
        email: "",
        cellphone: "",
        invitationCode: "" //邀请码
      },
      pwd2: "",
      verificationCode: "", //前端监听的输入框输入的注册码
      authVerificationCode: "" //后端返回的注册码
    };
  },
  methods: {
    async getVerificationCode() {
      if (!this.manager.email) Message.warning("邮箱不能为空！");
      else {
        const regx = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        const isEmail = regx.test(this.manager.email);
        if (isEmail) {
          let verBtn = document.getElementById("verificationCode");
          let seconds = 45;
          let timer = setInterval(() => {
            verBtn.innerHTML = --seconds;
            if (seconds === 0) {
              clearInterval(timer);
              verBtn.innerHTML = "发送验证码";
              console.log("到0了");
            }
          }, 1000);
          const res = await this.$axios.post("/api/manager/email", {
            email: this.manager.email
          });
          this.authVerificationCode = res.data;
        } else Message.error("邮箱格式不合法！");
      }
    },
    async register() {
      if (!this.manager.userName) Message.warning("用户名不能为空！");
      if (!this.manager.password) Message.warning("密码不能为空！");
      if (!this.manager.email) Message.warning("邮箱不能为空！");
      if (!this.manager.cellphone) Message.warning("手机电话不能为空！");
      if (!this.manager.invitationCode) Message.warning("邀请码不能为空！");
      if (this.manager.password != this.pwd2)
        Message.error("两次输入密码不一致");
      else if (this.authVerificationCode != this.verificationCode)
        Message.error("验证码不正确");
      else {
        const res = await this.$axios.post(
          "/api/manager/register",
          this.manager
        );
        //邀请码错误
        if (res.status === 222) Message.error("邀请码错误");
        else {
          Message.success("注册成功");
          Message.success("正在跳转到登录页面");
          this.$router.push("/auth_personal/login");
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const bigImageURL = getBgCoverImg(
        "PC/Manage",
        `registerPage_big_bg_img.jpg`
      );
      const smallImageURL = getBgCoverImg(
        "Mobile/Manage",
        `registerPage_small_bg_img.jpg`
      );
      setBackgroundByWidth("register-bg", bigImageURL, smallImageURL);
    });
  }
};
</script>
<style lang="less" scoped>
#register {
  overflow-y: hidden;
  ul.container {
    width: 30%;
    margin: 1.5rem auto;
    opacity: 0.7;
    li {
      margin-bottom: 0.15rem;
      text-align: center;
      input {
        padding: 0.1rem 0.2rem;
        width: 100%;
        border-radius: 5px;
        border: 1px solid #fff;
      }
      #verificationCode {
        padding: 0.1rem 0.2rem;
        border-radius: 5px;
        border: 1px solid #fff;
        background-color: darkred;
        color: #fff;
        &:hover {
          background-color: lime;
        }
      }
      .register {
        width: 60%;
        padding: 0.1rem 0.2rem;
        border-radius: 5px;
        border: 1px solid #fff;
        background-color: yellowgreen;
        color: #fff;
        &:hover {
          background-color: lightpink;
        }
      }
    }
  }
}
</style>