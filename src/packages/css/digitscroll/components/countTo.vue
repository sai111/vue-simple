<template>
  <span class="count-to" :class="'count-to-'+timeScopd" :style="style">
    <span class="count-to-prefix">{{ prefix }}</span>
    <span class="count-to-value">
      <div
        v-for="(item, index) in getList"
        :key="'count-to-value-li-'+index"
        class="count-to-value-li"
      >
        <span class="count-to-value-li-palce">
          {{ placeNum }}
        </span>
        <span class="count-to-value-li-value">
          {{ item.value }}
        </span>
        <span v-if="item.dot" class="count-to-value-li-dot">
          {{ item.dot }}
        </span>
      </div>
    </span>
    <span class="count-to-suffix">{{ suffix }}</span>
  </span>
</template>
<script>
import { requestAnimationFrame, cancelAnimationFrame } from '../../../../lib/storyboard/utils/requestAnimationFrame.js'
export default {
  name: 'CountTo',
  props: {
    height: {
      type: Number,
      default: 60
    },
    width: {
      type: Number,
      default: 200
    },
    placeNum: {
      type: [Number, String],
      default: null
    },
    digitStyle: {
      type: Object,
      default: () => {
        return {
          space: 2,
          size: 30
        }
      }
    },
    startVal: {
      type: Number,
      required: false,
      default: 0
    },
    endVal: {
      type: [Number, String],
      required: false,
      default: 2017
    },
    duration: {
      type: Number,
      required: false,
      default: 3000
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true
    },
    // 小数
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    decimal: {
      type: String,
      required: false,
      default: '.'
    },
    separator: {
      type: String,
      required: false,
      default: ','
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    suffix: {
      type: String,
      required: false,
      default: ''
    },
    useEasing: {
      type: Boolean,
      required: false,
      default: true
    },
    easingFn: {
      type: Function,
      default(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
      }
    }
  },
  data() {
    return {
      localStartVal: this.startVal,
      displayValue: this.formatNumber(this.startVal),
      printVal: null,
      paused: false,
      localDuration: this.duration,
      startTime: null,
      timestamp: null,
      remaining: null,
      rAF: null,
      timeScopd: (new Date()).getTime(),
      style: null
    }
  },
  computed: {
    countDown() {
      return this.startVal > this.endVal
    },
    getList() {
      const numArr = this.displayValue.split('')
      const newArr = []
      for (let i = 0; i < numArr.length; i++) {
        const v = numArr[i]
        if (v === ',' || v === '.') {
          newArr[newArr.length - 1].dot = v
        } else {
          newArr.push({
            value: v,
            dot: '',
            isLast: i === numArr.length - 1
          })
        }
      }
      return newArr
    }
  },
  watch: {
    startVal() {
      if (this.autoplay) {
        this.start()
      }
    },
    endVal() {
      if (this.autoplay) {
        this.start()
      }
    }
  },
  mounted() {
    if (this.autoplay) {
      this.start()
      this.initStyle()
    }
    this.$emit('mountedCallback')
  },
  destroyed() {
    cancelAnimationFrame(this.rAF)
    this.rAF = null
    this.style = null
  },
  methods: {
    initStyle() {
      this.style = `
      .count-to-${this.timeScopd} {
        --count-to-wrap-width: ${this.width}px;
        --count-to-wrap-height: ${this.height}px;
        --count-to-wrap-li-fontSize: ${this.digitStyle.size}px;
        --count-to-wrap-li-space: ${this.digitStyle.space}px;
      }`
    },
    start() {
      this.localStartVal = this.startVal
      this.startTime = null
      this.localDuration = this.duration
      this.paused = false
      this.rAF = requestAnimationFrame(this.count)
    },
    pauseResume() {
      if (this.paused) {
        this.resume()
        this.paused = false
      } else {
        this.pause()
        this.paused = true
      }
    },
    pause() {
      cancelAnimationFrame(this.rAF)
    },
    resume() {
      this.startTime = null
      this.localDuration = +this.remaining
      this.localStartVal = +this.printVal
      requestAnimationFrame(this.count)
    },
    reset() {
      this.startTime = null
      cancelAnimationFrame(this.rAF)
      this.displayValue = this.formatNumber(this.startVal)
    },
    count(timestamp) {
      if (!this.startTime) this.startTime = timestamp
      this.timestamp = timestamp
      const progress = timestamp - this.startTime
      this.remaining = this.localDuration - progress

      if (this.useEasing) {
        if (this.countDown) {
          this.printVal = this.localStartVal - this.easingFn(progress, 0, this.localStartVal - this.endVal, this.localDuration)
        } else {
          this.printVal = this.easingFn(progress, this.localStartVal, this.endVal - this.localStartVal, this.localDuration)
        }
      } else {
        if (this.countDown) {
          this.printVal = this.localStartVal - ((this.localStartVal - this.endVal) * (progress / this.localDuration))
        } else {
          this.printVal = this.localStartVal + (this.endVal - this.localStartVal) * (progress / this.localDuration)
        }
      }
      if (this.countDown) {
        this.printVal = this.printVal < this.endVal ? this.endVal : this.printVal
      } else {
        this.printVal = this.printVal > this.endVal ? this.endVal : this.printVal
      }
      this.displayValue = this.formatNumber(this.printVal)
      if (progress < this.localDuration) {
        this.rAF = requestAnimationFrame(this.count)
      } else {
        this.$emit('callback')
      }
    },
    isNumber(val) {
      return !isNaN(parseFloat(val))
    },
    formatNumber(num) {
      num = num.toFixed(this.decimals)
      num += ''
      const x = num.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? this.decimal + x[1] : ''
      const rgx = /(\d+)(\d{3})/
      if (this.separator && !this.isNumber(this.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + this.separator + '$2')
        }
      }
      return x1 + x2
    }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
    font-family: "ds-digital";
    src: url("../assets/DS-DIGIB.TTF")format("truetype");
}
.count-to {
  width: var(--count-to-wrap-width);
  height: var(--count-to-wrap-height);
  display: flex;
  &-prefix {
    display: inline-block;
    font-size: 14px;
    line-height: var(--count-to-wrap-height);
  }
  &-suffix {
    display: inline-block;
    font-size: 14px;
    padding-left: 5px;
    line-height: var(--count-to-wrap-height);
  }
  &-value {
    font-size: 0;
    display: inline-block;
    // font-family: "ds-digital";
    &-li {
      display: inline-block;
      position: relative;
      white-space: nowrap;
      font-size: 0px;
      height: var(--count-to-wrap-height);
      width: calc(var(--count-to-wrap-li-fontSize) * 0.5 + var(--count-to-wrap-li-space));
      span {
        display: inline-block;
        line-height: var(--count-to-wrap-height);
      }
      &-palce {
        text-align: right;
        opacity: 0.2;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: calc(var(--count-to-wrap-li-fontSize) * 0.5);
        font-size: var(--count-to-wrap-li-fontSize);
      }
      &-value {
        text-align: right;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: calc(var(--count-to-wrap-li-fontSize) * 0.5);
        font-size: var(--count-to-wrap-li-fontSize);
      }
      &-dot {
        position: absolute;
        bottom: 0;
        left: 77%;
        z-index: 1;
        font-size: var(--count-to-wrap-li-fontSize);
      }
    }
  }
}
</style>
