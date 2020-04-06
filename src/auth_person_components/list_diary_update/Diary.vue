<template>
  <div id="diary">
    <el-table
      :data="diaryList.filter(data => !search || data.text.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
    >
      >
      <el-table-column align="left" width="120">
        <template slot="header">
          <el-button size="mini" type="success" @click="goToAddDiary">写日记</el-button>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="80"></el-table-column>
      <el-table-column prop="fullDateLike_" label="日期" sortable width="200" column-key="date"></el-table-column>
      <el-table-column label="Title" prop="text" width="600"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { handleList } from "../../publicFunction";
export default {
  data() {
    return {
      multipleSelection: [],
      diaryList: [],
      search: ""
    };
  },
  methods: {
    goToAddDiary() {
      this.$router.push("/auth_personal/writeDiary");
    },
    async getAllDiary() {
      const res = await this.$axios.get("/api/diary/getAllDiary");
      this.diaryList = handleList(res.data);
    }
  },
  async created() {
    await this.getAllDiary();
  }
};
</script>

<style>
</style>