<template>
  <div class="content">
    <div class="isNull" v-show="playlist.length == 0">列表为空</div>
    <div class="playlist" v-show="playlist.length != 0">
  <Table :songlist="playlist"></Table>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
export default {
    components:{Table},
  data() {
    return {};
  },
  computed: {
    playlist() {
      let res = JSON.parse(localStorage.getItem("AllSongs"));
      if (res) {
        return res;
      } else {
        return [];
      }
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
  .isNull {
    width: 100rem;
    height: 100rem;
    background-color: rgba(57, 50, 57, 1);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>