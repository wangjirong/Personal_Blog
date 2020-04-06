<template>
  <div id="home">
    <div class="cover" id="index">
      <a href="#article" id="toBottom">
        <i class="el-icon-bottom"></i>
      </a>
      <div class="centerword">
        <h1>Ericzz</h1>
        <p>十年生死两茫茫，不思量，自难忘。</p>
        <a href="/menu/blogs">进入 Blog</a>
      </div>
    </div>
    <div id="article">
      <div class="header">
        <h3>我的文章</h3>
        <p>守一份承诺细诉着爱恋，步入你温暖的城池，人的一生有诸多的美好，而我情有独钟的是你相濡以沫。</p>
      </div>
      <ul class="articles">
        <li v-for="(blog,index) in BlogList" :key="index">
          <img :src="blog.coverimg" alt />
          <span class="title">{{blog.title}}</span>
          <span class="date">{{blog.date}}</span>
          <p class="explain">{{blog.state}}</p>
          <a :href="'/menu/detailBlog?id='+blog._id">阅读更多</a>
        </li>
      </ul>
    </div>
    <div id="about" class="otherlink">
      <div class="container">
        <a href="/menu/about">关于</a>
        <a href="/menu/otherLink">+友情链接</a>
      </div>
    </div>
    <div id="aboutMe">
      <div class="me">
        <h3 class="title">Ericzz</h3>
        <p>十年生死两茫茫，不思量，自难忘。</p>
        <a href="/menu/about">About Me</a>
      </div>
      <div class="link">
        <h3 class="relateLink">相关链接</h3>
        <ul class="container">
          <li>
            <a href class="resource">资源</a>
          </li>
          <li>
            <a href="/menu/diary" class="date">日记</a>
          </li>
          <li>
            <a href class="leavamessage">留言</a>
          </li>
        </ul>
      </div>
      <div class="contactme">
        <h3 class="contact">联系我</h3>
        <p class="address">地址:长春市朝阳区JLU</p>
        <p class="qq">QQ:408718358 54136072</p>
        <p class="email">邮箱:408718358@qq.com</p>
      </div>
    </div>
    <elFooter />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  data() {
    return {
      isShow: false,
      BlogList: []
    };
  },
  components: {
    elFooter: () => import("../components/footer")
  },
  mounted() {
    this.$nextTick(() => {
      let cover = document.getElementById("index");
      let index = 0;
      let width = document.documentElement.offsetWidth;
      let url;
      let interval = setInterval(() => {
        if (index === 5) index = 0;
        if (width < 500)
          url = require(`../assets/img/mobile/home_cover_bg${++index}.jpg`);
        else url = require(`../assets/img/cover${++index}.jpg`);
        cover.style.background = `url(${url}) no-repeat center center`;
        cover.style.backgroundSize = "100% 100%";
        cover.style.transition = "all 2s ease-in";
      }, 10000);
    });
  },
  created() {
    this.getThreeBlogs();
  },
  methods: {
    getThreeBlogs() {
      this.$axios
        .get("/api/blog/index")
        .then(res => {
          this.BlogList = res.data;
          console.log(this.BlogList);
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
</script>
<style lang="less" scoped>
#home {
  overflow-x: hidden;
  .cover {
    height: 100vh;
    width: 100vw;
    background: url("../assets/img/cover1.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 2s ease-in;
    #toBottom {
      position: absolute;
      width: 0.4rem;
      text-align: center;
      border-radius: 50%;
      left: 49%;
      bottom: 1rem;
      margin-left: -0.15rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      animation: toBottom 1s linear infinite;
      transition: linear 1s;
      &:hover {
        background-color: aqua;
        animation: none;
      }
      i {
        font-size: 0.4rem;
        color: #fff;
      }
    }
    .centerword {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h1 {
        font-size: 0.3rem;
        color: #fff;
        font-family: "Courier New", Courier, monospace;
        margin-top: -0.5rem;
      }
      p {
        font-size: 0.18rem;
        color: #fff;
        margin-top: 0.4rem;
        font-family: "Courier New", Courier, monospace;
      }
      a {
        font-size: 0.2rem;
        color: #fff;
        background-color: #1e9fff;
        padding: 0.08rem 0.12rem;
        border-radius: 5px;
        margin-top: 1rem;
        font-family: "Courier New", Courier, monospace;
        &:hover {
          background-color: darkseagreen;
          color: darkred;
        }
      }
    }
  }
  #article {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .header {
      flex: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h3 {
        font-size: 0.2rem;
        padding: 0.2rem;
        border-bottom: 0.02rem solid lightblue;
        font-family: "Times New Roman", Times, serif;
      }
      p {
        font-size: 0.15rem;
        text-align: center;
        margin-top: 0.2rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
    }
    .articles {
      flex: 4;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100vw;
      margin: 0 10%;
      overflow-y: hidden;
      li {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0.5rem;
        img {
          width: 100%;
          height: 2.8rem;
          border-radius: 1px;
        }
        .title {
          font-size: 0.18rem;
          margin: 0.1rem 0;
        }
        .date {
          font-size: 0.13rem;
        }
        .explain {
          font-size: 0.15rem;
          margin: 0.15rem 0;
        }
        a {
          font-size: 0.16rem;
          color: #fff;
          padding: 0.05rem;
          background-color: darkred;
          border-radius: 5px;
          &:hover {
            background-color: limegreen;
            color: #fff;
          }
        }
      }
    }
  }
  #about {
    height: 62vh;
    width: 100vw;
    background: url("../assets/img/about_index_bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
    display: flex;
    justify-content: center;
    align-items: center;
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      a {
        display: block;
        text-align: center;
        width: 1rem;
        border-radius: 1px;
        font-size: 0.2rem;
        color: #fff;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        padding: 0.1rem 0.2rem;
        border: 1px solid #fff;
        margin: 0 0.5rem;
        position: relative;
        z-index: 1;
        &:hover {
          background-color: none;
        }
        &:before {
          z-index: -1;
          visibility: hidden;
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 100%;
          background-color: lightgreen;

          transform: skewX(45deg, 0);
          transition: all 1s;
        }
        &:hover:before {
          visibility: visible;
          width: 150%;
          left: 0;
          color: #fff;
        }
      }
    }
  }
  #aboutMe {
    display: flex;
    align-items: center;
    height: 30vh;
    width: 100vw;
    background-color: #333;
    position: relative;
    padding: 0 7%;
    .me {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .title {
        font-size: 0.2rem;
        color: #fff;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      p {
        font-size: 0.15rem;
        color: #fff;
        margin: 0.2rem 0;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      a {
        font-size: 0.2rem;
        color: darkred;
        padding: 0.08rem;
        background-color: lightblue;
        border-radius: 3px;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        transition: linear 0.5s;
        &:hover {
          background-color: lightgreen;
          color: #000;
        }
      }
    }
    .link {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .relateLink {
        font-size: 0.2rem;
        color: #fff;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      .container {
        display: flex;
        li {
          display: flex;
          justify-content: center;
          align-items: center;
          a {
            font-size: 0.15rem;
            color: #fff;
            padding: 0.1rem;
            border-radius: 5px;
            margin: 0 0.05rem;
            font-family: Cambria, Cochin, Georgia, Times, "Times New Roman",
              serif;
            &:hover {
              color: darkred;
              background-color: darkseagreen;
            }
          }
        }
      }
    }
    .contactme {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .contact {
        font-size: 0.2rem;
        color: #fff;
        margin: 0.15rem 0;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
        margin-bottom: 0.1rem;
      }
      .address {
        font-size: 0.15rem;
        color: #fff;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      .qq {
        font-size: 0.15rem;
        color: #fff;
        margin: 0.15rem 0;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      .email {
        font-size: 0.15rem;
        color: #fff;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
    }
  }
}
@keyframes toBottom {
  from {
    bottom: 1rem;
  }
  to {
    bottom: 0.8rem;
  }
}
@keyframes toTop {
  0% {
    right: 50%;
  }
  100% {
    right: 0;
  }
}
@keyframes back_to_back {
  from{
    position: absolute;
    right: 0;
    top: 0;
  }to{
    position: absolute;
    right: 100%;
    top: 100%;
  }
  
}
@media screen and (max-width: 500px) {
  #home {
    .cover {
      background: url("../assets/img/mobile/home_cover_bg1.jpg") no-repeat
        center center;
      background-size: 100% 100%;
      transition: all 2s ease-in;
    }
    #article {
      height: 180vh;
      .header {
        flex: 2;
      }
      .articles {
        flex: 12;
        flex-direction: column;
        li {
          flex: 1;
          padding: 0.2rem;
          text-align: left;
          img {
            height: 2rem;
          }
        }
      }
    }
    #about {
      height: 30vh;
      .container {
        flex-direction: column;
        a {
          margin-bottom: 1em;
        }
      }
    }
    #aboutMe {
      flex-direction: column;
      height: 50vh;
      padding: 1.5em 0 0.5em;
      align-items: flex-start;
      .me {
        flex: 2;
        width: 100%;
        padding-left: 2em;
        a {
          font-size: 0.16rem;
        }
      }
      .link {
        flex: 2;
        width: 100%;
        padding-left: 2em;
      }
      .contactme {
        flex: 3;
        width: 100%;
        padding-left: 2em;
        margin-top: -1em;
      }
    }
  }
}
</style>
