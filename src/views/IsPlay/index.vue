<template>
  <div class="content">
    <div class="title">{{  watchsong.time!=0 ? watchsong.onesong.name: onesong.name }}</div>
    <div class="ric">
      <ul>
        <li
          v-for="(item, index) in lyric"
          :class="index == currentLyric ? 'corly' : 'none'"
          :key="index"
        >
          {{ item?item[1]:"" }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { SongDetail, SongLyric } from "@/api/index";
export default {
  data() {
    return { lyric: [], isShow: 20 };
  },
  mounted() {
    this.getLyric();
  },
  computed: {
    currentLyric() {
      let cur=this.$store.state.currentLyric
      if (cur<=7) {
        return cur-1
      }
      this.lyric.shift()
      return 8;
    },
    onesong() {
      return JSON.parse(localStorage.getItem("SongDetail")).onesong;
    },
    watchsong() {
      return this.$store.state.SongDetail;
    },
  },
  watch: {
    watchsong() {
      this.getLyric();
    },
  },
  methods: {
    async getLyric() {
      //获取歌词
      var res = await SongLyric(
        this.watchsong.time!=0 ? this.watchsong.onesong.id : this.onesong.id
      );
      if (res.nolyric) {
        this.$message({
          message: "抱歉，暂无歌词!",
          type: "warning",
        });
        this.lyricText = "";
        return;
      }

      res = res.lrc.lyric.split("\n");
      var lyric = [];
      let pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g;
      res.map((val, index) => {
        var val = val.replace(/\s*/, "");
        var time = val.replace(pattern, "");
        var lyr = val.match(pattern);
        if (lyr == null) {
          lyr = ["[00:00.000]"];
        }
        lyric.push ([...lyr, time]);
      });
      for (const key in lyric) {
        let ly = lyric[key][0];
        const m = parseInt(ly.slice(1, 3));
        const s = parseInt(ly.slice(4, 6));
        const ms = parseInt(ly.slice(7, 10));
        lyric[key][0] = m * 60 * 1000 + s * 1000 + ms;
      }
      this.lyric =lyric;
      
      // console.log('his.lyric: ', this.lyric);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  .title {
    font-size: 18rem;
    padding: 10rem 0;
  }
  .ric {
    font-size: 14rem;
    ul li {
      line-height: 28rem;
    }

    .corly {
      color: #31c27c;
    }
  }
}
</style>