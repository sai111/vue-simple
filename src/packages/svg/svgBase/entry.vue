<template>
  <div class="svgBase-entry">
    svgBase组件
    <svgBase />
  </div>
</template>
<script>
import svgBase from './index.vue'
export default {
  name: 'SvgBaseEntry',
  components: { svgBase },
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
.svgBase-entry {
  width: 100%;
  height: 100%;
}
</style>
