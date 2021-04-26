<template>
  <div
    ref="magnifier-container"
    class="magnifier-container"
  >
    <svg
      v-if="svgContent"
      ref="svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      :viewBox="viewBox"
      class="svg-container"
      @wheel="onMouseWheel"
      @mousedown="onMousedown"
      @click="onClick"
    />
    <svg
      v-else
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      :viewBox="viewBox"
      class="svg-container"
      @wheel="onMouseWheel"
      @mousedown="onMousedown"
      @click="onClick"
    >
      <slot name="content" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'ResultMagnifier',
  components: {},
  props: {
    originViewbox: {
      type: Object,
      default() {
        return {
          x: -500,
          y: -250,
          width: 1000,
          height: 500
        }
      }
    },
    svgContent: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'white'
    },
    position: {
      type: String,
      default: 'rb'
    }
  },
  data() {
    return {
      viewBox: '-500 -250 1000 500',
      currentViewbox: {
        x: -500,
        y: -250,
        width: 1000,
        height: 500
      },
      moving: false,
      startPoint: [0, 0], // 移动的起始位置
      scale: 1,
      originMagnification: 2,
      moveManification: 2,
      animating: false,
      userScale: false
    }
  },
  watch: {
    originViewbox: {
      handler(viewBox) {
        this.currentViewbox.x = viewBox.x
        this.currentViewbox.y = viewBox.y
        this.currentViewbox.width = viewBox.width
        this.currentViewbox.height = viewBox.height
        this.viewBox = `${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`
        this.originMagnification = this.currentViewbox.width / window.innerWidth * 1.8
        this.scale = 1
        this.moveManification = this.originMagnification * this.scale
      },
      immediate: true
    },
    svgContent(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.svgMain.innerHTML = val
        })
      }
    }
  },
  mounted() {
    document.addEventListener('mousemove', this.onMousemove)
    document.addEventListener('mouseup', this.onMouseup)
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMousemove)
    document.removeEventListener('mouseup', this.onMouseup)
  },
  methods: {
    // 滚动缩放
    onMouseWheel(event) {
      // console.log(event, 'ent--->>>>')
    },
    onMousedown() {},
    onClick() {},
    // 移动
    onMousemove() {},
    onMouseup() {}
  }
}
</script>
<style scoped lang="scss">
</style>
