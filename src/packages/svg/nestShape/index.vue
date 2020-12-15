<template>
  <div
    ref="nest-shape"
    class="nestShape"
  >
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      x="0%"
      y="0%"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <g
        v-for="(item, index) in nestList"
        :key="'nest-group-'+index"
        class="nest-group"
        :transform="`translate(${item.start},${item.end})`"
        @mouseenter="(e) => handleMouseEnter(e, item)"
        @mouseleave="(e) => handleMouseLeave(e, item)"
      >
        <path
          :key="'nest-group-Polygon-'+index"
          :d="drawPolygon(item, 50)"
          :stroke="item.stroke||'red'"
          :fill="item.fill||'#fff'"
        />
        <image
          width="50"
          height="50"
          x="-25"
          y="-25"
          :xlink:href="defaultImage"
        />
      </g>
    </svg>
    <div
      v-if="tip"
      class="svg-nest-tip"
      :style="tipStyle"
    >
      {{ tip }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'NestShape',
  props: {},
  data() {
    return {
      width: 800,
      height: 500,
      sideNum: 6,
      sixRad: Math.PI * 2 / 6,
      nestList: [
        {
          start: '195',
          end: '92.8993464',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '447',
          end: '140.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '110',
          end: '139.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '110',
          end: '139.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '110',
          end: '139.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '279',
          end: '46.8993464',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '195',
          end: '187.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '700',
          end: '94.8993464',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '279',
          end: '330.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '363',
          end: '282.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '447',
          end: '234.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '531',
          end: '187.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '615',
          end: '140.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '531',
          end: '92.8993464',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '363',
          end: '187.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '279',
          end: '235.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '363',
          end: '93.8993464',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '279',
          end: '140.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '448',
          end: '328.899346',
          image: '',
          fill: '',
          stroke: ''
        },
        {
          start: '615',
          end: '235.899346',
          image: '',
          fill: '',
          stroke: ''
        }
      ],
      defaultImage: 'https://iconfont.alicdn.com/t/55287536-9526-4f05-99ba-427310367ba0.png',
      tip: null,
      timer: null,
      tipStyle: {
        left: 0,
        top: 0,
        opacity: 0,
        transition: ''
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    drawPolygon(item, radius) {
      let polyPath = ''
      for (let i = 0; i <= this.sideNum; i++) {
        const angle = i * this.sixRad
        if (i === 0) {
          polyPath += `M${Math.cos(angle) * radius},${-Math.sin(angle) * radius}`
        } else {
          polyPath += ` L${Math.cos(angle) * radius},${-Math.sin(angle) * radius}`
        }
      }
      polyPath += 'Z'
      return polyPath
    },
    handleMouseEnter(e, item) {
      console.log(e, '------>>>>>>>>')
      if (this.timer) clearTimeout(this.timer)
      this.tip = '提示文本，测试用'
      const { x, y, height } = e.target.getBoundingClientRect()
      if (y > 100) {
        this.tipStyle.top = 'auto'
        this.tipStyle.bottom = `${this.height - y}px`
        this.tipStyle.transition = 'opacity 0.2s,bottom 0.2s'
        setTimeout(() => {
          this.tipStyle.bottom = `${this.height - y + 10}px`
          this.tipStyle.opacity = 1
        })
      } else {
        this.tipStyle.bottom = 'auto'
        this.tipStyle.top = `${height + y}px`
        this.tipStyle.transition = 'opacity 0.2s,top 0.2s'
        setTimeout(() => {
          this.tipStyle.top = `${height + y + 10}px`
          this.tipStyle.opacity = 1
        })
      }
      this.tipStyle.opacity = 0
      this.tipStyle.left = `${x}px`
    },
    handleMouseLeave(e, item) {
      if (this.timer) clearTimeout(this.timer)
      this.tipStyle.opacity = 0
      this.timer = setTimeout(() => {
        this.tip = null
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
.nestShape {
  width: 100%;
  height: 100%;
  position: relative;
}
.svg-nest-tip {
  position: fixed;
  max-width: 240px;
  font-size: 14px;
  padding: 8px 16px;
  color: #fff;
  background: #606266;
}
</style>
