<template>
  <div class="content">
    <div
      class="item"
      v-for="item in toplist"
      :key="item.id"
      @click="getList(item)"
    >
      <img :src="item.coverImgUrl + '?param=100y100'" alt="" />
      <div class="title">{{ item.name }}</div>
    </div>
  </div>
</template>
<script>
import { topList } from "@/api/index";
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
    getList(val) {
      this.$router.push({
        name: `toplistitem`,
        // params: { list: res.playlist.tracks },
        query: { id: val.id, name: val.name },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  // justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 10rem;

  overflow: scroll;
  .item {
    box-sizing: border-box;
    width: 33%;
    text-align: center;
    padding: 5rem 1rem;

    img {
      border-radius: 5rem;
      transition: transform 1.5s;
      &:hover {
        transform: scale(1.1);
        transition: transform 1.5s;
      }
    }
    .title {
      font-size: 12rem;
      padding: 5rem 0;
      white-space: nowrap;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
    }
  }
}
</style>