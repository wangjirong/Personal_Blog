<template>
  <div id="blogs" class="background">
    <div class="blogs">
      <ul class="flex-column">
        <li v-for="(blog,index) in blogList" :key="index" class="flex-column-start">
          <h3 class="title flex-space-between">
            <span>{{blog.title}}</span>
            <div class="date flex-column">
              <span>{{blog.justDay}}</span>
              <span>{{blog.justYearMonth}}</span>
            </div>
          </h3>
          <div class="blogImgState flex-space-between">
            <img :src="blog.coverimg" alt />
            <h4>{{blog.state}}</h4>
          </div>
          <div class="readmore">
            <a :href="'/menu/detailBlog?id='+blog._id">继续阅读</a>
            <span></span>
          </div>

          <div class="classfy flex-space-between">
            <span>
              <i class="el-icon-link"></i>
              {{blog.classification}}
            </span>
            <div class="count flex-vertical">
              <p title="阅读量">
                <i class="el-icon-coin"></i>
                {{blog.readerNum}}
              </p>
              <p title="评论量">
                <i class="el-icon-chat-line-round"></i>
                {{blog.commentNum}}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="element">
      <div class="searchArticle">
        <!--根据标签关键字进行搜索-->
        <input
          type="search"
          name
          id
          placeholder="请输入关键词！！"
          v-model="keyword"
          @keydown="searchWhereKeyDown"
        />
        <ul class="flex-column-left">
          <li v-for="(item,index) in classfyList" :key="index">
            <a href="javascript:void(0)" @click="searchByTag(item.tag)">{{item.tag}}</a>
          </li>
        </ul>
      </div>
      <div class="hotArticle">
        <h1>Hot Articles</h1>
        <ul class="flex-just-column">
          <li v-for="(blog,index) in hotTopBlogList" :key="index">
            <a :href="'/menu/detailBlog?id='+blog._id">
              <span>{{index+1}}、</span>
              {{blog.title}}
            </a>
          </li>
        </ul>
      </div>
      <div class="commendArticle">
        <h1>置顶推荐</h1>
        <ul class="flex-just-column">
          <li v-for="(blog,index) in recommendTopBlogList" :key="index">
            <a :href="'/menu/detailBlog?id='+blog._id">
              <span>{{index+1}}.</span>
              {{blog.title}}
            </a>
          </li>
        </ul>
      </div>
      <div id="recentVistor">
        <h1 class="header">最近访客</h1>
        <ul class="flex-vertical">
          <li v-for="user in recentUsers" :key="user.id">
            <img
              :src="user.userAvatar"
              :alt="user.userName"
              :title="user.userName"
              width="65"
              height="65"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Message } from "element-ui";
