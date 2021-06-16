<template>
  <div class="content">
<Table :songlist="songlist"></Table>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { topList, playlistDetail } from "@/api/index";
export default {
    components:{Table},
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
    //   let toplist = JSON.parse(sessionStorage.getItem("topitem"));
    //   if (toplist) {
    //     this.songlist = toplist;
    //   } else {
    //     let list = this.$route.params.list;
    //     sessionStorage.setItem("topitem", JSON.stringify(list));
    //     this.songlist = list;
    // //   }
    //   console.log(this.songlist[74]);
    let id=this.$route.query.id
    console.log('id: ', id);
      let res = await playlistDetail({ id: id });
      console.log("res: ", res);
      this.songlist=res.playlist.tracks
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