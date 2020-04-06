<template>
  <div id="manager" class="background cover-size">
    <div class="leftnav flex-column">
      <div class="manager-info flex-column">
        <img src="../assets/img/avatar/avatar2.jpg" alt />
        <h4 class="userName">manager:{{manager.userName}}</h4>
        <h5 class="email">email:{{manager.email}}</h5>
        <a href="/auth_personal/login" @click="outLogin">退出登录</a>
      </div>
      <ul class="flex-column">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/auth_personal/manage/blogsList">博客</router-link>
        </li>
        <li>
          <router-link to="/auth_personal/manage/diary">日记</router-link>
        </li>
      </ul>
    </div>
    <router-view class="right-eara"></router-view>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  data() {
    return {
      manager: this.$store.state.manager
    };
  },
  methods: {
    outLogin() {
      sessionStorage.removeItem("eleToken");
      this.$store.dispatch("setManager", null);
      Message.success("返回登录页面");
    }
  }
};
</script>

<style lang="less" scoped>
#manager {
  background: url("../assets/manage/manage_bg.jpg");
  .leftnav {
    width: 15vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    > ul {
      > li {
        a {
          color: #666;
          font-size: 0.2rem;
          display: inline-block;
          padding: 1em 3em;
          &:hover {
            background-color: darkred;
            color: lime;
          }
        }
      }
    }
    .manager-info {
      margin-bottom: 3em;
      margin-top: -10em;
      img {
        height: 1rem;
        width: 1rem;
        border-radius: 50%;
      }
      h4 {
        font-size: 0.18rem;
        color: #666;
        margin: 1em 0;
      }
      h5 {
        font-size: 0.18rem;
        color: #666;
      }
      a {
        color: #fff;
        margin-top: 1em;
        padding: 0.6em 1em;
        background-color: limegreen;
        border-radius: 5px;
        &:hover {
          background-color: maroon;
        }
      }
    }
  }
  .right-eara {
    width: 80vw;
    margin-left: 20vw;
    border-radius: 10px;
    opacity: 0.8;
    margin-top: 10vh;
  }
}
</style>