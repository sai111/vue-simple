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
      event.preventDefault()
      // 即可以使用滚动事件来相对地控制，也可以通过比例值直接控制
      let anchor = [0.5, 0.5]
      let scale = this.scale
      if (typeof event === 'number') {
        scale = event
      } else {
        const bound = this.$refs['magnifier-container'].getBoundingClientRect()
        anchor = [event.layerX / bound.width, event.layerY / bound.height]
        const direct = event.deltay > 0 ? 1.1 : 0.9
        scale *= direct
      }
      // console.log(event, 'ent--->>>>')
      // 缩放范围
      if (scale > 2) { scale = 2 }
      if (scale < 0.2) { scale = 0.2 }
      this.scale = scale
      this.moveManification = this.originMagnification * this.scale
      const newSize = {
        w: this.originViewbox.width * this.scale,
        h: this.originViewbox.height * this.scale
      }
      this.currentViewbox.x -= (newSize.w - this.currentViewbox.width) * anchor[0]
      this.currentViewbox.y -= (newSize.h - this.currentViewbox.height) * anchor[1]
      this.currentViewbox.width = newSize.w
      this.currentViewbox.height = newSize.h
      this.viewBox = `
        ${this.currentViewbox.x}
        ${this.currentViewbox.y}
        ${this.currentViewbox.width}
        ${this.currentViewbox.height}
      `
    },
    onMousedown(event) {
      event.preventDefault()
      this.moving = true
      this.startPoint = [event.screenX, event.screenY]
    },
    // 移动
    onMousemove(event) {
      if (!this.moving) return false
      this.viewBox = `
        ${this.currentViewbox.x - (event.screenX - this.startPoint[0]) * this.moveManification}
        ${this.currentViewbox.y - (event.screenY - this.startPoint[1]) * this.moveManification}
        ${this.currentViewbox.width}
        ${this.currentViewbox.height}
      `
    },
    onMouseup(event) {
      if (!this.moving) return false
      this.moving = false
      this.currentViewbox.x -= (event.screenX - this.startPoint[0]) * this.moveManification
      this.currentViewbox.y -= (event.screenY - this.startPoint[1]) * this.moveManification
      this.viewBox = `
        ${this.currentViewbox.x}
        ${this.currentViewbox.y}
        ${this.currentViewbox.width}
        ${this.currentViewbox.height}
      `
    },
    onClick(event) {
      this.$emit('svgClick', event)
    },
    lerp(start, end, distance) {
      return start + (end - start) * distance
    },
    recovery() {
      this.currentViewbox.x = this.originViewbox.x
      this.currentViewbox.y = this.originViewbox.y
      this.currentViewbox.width = this.originViewbox.width
      this.currentViewbox.height = this.originViewbox.height
      this.viewBox = `
        ${this.currentViewbox.x}
        ${this.currentViewbox.y}
        ${this.currentViewbox.width}
        ${this.currentViewbox.height}
      `
      this.scale = 1
      this.moveManification = this.originMagnification
    }
  }
}
</script>
<style scoped lang="scss">
.magnifier-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
