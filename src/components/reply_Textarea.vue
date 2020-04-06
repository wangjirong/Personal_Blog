<template>
  <div class="replyTextarea flex-column-start">
    <textarea name id :placeholder="`回复 ${ReplyObj.toUserName}`" v-model="newReply.text"></textarea>
    <button @click="senReply">回复</button>
  </div>
</template>

<script>
import { getBrowerType } from "../getLocaltionBrowser";
import { Message } from "element-ui";
export default {
  inject: ["reload"],
  data() {
    return {
      newReply: {
        type: this.ReplyObj.type, //MessageReply or
        parentId: this.ReplyObj.parentId,
        fromUserId: this.ReplyObj.fromUserId,
        toUserId: this.ReplyObj.toUserId,
        text: "",
        adress: "",
        browser: ""
      }
    };
  },
  props: {
    ReplyObj: {
      type: Object,
      required: true
    }
  },
  methods: {
    async senReply() {
      if (!this.ReplyObj.fromUserId) Message.error("请先登录");
      else if (!this.newReply.text) Message.error("请输入内容");
      else {
        //回复类型为留言类型
        if (this.newReply.type === "MessageReply") {
          const res = await this.$axios.post(
            "/api/message/sendMessageReply",
            this.newReply
          );
          if (res.data) Message.success("留言回复成功");
        } else if (this.newReply.type === "CommentReply") {
          const article_id = this.$route.query.id;
          const res = await this.$axios.post(
            `/api/comment/sendCommentReply?article_id=${article_id}`,
            this.newReply
          );
          if (res.data) Message.success("评论回复成功");
        }
      }

      this.reload();
    }
  },
  created() {
    const myCity = new BMap.LocalCity();
    let _this = this;
    myCity.get(result => {
      _this.newReply.adress = result.name;
    });
    this.newReply.browser = getBrowerType();
  }
};
</script>
<style lang="less" scoped>
.replyTextarea {
  margin-left: 2em;
  textarea {
    height: 5em;
    width: 40em;
    padding: 0.5em;
  }
  button {
    border: none;
    background: darkred;
    color: #fff;
    padding: 0.2em 0.6em;
    margin-top: 0.5em;
    border-radius: 5px;
    &:hover {
      outline: none;
      cursor: pointer;
      background-color: lime;
    }
  }
}
</style>