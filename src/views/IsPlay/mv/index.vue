<template>
  <div class="content">
    <!-- <video controls="" :autoplay="false" name="media">
      <source
        :src="mvurl"
        type="audio/mpeg"
      />
    </video> -->
    <video :src="mvurl" controls width="100%" height="100%" :autoplay="true"></video>
  </div>
</template>
<script>
import { MvData, MvUrl } from "@/api/index";
export default {
  data() {
    return { mvurl: "",mvdata: {} };
  },
  computed: {
    mvid() {
      return this.$route.query;
    },
  },
  mounted() {
    // this.getMvData();
    this.getMvUrl();
  },
  methods: {
    async getMvData() {
      var res = await MvData(this.mvid);
      console.log('res: ', res);
      this.mvdata = res;
    },
    async getMvUrl() {
      var res = await MvUrl({ id: this.mvid.mvid });
      console.log('res: ', res);
      this.mvurl = res.data.url;
      console.log('this.mvurl : ', this.mvurl );
    },
  },
};
</script>

<style lang="scss" scoped>
.content{
height: 100%;
display: flex;
justify-content: center;
align-items: center;
}
</style>