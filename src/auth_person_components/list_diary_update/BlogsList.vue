<template>
  <div class="blogsList flex-column">
    <el-table
      :data="blogList.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()) || data.state.toLowerCase().includes(search.toLowerCase()) || data.classification.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      >
      <el-table-column align="left" width="120">
        <template slot="header">
          <el-button size="mini" type="success" @click="goToAddBlog">写文章</el-button>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="70"></el-table-column>
      <el-table-column prop="fullDate" label="日期" sortable width="150" column-key="date"></el-table-column>
      <el-table-column label="标题" prop="title" width="255"></el-table-column>
      <el-table-column label="作者" prop="author" width="150"></el-table-column>
      <el-table-column label="分类" prop="classification" width="150"></el-table-column>
      <el-table-column width="150"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { Message } from "element-ui";
export default {
  inject: ["reload"],
  data() {
    return {
      search: "",
      multipleSelection: [],
      blogList: []
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      let blog = row;
      this.$axios
        .delete("/api/blog/deleteBlog", { data: { _id: blog._id } })
        .then(res => {
          if (res.data) {
            Message.success("删除成功");
            this.reload();
          }
        })
        .catch(error => {
          throw error;
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goToAddBlog() {
      this.$router.push("/auth_personal/addBlog");
    },
    getAllBlogs() {
      this.$axios
        .get("/api/blog/allBlog")
        .then(res => {
          this.blogList = res.data;
          this.blogList.forEach(blog => {
            let date = new Date(blog.date);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            year = year > 9 ? year : `0${year}`;
            month = month > 9 ? month : `0${month}`;
            day = day > 9 ? day : `0${day}`;
            blog.date = day;
            blog.yearMonth = year + "年 " + month + "月";
            blog.fullDate = blog.yearMonth + blog.date + "日";
            blog.author = "Eric";
          });
        })
        .catch(error => {
          throw error;
        });
    }
  },
  created() {
    this.getAllBlogs();
  }
};
</script>

<style lang="less" scoped>
.blogList {
  height: 100%;
  width: 70vw;
  padding-right: 5vw;
}
</style>