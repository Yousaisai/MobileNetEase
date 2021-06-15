<template>
  <div class="container">
    <div class="bag" :style="{ filter: `blur(${fil}px)` }">
      <img
        id="bag"
        src="http://p1.music.126.net/vfZOLJbQI35c6HdeF8nVGQ==/109951166089282735.jpg"
        alt=""
      />
    </div>
    <div class="top">
      <van-tabs
        title-active-color="#ffffff"
        title-inactive-color="#c5c5c5"
        v-model="active"
        sticky
      >
        <van-tab v-for="item in tab" :title="item" :key="item"> </van-tab>
      </van-tabs>
    </div>
    <div class="con"><router-view></router-view></div>
    <div class="bottom"><el-bottom></el-bottom></div>
  </div>
</template>
<script>
import elBottom from "./bottom";
export default {
  components: { elBottom },
  data() {
    return {
      fil: 300,
      active: 0,
      tab: ["排行榜", "正在播放", "播放列表", "歌曲搜索"],
      routeList: ["toplist", "isplay", "playlist", "search"],
    };
  },
  mounted() {
    let name = this.$route.name;
    this.active = this.routeList.indexOf(name);
    setTimeout(() => {
      console.log(123);
      document.getElementById("bag").src =
        "http://p1.music.126.net/RkB570jeB4wc2V1_-ZbC1Q==/109951166084802032.jpg";
    }, 2000);
    let interval = setInterval(() => {
      this.fil--;
      if (this.fil == 200) {
        clearInterval(interval);
      }
    }, 50);
  },
  watch: {
    active(a, b) {
      console.log(345);
      this.$router.push({
        path: `/${this.routeList[a]}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgba(57, 50, 57, 1);

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  .bag {
    position: fixed;
    top: 20%;
    left: 0;
    bottom: 48rem;
    right: 0;
  }
  /deep/.top {
    height: 42rem;
    .van-tabs__nav {
      background: rgba(0, 0, 0, 0);
    }

    .van-tabs__line {
      background: rgba(197, 197, 197, 1);
    }
  }
  .con {
    flex: 1;
    overflow: auto;
    position: relative;
  }
  .bottom {
    height: 48rem;
  }
}
</style>