import { handleList,getBgCoverImg } from "../../publicFunction";
import { setBackgroundByWidth } from "../../setBackgroundImage";
export default {
  name: "blogs",
  data() {
    return {
      blogList: [],
      allBlog: [],
      hotTopBlogList: [],
      recommendTopBlogList: [],
      keyword: "",
      classfyList: [
        {
          tag: "HTML5、CSS3",
          href: "h5_css3"
        },
        {
          tag: "JavaScript",
          href: "javaScript"
        },
        {
          tag: "Vuejs",
          href: "vueJS"
        },
        {
          tag: "Nodejs",
          href: "nodeJS"
        }
      ],
      recentUsers: []
    };
  },
  async created() {
    await this.getAll();
  },
  methods: {
    async getAll() {
      const res = await this.$axios.get("/api/blog/allBlog");
      //全部文章
      this.allBlog = handleList(res.data.allBlogs);
      this.blogList = this.allBlog;
      //top5
      this.hotTopBlogList = handleList(res.data.hotTop5);
      //置顶3篇
      this.recommendTopBlogList = handleList(res.data.recommendTop3);
      //最近访客
      this.recentUsers = res.data.recentUser;
    },
    //按下回车进行查询
    async searchWhereKeyDown(event) {
      if (event.keyCode === 13) {
        if (!this.keyword) this.blogList = this.allBlog;
        else {
          const res = await this.searchByKeyword(this.keyword);
          this.blogList = res;
        }
      }
    },
    async searchByTag(keyword) {
      this.blogList = await this.searchByKeyword(keyword);
    },
    //根据关键字进行搜索
    async searchByKeyword(keyword) {
      const res = await this.$axios.get(
        `/api/blog/searchBlogByKeyword?keyword=${keyword}`
      );
      console.log(res.data);
      if (res.data.length === 0) {
        Message.error("抱歉！没有找到，请换个关键词！！！1秒后返回....");
        return this.allBlog;
      } else return handleList(res.data);
    }
  },
  mounted() {
    this.$nextTick(() => {
      const bigImageURL = getBgCoverImg("PC/Menu", `blogsPage_big_bg_img.jpg`);
      const smallImageURL = getBgCoverImg(
        "Mobile/Menu",
        `blogsPage_small_bg_img.jpg`
      );
      setBackgroundByWidth("blogs", bigImageURL, smallImageURL);
    });
  }
};
</script>
<style lang="less" scoped>
#blogs {
  width: 100vw;
  display: flex;
  .blogs {
    flex: 4;
    margin: 1.5rem 5%;
    ul {
      li {
        box-sizing: border-box;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        margin-bottom: 0.5rem;
        width: 100%;
        padding: 1% 5% 1% 3%;
        .title {
          width: 100%;
          border-bottom: 1px solid #ccc;
          span {
            font-size: 0.18rem;
            color: #000;
            font-family: Cambria, Cochin, Georgia, Times, "Times New Roman",
              serif;
          }
          .date {
            span {
              font-size: 0.18rem;
              font-family: Cambria, Cochin, Georgia, Times, "Times New Roman",
                serif;
            }
            span:nth-child(1) {
              font-size: 0.35rem;
              color: lime;
            }
          }
        }
        .blogImgState {
          margin: 0.1rem auto;
          img {
            flex: 3;
            height: 2rem;
            margin-right: 0.2rem;
          }
          h4 {
            flex: 4;
            padding-top: 0.4rem;
            font-family: Cambria, Cochin, Georgia, Times, "Times New Roman",
              serif;
            font-size: 0.2rem;
            text-indent: 2em;
          }
        }
        .readmore {
          width: 100%;
          display: flex;
          a {
            font-size: 0.16rem;
            padding: 0.5em;
            font-family: Cambria, Cochin, Georgia, Times, "Times New Roman",
              serif;
            color: #fff;
            border-radius: 2px;
            background-color: rgb(58, 219, 58, 1);
            &:hover {
              background-color: darkred;
              color: #fff;
            }
          }
          span {
            box-sizing: border-box;
            height: 1px;
            width: 70%;
            background-color: #ccc;
            margin: 1em;
          }
        }
        .classfy {
          width: 100%;
          margin-top: 0.5em;
          border-radius: 3px;
          span {
            font-size: 0.16rem;
            background-color: #ccc;
            opacity: 0.5;
            padding: 0.03rem 0.06rem;
            i {
              margin-right: 0.05rem;
              font-size: 0.18rem;
            }
            &:hover {
              background-color: lime;
              color: darkred;
              opacity: 1;
              content: "Tag";
            }
          }
          .count {
            p {
              padding: 0.1rem;
              font-size: 0.16rem;
              display: flex;
              margin-right: 0.1rem;
              i {
                font-size: 0.16rem;
                margin-right: 0.05rem;
              }
            }
          }
        }
      }
    }
  }
  .element {
    flex: 1.4;
    margin: 1.5rem 1.2rem 0 0;
    .searchArticle {
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 3px;
      padding-bottom: 0.1rem;
      input {
        padding: 0.08rem;
        margin: 0.2rem 10% 0.1rem;
        border-radius: 2px;
        border: 1px solid #ccc;
        width: 70%;
      }
      ul {
        li {
          a {
            padding-left: 0.2rem;
            display: block;
            width: 100%;
            height: 0.35rem;
            line-height: 0.35rem;
            font-size: 0.16rem;
            color: #000;
            font-family: Cambria, Cochin, Georgia, Times, "Times New Roman",
              serif;
            &:hover {
              background-color: darkred;
              color: #fff;
            }
          }
        }
      }
    }
    .hotArticle {
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 3px;
      margin: 0.2rem 0;
      padding-bottom: 0.1rem;
      h1 {
        font-size: 0.175rem;
        padding-left: 0.2rem;
        margin-top: 0.15rem;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      ul {
        li {
          a {
            display: block;
            width: 100%;
            height: 0.35rem;
            line-height: 0.35rem;
            font-size: 0.16rem;
            color: #000;
            padding-left: 0.2rem;
            font-family: Cambria, Cochin, Georgia, Times, "Times New Roman",
              serif;
            &:hover {
              background-color: #ddd;
              // color: #fff;
            }
          }
        }
      }
    }
    .commendArticle {
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 3px;
      margin: 0.2rem 0;
      padding-bottom: 0.1rem;
      h1 {
        font-size: 0.175rem;
        padding-left: 0.2rem;
        margin-top: 0.15rem;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      ul {
        li {
          a {
            display: block;
            width: 100%;
            height: 0.35rem;
            line-height: 0.35rem;
            font-size: 0.16rem;
            color: #000;
            padding-left: 0.2rem;
            font-family: Cambria, Cochin, Georgia, Times, "Times New Roman",
              serif;
            &:hover {
              background-color: lime;
              color: darkblue;
            }
            span {
              margin-right: 0.02rem;
              font-size: 0.18rem;
            }
          }
        }
      }
    }
    #recentVistor {
      background-color: rgba(255, 255, 255, 0.9);
      border-radius: 3px;
      padding: 1em;
      h1.header {
        font-size: 0.18rem;
        font-family: "Courier New", Courier, monospace;
      }
      ul {
        padding: 0.5em;
        flex-wrap: wrap;
        li {
          &:not(:nth-child(4n)) {
            margin-right: 0.5em;
          }
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 500px) {
  #blogs {
    .blogs {
      ul {
        li {
          .title {
            span {
              flex: 5;
              font-size: 0.14rem;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .date {
              flex: 3;
              span {
                font-size: 0.14rem;
              }
            }
          }
          .blogImgState {
            img {
              flex: 3;
              height: 5em;
            }
            h4 {
              flex: 5;
              font-size: 0.15rem;
            }
          }
          .readmore {
            a {
              font-size: 0.1rem;
            }
            span {
              margin: 0.6em;
            }
          }
          .classfy {
            margin: 0;
            span {
              font-size: 0.12rem;
              i {
                font-size: 0.12rem;
              }
            }
            .count {
              p {
                font-size: 0.12rem;
                i {
                  font-size: 0.12rem;
                }
              }
            }
          }
        }
      }
    }
    .element {
      display: none;
    }
  }
}
</style>