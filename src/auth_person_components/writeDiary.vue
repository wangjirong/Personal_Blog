<template>
  <div id="writeDiary">
    <elHeader class="elHeader"></elHeader>
    <div class="container">
      <div class="poeam">
        <p>红酥手。黄滕酒。满城春色宫墙柳。东风恶。欢情薄。一怀愁绪，几年离索。错错错。</p>
        <p>春如旧。人空瘦。泪痕红浥鲛绡透。桃花落。闲池阁。山盟虽在，锦书难托。莫莫莫。</p>
      </div>
      <div class="context">
        <textarea v-model="text"></textarea>
        <el-upload
          action="#"
          multiple
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :http-request="handleUpload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <button @click="submitDiary">提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  name: "writeDiary",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      text: "",
      imgList: []
    };
  },
  components: {
    elHeader: () => import("../components/header")
  },
  methods: {
    handleUpload(params) {
      this.imgList.push(params.file);
      console.log(this.imgList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitDiary() {
      let formData = new FormData();
      formData.append("text", this.text);

      this.imgList.forEach(img => {
        formData.append("files", img);
      });
      this.$axios
        .post("/api/diary/addDiary", formData)
        .then(res => {
          Message.success("上传成功！");
          this.$router.push('/menu/diary');
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
</script>
<style lang="less" scoped>
#writeDiary {
      overflow-x: hidden;
  .elHeader {
    width: 100vw;
    position: fixed;
    opacity: 0.9;
  }
  .container {
    background: url("../assets/img/write_diary_bg.jpg") no-repeat fixed center
      center/cover;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .poeam {
      margin-top: 1rem;
      p {
        font-size: 0.18rem;
        color: teal;
        margin-bottom: 0.2rem;
      }
    }
    .context {
      width: 70%;
      height: 60%;
      background-color: snow;
      opacity: 0.9;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0.4rem;
      textarea {
        width: 80%;
        height: 1.2rem;
        padding: 0.1rem;
        margin-bottom: 0.2rem;
        text-indent: 0.32rem;
        font-size: 0.16rem;
        border-radius: 5px;
      }
      button {
        font-size: 0.18rem;
        padding: 0.1rem 0.15rem;
        margin: 0.2rem 0 0;
        border: 1px #fff solid;
        border-radius: 5px;
        &:hover {
          background-color: darkred;
          color: #fff;
          cursor: pointer;
        }
      }
    }
  }
}
</style>