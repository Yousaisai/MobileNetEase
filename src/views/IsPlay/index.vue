<template>
  <div class="content">
    <van-popup
      v-model="showoverlay"
      position="bottom"
      :style="{ height: '5rem' }"
    >
      <div class="pop">
        <comment :commentData="commentData"></comment>
      </div>
    </van-popup>
    <div class="mvandcom">
      <div class="pinglun" @click="showcom">
        <!-- <van-icon name="chat-o" badge="99+" /> -->
        <span class="span">{{
          999 > commentData.total ? commentData.total : "999+"
        }}</span>
        <svg-icon icon-class="pinglun" />
      </div>
      <div class="mv"><svg-icon icon-class="mv" /></div>
    </div>
    <div class="title" v-if="lyric.length != 0">
      <div class="song">
        {{ watchsong.time != 0 ? watchsong.onesong.name : onesong.name }}
      </div>
      <div class="singer">
        {{
          watchsong.time != 0
            ? watchsong.onesong.ar[0].name
            : onesong.ar[0].name
        }}
      </div>
    </div>
    <div v-else class="noneric"><span>暂无歌词</span></div>
    <div class="ric">
      <ul :style="{ transform: `translateY(-${transY / 100}rem)` }">
        <li
          v-for="(item, index) in lyric"
          :class="index == currentLyric ? 'corly' : 'none'"
          :key="index"
        >
          {{ item ? item[1] : "" }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import comment from "./comments/index.vue";
import { Notify } from "vant";
import { SongLyric, MusicComment } from "@/api/index";
export default {
  components: { comment },
  data() {
    return {
      showoverlay: false,
      lyric: [],
      isShow: 20,
      transY: 0,
      nowpage: 9,
      commentData: [],
    };
  },
  mounted() {
    this.getLyric();
    this.getComment();
  },
  computed: {
    currentLyric() {
      let cur = this.$store.state.currentLyric - 1;
      if (cur >= 10 && cur < this.lyric.length) {
        this.transY = (cur - this.nowpage) * 28; //作用是为了从其他页面来的没有定位到歌词
      }
      return cur;
    },
    onesong() {
      return JSON.parse(localStorage.getItem("SongDetail"))
        ? JSON.parse(localStorage.getItem("SongDetail")).onesong
        : [];
    },
    watchsong() {
      return this.$store.state.SongDetail;
    },
  },
  watch: {
    watchsong() {
      this.getComment();
      this.getLyric();
      this.transY = 0;
    },
  },
  methods: {
    async getLyric() {
      if (this.watchsong.time == 0 && this.onesong.length == 0) {
        Notify({
          background: "#393239",
          color: "#c5c5c5",
          message: "暂无播放资源",
        });
        return;
      }
      //获取歌词
      var res = await SongLyric(
        this.watchsong.time != 0 ? this.watchsong.onesong.id : this.onesong.id
      );
      if (res.nolyric) {
        Notify({
          background: "#393239",
          color: "#c5c5c5",
          message: "抱歉，暂无歌词!",
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
        lyric.push([...lyr, time]);
      });
      for (const key in lyric) {
        let ly = lyric[key][0];
        const m = parseInt(ly.slice(1, 3));
        const s = parseInt(ly.slice(4, 6));
        const ms = parseInt(ly.slice(7, 10));
        lyric[key][0] = m * 60 * 1000 + s * 1000 + ms;
      }
      this.lyric = lyric;
    },
    async getComment() {
      var res = await MusicComment({
        id:
          this.watchsong.time != 0
            ? this.watchsong.onesong.id
            : this.onesong.id,
      });
      console.log("res: ", res);
      this.commentData = res;
    },
    showcom() {
      this.showoverlay = true;
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

  .noneric {
    margin: 2.5rem 0;
  }
  .mvandcom {
    z-index: 10;
    width: 0.5rem;
    height: 0.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.2rem;
    position: fixed;
    left: 0.1rem;
    top: 5.3rem;
    .pinglun {
      position: relative;
      .span {
        position: absolute;
        font-size: 0.1rem;
        transform: translate(0.15rem, -0.07rem) scale(0.8);
      }
    }
  }
  .title {
    text-align: center;
    padding: 0.1rem 0;
    .song {
      font-size: 0.18rem;
    }
    .singer {
      font-size: 0.12rem;
      transform: scale(0.85);
    }
  }
  .ric {
    font-size: 0.14rem;
    overflow: hidden;
    ul {
      transition: transform 1s;
    }
    ul li {
      line-height: 0.28rem;
      font-size: 0.13rem;
    }
    li:hover {
      color: #e1e1e1;
      animation: horcor 2s;
    }
    .corly {
      color: #31c27c;
      transform: scale(1.2);
      transition: transform 2s;
      animation: cor 2s infinite;
    }
  }
  @keyframes horcor {
    0% {
      color: #31c27c;
      transform: scale(1);
    }
    50% {
      color: #419afb;
      transform: scale(1.2);
    }
    100% {
      color: #31c27c;
      transform: scale(1);
    }
  }
  @keyframes cor {
    0% {
      color: #31c27c;
    }
    25% {
      color: #419afb;
    }
    50% {
      color: #31c27c;
    }
    75% {
      color: #419afb;
    }
    100% {
      color: #31c27c;
    }
  }
  .isNull {
    width: 1rem;
    height: 1rem;
    margin: 0 auto;
  }
  .van-popup {
    background: rgba(57, 50, 57, 0.5);
    .pop {
      display: flex;
      justify-content: space-between;
      padding: 0.05rem 0.15rem;
      font-size: 0.24rem;
      .item {
        padding: 0.03rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .item_text {
          padding-top: 0.05rem;
          font-size: 0.12rem;
          transform: scale(0.9);
          min-width: 0.58rem;
          text-align: center;
          white-space: nowrap;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
        }
      }
    }
  }
}
</style>