<template>
  <div id="otherLink" class="background">
    <ul>
      <li v-for="(item,index) in linkList" :key="index">
        <h5>{{item.title}}</h5>
        <div class="links flex-vertical-start-wrap">
          <a v-for="(link,i) in item.link" :key="i" :href="link.href">{{link.name}}</a>
        </div>
      </li>
      <baidu-map
        style="height:300px;width:100%;backgroundColor:#ccc"
        :center="center"
        :zoom="zoom"
        @ready="handler"
      ></baidu-map>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OtherLink",

  methods: {
    handler({ BMap, map }) {
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
    }
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,

      linkList: [
        {
          title: "学习",
          link: [
            {
              name: "Vue.js",
              href: "",
              icon: ""
            },
            {
              name: "Angular.js",
              href: "",
              icon: ""
            },
            {
              name: "React.js",
              href: "",
              icon: ""
            },
            {
              name: "LayUI",
              href: "",
              icon: ""
            },
            {
              name: "EasyUI",
              href: "",
              icon: ""
            },
            {
              name: "JquryUI",
              href: "",
              icon: ""
            },
            {
              name: "APICloud",
              href: "",
              icon: ""
            },
            {
              name: "Node.js",
              href: "",
              icon: ""
            },
            {
              name: "Runoob",
              href: "",
              icon: ""
            },
            {
              name: "W3C School",
              href: "",
              icon: ""
            }
          ]
        },
        {
          title: "娱乐",
          link: [
            {
              name: "腾讯视频",
              href: "",
              icon: ""
            },
            {
              name: "爱奇艺",
              href: "",
              icon: ""
            },
            {
              name: "虎牙直播",
              href: "",
              icon: ""
            },
            {
              name: "斗鱼直播",
              href: "",
              icon: ""
            },
            {
              name: "企鹅电竞",
              href: "",
              icon: ""
            },
            {
              name: "QQ音乐",
              href: "",
              icon: ""
            },
            {
              name: "网易云音乐",
              href: "",
              icon: ""
            },
            {
              name: "酷狗音乐",
              href: "",
              icon: ""
            }
          ]
        },
        {
          title: "生活",
          link: [
            {
              name: "淘宝网",
              href: "",
              icon: ""
            },
            {
              name: "天猫",
              href: "",
              icon: ""
            },
            {
              name: "京东",
              href: "",
              icon: ""
            },
            {
              name: "唯品会",
              href: "",
              icon: ""
            },
            {
              name: "拼多多",
              href: "",
              icon: ""
            },
            {
              name: "亚马逊",
              href: "",
              icon: ""
            },
            {
              name: "美团外卖",
              href: "",
              icon: ""
            },
            {
              name: "饿了么",
              href: "",
              icon: ""
            },
            {
              name: "菜鸟驿站",
              href: "",
              icon: ""
            }
          ]
        },
        {
          素材: []
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
#otherLink {
  background-image: url("../../assets/img/otherLink.bg1.jpg");
  width: 100vw;
  ul {
    width: 80%;
    margin: 2em 10%;
    //   background-color: snow;
    padding: 0.15rem 0.1rem;
    //   opacity: .8;
    li {
      margin-bottom: 0.2rem;
      h5 {
        padding-left: 0.1rem;
        border-left: springgreen 4px solid;
        font-size: 0.3rem;
        color: pink;
        margin-bottom: 0.1rem;
        font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
      }
      div.links {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        a {
          display: block;
          width: 2rem;
          height: 1.2rem;
          text-align: center;
          line-height: 1.2rem;
          font-size: 0.15rem;
          border-radius: 5px;
          margin: 0.15rem 0.25rem;
          background: rgba(255, 255, 255, 0.8);
          color: #444;
          &:hover {
            background-color: limegreen;
            color: #fff;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  #otherLink {
    background: url("../../assets/img/mobile/mobile_bg5.jpg");
    ul {
      width: 90%;
      margin: 1rem auto;
      padding: 0.5em 1em;
      li {
        h5 {
          font-size: 0.16rem;
        }
        div {
          a {
            height: 0.5rem;
            width: 0.7rem;
            line-height: 0.5rem;
            margin: 1em;
            font-size: 0.14rem;
          }
        }
      }
    }
  }
}
</style>