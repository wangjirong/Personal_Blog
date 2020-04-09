<template>
  <div id="about" class="background">
    <div class="aboutnav flex-column">
      <h1>About Me</h1>
      <h3>十年生死两茫茫，不思量，自难忘。千里孤坟，无处话凄凉。纵使相逢应不识，尘满面，鬓如霜。</h3>
      <h4>夜来幽梦忽还乡，小轩窗，正梳妆。相顾无言，惟有泪千行。料得年年肠断处，明月夜，短松冈。</h4>
    </div>
    <div class="aboutme">
      <img src alt />
      <ul class="flex-column-start">
        <li>
          <h3>关于我</h3>
          <p>目前就读与JLU,迷茫中</p>
          <h4>我的联系方式</h4>
          <h5>QQ: 408718358</h5>
          <h5>Email: 408718358@qq.com</h5>
        </li>
        <li>
          <h3>关于本站</h3>
          <p>本站建于2020年3月，建此站的目的是工作加学习！</p>
          <h4>本站结构</h4>
          <h5>前端: Vue Cli4.0</h5>
          <h5>后端: Nodejs+Express+MongoDB</h5>
          <h5>服务器:阿里云ESC学生机</h5>
        </li>
        <li>
          <h3>特别说明</h3>
          <p>本站文章仅代表个人观点，和任何组织无关。</p>
          <p>本站开发没有考虑浏览器兼容问题，建议使用chrome！</p>
          <p>有兴趣可以联系一起交流技术生活！</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBgCoverImg } from "../../publicFunction";
import { setBackgroundByWidth } from "../../setBackgroundImage";
export default {
  name: "about",
  mounted() {
    this.$nextTick(() => {
      const bigImageURL = getBgCoverImg("PC/Menu", `aboutPage_big_bg_img.jpg`);
      const smallImageURL = getBgCoverImg(
        "Mobile/Menu",
        `aboutPage_small_bg_img.jpg`
      );
      setBackgroundByWidth("about", bigImageURL, smallImageURL);
    });
  }
};
</script>
<style lang="less" scoped>
#about {
  .aboutnav {
    height: 18vh;
    width: 100vw;
    border-bottom: 1px solid #ccc;
    h1 {
      font-size: 0.2rem;
      color: #fff;
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    }
    h3,
    h4 {
      padding: 0 1em;
      font-size: 0.15rem;
      color: #fff;
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      margin: 0.1rem 0;
      text-indent: 2em;
    }
  }
  .aboutme {
    width: 65%;
    margin: 2em auto;
    ul {
      padding: 0.2rem 0.5rem;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10px;

      li {
        margin-bottom: 0.3rem;
        h3 {
          font-size: 0.22rem;
          font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
          margin-bottom: 0.1rem;
          border-left: 4px solid limegreen;
          padding: 0.05rem 0.1rem;
        }
        h4 {
          font-size: 0.2rem;
          font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
          margin: 0.1rem 0;
          text-indent: 0.12rem;
        }
        h5 {
          font-size: 0.16rem;
          font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
          text-indent: 0.3rem;
          margin: 0.1rem 0;
        }
        p {
          font-size: 0.16rem;
          font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
          text-indent: 0.3rem;
          margin: 0.1rem 0;
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  #about {
    .aboutnav {
      h1 {
        font-size: 0.15rem;
      }
      h3,
      h4 {
        font-size: 0.12rem;
      }
    }
    .aboutme {
      width: 80%;
      margin: 1em auto;
      ul {
        padding: 1em;
        li {
          h3 {
            font-size: 0.16rem;
          }
          h4 {
            font-size: 0.14rem;
          }
          h5 {
            font-size: 0.12rem;
          }
          p {
            font-size: 0.13rem;
          }
        }
      }
    }
  }
}
</style>