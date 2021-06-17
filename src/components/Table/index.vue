<template>
  <div class="content">
    <div class="title">
      <div class="item1">歌曲</div>
      <div class="item2">歌手</div>
    </div>
    <div class="items" v-for="(item, index) in songlist" :key="item.id">
      <div class="item1" @click="PlaySong(item, index)">
        <div class="ind">
          <span v-show="PlayIndex != index">{{ index + 1 }}</span>
          <img
            style="color: #666666; padding: 0 5rem 0 0"
            v-show="PlayIndex == index"
            src="@/icons/pic/wave.gif"
          />
        </div>
        <div class="name">{{ item.name }}</div>
        <div class="null"></div>
      </div>
      <div class="item2">
        <div class="singer" @click="PlaySong(item, index)">
          {{ item.ar[0].name }}
        </div>
        <div class="opt">
          <svg-icon icon-class="more" @click="isPop(item)" />
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '10%' }">
      <div class="pop">
        <div class="item" @click="singer">
          <div><svg-icon icon-class="yonghu" /></div>
          <div class="item_text">
            {{ popdata.ar ? popdata.ar[0].name : "" }}
          </div>
        </div>
        <div class="item">
          <div><svg-icon icon-class="gequ" /></div>
          <div class="item_text">{{ popdata.name }}</div>
        </div>
        <div class="item" @click="album">
          <div><svg-icon icon-class="zhuanji" /></div>
          <div class="item_text">{{ popdata.al ? popdata.al.name : "" }}</div>
        </div>
        <div class="item">
          <div><svg-icon icon-class="tianjia" @click="AddMusic" /></div>
          <div class="item_text">下一首播放</div>
        </div>
        <div class="item" @click="download(popdata)">
          <div><svg-icon icon-class="xiazai" /></div>
          <div class="item_text">下载</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Notify } from "vant";
export default {
  props: ["songlist"],
  data() {
    return {
      popdata: {},
      show: false,
      //   songlist: [],
    };
  },
  computed: {
    PlayIndex() {
      return this.$store.state.IndexSong;
    },
  },
  methods: {
    PlaySong(song, index) {
      this.$store.dispatch("PlaySongs", {
        oneSong: song,
        allSong: this.songlist,
        indexSong: index,
      });
    },
    isPop(val) {
      this.show = true;
      this.popdata = val;
    },
    download(song) {
      this.$store.dispatch("DownLoadMusic", song.id);
    },
    album() {
      this.$router.push({
        path: "/album",
        query: { id: this.popdata.al ? this.popdata.al.id : "" },
      });
    },
    singer() {
      this.$router.push({
        path: "/singer",
        query: { id: this.popdata.ar ? this.popdata.ar[0].id : "" },
      });
    },
    AddMusic(song) {
      this.$store.dispatch("AddMusic", this.popdata);
      Notify({
        message: "添加成功",
        type: "success",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 12rem;
  .title {
    display: flex;
    padding-top: 5rem;
    .item1 {
      flex: 1.5;
      transform: translateX(40rem);
    }
    .item2 {
      flex: 1;
    }
  }
  .items {
    display: flex;
    justify-content: space-between;
    line-height: 36rem;
    padding: 10rem;
    box-sizing: border-box;
    border-bottom: 1.5px solid rgba(150, 150, 150, 0.1);
    .item1 {
      flex: 1.5;
      display: flex;
      box-sizing: border-box;
      justify-content: flex-start;
      .ind {
        width: 30rem;
      }
      .name {
        width: 120rem;
        white-space: nowrap;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
      }
      .null {
        width: 20rem;
      }
    }
    .item2 {
      white-space: nowrap;
      overflow: hidden; //超出的文本隐藏
      text-overflow: ellipsis; //溢出用省略号显示
      flex: 1;
      display: flex;
      justify-content: space-between;
      .opt {
        font-size: 16rem;
        padding-right: 5rem;
      }
    }
  }
  .van-popup {
    background: rgba(57, 50, 57, 0.9);
    .pop {
      display: flex;
      justify-content: space-between;
      padding: 5rem 15rem;
      font-size: 24rem;
      .item {
        padding: 5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .item_text {
          padding-top: 5rem;
          font-size: 12rem;
          transform: scale(0.9);
          width: 68rem;
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