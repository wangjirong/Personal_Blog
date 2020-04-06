<template>
  <div class="main">
    <elHeader />
    <router-view />
    <elFooter class="footer" />
  </div>
</template>

<script>
export default {
  components: {
    elHeader: () => import("../../components/header"),
    elFooter: () => import("../../components/footer.vue")
  },
};
</script>
<style lang="less" scoped>
</style>