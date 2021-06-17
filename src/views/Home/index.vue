<template>
  <div class="container">
    <div class="bag" :style="{ filter: `blur(${fil}px)` }">
      <img id="bag" src="" alt="" />
    </div>
    <div class="bag1">
      <img id="bag1" src="" alt="" />
    </div>
    <div class="top">
      <van-tabs
        title-active-color="#ffffff"
        title-inactive-color="#c5c5c5"
        v-model="active"
        @click="changtab"
        sticky
      >
        <van-tab v-for="item in tab" :title="item" :key="item"> </van-tab>
      </van-tabs>
    </div>
    <div class="content"><router-view></router-view></div>
    <div class="bottom"><el-bottom></el-bottom></div>
  </div>
</template>
<script>
import elBottom from "./bottom";
export default {
  components: { elBottom },
  data() {
    return {
      active: 0,
      tab: ["排行榜", "正在播放", "播放列表", "歌曲搜索"],
      routeList: ["toplist", "isplay", "playlist", "search"],
    };
  },

  mounted() {
    let name = this.$route.name;
    this.active = this.routeList.indexOf(name);
  },
  computed: {
    fil() {
      return this.$store.state.fil;
    },
  },
  methods: {
    changtab(val) {
      this.$router.push({
        path: `/${this.routeList[val]}`,
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
  .bag1 {
    position: fixed;
    margin: auto;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    filter: blur(300px);

    img {
      width: 100%;
      height: 100%;
    }
  }
  .bag {
    position: fixed;
    margin: auto;

    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 75vw;
      height: 75vw;
      border-radius: 50%;
      animation: rotateImg 20s linear infinite;
    }
    @keyframes rotateImg {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }

    @-webkit-keyframes rotateImg {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }
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
  .content {
    flex: 1;
    overflow: auto;
    position: relative;
  }
  .bottom {
    height: 48rem;
  }
}
</style>