<template>
  <div class="content">
    <div class="left">
      <div class="item">
        <svg-icon icon-class="zuo" />
      </div>
      <div class="item" @click="play">
        <svg-icon v-show="!isPlay" icon-class="zanting" />
        <svg-icon v-show="isPlay" icon-class="bofang" />
      </div>
      <div class="item">
        <svg-icon icon-class="you" />
      </div>
    </div>
    <div class="right">
      <van-slider
        v-model="value"
        bar-height="4rem"
        button-size="12px"
        inactive-color="#c5c5c5"
        active-color="#ffffff"
      >
      </van-slider>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPlay: true,
      value: 78,
    };
  },
  methods: {
    play() {
      console.log(1);
      this.isPlay = !this.isPlay;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>