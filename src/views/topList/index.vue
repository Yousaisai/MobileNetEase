<template>
  <div class="content">
    <div class="item" v-for="item in toplist" :key="item.id">
      <!-- <img :src="item.coverImgUrl +'?param=65y65'" alt=""> -->
        <img :src="item.coverImgUrl " alt="">
      
      <div class="title">{{item.name}}</div>
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
      let cachlist= sessionStorage.getItem("toplist")
      if (cachlist) {
           this.toplist =JSON.parse (cachlist);
      }else{
      let res = await topList();
   
      this.toplist = res.list;
      sessionStorage.setItem("toplist",JSON.stringify(res.list))
      }
       console.log('res: ', this.toplist);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>