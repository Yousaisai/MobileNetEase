/*
 * @Descripttion: 全局函数变量
 * @Author: Mr.You
 * @Date: 2020-10-12 14:47:41
 * @LastEditTime: 2021-04-30 09:55:07
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
var FileSaver = require("file-saver");
import { PlayOneSong, AuthSongId, DownLoadMusic } from "@/api/index";
import { Notify } from "vant";
export default new Vuex.Store({
  state: {
    fil: 0,
    //最新添加的缓存页面，如果是切换标签页就不需要重新请求页面
    cacheData: {
      Leaderboard: {
        isFalse: false,
        data: {},
      },
      Singer: {
        isFalse: false,
        data: {},
      },
      SongList: {
        isFalse: false,
        data: {},
      },
      AddedNewAlbum: {
        isFalse: false,
        data: {},
      },
      Recommend: {
        isFalse: false,
        data: {},
      },
    },
    isLogin: false,
    //播放音乐的资源，里面只有音乐ID
    PlaySong: "",
    //需要传到播放界面的参数,包含音乐url、音乐名name、封面cover、时长time、专辑album
    SongDetail: {
      name: "",
      cover: "",
      time: 0,
      album: "",
      onesong: "", //单个歌曲的详细数据，包括专辑等
    },
    //传入的整个歌单用于切换歌曲下首，还有全部播放
    AllSongs: [],
    //播放的第几个歌曲，哦那个与切换下一首
    IndexSong: 0,
    BannerUrl: "",
    index: 1, //这个是添加音乐，插入播放
    currentLyric: 0,
    DefPlaceHoder: "",
  },
  mutations: {
    ST_PlaySong: (state, payload) => {
      state.PlaySong = payload;
    },
    ST_SongDetail: (state, payload) => {
      state.SongDetail = payload;
      localStorage.setItem("SongDetail", JSON.stringify(payload));
    },
    ST_AllSongs: (state, payload) => {
      state.AllSongs = payload;
      localStorage.setItem("AllSongs", JSON.stringify(payload));
    },
    ST_IndexSong: (state, payload) => {
      state.IndexSong = payload;
    },
    ST_CacheData: (state, payload) => {
      let key = payload.value.key;
      let value = payload.value.value;
      switch (payload.key) {
        case "Le":
          state.cacheData.Leaderboard.data[key] = value;
          state.cacheData.Leaderboard.isFalse = true;
          break;
        case "Si":
          state.cacheData.Singer.data[key] = value;
          state.cacheData.Singer.isFalse = true;
          break;
        case "So":
          state.cacheData.SongList.data[key] = value;
          state.cacheData.SongList.isFalse = true;
          break;
        case "Ad":
          state.cacheData.AddedNewAlbum.data[key] = value;
          state.cacheData.AddedNewAlbum.isFalse = true;
          break;
        case "Re":
          state.cacheData.Recommend.data[key] = value;
          state.cacheData.Recommend.isFalse = true;
          break;
        default:
          break;
      }
    },
  },
  actions: {
    //获取播放歌曲的相关信息
    async PlaySongs({ commit, dispatch, state }, payload) {
      /*调用方式
        this.$store.dispatch("PlaySongs", {
        oneSong: 单条歌,
        allSong: 歌单,
        indexSong:歌曲序号，便于切换歌曲
      }); */
      var oneSong = payload.oneSong;
      var allSong = payload.allSong;
      var indexSong = payload.indexSong;

      commit("ST_AllSongs", allSong);
      commit("ST_PlaySong", oneSong);
      commit("ST_IndexSong", indexSong);

      try {
        var auth = await AuthSongId(state.PlaySong.id); //首先判断音乐是否可用
        auth = auth.message;
        if (auth != "ok") {
          Notify({
            background: "#393239",
            color: "#c5c5c5",
            message: auth,
          });
          return;
        } else {
          dispatch("AuthSongId", state.PlaySong);
        }
      } catch (e) {
        Notify({
          background: "#393239",
          color: "#c5c5c5",
          message: "暂无播放资源",
        });
      }
    },
    async SwitchSong({ commit, state, dispatch }, payload) {
      state.currentLyric = 0;
      var nextSong = {};
      if (state.AllSongs.length == 0) {
        state.AllSongs = JSON.parse(localStorage.getItem("AllSongs"));
      }
      if (payload == "next") {
        if (state.IndexSong == state.AllSongs.length - 1) {
          state.IndexSong = 0;
        }
        state.IndexSong = state.IndexSong + 1;
        nextSong = state.AllSongs[state.IndexSong];
      } else {
        //到顶层就会推到最后
        if (state.IndexSong == 0) {
          state.IndexSong = state.AllSongs.length;
        }
        state.IndexSong = state.IndexSong - 1;
        nextSong = state.AllSongs[state.IndexSong];
      }
      //首先判断音乐是否可用
      try {
        var auth = await AuthSongId(nextSong.id);
        auth = auth.message;
        if (auth == "ok") {
          dispatch("AuthSongId", nextSong);
        } else {
          Notify({
            background: "#393239",
            color: "#c5c5c5",
            message: auth,
          });
          return;
        }
      } catch (e) {
        //TODO handle the exception

        Notify({
          background: "#393239",
          color: "#c5c5c5",
          message: "暂无播放资源",
        });
      }
    },
    //授权的音乐播放
    async AuthSongId({ commit, state }, payload) {
      var songs = await PlayOneSong(payload.id);
      var commSong = {
        url: songs.data[0].url,
        name: payload.name,
        cover: payload.al ? payload.al.picUrl : payload.artists[0].img1v1Url,
        time: payload.dt ? payload.dt : payload.duration,
        album: payload.al ? payload.al.name : payload.album.name,
        onesong: payload,
      };
      commit("ST_SongDetail", commSong);
      //tab标题

      let TitleScrolling = function(val) {
        let tit = "";
        tit =
          "正在播放: " +
          val +
          "--" +
          state.SongDetail.onesong.ar[0].name +
          "       ";
        document.title = tit;
      };
      TitleScrolling(state.SongDetail.name);
      //下面是切换背景图
      document.getElementById("bag").src = state.SongDetail.cover;
      document.getElementById("bag1").src = state.SongDetail.cover;
      // let fil = 100;

      // let interval = setInterval(() => {
      //   fil -= 5;
      //   if (fil < 5) {
      //     clearInterval(interval);
      //   }  document.getElementById("bag").style.filter = `blur(${fil}px)`;
      // }, 1000);
    },
    //往播放列表中加入歌曲
    AddMusic({ commit, dispatch, state }, payload) {
      state.AllSongs.splice(state.IndexSong + state.index, 0, payload);
      state.index++;
      dispatch("DownLoadMusic");
    },
    /* 下载歌曲
    需要传入音乐Id
     */
    async DownLoadMusic({ state }, payload) {
      var res = await DownLoadMusic(payload);
      FileSaver.saveAs(res.url, res.title + "-" + res.author);
    },
    DownLoadAllMusic({ state }, payload) {
      if (payload.url == null) {
        Notify({
          background: "#393239",
          color: "#c5c5c5",
          message: "暂无下载资源",
        });
        return;
      }

      FileSaver.saveAs(payload.url, payload.title + "-" + payload.author);
    },
  },
  modules: {},
});
