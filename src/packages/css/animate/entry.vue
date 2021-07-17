<template>
  <div class="animate-entry">
    <div class="animate-left">
      <animate-menu @handleSelect="handleSelect" />
    </div>
    <div class="animate-wrap">
      <components :is="isCom" />
    </div>
  </div>
</template>
<script>
import config from './config.js'
import AnimateMenu from './menu.vue'
export default {
  name: 'AnimateEntry',
  components: { AnimateMenu, ...config.comps },
  data() {
    return {
      isCom: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleSelect(val) {
      this.isCom = val
      console.log(val, 'val-->>>000')
    }
  }
}
</script>
<style lang="scss" scoped>
.animate-entry {
  width: 100%;
  height: 100%;
  display: flex;
  .animate-left {
    width: 220px;
    height: 100%;
  }
  .animate-wrap {
    width: calc(100% - 220px);
    height: 100%;
  }
}
</style>
