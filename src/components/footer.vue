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
