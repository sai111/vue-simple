<template>
  <div class="InfiniteScroll-entry">
    InfiniteScroll组件
    <InfiniteScroll />
  </div>
</template>
<script>
import InfiniteScroll from './index.vue'
export default {
  name: 'InfiniteScrollEntry',
  components: { InfiniteScroll },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    /**
     *
     */
  }
}
</script>
<style lang="scss" scoped>
.InfiniteScroll-entry {
  width: 100%;
  height: 100%;
}
</style>
