<template>
  <div class="content">
    <Table :songlist="songlist"></Table>
  </div>
</template>
<script>
import Table from "@/components/Table";
import { topList, playlistDetail } from "@/api/index";
export default {
  components: { Table },
  data() {
    return {
      songlist: [],
    };
  },
  mounted() {
    this.initdata();
  },
  methods: {
    async initdata() {
      let id = this.$route.query.id;
      let res = await playlistDetail({ id: id });
      this.songlist = res.playlist.tracks;
    },
    PlaySong(song, index) {
      this.$store.dispatch("PlaySongs", {
        oneSong: song,
        allSong: this.songlist,
        indexSong: index,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>