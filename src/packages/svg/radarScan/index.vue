<template>
  <div class="radarScan" :style="{width:width+'px',height:height+'px'}">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      x="0%"
      y="0%"
      :viewBox="viewBox"
    >
      <defs>
        <linearGradient :id="'sector-1'+timeScopd" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop
            v-for="(item, index) in colors"
            :key="'sector-1-stop-'+index"
            :offset="item.value"
            :stop-color="item.color"
          />
        </linearGradient>
        <linearGradient :id="'sector-2'+timeScopd" x1="100%" y1="9%" x2="0%" y2="0%">
          <stop
            v-for="(item, index) in colors2"
            :key="'sector-2-stop-'+index"
            :offset="item.value"
            :stop-color="item.color"
          />
        </linearGradient>
        <g id="shape">
          <path :d="sectorPath">
            <animateTransform
              attributeName="transform"
              type="rotate"
              :from="`0 ${cx} ${cy}`"
              :to="`360 ${cx} ${cy}`"
              :dur="duration+'s'"
              fill="freeze"
              repeatCount="indefinite"
            />
          </path>
        </g>
        <g id="line">
          <path :d="linePath" fill="none" stroke-width="2" :stroke="color">
            <animateTransform
              attributeName="transform"
              type="rotate"
              :from="`0 ${cx} ${cy}`"
              :to="`360 ${cx} ${cy}`"
              :dur="duration+'s'"
              fill="freeze"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </defs>
      <circle :cx="cx" :cy="cy" :r="radius" fill="none" :stroke="color" />
      <use xlink:href="#shape" :fill="`url(#${'sector-1'+timeScopd})`" />
      <use xlink:href="#shape" :fill="`url(#${'sector-2'+timeScopd})`" />
      <use xlink:href="#line" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'RadarScan',
  props: {
    width: {
      type: [Number, String],
      default: 230
    },
    height: {
      type: [Number, String],
      default: 230
    },
    radius: {
      type: [Number, String],
      default: 90
    },
    angle: {
      type: [Number, String],
      default: 90
    },
    cx: {
      type: [Number, String],
      default: 115
    },
    cy: {
      type: [Number, String],
      default: 115
    },
    color: {
      type: String,
      default: 'rgb(72,168,248)'
    },
    colors: {
      type: Array,
      default: () => []
    },
    colors2: {
      type: Array,
      default: () => []
    },
    // 动画时间（单位：s）
    duration: {
      type: [Number, String],
      default: 1.8
    }
  },
  data() {
    return {
      timeScopd: (new Date()).getTime()
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    rad() {
      return this.angle * Math.PI / 180
    },
    sina() {
      return Math.sin(this.rad)
    },
    cosa() {
      return Math.cos(this.rad)
    },
    sectorPath() {
      return `M${this.cx} ${this.cy} L${this.cx} ${this.cx - this.radius}
            A${this.radius} ${this.radius} 0 0 1 ${this.cx + this.radius * this.sina} ${this.cy - this.radius * this.cosa}Z`
    },
    linePath() {
      return `M${this.cx},${this.cy} L${this.cx + this.sina * this.radius},${this.cx - this.cosa * this.radius}`
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.radarScan {
    width: 100%;
    height: 100%;
}
</style>
