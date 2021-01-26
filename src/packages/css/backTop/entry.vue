<template>
  <div class="backTop-entry">
    <el-scrollbar class="custom-el-scroll custom-el-scroll-components">
      <div class="backtop-list">
        backTop组件
        <div
          v-for="(item, index) in 100 "
          :key="'back-top-list-li-'+index"
          class="back-top-list-li"
        >
          placeholder {{ index }}
        </div>
      </div>
      <BackTop />
    </el-scrollbar>
  </div>
</template>
<script>
import BackTop from './index.vue'
export default {
  name: 'BackTopEntry',
  components: { BackTop },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.backTop-entry {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .backtop-list {
    width: 100%;
    height: 100%;
    overflow: hidden;
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
