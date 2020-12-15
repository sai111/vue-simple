<template>
  <div class="digitscroll-entry">
    <!-- digitscroll组件 -->
    <div>累计计数-{{ config.num }}</div>
    <digitscroll v-bind="config" :animation="{type: 'add', speed: 50, continuity: 0}" />
    <div>翻牌器动画-{{ config.num }}</div>
    <digitscroll v-bind="config" :animation="{type: 'flip', speed: 50, continuity: 0}" />
    <div>累计{{ countTo.endVal }}</div>
    <count-to v-bind="countTo" />
    <div>数字翻牌器-{{ countTo.endVal }}</div>
    <flip-number v-bind="countTo" :place-num="'8'" />
  </div>
</template>
<script>
import digitscroll from './index.vue'
import CountTo from './components/countTo.vue'
import FlipNumber from './components/flip-number.vue'
export default {
  name: 'DigitscrollEntry',
  components: { digitscroll, CountTo, FlipNumber },
  data() {
    return {
      config: {
        height: 40,
        width: 200,
        prefix: {
          unit: '¥',
          fontSize: 14,
          color: '#000'
        },
        suffix: {
          unit: ' rmb',
          fontSize: 14,
          color: '#000'
        },
        num: (Math.random() * 100).toFixed(2),
        digitStyle: {
          space: 3,
          size: 38
        },
        animation: {
          type: 'add',
          speed: 50,
          continuity: 0 // 连续性
        }
      },
      configReady: false,
      countTo: {
        placeNum: null,
        height: 40,
        width: 200,
        startVal: Math.round(Math.random() * 100),
        endVal: Math.round(Math.random() * 100),
        duration: 3000,
        decimals: 2,
        separator: ',',
        suffix: ' rmb',
        prefix: '¥ ',
        digitStyle: {
          space: 3,
          size: 38
        },
        colors: [
          { min: -Infinity, max: 0, color: '#ff0000' },
          { min: 0, max: 100, color: '#4ccf83' },
          { min: 100, max: 10000, color: '#ffae00' },
          { min: 10000, max: Infinity, color: '#ff0000' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.digitscroll-entry {
  width: 100%;
  height: 100%;
  margin: 10%;
}
</style>
