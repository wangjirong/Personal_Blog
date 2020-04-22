<template>
  <div id="footer">
    <div class="beian" id="copyright">
      Copyright © 2020 by Ericzz All Rights Reserved 滇ICP备20001690号
      <span @click="goToManage" title="进入管理模式">l</span>
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
