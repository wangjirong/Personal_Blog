<template>
  <div class="commentReply flex-vertical-start">
    <img :src="Reply.fromUserAvatar" alt class="avatar" width="40" height="40" />
    <div class="rightReply">
      <div class="header">
        <span class="userName">{{Reply.fromUserName}}</span>
        <span class="reply">回复</span>
        <span class="userName">{{Reply.toUserName}}</span>
        <span class="replyText">{{Reply.text}}</span>
      </div>
      <div class="time">
        <span class="yearMonDay">{{Reply.yearMonDay}}</span>
        <span class="detailSeconds">{{Reply.detailSenonds}}</span>
        <span class="replyBtn" v-show="!isreply" @click="reply">回复</span>
        <span class="replyBtn" v-show="isreply" @click="outReply">收起</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isreply: false
    };
  },
  props: {
    Reply: {
      type: Object,
      required: true
    }
  },
  methods: {
    reply() {
      this.isreply = true;
      this.$emit("isTextAreaShow", this.isreply);
    },
    outReply() {
      this.isreply = false;
      this.$emit("isTextAreaShow", this.isreply);
    }
  }
};
</script>
<style lang="less" scoped>
.commentReply {
  margin: 1em 0;
  margin-left: 2em;
  .rightReply {
    margin-left: 1em;
    .header {
      .userName {
        color: darkcyan;
      }
      .reply {
        margin: 0 0.5em;
      }
      .replyText {
        margin-left: 1em;
      }
    }
    .time {
      margin-top: 0.5em;
      text-indent: 1em;
      .yearMonDay {
      }
      .detailSeconds {
        margin: 0 0.5em;
      }
      .replyBtn {
        color: #01aaed;
        margin-left: 0.5em;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>