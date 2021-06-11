<template>
  <div class="content">
    <div class="leftItem" :style="{ width: activeWidth + '%' }">
    <button class="btn"></button>
    </div>
    <div class="rightItem"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeWidth: 0,
    };
  },
  mounted() {
    this.active();
  },
  methods: {
    active() {
      let interval = setInterval(() => {
        console.log(1);
        this.activeWidth++;
        if (this.activeWidt === 100) {
          clearInterval(interval);
        }
      }, 300);
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  height: 10rem;
  width: 100%;
  background: red;
  display: flex;
//   overflow: auto;
  .leftItem {
    background: yellow;
    position: relative;
    .btn{
           position: absolute;
      display: block;
      width: 8rem;
      height: 15rem;
      top: -1.5rem;
      right: 0;
      background: red;
    }
    // &::after {
    //   content: "";
    //   position: absolute;
    //   display: block;
    //   width: 8rem;
    //   height: 15rem;
    //   top: -1.5rem;
    //   right: 0;
    //   background: red;
    // }
  }
  .rightItem {
    flex: 1;
    background: pink;
  }
}
</style>