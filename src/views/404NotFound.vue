<template>
  <div id="notfound" class="background-fix cover-size"></div>
</template>

<script>
import { getBgCoverImg } from "../publicFuntion";
export default {
  mounted() {
    this.$nextTick(() => {
      let width = document.documentElement.offsetWidth;
      let cover = document.getElementById("notfound");
      //设置首页默认背景图片
      let indexURLBG;
      if (width < 500)
        indexURLBG = getBgCoverImg("Mobile", `notFoundPage_small_bg_img.jpg`);
      //移动设备，小屏幕
      else indexURLBG = getBgCoverImg("PC", `notFoundPage_big_bg_img.jpg`); //pc设备，大屏幕
      cover.style.background = `url(${indexURLBG})`;
    });
  }
};
</script>