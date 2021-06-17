<!--
 * @Descripttion: 播放音乐
注意播放音频方法
controls 是否显示音乐控件
muted 是否静音
loop 是否循环播放
autoplay 是否自动播放
preload 预加载策略 推荐preload="auto"
audio.play() 播放
audio.pause() 暂停
audio.currentTime 当前播放时间,可以用来快进
audio.volume 声音
audio.playbackRate 播放速度
audio.paused是一个只读属性，表示当前音频是否处于暂停状态。  true或false
  @timeupdate="onTimeupdate" ontimeupdate事件大概每秒一次，用来更新音频流的当前播放时间
  @loadedmetadata="onLoadedmetadata" on加载语音流元数据完成后，会触发该事件的回调函数
// 语音元数据主要是语音的长度之类的数据
 * @Author: Mr.You
 * @Date: 2020-10-12 19:41:46
 * @LastEditTime: 2020-12-02 14:07:22
-->

<template>
  <div class="content">
    <audio
      ref="audio"
      :src="url"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      preload="auto"
      :autoplay="false"
      :muted="true"
      :loop="false"
    ></audio>
    <div class="left">
      <div class="item">
        <svg-icon icon-class="zuo" @click="SwitchSongs('last')" />
      </div>
      <div class="item">
        <svg-icon v-show="showStart" @click="end" icon-class="bofang" />
        <svg-icon v-show="!showStart" @click="start" icon-class="zanting" />
      </div>
      <div class="item">
        <svg-icon icon-class="you" @click="SwitchSongs('next')" />
      </div>
    </div>
    <div class="right">
      <div class="slider">
        <van-slider
          v-model="SongTime"
          bar-height="4rem"
          button-size="12px"
          @change="editTime"
          inactive-color="#c5c5c5"
          active-color="#ffffff"
        >
        </van-slider>
      </div>

      <span> {{ milltosecond(time) }}</span>
    </div>
  </div>
</template>
<script>
import { Notify } from "vant";
import { millisToMinutesAndSeconds, SongLyric, SearchSug } from "@/api/index";
export default {
  data() {
    return {
      isPlay: true,
      value: 78,
      SongTime: 1,
      showList: false,
      volume: 50, //声音
      showVol: false,
      showStart: false,
      url: "", //音乐Url
      name: "Music", //音乐名
      cover: "", //音乐封面
      time: 100, //音乐时间，传入的数字是毫秒级
      album: "", //音乐专辑
      playing: false, //音频是否在播放
      onesong: {}, //一首歌的详情
      lyric: [], //歌词
      currentLyric: 0, //当前歌词行数
      lyricText: "音乐歌词", //当前歌词
      tit: document.title,
    };
  },
  computed: {
    songDetail() {
      if (JSON.parse(localStorage.getItem("SongDetail"))) {
        if (this.$store.state.SongDetail.time != 0) {
        }
      } else {
        this.firstSong();
      }
      return JSON.parse(localStorage.getItem("SongDetail"))
        ? JSON.parse(localStorage.getItem("SongDetail"))
        : this.$store.state.SongDetail;
      //这里还没那带数据
    },
  },
  watch: {
    songDetail: {
      //如果想打开就有缓存就要立即监听
      handler() {
        if (this.songDetail != null) {
          this.start();
          for (const key in this.songDetail) {
            this[key] = this.songDetail[key];
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async firstSong() {
      let placehoder = this.$store.state.DefPlaceHoder;
      if (placehoder != "") {
        let res = await SearchSug(placehoder);
        res = res.result ? res.result.songs : [];
        this.$store.dispatch("PlaySongs", {
          oneSong: res[0],
          allSong: res,
          indexSong: 0,
        });
      }
    },
    //转换秒
    milltosecond(val) {
      return millisToMinutesAndSeconds(val);
    },
    //暂停
    end() {
      this.showStart = false;
      this.playing = false;
      this.$refs.audio.pause();
    },
    //播放
    async start() {
      this.showStart = true;
      this.playing = true;
      this.$refs.audio ? await this.$refs.audio.play() : "";
    },
    // 快进，快退
    editTime(val) {
       this.$refs.audio.currentTime= (val /100)*this.time/1000;
    },
    //调节声音
    editVol(val) {
      this.$refs.audio.volume = val / 100;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // this.$refs.audio.currentTime  秒级别的 time毫秒
      //同步歌词
      if (this.lyric.length != 0) {
        if (
          this.lyric[this.currentLyric] &&
          this.lyric[this.currentLyric][0] < this.$refs.audio.currentTime * 1000
        ) {
          this.currentLyric++;
          this.$store.state.currentLyric = this.currentLyric;
          this.lyricText = this.lyric[this.currentLyric - 1][1];
        }
        // }
      }
      if (this.$refs.audio.currentTime) {
        if (
          parseInt(this.time) == parseInt(this.$refs.audio.currentTime * 1000)
        ) {
          this.SwitchSongs("next");
        }
        this.SongTime = parseInt(
          ((this.$refs.audio.currentTime * 1000) / this.time) * 100
        );
      }
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    async onLoadedmetadata(res) {
      this.time = parseInt(res.target.duration * 1000);
      if (this.playing) {
        this.start();
      }
      this.tit = ` 正在播放：${this.name} - ${
        this.onesong.ar ? this.onesong.ar[0].name : this.onesong.artists[0].name
      }  `;
      if (this.onesong.id) {
        this.getLyric(this.onesong.id);
        this.lyric = [];
      }
    },
    //切换歌曲
    SwitchSongs(val) {
      this.$store.dispatch("SwitchSong", val);
    },

    getLikeMusic(val) {},
    download() {
      this.$store.dispatch("DownLoadMusic", this.onesong.id);
    },
    async getLyric(id) {
      //获取歌词
      this.currentLyric = 0;
      var res = await SongLyric(id);
      if (!res.lrc) {
        Notify({
          message: "抱歉，暂无歌词!",
          type: "warning",
        });
        this.lyricText = "";
        return;
      }
      res = res.lrc.lyric.split("\n");
      var lyric = {};
      let pattern = /\[\d{2}:\d{2}.\d{2,3}\]/g;
      res.map((val, index) => {
        var val = val.replace(/\s*/, "");
        var time = val.replace(pattern, "");
        var lyr = val.match(pattern);
        if (lyr == null) {
          lyr = ["[00:00.000]"];
        }
        lyric[index] = [...lyr, time];
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
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>