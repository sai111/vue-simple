<template>
  <div class="ColorDemo-entry">
    ColorDemo组件
    <ColorDemo />
  </div>
</template>
<script>
import ColorDemo from './index.vue'
export default {
  name: 'ColorDemoEntry',
  components: { ColorDemo },
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
.ColorDemo-entry {
  width: 100%;
  height: 100%;
}
</style>
