<template>
  <div class="colTable-entry">
    colTable组件
    <colTable />
  </div>
</template>
<script>
import colTable from './index.vue'
export default {
  name: 'ColTableEntry',
  components: { colTable },
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
.colTable-entry {
  width: 100%;
  height: 100%;
}
</style>
