<template>
  <div id="message" class="flex-column-start">
    <div class="messageParent flex-vertical-start">
      <img :src="Message.userAvatar" alt class="leftavatar" height="50" width="50" />
      <div class="rightText .flex-column-start">
        <div class="header">
          <span class="userName">{{Message.userName}}</span>
          <span class="browerType">{{Message.brower}}</span>
        </div>
        <div class="text">{{Message.text}}</div>
        <div class="bottom">
          <i class="el-icon-place"></i>
          <div class="adress">{{Message.adress}}</div>
          <span class="yearMonDay">{{Message.fullDateLike_}}</span>
          <span class="detailSeconds">{{Message.JustTime}}</span>
          <div class="reply" @click="reply" v-show="isReply">回复</div>
          <div class="reply" @click="outReply" v-show="!isReply">收起</div>
        </div>
      </div>
    </div>
    <div class="messageChildren">
      <MessageReply
        v-for="MessageReply in MessageReplys"
        :key="MessageReply.id"
        :MessageReply="MessageReply"
        @isShowMessageBoard="isShowMessageBoard"
        @sendToUserId="getToUserId"
      ></MessageReply>
      <ReplyTextarea :toUserName="ReplyObj.toUserName" v-show="isShowTextArea" :ReplyObj="ReplyObj"></ReplyTextarea>
    </div>
  </div>
</template>

<script>
import { handleList } from "../JS/publicFunction";
export default {
  data() {
    return {
      MessageReplys: handleList(this.Message.replys),
      isShowTextArea: false,
      isReply: true,
      ReplyObj: {
        type: "MessageReply",
        parentId: this.Message._id,
        fromUserId: this.$store.state.user.id,
        toUserId: this.Message.user_id,
        toUserName: this.Message.toUserName
      }
    };
  },
  methods: {
    reply() {
      this.isShowTextArea = true;
      this.isReply = false;
    },
    outReply() {
      this.isShowTextArea = false;
      this.isReply = true;
    },
    isShowMessageBoard(flag) {
      this.isShowTextArea = flag;
    },
    getToUserId(userId) {
      this.ReplyObj.toUserId = userId;
    }
  },
  props: {
    Message: {
      type: Object,
      required: true
    }
  },
  components: {
    MessageReply: () => import("../components/Message_Reply"),
    ReplyTextarea: () => import("../components/reply_Textarea")
  }
};
</script>

<style lang="less" scoped>
#message {
  width: 80vw;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  display: flex;
  padding: 1em;
  border-radius: 5px;
  border-bottom: 1px dotted #000;
  .messageParent {
    img.leftavatar {
      border-radius: 50%;
    }
    .rightText {
      .header {
        .userName {
          color: darkturquoise;
          margin: 0 0.5em;
        }
        .browerType {
          color: darkred;
        }
      }
      .text {
        text-indent: 2em;
        margin: 0.5em 0;
        word-wrap: break-word;
        flex-wrap: wrap;
      }
      .bottom {
        display: inline-flex;
        vertical-align: middle;
        margin-left: 2em;
        height: 2em;
        line-height: 2em;
        i {
          height: 2em;
          line-height: 2em;
        }
        .adress {
          margin-left: 0.1em;
        }
        .yearMonDay {
          margin: 0 0.3em 0 0.5em;
        }
        .detailSeconds {
        }
        .reply {
          margin-left: 0.8em;
          color: darkcyan;
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>