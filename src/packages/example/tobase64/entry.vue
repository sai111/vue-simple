<template>
  <div class="tobase64-entry">
    tobase64组件
    <tobase64 />
  </div>
</template>
<script>
import tobase64 from './index.vue'
export default {
  name: 'Tobase64Entry',
  components: { tobase64 },
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
.tobase64-entry {
    width: 100%;
    height: 100%;
}
</style>
