<template>
  <div class="svgEditor-entry">
    <svg-editor />
  </div>
</template>
<script>
import SvgEditor from './index.vue'
export default {
  name: 'SvgEditorEntry',
  components: { SvgEditor },
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
.svgEditor-entry {
  width: 100%;
  height: 100%;
}
</style>
