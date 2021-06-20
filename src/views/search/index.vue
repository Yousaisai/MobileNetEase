<template>
  <div class="content">
    <div class="search">
      <div class="inp">
        <van-search
          v-model="payload.input"
          show-action
          :placeholder="DefPlaceHoder"
          @search="getSearch"
        >
          <template #action>
            <div @click="getSearch">搜索</div>
          </template>
        </van-search>
      </div>
      <div class="rad">
        <van-radio-group
          icon-size="12"
          checked-color="#c5c5c5"
          v-model="payload.type"
          direction="horizontal"
        >
          <van-radio name="netease">网易</van-radio>
          <van-radio name="qq">QQ</van-radio>
          <van-radio name="kugou">酷狗</van-radio>
          <van-radio name="kuwo">酷我</van-radio>
          <van-radio name="xiami">虾米</van-radio>
          <van-radio name="baidu">百度</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="songlist">
      <div class="items" v-for="(item, index) in MusicData" :key="item.songid">
        <div class="item1" @click="PlaySong(item, index)">
          <div class="ind">
            <span>{{ index + 1 }}</span>
          </div>
          <div class="name">{{ item.title }}</div>
          <div class="null"></div>
        </div>
        <div class="item2">
          <div class="singer" @click="PlaySong(item)">
            {{ item.author }}
          </div>
          <div class="opt">
            <svg-icon icon-class="more" @click="isPop(item)" />
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '0.68rem' }">
      <div class="pop">
        <div class="item">
          <div><svg-icon icon-class="yonghu" /></div>
          <div class="item_text">{{ popdata.author }}</div>
        </div>
        <div class="item">
          <div><svg-icon icon-class="gequ" /></div>
          <div class="item_text">{{ popdata.title }}</div>
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
import { AllNetMusic, DefSearch } from "@/api/index";
export default {
  data() {
    return {
      show: false,
      MusicData: [],
      DefPlaceHoder: "请输入关键词",
      popdata: {},
      payload: {
        input: "",
        filter: "name",
        type: "netease",
        page: "1",
      },
    };
  },
  mounted() {
    this.getDefSearch();
  },
  computed: {
    PlayIndex() {
      return this.$store.state.IndexSong;
    },
  },
  methods: {
    //默认搜索词
    async getDefSearch() {
      var res = await DefSearch();
      this.DefPlaceHoder = "例如：" + res.data.realkeyword;
      var res1 = await AllNetMusic({
        input: res.data.realkeyword,
        filter: "name",
        type: "netease",
        page: "2",
      });
      this.MusicData = res1.data;
    },
    async getSearch() {
      var res = await AllNetMusic(this.payload);
      if (res.code != 200) {
        //   Notify('通知内容');
        Notify({
          background: "#393239e6",
          color: "#c5c5c5",
          message: res.error,
        });
        return;
      }
      this.MusicData = res.data;
    },
    download(song) {
      this.$store.dispatch("DownLoadAllMusic", song);
    },
    PlaySong(val) {
      window.location.href = val.url;
    },
    palyMusic(song) {
      window.open(song.url, "_blank");
    },
    isPop(val) {
      this.show = true;
      this.popdata = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .search {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: red;
    transform: scale(0.85);
    /deep/ .inp {
      .van-search,
      .van-search__action,
      .van-search .van-cell,
      .van-search__content {
        background: rgba(57, 50, 57, 0);
        color: #c5c5c5;
      }
      .van-search .van-cell {
        border: 0.01rem solid #c5c5c5;
        padding: 0.04rem 0.08rem;
        border-radius: 0.05rem;
      }
      .van-search__content {
        color: red;
      }
      .van-field__control {
        color: #c5c5c5;
      }
    }

    /deep/.rad {
      display: flex;
      justify-content: center;
      align-items: center;
      .van-radio {height: 0.18rem;
        transform: scale(0.8);
      }
      .van-radio__label {
        color: #c5c5c5;
      }
    }
  }
  .songlist {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.12rem;
    .title {
      display: flex;
      padding-top: 0.05rem;
      .item1 {
        flex: 1.5;
        transform: translateX(0.40rem);
      }
      .item2 {
        flex: 1;
      }
    }
    .items {
      display: flex;
      justify-content: space-between;
      line-height: 0.36rem;
      padding: 0.10rem;
      box-sizing: border-box;
      border-bottom: 1.5px solid rgba(150, 150, 150, 0.1);
      .item1 {
        flex: 1.5;
        display: flex;
        box-sizing: border-box;
        justify-content: flex-start;
        .ind {
          width: 0.30rem;
        }
        .name {
          width: 1.20rem;
          white-space: nowrap;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
        }
        .null {
          width: 0.20rem;
        }
      }
      .item2 {
        white-space: nowrap;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        flex: 1;
        display: flex;
        justify-content: space-between;
        .singer {
          width: 1.00rem;
          white-space: nowrap;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
        }
        .opt {
          font-size: 0.16rem;
          padding-right: 0.05rem;
        }
      }  &:hover {
      color: #31c27c;
      animation: horcor 2s;
    }
    }
  }  @keyframes horcor {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  .van-popup {
    background: rgba(57, 50, 57, 0.9);
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