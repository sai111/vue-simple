<template>
  <div class="webUploader-entry">
    webUploader组件
    <webUploader />
  </div>
</template>
<script>
import webUploader from './index.vue'
export default {
  name: 'webUploaderEntry',
  components: { webUploader },
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
.webUploader-entry {
  width: 100%;
  height: 100%;
}
</style>