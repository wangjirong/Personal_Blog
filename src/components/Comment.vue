<template>
  <div class="comment">
    <div class="commentParent flex-vertical-start">
      <img :src="comment.userAvatar" alt class="avatar" width="50" height="50" />
      <div class="rightText">
        <div class="userName">{{comment.userName}}</div>
        <div class="commentText">{{comment.text}}</div>
        <div class="time">
          <span class="year">{{comment.fullDateLike_}}</span>
          <span class="seconds">{{comment.JustTime}}</span>
          <span class="reply" v-show="isReply" @click="reply">回复</span>
          <span class="reply" v-show="!isReply" @click="outReply">收起</span>
        </div>
      </div>
    </div>
    <div class="commentChildren">
      <CommentReply
        v-for="reply in replys"
        :key="reply.id"
        :Reply="reply"
        @isTextAreaShow="isTextAreaShow"
      ></CommentReply>
      <ReplyTextarea v-show="textareaShow" :toUserName="ReplyObj.toUserName" :ReplyObj="ReplyObj"></ReplyTextarea>
    </div>
  </div>
</template>

<script>
import { handleList } from "../publicFunction";
export default {
  data() {
    return {
      textareaShow: false,
      isReply: true,
      replys: handleList(this.comment.replys),
      ReplyObj: {
        type: "CommentReply",
        parentId: this.comment._id,
        fromUserId: this.$store.state.id || "1F75CE8E2AF350BE33F265A379BF1B4C",
        toUserId: this.comment.userId,
        toUserName: this.comment.toUserName
      }
    };
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    reply() {
      this.isReply = false;
      this.textareaShow = true;
    },
    outReply() {
      this.isReply = true;
      this.textareaShow = false;
    },
    isTextAreaShow(flag) {
      this.textareaShow = flag;
    }
  },
  components: {
    CommentReply: () => import("../components/Comment_Reply"),
    ReplyTextarea: () => import("../components/reply_Textarea")
  }
};
</script>

<style lang="less" scoped>
.comment {
  padding: 0.5em;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-bottom: dotted 1px #000;
  .commentParent {
    img.avatar {
      border-radius: 50%;
      margin-right: 1em;
    }
    .rightText {
      .userName {
        color: #01aaed;
        font-size: 0.18rem;
      }
      .commentText {
        text-indent: 1em;
        margin: 0.5em 0;
      }
      .time {
        text-indent: 1em;
        .year {
        }
        .seconds {
          margin: 0 1em 0 0.5em;
        }
        .reply {
          color: darkcyan;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>