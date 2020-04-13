<template>
  <div id="writeDiary" class="background cover-size flex-column">
    <elHeader class="header" />
    <div class="poeam">
      <p>红酥手。黄滕酒。满城春色宫墙柳。东风恶。欢情薄。一怀愁绪，几年离索。错错错。</p>
      <p>春如旧。人空瘦。泪痕红浥鲛绡透。桃花落。闲池阁。山盟虽在，锦书难托。莫莫莫。</p>
    </div>
    <div class="context flex-column-start">
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
</template>

<script>
import { Message } from "element-ui";
import { getBgCoverImg } from "../publicFunction";
import { setBackgroundByWidth } from "../setBackgroundImage";
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
    async submitDiary() {
      let formData = new FormData();
      formData.append("text", this.text);

      this.imgList.forEach(img => {
        formData.append("files", img);
      });
      const res = await this.$axios.post("/api/diary/addDiary", formData);
      Message.success("上传成功！");
      this.$router.push("/auth_personal/manage/diary");
    }
  },
  mounted() {
    this.$nextTick(() => {
      const bigImageURL = getBgCoverImg(
        "PC/Manage",
        `writeDiaryPage_big_bg_img.jpg`
      );
      const smallImageURL = getBgCoverImg(
        "Mobile/Manage",
        `writeDiaryPage_small_bg_img.jpg`
      );
      setBackgroundByWidth("writeDiary", bigImageURL, smallImageURL);
    });
  }
};
</script>
<style lang="less" scoped>
#writeDiary {
  background: url("../assets/img/write_diary_bg.jpg");
  .header {
    position: fixed;
    top: 0;
    left: 0;
  }
  .poeam {
    margin: 3em 0 1em 0;
    p {
      font-size: 0.18rem;
      color: teal;
      margin-bottom: 1em;
    }
  }
  .context {
    width: 70%;
    height: 60%;
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 10px;
    padding: 0.4rem;
    textarea {
      width: 90%;
      height: 1.6rem;
      padding: 0.1rem;
      margin-bottom: 0.2rem;
      text-indent: 2em;
      font-size: 0.16rem;
      border-radius: 5px;
    }
    button {
      font-size: 0.18rem;
      padding: 0.1rem 0.15rem;
      margin: 0.2rem 0 0;
      border: 1px #fff solid;
      border-radius: 5px;
      background-color: lime;
      color: #fff;
      &:hover {
        background-color: darkred;
      }
    }
  }
}
</style>