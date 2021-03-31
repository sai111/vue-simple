<template>
  <div class="macOSDock-entry">
    macOSDock组件
    <dock />
  </div>
</template>
<script>
import Dock from './index.vue'
export default {
  name: 'MacOSDockEntry',
  components: { Dock },
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
.macOSDock-entry {
  width: 100%;
  height: 100%;
}
</style>
