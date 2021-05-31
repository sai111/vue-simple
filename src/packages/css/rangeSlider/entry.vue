<template>
  <div class="range-slider-entry">
    range-slider组件
    <range-slider
      :value="value"
      :range="range"
      :vertical="vertical"
      :height="height"
      :min="min"
      :max="max"
      :visual-map="visualMap"
      :extra-region="extraRegion"
      :extra-label="extraLabel"
      :marks="marks"
      :extra-mark="extraMark"
      :runway-style="runwayStyle"
      @change="changeValue"
    />
  </div>
</template>
<script>
import RangeSlider from './index.vue'
export default {
  name: 'RangeSliderEntry',
  components: { RangeSlider },
  data() {
    return {
      range: true,
      vertical: false,
      value: [20, 50],
      height: '6px',
      min: 0,
      max: 105,
      extraLabel: '风险总分',
      extraRegion: true, // 区间
      visualMap: [
        {
          background: '#02A7F0',
          label: '持续监测'
        },
        {
          background: '#F59A23',
          label: '一般关注'
        },
        {
          background: '#D9001B',
          label: '重点关注'
        }
      ],
      marks: {},
      extraMark: [],
      runwayStyle: {
        margin: '16px 0',
        borderRadius: '3px',
        cursor: 'pointer',
        background: '#e9edf2'
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.initValue(this.value)
  },
  methods: {
    // 数据区间划分
    changeValue(val) {
      this.value = val
      this.initValue(val)
    },
    initValue(val) {
      let tmpValue = []
      if (this.range) {
        tmpValue = [
          {
            start: val[0],
            end: val[1],
            label: '一般关注',
            diff: `${(val[1] - val[0]) / (this.max - this.min) * 100}%`,
            left: `${val[0] / (this.max - this.min) * 100}%`,
            style: {
              background: '#F59A23'
            }
          }
        ]
        if (this.min < val[0]) {
          tmpValue.unshift({
            start: this.min,
            end: val[0],
            label: '持续监测',
            diff: `${(val[0] - this.min) / (this.max - this.min) * 100}%`,
            left: '0%',
            style: {
              background: '#02A7F0'
            }
          })
        }
        if (this.max > val[1]) {
          tmpValue.push({
            start: val[1],
            end: this.max,
            label: '高度关注',
            diff: `${(this.max - val[1]) / (this.max - this.min) * 100}%`,
            left: `${val[1] / (this.max - this.min) * 100}%`,
            style: {
              background: '#D9001B'
            }
          })
        }
      }
      this.extraMark = tmpValue
    }
  }
}
</script>
<style lang="scss" scoped>
.range-slider-entry {
  width: 600px;
  height: 40px;
  margin: 0 auto;
}
</style>
