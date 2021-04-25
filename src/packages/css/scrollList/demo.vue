<template>
  <div ref="waterfall" class="scroll-list">
    <div
      id="resultScroll"
      ref="scrollbar"
    >
      <div class="demo-list">
        <div v-for="(item, index) in tableList" :key="'demo-list-li-' + index" class="demo-list-li">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ScrollList',
  props: {},
  data() {
    return {
      noData: false, // 控制滚到底部是否去掉请求接口
      isFirst: true,
      pageSize: 10,
      pageNum: 1,
      ableScroll: true,
      waterfallDisabled: false,
      tableList: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    var that = this
    document.getElementById('resultScroll').addEventListener('scroll', that.onscroll.bind(this), true)
  },
  beforeDestroy() {
    document.getElementById('resultScroll').removeEventListener('scroll', that.onscroll.bind(this), true)
  },
  methods: {
    bindScrollEvent() {},
    onscroll() {
      console.log(this.$refs, 'eeeee')
      // 滚动条高度
      const sh = this.$refs['scrollbar'].scrollHeight
      // 滚动条距离顶部的距离
      const st = this.$refs['scrollbar'].scrollTop
      // 滚动条外容器的可视高度
      const ch = this.$refs['scrollbar'].clientHeight
      console.log(sh, 'sth--->>>', st, ch)
      if (st + ch >= sh) {
        this.pageNum += 1
        this.getData()
      }
    },
    getData() {
      for (let index = 0; index < 10; index++) {
        this.tableList.push({ label: '测试-' + index, id: index })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-list {
  width: 500px;
  height: 100%;
  ::v-deep .el-scrollbar {
    width: 100%;
    height: 100%;
    .el-scrollbar__wrap {
      width: 100%;
      height: 100%;
      .el-scrollbar__view {
        width: 100%;
        height: 100%;
      }
    }
  }
  #resultScroll {
    width: 100%;
    height: 400px;
    overflow-y: auto;
    border: 1px solid red;
  }
  .demo-list {
    width: 100%;
    min-height: 450px;
    .demo-list-li {
      width: 100px;
      height: 60px;
      border: 1px solid slategrey;
    }
  }
}
</style>
