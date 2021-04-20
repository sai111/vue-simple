<template>
  <div class="scrollList-entry">
    scrollList组件
    <scrollList />
  </div>
</template>
<script>
import ScrollList from './index.vue'
export default {
  name: 'ScrollListEntry',
  components: { ScrollList },
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
.scrollList-entry {
  width: 100%;
  height: 100%;
}
</style>
