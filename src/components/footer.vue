<template>
  <div id="footer">
    <div class="beian">
      Copyright © 2020 by Ericzz All Rights Reserved 滇ICP备20001690号
      <span @click="goToManage">l</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToManage() {
      this.$router.push("/auth_personal/manage");
    }
  }
};
</script>

<style lang="less" scoped>
#footer {
  height: 8vh;
  width: 100vw;
  .beian {
    background-color: #222;
    text-align: center;
    line-height: 8vh;
    font-size: 0.15rem;
    color: #fff;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    span{
      cursor: pointer;
    }
  }
}
</style>