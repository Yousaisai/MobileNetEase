<template>
  <div class="container">
    <div class="top">
      <van-tabs v-model="active" sticky>
        <van-tab v-for="(item, index) in tab" :title="item" :key="index">
          内容 {{ index }}
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom"><el-bottom></el-bottom></div>
  </div>
</template>
<script>
import elBottom from "./bottom";
export default {
  components: { elBottom },
  data() {
    return {
      active: "home",
      tab: ["正在播放", "播放列表", "排行榜", "歌曲搜索"],
    };
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgba(57, 50, 57, 1);
  position: relative;
  color: #c5c5c5;

  /deep/ .top {
    .van-tabs__nav {
      background: rgba(0, 0, 0, 0);
    }
    .van-tab {
      color: #c5c5c5;
    }
    .van-tabs__line {
      background: rgba(197, 197, 197, 1);
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    // height: 60rem;
    // width: 375rem;
    background: rgba(0, 0, 0, 0);
  }
}
</style>