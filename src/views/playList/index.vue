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
            background: "#393239",
            color: "#c5c5c5",
            message: "暂无播放列表",
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
    width: 1.00rem;
    height: 1.00rem;
    margin: 0 auto;
    text-align: center;
  }
}
</style>