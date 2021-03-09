<template>
  <div class="dingtalk-entry">
    dingtalk组件
    <dingtalk />
  </div>
</template>
<script>
import dingtalk from './index.vue'
export default {
  name: 'DingtalkEntry',
  components: { dingtalk },
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
.dingtalk-entry {
  width: 100%;
  height: 100%;
}
</style>
