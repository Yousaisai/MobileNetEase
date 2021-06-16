<template>
  <div class="content">
    <div class="title">
      <div class="item1">歌曲</div>
      <div class="item2">歌手</div>
    </div>
    <div
      class="items"
      v-for="(item, index) in songlist"
      
      :key="item.id"
    >
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
        <div class="singer" @click="PlaySong(item, index)">{{ item.ar[0].name }}</div>
        <div class="opt"><svg-icon icon-class="more" /></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["songlist"],
  data() {
    return {
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
}
</style>