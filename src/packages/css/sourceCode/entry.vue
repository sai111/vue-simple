<template>
  <div class="sourceCode-entry">
    sourceCode组件
    <sourceCode :source="sourceData" />
  </div>
</template>
<script>
import sourceCode from './index.vue'
export default {
  name: 'SourceCodeEntry',
  components: { sourceCode },
  data() {
    return {
      sourceData: require('./data.json').data
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.sourceCode-entry {
  width: 100%;
  height: 100%;
}
</style>
