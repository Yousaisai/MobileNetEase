<template>
  <div class="content">
    <div class="left">
      <div class="item">
        <svg-icon style="font-size: 18rem" icon-class="上一首" />
      </div>
      <div class="item" v-show="!isPlay">
        <svg-icon style="font-size: 18rem" icon-class="暂停" />
      </div>
      <div class="item" v-show="isPlay">
        <svg-icon style="font-size: 18rem" icon-class="播放 (3)" />
      </div>
      <div class="item">
        <svg-icon style="font-size: 18rem" icon-class="下一首" />
      </div>
    </div>
    <div class="right">
      <Pro-gress></Pro-gress>
    </div>
  </div>
</template>
<script>
import ProGress from "./progress/index.vue";
export default {
  components: { ProGress },
  data() {
    return {
      isPlay: true,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  margin: 5rem;
  .left {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10rem;
    .item {
      flex: 1;
    }
  }
  .right {
    flex: 2;
    display: flex;
    align-items: center;
  }
}
</style>