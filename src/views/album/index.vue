<template>
  <div><Table :songlist="playListsong"></Table></div>
</template>
<script>

import Table from "@/components/Table";
import { Notify } from "vant";
import { newAlbumDetail, dataType, AlbumComment, SubAlbum } from "@/api/index";
export default {
  components: { Table },
  data() {
    return {
      play: false,
      //歌单详情
      albumDetails: [],
      //歌单曲目
      playListsong: [],
    };
  },
  computed: {
    Id() {
      return this.$route.query.id;
    },
  },

  mounted() {
    this.getPlaylistDetail();
   
  },
  methods: {
    dataForm(val) {
      return dataType(val);
    },
    async getPlaylistDetail() {
      const id = this.$route.query;
      var res = await newAlbumDetail({ ...id, limit: 30 });
      this.albumDetails = res.album;
      this.playListsong = res.songs;
    },
  },
};
</script>