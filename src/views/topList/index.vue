<template>
  <div class="content">
    <div
      class="item"
      v-for="item in toplist"
      :key="item.id"
      @click="getList(item)"
    >
      <img :src="item.coverImgUrl" alt="" />
      <div class="title">{{ item.name }}</div>
    </div>

  </div>
</template>
<script>
import { topList, playlistDetail } from "@/api/index";
export default {
  data() {
    return {
      toplist: [],
      
    };
  },
  mounted() {
    this.getTopList();
  },
  methods: {
    async getTopList() {
      let cachlist = sessionStorage.getItem("toplist");
      if (cachlist) {
        this.toplist = JSON.parse(cachlist);
      } else {
        let res = await topList();

        this.toplist = res.list;
        sessionStorage.setItem("toplist", JSON.stringify(res.list));
      }
    },
    async getList(val) {
      let res = await playlistDetail({ id: val.id });
      console.log("res: ", res);
      this.$router.push({
        name: `toplistitem`,
        params: { list: res.playlist.tracks },
        query: {
          name: res.playlist.name,
          
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>