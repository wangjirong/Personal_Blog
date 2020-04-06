<template>
  <div id="leaveMessage">
    <div class="container">
      <div class="leaveboard">
        <h3>留言板</h3>
        <h5>就让我们一直走下去，直到世界一片纯白。</h5>
        <textarea v-model="message.text"></textarea>
        <button @click="sendMessage">提交留言</button>
      </div>
      <div class="othersmessage">
        <Message v-for="Message in Messages" :key="Message.id" :Message="Message"></Message>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import {
  getYearMonDay,
  getDetailTime,
  getBrowerType
} from "../../getLocaltionBrowser";
export default {
  inject: ["reload"],
  name: "leaveMessage",
  components: {
    Message: () => import("../../components/Message")
  },
  data() {
    return {
      message: {
        //openId，QQ用户唯一标识符
        user_id: this.$store.state.user.id,
        text: "",
        adress: "",
        browserType: ""
      },
      Messages: []
    };
  },
  methods: {
    async sendMessage() {
      if (!this.message.user_id) Message.error("请先登录!");
      else if (!this.message.text) Message.error("请先输入内容！");
      else {
        this.message.browserType = getBrowerType();
        const res = await this.$axios.post(
          "/api/message/leaveMessage",
          this.message
        );
        console.log(this.message);
        Message.success("留言成功");
        this.message.text = null;
        this.reload();
      }
    },
    async getAllMessages() {
      const res = await this.$axios.get("/api/message/getAllMessages");
      const Messages = res.data;
      Messages.forEach(message => {
        message.yearMonDay = getYearMonDay(message.date);
        message.detailSeconds = getDetailTime(message.date);
      });
      this.Messages = Messages;
      console.log(this.Messages);
    },
    //获取定位城市
    getLocation() {
      const myCity = new BMap.LocalCity();
      myCity.get(result => {
        this.message.adress = result.name;
      });
    }
  },
  created() {
    this.getLocation();

    this.getAllMessages();
  }
};
</script>
<style lang="less" scoped>
#leaveMessage {
  .container {
    background: url("../../assets/img/leaveMessage_bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    width: 100vw;
    background-attachment: fixed;
    .leaveboard {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      width: 80vw;
      margin: 1rem auto;
      margin-bottom: 5em;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;
      padding: 1em 0;
      h3 {
        font-size: 0.25rem;
        width: 100%;
        text-align: center;
        color: #000;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      h5 {
        font-size: 0.15rem;
        color: #000;
        width: 100%;
        text-align: center;
        margin: 1em auto;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      textarea {
        margin-left: 10%;
        border: 1px solid #ccc;
        background-color: #fff;
        width: 85%;
        height: 60%;
        font-size: 0.2rem;
        text-indent: 2em;
        padding: 0.5em;
        height: 2rem;
        margin: 0.5em auto;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      button {
        font-size: 0.2rem;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        color: #fff;
        padding: 0.08rem;
        border-radius: 2px;
        background-color: limegreen;
        border: 1px solid #fff;
        margin: 1em 5em;
        &:hover {
          cursor: pointer;
          background-color: darkred;
        }
      }
    }
    .othersmessage{
      margin-bottom: 2em;
    }
  }
}
@media screen and (max-width: 500px) {
  #leaveMessage {
    .container {
      background: url("../../assets/img/mobile/mobile_bg3.jpg") fixed center
        center no-repeat;
      background-size: 100% 100%;
      .leaveboard {
        height: 4rem;
        h3 {
          font-size: 0.16rem;
        }
        h5 {
          font-size: 0.12rem;
        }
        textarea {
          height: 1.6rem;
          font-size: 0.12rem;
          margin: 1em auto;
        }
        button {
          font-size: 0.14rem;
          border-radius: 6px;
        }
      }
    }
  }
}
</style>