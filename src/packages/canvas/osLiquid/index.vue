<template>
  <div class="os-liquid">
    <canvas ref="canvas" />
  </div>
</template>
<script>
import Liquid from './config'
export default {
  name: 'OsLiquid',
  props: {},
  data() {
    return {
      width: 400,
      height: 400,
      liquid: null,
      value: '0%'
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.liquid = new Liquid({ canvas: this.$refs.canvas })
    // this.init()
  },
  beforeDestroy() {
    this.liquid.destory()
    this.liquid = null
  },
  methods: {
    init() {
      this.liquid = new Liquid({ canvas: this.$refs.canvas, settings: { value: 0.6 }})
      this.liquid.onValueChange = this.handleValueChange
    },
    handleValueChange(value) {
      this.value = `${Math.round(value * 100)}%`
    }
  }
}
</script>
<style lang="scss" scoped>
.os-liquid {
  width: 100%;
  height: 100%;
}
</style>
