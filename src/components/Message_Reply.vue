<template>
  <div id="MessageReply" class="flex-vertical-start">
    <img :src="MessageReply.fromUserAvatar" alt class="avatar" height="40" width="40" />
    <div class="rightReply">
      <div class="header">
        <span class="userName">{{MessageReply.fromUserName}}</span>
        <span class="reply">回复</span>
        <span class="userName">{{MessageReply.toUserName}}</span>
        <span class="MessageReplyText">{{MessageReply.text}}</span>
      </div>
      <div class="timeBottom">
        <i class="el-icon-place"></i>
        <span class="adress">{{MessageReply.adress}}</span>
        <span class="browerType">{{MessageReply.browser}}</span>
        <span class="yearMonDay">{{MessageReply.fullDateLike_}}</span>
        <span class="detailSeconds">{{MessageReply.JustTime}}</span>
        <span class="reply" v-show="!isShowTextArea" @click="reply">回复</span>
        <span class="reply" v-show="isShowTextArea" @click="outReply">收起</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowTextArea: false
    };
  },
  props: {
    MessageReply: {
      type: Object,
      required: true
    }
  },
  methods: {
    reply() {
      this.isShowTextArea = true;
      this.$emit("isShowMessageBoard", this.isShowTextArea);
      this.$emit("sendToUserId", this.MessageReply.fromUserId);
    },
    outReply() {
      this.isShowTextArea = false;
      this.$emit("isShowMessageBoard", this.isShowTextArea);
    }
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
#MessageReply {
  margin: 0.5em 0;
  margin-left: 3em;
  .rightReply {
    margin-left: 1em;
    .header {
      margin-top: 0.2em;
      .userName {
        font-size: 1.1em;
      }
      .reply {
        margin: 0 0.5em;
        font-size: 0.9em;
      }
      .MessageReplyText {
        margin-left: 1em;
      }
    }
    .timeBottom {
      margin-top: 0.75em;
      margin-left: 1em;
      i {
        margin-right: 0.3em;
      }
      .adress {
        font-size: 0.9em;
      }
      .browerType {
        margin-left: 0.2em;
        color: darkred;
        font-size: 0.8em;
      }
      .yearMonDay {
        margin: 0 0.35em 0 0.6em;
        font-size: 0.9em;
      }
      .detailSeconds {
        font-size: 0.9em;
      }
      .reply {
        margin-left: 1em;
        color: darkcyan;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>