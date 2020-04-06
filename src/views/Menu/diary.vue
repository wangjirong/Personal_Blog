<template>
  <div id="diary">
    <div class="container">
      <div class="context">
        <el-timeline>
          <el-timeline-item
            v-for="item in diaryList"
            :key="item.id"
            :timestamp="item.date"
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
export default {
  name: "diary",
  data() {
    return {
      diaryList: []
    };
  },
  created() {
    this.getAllDiary();
  },
  methods: {
    async getAllDiary() {
      const res = await this.$axios.get("/api/diary/getAllDiary");
      this.diaryList = res.data;
      this.diaryList.forEach(diary => {
        let time = new Date(diary.date);
        let month = time.getMonth() + 1;
        let realMonth = month > 9 ? month : "0" + month;
        let day = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
        diary.date = time.getFullYear() + "-" + realMonth + "-" + day;
      });
    }
  }
};
</script>
<style lang="less" scoped>
#diary {
  .container {
    background: url("../../assets/img/diary_bg1.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    width: 100vw;
    background-attachment: fixed;
    text-align: center;
    .context {
      width: 60%;
      background: rgba(255, 255, 255, 0.8);
      margin: 1.2rem auto;
      border-radius: 10px;
      text-align: left;
      padding: 0.5rem;
      transform: translateZ(0);
      .timeline {
        position: relative;
        #line {
          border: 0.02rem solid lightcoral;
          background-color: lightcoral;
          height: 3.5rem;
          width: 0;
          position: absolute;
          left: 0.72rem;
          top: 0.7rem;
        }
        ul {
          opacity: 0.9;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          li.start,
          li.end {
            margin-left: 1rem;
            p {
              font-size: 0.2rem;
              color: lime;
            }
          }
          li {
            display: flex;
            margin: 0.15rem 0;
            time {
              font-size: 0.16rem;
              color: #333;
            }
            span {
              margin: 0 0.2rem;

              height: 0.2rem;
              width: 0.2rem;
              border-radius: 50%;
              border: 0.03rem solid lightcoral;
              background-color: lightcoral;
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            div {
              background-color: #484348;
              color: #fff;
              p {
                padding: 0.1rem 0.2rem;
                word-wrap: break-word;
                word-break: break-all;
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  #diary {
    .container {
      background: url("../../assets/img/mobile/mobile_bg4.jpg") no-repeat center
        center fixed;
      background-size: 100% 100%;
    }
  }
}
</style>