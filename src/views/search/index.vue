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
            <span >{{ index + 1 }}</span>
        
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
    <van-popup v-model="show" position="bottom" :style="{ height: '10%' }">
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
        Notify({ type: "warning", message: res.error });
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
  $radio-size: 8rem;
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
        border: 1rem solid #c5c5c5;
        padding: 4rem 8rem;
        border-radius: 5rem;
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
      .van-radio {
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
        .singer {
          width: 100rem;
          white-space: nowrap;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
        }
        .opt {
          font-size: 16rem;
          padding-right: 5rem;
        }
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
        }
      }
    }
  }
}
</style>