<template>
  <g class="center-theme">
    <circle :cx="cx" :cy="cy" :r="radius" stroke="none" :fill="fill" />
    <line x1="0" :y1="cy" :x2="2 * cx" :y2="cy" stroke="red" fill="none" />
    <line :x1="cx" y1="0" :x2="cx" :y2="2 * cy" stroke="red" fill="none" />
    <text
      v-if="treeData&&treeData.title"
      :x="cx"
      :y="cy-10"
      :fill="textFill"
      text-anchor="middle"
      dominant-baseline="middle"
      style="font-size:14px"
      class="center-theme-title"
    >
      {{ formatText(treeData.title) }}
    </text>
    <text
      v-if="treeData&&treeData.value"
      :x="cx"
      :y="cy"
      :fill="textFill"
      text-anchor="middle"
      dominant-baseline="middle"
      style="font-size:14px"
    >
      {{ treeData.value }}
    </text>
    <text
      :x="cx"
      :y="cy + 15"
      :fill="textFill"
      text-anchor="middle"
      dominant-baseline="middle"
      style="font-size:14px"
    >
      默认信息
    </text>
  </g>
</template>
<script>
export default {
  name: 'CenterTheme',
  props: {
    treeData: {
      type: Object,
      default: () => []
    },
    cx: {
      type: [Number, String],
      default: 0
    },
    cy: {
      type: [Number, String],
      default: 0
    },
    radius: {
      type: [Number, String],
      default: 0
    },
    fill: {
      type: String,
      default: ''
    },
    textFill: {
      type: String,
      default: '#cfd8e6'
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {
    formatText(title) {
      let div = document.createElement('div')
      div.innerText = title.slice(0, 24)
      div.style.fontSize = '14px'
      div.style.position = 'fixed'
      div.style.opacity = 0
      document.body.appendChild(div)
      const { width } = div.getBoundingClientRect()
      document.body.removeChild(div)
      div = null
      if (width < 150) return title
      return title.slice(0, 18 - Math.round(width - 150) / 14) + '...'
    }
  }
}
</script>
<style lang="scss" scoped></style>
