<template>
  <div class="scale-entry">
    scale组件
    <scale />
  </div>
</template>
<script>
import scale from './index.vue'
export default {
  name: 'ScaleEntry',
  components: { scale },
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
.scale-entry {
    width: 100%;
    height: 100%;
}
</style>
