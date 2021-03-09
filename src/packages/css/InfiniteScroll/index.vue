<template>
  <div v-loading="loading" class="InfiniteScroll">
    <div class="holder-wrap" />
    <el-scrollbar class="custom-el-scroll">
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="0"
        class="infinite-scroll-wrap"
      >
        <div v-for="(item, index) in 8" :key="'list-li-' + index" class="infinite-scroll-wrap-li">
          {{ item }}test
        </div>
      </div>
      <!-- <div v-if="loading">加载中...</div> -->
    </el-scrollbar>
  </div>
</template>
<script>
import vueiInfinite from 'vue-infinite-scroll'
export default {
  name: 'InfiniteScroll',
  directives: { vueiInfinite },
  props: {},
  data() {
    return {
      busy: false,
      count: 21,
      lists: [],
      loading: false,
      page: 1,
      limit: 8
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.loadMore()
    })
  },
  methods: {
    loadMore() {
      this.busy = true
      // const hasReceivedCounts = this.page * 8
      // // console.log('已经收到多少条数据', hasReceivedCounts)
      // if (hasReceivedCounts >= this.count) {
      //  return false
      // }
      // setTimeout(() => {
      //  this.busy = this.loading = true
      //  const param = {
      //    page: this.page++,
      //    limit: this.limit
      //  }
      //  console.log(this.page, '发送分页请求，参数为：' + JSON.stringify(param))
      //  const list = []
      //  for (let i = 0; i < 8; i++) {
      //    list.push(i)
      //  }
      //  this.lists = this.lists.concat(list)
      //  //this.busy = this.loading = false
      // }, 1000)
      this.busy = false
    }
  }
}
</script>
<style lang="scss" scoped>
.InfiniteScroll {
  width: 100%;
  height: 100%;
  .holder-wrap {
    width: 100%;
    height: 300px;
  }
  .infinite-scroll-wrap {
    width: 100%;
    height: calc(100% - 300px);
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 0 16px;
    margin: 0 auto;
    .infinite-scroll-wrap-li {
      width: 400px;
      height: 400px;
      border: 1px solid skyblue;
      text-align: center;
      line-height: 200px;
      margin: 0 16px 16px 0;
    }
  }
  ::v-deep .custom-el-scroll.el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
      .el-scrollbar__view {
        width: 100%;
      }
    }
  }
}
</style>
