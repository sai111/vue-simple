<template>
  <div class="graphTree-entry">
    graphTree组件
    <graphTree />
  </div>
</template>
<script>
import graphTree from './index.vue'
export default {
  name: 'GraphTreeEntry',
  components: { graphTree },
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
.graphTree-entry {
  width: 100%;
  height: 100%;
}
</style>
