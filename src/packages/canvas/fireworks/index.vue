<template>
  <div class="fireworks">
    <canvas
      ref="canvas"
      :style="{
        width: `${width}px`,
        height: `${height}px`
      }"
    />
  </div>
</template>
<script>
// https://github.com/wzf1997/blog/blob/main/canvas/firework.html
import Fireworks from './config'
export default {
  name: 'Fireworks',
  props: {},
  data() {
    return {
      width: 400,
      height: 400,
      fireLines: null
    }
  },
  computed: {},
  watch: {},
  beforeDestroy() {
    this.fireLines.destory()
    this.fireLines = null
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.fireLines = new Fireworks(
        {
          canvas: this.$refs.canvas,
          settings: {
            width: this.width,
            height: this.height,
            lines: 80,
            linewidth: 2,
            radius: 400,
            strokeColor: '#000'
          }
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
.fireworks {
  width: 100%;
  height: 100%;
  canvas {
    border: 1px solid red;
  }
}
</style>
