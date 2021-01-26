<template>
  <div class="InfiniteScroll">
    <el-scrollbar class="custom-el-scroll">
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="30"
        class="infinite-scroll-wrap"
      >
        <div
          v-for="(item, index) in lists"
          :key="'list-li-'+index"
          class="infinite-scroll-wrap-li"
        >
          {{ item }}
        </div>
      </div>
      <div v-if="loading">加载中...</div>
    </el-scrollbar>
  </div>
</template>
<script>
import { fetchList } from '@/api/article'
import vueiInfinite from 'vue-infinite-scroll'
export default {
  name: 'InfiniteScroll',
  directives: { vueiInfinite },
  props: {},
  data() {
    return {
      busy: false,
      count: 0,
      lists: [],
      loading: false,
      page: 1
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
      this.busy = this.loading = true
      setTimeout(() => {
        const param = {
          page: this.page++,
          limit: 18
        }
        fetchList(param).then((res) => {
          console.log(res)
          this.lists = this.lists.concat(res.list)
        })
        this.busy = this.loading = false
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
.InfiniteScroll {
  width: 100%;
  height: 100%;
  .infinite-scroll-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    padding: 0 16px;
    .infinite-scroll-wrap-li {
      width: 200px;
      height: 200px;
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
      .el-scrollbar__view{
        width: 100%;
      }
    }
  }
}
</style>
