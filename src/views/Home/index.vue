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
    <div class="content">
      <transition name="slide-left" mode="out-in">
        <router-view></router-view>
      </transition>
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
@import "./home.scss";
</style>