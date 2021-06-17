<template>
  <div><Table :songlist="hotSongs"></Table></div>
</template>
<script>import Table from "@/components/Table";
import { SingersOne, SubArtist } from "@/api/index";
export default {  components: { Table },
  data() {
    return {   artist: {}, //歌手信息
      hotSongs: [], //热门歌曲
      };
  },
  mounted() {
    this.getSingersOne();
  },
  computed: {
    singerId() {
      return this.$route.query;
    },
  },
  methods: {
    async getSingersOne() {
      var id = this.$route.query;
      var res = await SingersOne(id);
      this.artist = res.artist;
      this.hotSongs = res.hotSongs;
    },
  },
};
</script>