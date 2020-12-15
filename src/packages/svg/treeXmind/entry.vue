<template>
  <div class="treeXmind-entry">
    treeXmind组件
    <treeXmind />
  </div>
</template>
<script>
import treeXmind from './index.vue'
export default {
  name: 'Entry',
  components: { treeXmind },
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
.treeXmind-entry {
  width: 100%;
  height: 100%;
}
</style>
