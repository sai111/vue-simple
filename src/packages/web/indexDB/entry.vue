<template>
  <div class="indexDB-entry">
    indexDB组件
    <indexDB />
  </div>
</template>
<script>
import indexDB from './index.vue'
export default {
  name: 'IndexDBEntry',
  components: { indexDB },
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
.indexDB-entry {
  width: 100%;
  height: 100%;
}
</style>
