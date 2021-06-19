<template>
  <div class="container">
    <div class="bag">
      <img id="bag" src="@/icons/pic/bag.png" alt="" />
    </div>
    <div class="bag1">
      <img id="bag1" src="@/icons/pic/bag.png" alt="" />
    </div>
    <div class="top">
      <van-tabs
        swipeable
        v-model="active"
        title-active-color="#ffffff"
        title-inactive-color="#c5c5c5"
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
      active: "0",
      tab: ["排行榜", "正在播放", "播放列表", "歌曲搜索"],
      routeList: ["toplist", "isplay", "playlist", "search"],
    };
  },

  mounted() {
    let name = this.$route.name;
    this.active = this.routeList.indexOf(name);
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
    opacity: 0.8;
    transition: filter 1s;
    animation: mymove 20s infinite; /*Safari and Chrome*/
    animation-fill-mode: forwards;
    -webkit-animation: mymove 20s infinite; /*Safari and Chrome*/
    -webkit-animation-fill-mode: forwards;
    img {
      width: 75vw;
      height: 75vw;
      border-radius: 50%;
      animation: rotateImg 30s linear infinite;
      -webkit-animation: rotateImg 30s linear infinite;
    }
    @-webkit-keyframes mymove /*Safari and Chrome*/ {
      0% {
        -webkit-ttransform: scale(0.5);
        -webkit-tfilter: blur(100px);
      }
      15% {
        -webkit-ttransform: scale(0.75);
        -webkit-tfilter: blur(75px);
      }
      50% {
        -webkit-ttransform: scale(1);
        -webkit-tfilter: blur(0px);
      }

      85% {
        -webkit-ttransform: scale(0.75);
        -webkit-tfilter: blur(75px);
      }
      100% {
        -webkit-ttransform: scale(0.5);
        -webkit-tfilter: blur(100px);
      }
    }
    @keyframes mymove /*Safari and Chrome*/ {
      0% {
        transform: scale(0.5);
        filter: blur(100px);
      }
      15% {
        transform: scale(0.75);
        filter: blur(75px);
      }
      50% {
        transform: scale(1);
        filter: blur(0px);
      }

      85% {
        transform: scale(0.75);
        filter: blur(75px);
      }
      100% {
        transform: scale(0.5);
        filter: blur(100px);
      }
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