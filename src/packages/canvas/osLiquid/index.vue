<template>
  <div class="os-liquid">
    <canvas
      ref="canvas"
      :style="{
        width: `${width}px`,
        height: `${height}px`
      }"
    />
    <div class="liquid-value">
      {{ value }}
    </div>
    <div class="liquid-change">
      12
    </div>
  </div>
</template>
<script>
import Liquid from './config'
export default {
  name: 'OsLiquid',
  props: {},
  data() {
    return {
      data: {
        value: 0.4,
        total: 1
      },
      innerBoxWidth: 80,
      width: 400,
      height: 400,
      liquid: null,
      value: '0%',
      visualMap: [
        {
          field: 20,
          linear: {
            type: 'linear',
            startColor: 'rgba(228, 9, 9, 1)',
            endColor: 'rgba(255, 166, 166, 1)'
          }
        },
        {
          field: 60,
          linear: {
            type: 'linear',
            startColor: 'rgba(244, 83, 31, 1)',
            endColor: 'rgba(255, 213, 79, 1)'
          }
        },
        {
          field: 80,
          linear: {
            type: 'linear',
            startColor: 'rgba(32, 180, 255, 1)',
            endColor: 'rgba(175, 228, 255, 1)'
          }
        }
      ]
    }
  },
  computed: {
    clampValue() {
      const value = this.data.rate !== undefined ? this.data.rate : (this.data.value / this.data.total) || 0
      return Math.max(Math.min(value, 1), 0) // value必须介于【0，1】
    },
    minEdge() {
      return Math.min(this.width, this.height)
    },
    occupy() {
      return this.innerBoxWidth * 0.01
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.liquid.destory()
    this.liquid = null
  },
  methods: {
    init() {
      this.liquid = new Liquid(
        {
          canvas: this.$refs.canvas,
          settings:
            {
              value: this.clampValue,
              radius: this.minEdge * this.occupy,
              status: this.getVisualMapColor().field,
              color: this.getVisualMapColor().linear
            }
        }
      )
      this.liquid.onValueChange = this.handleValueChange
    },
    handleValueChange(value) {
      this.value = `${Math.round(value * 100)}%`
    },
    // 阈值
    getVisualMapColor() {
      const visualMap = this.visualMap.sort((a, b) => {
        return a.field - b.field
      })
      let color
      for (const status of visualMap) {
        if (this.clampValue >= status.field) {
          color = status
        } else break
      }
      return color || visualMap.pop()
    }
  }
}
</script>
<style lang="scss" scoped>
.os-liquid {
  width: 100%;
  height: 100%;
  position: relative;
  canvas {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    clip-path: circle(50%);
  }
  .liquid-value {
    position: absolute;
    left: 50%;
    top: 50%;
    color: #000;
    font-size: 30px;
    transform: translate(-50%, -50%);
  }
}
</style>
