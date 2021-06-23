<template>
  <div class="content">
    <div class="com">
      <div class="title">精彩评论</div>
      <div
        class="item"
        v-for="item in commentData.hotComments"
        :key="item.commentId"
      >
        <div class="left">
          <div class="png">
            <img :src="item.user.avatarUrl + '?param=20y20'" />
          </div>
          <div class="con">
            <div class="tit">{{ item.user.nickname }}</div>
            <div class="text">{{ item.content }}</div>
            <div class="time">{{ foremattime(item.time) }}</div>
          </div>
        </div>
        <div class="right">
          <svg-icon icon-class="zan" /><span>{{ item.likedCount }}</span>
        </div>
      </div>
    </div>
    <div class="com">
      <div class="title">最新评论</div>
      <div
        class="item"
        v-for="item in commentData.comments"
        :key="item.commentId"
      >
        <div class="left">
          <div class="png">
            <img :src="item.user.avatarUrl + '?param=20y20'" />
          </div>
          <div class="con">
            <div class="tit">{{ item.user.nickname }}</div>
            <div class="text">{{ item.content }}</div>
            <div class="time">{{ foremattime(item.time) }}</div>
          </div>
        </div>
        <div class="right">
          <svg-icon icon-class="zan" /><span>{{ item.likedCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { dataType } from "@/api/index";
export default {
  props: ["commentData"],
  data() {
    return {};
  },
  methods: {
    foremattime(val) {
      return dataType(val);
    },
  },
};
</script>


<style lang="scss" scoped>
.content {
  .com {
    margin-bottom: 0.15rem;
    .title {
      text-align: left;
      font-size: 0.12rem;
      padding: 0.05rem 0rem;
    }
    .item {
      color: #91949a;
      border-bottom: 0.01rem dashed #424242;
      display: flex;
      padding-bottom: 0.1rem;
      padding-top: 0.05rem;
      justify-content: space-between;
      box-sizing: border-box;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        flex: 1;
        .png {
          align-self: flex-start;
          width: 0.2rem;
          padding-right: 0.1rem;

          img {
            border-radius: 50%;
          }
        }
        .con {
          font-size: 0.05rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          text-align: left;
          .tit {
            color: rgb(211, 186, 186);
            padding-bottom: 0.05rem;
            font-size: 0.12rem;
          }
          .text {
            font-size: 0.1rem;
          }
          .time {
            font-size: 0.1rem;
            padding-top: 0.1rem;
          }
        }
      }
      .right {
        width: 0.4rem;
        font-size: 0.2rem;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        span {
          padding-top: 0.05rem;
          font-size: 0.12rem;
        }
      }
    }
  }
}
</style>