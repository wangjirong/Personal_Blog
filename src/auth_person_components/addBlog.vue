<template>
  <div id="addBlog">
    <mavon-editor
      :toolbars="toolbars"
      v-model="context"
      :ishljs="true"
      ref="md"
      :subfield="true"
      codeStyle="tomorrow-night"
      @save="saveBlog"
    />
    <el-dialog :visible.sync="isshowDialogDetail" id="detail">
      <div class="addstate flex-column">
        <input type="text" name id="title" placeholder="请输入标题" v-model="newBlog.title" />
        <input type="text" name id="state" placeholder="请输入概述" v-model="newBlog.state" />
        <input type="text" name id="state" placeholder="请输入所属分类" v-model="newBlog.classification" />
        <div id="type">
          原创
          <input type="radio" name="type" id value="原创" v-model="newBlog.type" />
          转载
          <input type="radio" name="type" id value="转载"  v-model="newBlog.type" />
        </div>

        <el-upload
          id="upload"
          multiple
          action="#"
          :http-request="handleUpload"
          style="
                display:flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                height:1rem;
                width:1.2rem;
                border:1px solid #ccc;
                border-radius:5px;
                margin-top:.1rem;
            "
        >
          <i class="el-icon-plus" id="uploadbtn"></i>
        </el-upload>
        <input type="submit" value="提交" id="submit" @click="submit" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {Message} from 'element-ui'
export default {
  name: "markdowmAddBlog",
  data() {
    return {
      newBlog: {
        title: "", //标题
        state: "", //概述
        cover: "", //封面
        classification: "", //分类
        type: "" //是否原创、转载
      },
      isshowDialogDetail: false,
      context: " ", //输入的数据
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  methods: {
    saveBlog() {
      this.isshowDialogDetail = true;
    },
    handleUpload(parms) {
      this.newBlog.cover = parms.file;
    },
    submit() {
      let formData = new FormData();
      formData.append("title", this.newBlog.title);//标题
      formData.append("state", this.newBlog.state);//说明
      formData.append("classification", this.newBlog.classification);//所属分类
      formData.append("type", this.newBlog.type);
      formData.append("file", this.newBlog.cover);
      formData.append("md", this.context);
      this.$axios
        .post("/api/blog/addBlog", formData)
        .then(res => {
          console.log(res.data);
          Message.success('提交成功！');
          this.$router.push('/auth_personal/manage/blogsList');
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
</script>
<style lang="less" scoped>
#addBlog {
  width: 100vw;
  height: 100vh;
  #detail {
    .el-dialog {
      .addstate {
        #title,
        #state {
          padding: 0.1rem;
          margin-bottom: 0.1rem;
          border-radius: 5px;
          border: 1px solid #ccc;
          width: 30%;
          text-align: center;
        }
        #state {
          width: 50%;
        }
        #submit {
          padding: 0.08rem 0.18rem;
          font-size: 0.18rem;
          background-color: darkred;
          color: #fff;
          border-radius: 6px;
          border: 1px solid #fff;
          margin: 0.2rem 0 0.1rem;
          &:hover {
            background-color: lime;
          }
        }
      }
    }
  }
}
</style>