<template>
  <div id="blogsList" class="flex-column">
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
      <el-table-column prop="fullDateLikeWord" label="日期" sortable width="150" column-key="date"></el-table-column>
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
import { handleList } from "../../publicFunction";
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
    async handleDelete(index, row) {
      const res = await this.$axios.delete("/api/blog/deleteBlog", {
        data: { _id: row._id }
      });
      if (res.data) {
        Message.success("删除成功");
        this.reload();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    goToAddBlog() {
      this.$router.push("/auth_personal/addBlog");
    },
    async getAllBlogs() {
      const res = await this.$axios.get("/api/blog/allBlog");
      this.blogList = handleList(res.data.allBlogs);
    }
  },
  async created() {
    await this.getAllBlogs();
  }
};
</script>

<style lang="less" scoped>
#blogList {
  height: 100%;
  width: 70vw;
  padding-right: 5vw;
}
</style>