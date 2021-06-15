<template>
  <div class="container">
    <div class="top">
      <van-tabs
        title-active-color="#ffffff"
        title-inactive-color="#c5c5c5"
        v-model="active"
        sticky
      >
        <van-tab v-for="(item) in tab" :title="item" :key="item">
          <router-view ></router-view>
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
      active: 0,
      tab: ["正在播放", "播放列表", "排行榜", "歌曲搜索"],
      routeList:["isplay","playlist","toplist","search",],
    };
  },
  mounted() {
    let name=this.$route.name
    this.active=this.routeList.indexOf(name)
  },
  watch:{
    active(a,b){
      this.$router.push({
          path: `/${this.routeList[a]}`,
        })
    }
  }

  
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgba(57, 50, 57, 1);
  position: relative;
  box-sizing: border-box;
  padding: 0 10rem;
  /deep/.top {
    .van-tabs__nav {
      background: rgba(0, 0, 0, 0);
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
  }
}
</style>