<template>
  <div id="diary" class="background">
    <div  class="cover-bg">
      <img src="" alt="" id="diary-bg">
    </div>
    <div class="container">
      <div class="context">
        <el-timeline>
          <el-timeline-item
            v-for="item in diaryList"
            :key="item.id"
            :timestamp="item.DetailTime"
            placement="top"
            type="success"
          >
            <el-card style="zIndex:100">
              <p>{{item.text}}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { handleList, getBgCoverImg } from "../../JS/publicFunction";
import { setBackgroundByWidth } from "../../JS/setBackgroundImage";
export default {
  name: "diary",
  data() {
    return {
      diaryList: []
    };
  },
  async created() {
    await this.getAllDiary();
  },
  methods: {
    async getAllDiary() {
      const res = await this.$axios.get("/api/diary/getAllDiary");
      this.diaryList = handleList(res.data);
    }
  },
  mounted() {
    this.$nextTick(() => {
      const bigImageURL = getBgCoverImg("PC/Menu", `diaryPage_big_bg_img.jpg`);
      const smallImageURL = getBgCoverImg(
        "Mobile/Menu",
        `diaryPage_small_bg_img.jpg`
      );
      setBackgroundByWidth("diary-bg", bigImageURL, smallImageURL);
    });
  }
};
</script>
<style lang="less" scoped>
#diary {
  width: 100vw;
  text-align: center;
  .context {
    width: 70%;
    background: rgba(255, 255, 255, 0.8);
    margin: 1rem auto;
    border-radius: 10px;
    text-align: left;
    padding: 0.5rem;
  }
}
@media screen and (max-width: 500px) {
  #diary {
    
  }
}
</style>