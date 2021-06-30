<template>
  <div class="fireworks-entry">
    fireworks组件
    <fireworks />
  </div>
</template>
<script>
import Fireworks from './index.vue'
export default {
  name: 'FireworksEntry',
  components: { Fireworks },
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
.fireworks-entry {
  width: 100%;
  height: 100%;
}
</style>
