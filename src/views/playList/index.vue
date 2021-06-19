<template>
  <div class="content">
    <div class="playlist" v-if="playlist.length != 0">
      <Table :songlist="playlist"></Table>
    </div>
  </div>
</template>
<script>
import { Notify } from "vant";
import Table from "@/components/Table";
export default {
  components: { Table },
  data() {
    return { playlist: [] };
  },
  computed: {
    addmusic() {
      return this.$store.state.AllSongs;
    },
  },
  mounted() {
    this.addsong();
  },
  watch: {
    addmusic: {
      handler(val) {
        this.playlist = val;
      },
      deep: true,
    },
  },
  methods: {
    addsong() {
      let addmusic = this.$store.state.AllSongs
        ? this.$store.state.AllSongs
        : [];
      if (addmusic.length > 0) {
        this.playlist = addmusic;
      } else {
        let res = JSON.parse(localStorage.getItem("AllSongs"));
        if (res) {
          this.playlist = res;
        } else {
          Notify({
            background: "#393239e6",
            color: "#c5c5c5",
            message: "暂无播放列表",
            type: "success",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  .isNull {
    width: 100rem;
    height: 100rem;
    margin: 0 auto;
    text-align: center;
  }
}
</style>