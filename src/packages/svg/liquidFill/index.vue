<template>
  <div class="liquid-fill">
    <div class="liquid-fill-wrap">
      <result-magnifier>
        <g ref="svgGroup" slot="content" class="liquid-svg-group">
          <!--<circle
            :cx="width/2"
            :cy="height/2"
            :r="occupy*minEdge/2"
            :fill="circle.fill"
            :stroke="circle.color"
            :stroke-width="circle.width"
          />-->
          <path
            class="wave-group"
            :d="drawWave()"
            :fill="circle.fill"
            :stroke="circle.color"
            :stroke-width="circle.width"
          />
        </g>
      </result-magnifier>
    </div>
  </div>
</template>
<script>
import ResultMagnifier from './component/result-magnifier.vue'
export default {
  name: 'LiquidFill',
  components: { ResultMagnifier },
  props: {},
  data() {
    return {
      viewBox: '0 0 400 400',
      width: 400,
      height: 400,
      innerBoxWidth: 80, // 圆环占比80%
      controlPointOffsetRate: 0.1, // 控制点
      value: 0.6,
      circle: {
        width: 4,
        fill: 'none',
        color: 'rgba(0, 196, 252, 1)'
      },
      stroke: 'red',
      liquid: null
    }
  },
  computed: {
    minEdge() {
      return Math.min(this.width, this.height)
    },
    occupy() {
      return this.innerBoxWidth * 0.01
    }
  },
  watch: {},
  mounted() {
    // this.init()
  },
  methods: {
    init() {
      // this.liquid = new Liquid({
      //  svgGroup: this.$refs.svgGroup,
      //  settings: {
      //    value: 0.6,
      //    radius: this.occupy * this.minEdge / 2,
      //    fill: 'none',
      //    color: 'rgba(0, 196, 252, 1)'
      //  }
      // })
    },
    drawWave() {
      // https://segmentfault.com/a/1190000010627039
      // https://www.zhangxinxu.com/wordpress/2014/06/deep-understand-svg-path-bezier-curves-command/
      const C1 = `
        C${this.width * this.controlPointOffsetRate},${this.height}
        ${this.width * (0.9 - this.controlPointOffsetRate)},${this.height * 0.4}
        ${this.width}, ${this.height * 0.8}
      `
      const p1 = `M0 ${this.height * this.value}`
      // const p2 = `L${this.width} ${this.height * this.value}`
      const p3 = `L${this.width} ${this.height}`
      const p4 = `L0 ${this.height}`
      // 找控制点
      return `${p1} ${C1} ${p3} ${p4} Z`
    }
  }
}
</script>
<style lang="scss" scoped>
.liquid-fill {
  width: 100%;
  height: 100%;
  .liquid-fill-wrap {
    width: 500px;
    height: 500px;
    //margin: 0 auto;
    .liquid-svg-group {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
