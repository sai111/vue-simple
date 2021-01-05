<template>
  <div class="axios-entry">
    axios组件
    <axios />
  </div>
</template>
<script>
import axios from './index.vue'
export default {
  name: 'AxiosEntry',
  components: { axios },
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
.axios-entry {
  width: 100%;
  height: 100%;
}
</style>
