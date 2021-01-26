<template>
  <div class="bubbles-entry">
    bubbles组件
    <bubbles />
  </div>
</template>
<script>
import Bubbles from './index.vue'
export default {
  name: 'BubblesEntry',
  components: { Bubbles },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.bubbles-entry {
  width: 100%;
  height: 100%;
}
</style>
