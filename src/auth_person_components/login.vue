<template>
  <div id="login">
    <div class="container">
      <input type="text" placeholder="请输入用户名" class="userName" v-model="manager.userName" />
      <input type="password" placeholder="请输入密码" class="pwd" v-model="manager.password" />
      <div class="verificationCode">
        <input type="text" placeholder="请输入验证码" v-model="inputCode" />
        <span @click="getVerificationCode">{{verificationCode}}</span>
      </div>
      <div class="loginRegister">
        <button @click="register">注册</button>
        <button @click="login">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import jwtDecode from "jwt-decode";
export default {
  name: "login",
  data() {
    return {
      verificationCode: "",
      manager: {
        userName: "",
        password: ""
      },
      inputCode: ""
    };
  },
  methods: {
    getVerificationCode() {
      const letter = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z"
      ];
      let verificationCode = "";
      for (let i = 0; i < 4; i++) {
        let randomNum = this.getRandomNumber();
        verificationCode += letter[randomNum];
      }
      this.verificationCode = verificationCode;
    },
    getRandomNumber() {
      return Math.floor(Math.random() * 36);
    },
    register() {
      this.$router.push("/auth_personal/register");
    },
    login() {
      if (this.manager.userName === "") Message.warning("用户名不能为空！");
      if (this.manager.password === "") Message.warning("密码不能为空！");
      if (this.manager.inputCode === "") Message.warning("验证码不能为空！");
      if (this.inputCode != this.verificationCode) {
        Message.warning("验证码错误，请重新输入！");
        this.getVerificationCode();
      } else {
        this.$axios
          .post("/api/manager/login", this.manager)
          .then(res => {
            const eleToken = res.data.eleToken;
            const manager = jwtDecode(eleToken);
            sessionStorage.setItem("eleToken", eleToken);
            this.$store.dispatch("setManager", manager);
            Message.success("登录成功！");
            this.$router.push("/auth_personal/manage");
          })
          .catch(error => {
            Message.error(error);
          });
      }
    }
  },
  mounted() {
    this.getVerificationCode();
  }
};
</script>

<style lang="less" scoped>
#login {
  height: 100vh;
  width: 100vw;
  position: fixed;
  background: url("../assets/manage/login_bg1.jpg") fixed no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: flex-start;
    opacity: 0.8;
    .userName,
    .pwd {
      padding: 0.1rem 0.2rem;
      margin-bottom: 0.1rem;
      width: 20vw;
      border: 1px solid #fff;
      border-radius: 5px;
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
    }
    .verificationCode {
      display: flex;
      margin-bottom: 0.1rem;
      width: 100%;
      input {
        padding: 0.05rem 0.1rem;
        width: 12vw;
        border: 1px solid #fff;
        border-radius: 5px;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        margin-right: 0.2rem;
      }
      span {
        display: inline-block;
        background-color: lightgreen;
        width: 7vw;
        height: 5vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        &:hover {
          cursor: pointer;
        }
      }
    }
    .loginRegister {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding: 0 0.2rem;
      button {
        padding: 0.05rem 0.3rem;
        font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
          "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
        font-size: 0.18rem;
        border: 1px solid #fff;
        border-radius: 5px;
        &:hover {
          cursor: pointer;
          background-color: lime;
          color: #fff;
        }
      }
      button:nth-child(1) {
        margin-right: 1rem;
      }
    }
  }
}
</style>