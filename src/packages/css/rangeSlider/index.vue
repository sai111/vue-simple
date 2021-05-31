<template>
  <div class="range-slider">
    <div
      ref="slider"
      class="ranger-slider-runway"
      :style="runwayStyle"
    >
      <div class="ranger-slider-bar" :style="barStyle" />
      <range-button
        ref="button1"
        v-model="firstValue"
        :vertical="vertical"
      />
      <range-button
        ref="button2"
        v-if="range"
        v-model="secondValue"
        :vertical="vertical"
      />
      <div class="ranger-slider-markers">
        <div
          v-for="(item, index) in extraMark"
          :key="'mark-stop-'+index"
          class="mark-stop"
          :style="getStopStyle(item)"
        >
          <div class="mark-stop-label" :style="{color: item.style.background}">
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RangeButton from './comp/range-button.vue'
export default {
  name: 'RangeSlider',
  props: {
    value: {
      type: [Number, Array],
      default: () => 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    range: {
      type: Boolean,
      default: false
    },
    // 是否竖向模式
    vertical: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    showStops: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: ''
    },
    // 区间标记
    extraMark: {
      type: Array,
      default: () => []
    },
    marks: {
      type: Object,
      require: true,
      default: () => {}
    },
    // 是否为区间
    extraRegion: {
      type: Boolean,
      default: false
    },
    runwayStyle: {
      type: Object,
      default: () => {}
    },
    visualMap: {
      type: Array,
      default: () => []
    }
  },
  components: { RangeButton },
  data() {
    return {
      firstValue: null,
      secondValue: null,
      oldValue: null,
      dragging: false,
      sliderSize: 1
    }
  },
  computed: {
    //stops() {
    //  if (this.min > this.max) return []
    //  if (this.step === 0) {
    //    console.warn('step should not be 0.')
    //    return []
    //  }
    //  const stopCount = (this.max - this.min) / this.step
    //  const stepWidth = 100 * this.step / (this.max - this.min)
    //  const result = []
    //  for (let i = 1; i < stopCount; i++) {
    //    result.push(i * stepWidth)
    //  }
    //  if (this.range) {
    //    return result.filter(step => {
    //      return step < 100 * (this.minValue - this.min) / (this.max - this.min) ||
    //        step > 100 * (this.maxValue - this.min) / (this.max - this.min)
    //    })
    //  } else {
    //    return result.filter(step => step > 100 * (this.firstValue - this.min) / (this.max - this.min))
    //  }
    //},
    markList() {
      if (!this.marks) { return [] }
      const marksKes = Object.keys(this.marks)
      return marksKes.map(parseFloat)
        .sort((a, b) => a - b)
        .filter(point => point <= this.max && point >= this.min)
        .map(point => ({
          point,
          position: (point - this.min) * 100 / (this.max - this.min),
          mark: this.marks[point]
        }))
    },
    minValue() {
      return Math.min(this.firstValue, this.secondValue)
    },
    maxValue() {
      return Math.max(this.firstValue, this.secondValue)
    },
    barSize() {
      return this.range
        ? `${ 100 * (this.maxValue - this.minValue) / (this.max - this.min) }%`
        : `${ 100 * (this.firstValue - this.min) / (this.max - this.min) }%`
    },
    barStart() {
      return this.range
        ? `${ 100 * (this.minValue - this.min) / (this.max - this.min) }%`
        : '0%'
    },
    precision() {
      const precisions = [this.min, this.max, this.step].map(item => {
        const decimal = ('' + item).split('.')[1]
        return decimal ? decimal.length : 0
      })
      return Math.max.apply(null, precisions)
    },
    barStyle() {
      return this.vertical
        ? {
          height: this.barSize,
          bottom: this.barStart
        } : {
          width: this.barSize,
          left: this.barStart
        }
    },
    sliderDisabled() {
      return this.disabled
    }
  },
  watch: {
    value(val, oldVal) {
      if (this.dragging ||
        Array.isArray(val) &&
        Array.isArray(oldVal) &&
        val.every((item, index) => item === oldVal[index])
      ) { return }
      this.setValues()
    },
    dragging(val) {
      if (!val) {
        this.setValues()
      }
    },
    firstValue(val) {
      if (this.range) {
        this.$emit('input', [this.minValue, this.maxValue])
      } else {
        this.$emit('input', val)
      }
    },
    secondValue() {
      if (this.range) {
        this.$emit('input', [this.minValue, this.maxValue])
      }
    },
    min() {
      this.setValues()
    },
    max() {
      this.setValues()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resetSize)
  },
  mounted() {
    this.init()
    //console.log(this.stops, 'marlList---88888--bbbb')
  },
  methods: {
    init() {
      //let valuetext
      if (this.range) {
        if (Array.isArray(this.value)) {
          this.firstValue = Math.max(this.min, this.value[0])
          this.secondValue = Math.min(this.max, this.value[1])
        } else {
          this.firstValue = this.min
          this.secondValue = this.max
        }
        this.oldValue = [this.firstValue, this.secondValue]
        //valuetext = `${this.firstValue}-${this.secondValue}`
      } else {
        if (typeof this.value !== 'number' || isNaN(this.value)) {
          this.firstValue = this.min
        } else {
          this.firstValue = Math.min(this.max, Math.max(this.min, this.value))
        }
        this.oldValue = this.firstValue
        //valuetext = this.firstValue
      }
      this.resetSize()
      window.addEventListener('resize', this.resetSize)
    },
    resetSize() {
      if (this.$refs.slider) {
        this.sliderSize = this.$refs.slider[`client${ this.vertical ? 'Height' : 'Width' }`]
      }
    },
    getStopStyle(item) {
      let tmpStyle = {}
      if (item.style) {
        tmpStyle = Object.assign({}, tmpStyle, item.style)
      }
      if (this.vertical) {
        tmpStyle.height = item.diff + '%'
        tmpStyle.bottom = item.start + '%'
        tmpStyle.width = this.height
      } else {
        tmpStyle.width = item.diff
        tmpStyle.left = item.left
        tmpStyle.height = this.height
      }
      return tmpStyle
    },
    // todo
    setValues() {},
    emitChange() {
      this.$nextTick(() => {
        this.$emit('change', this.range ? [this.minValue, this.maxValue] : this.value)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.range-slider {
  width: 100%;
  height: 100%;
  .ranger-slider-runway {
    width: 100%;
    height: 6px;
    vertical-align: middle;
    position: relative;
    .ranger-slider-bar {
      width: 100%;
      height: 100%;
      background-color: #F59A23;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      position: absolute;
    }
    .ranger-slider-markers {
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      .mark-stop {
        position: absolute;
        top: 0;
        font-size: 14px;
        color: #909399;
        transition: all 0.2s;
        .mark-stop-label {
          text-align:center;
          margin-top:15px;
        }
      }
    }
  }
}
</style>
