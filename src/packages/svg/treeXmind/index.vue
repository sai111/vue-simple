<template>
  <div ref="tree-xmind" class="treeXmind">
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
      1122
    </svg>
  </div>
</template>
<script>
import ResizeObserver from 'resize-observer-polyfill'
export default {
  name: 'TreeXmind',
  components: {},
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    leftData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // treeData: [],
      width: 1440,
      height: 600,
      config: {
        thirdCollapse: false, // 第三层是否折叠
        branchWidth: 150,
        branchHeight: 40,
        lineDistance: 80,
        radius: 100,
        textFill: '#cfd8e6',
        textFontSize: '16px',
        valueFontSize: '14px'
      }
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    cx() {
      return this.width / 2
    },
    cy() {
      return this.height / 2
    },
    maxRect() {
      return Math.floor(this.height / this.config.branchHeight) - 2
    }
  },
  watch: {},
  mounted() {
    this.initObserver()
  },
  beforeDestroy() {
    this.resizeObserver = null
  },
  methods: {
    initObserver() {
      this.resizeObserver = new ResizeObserver(this.resize)
      if (this.$refs['tree-xmind']) {
        this.resizeObserver.observe(this.$refs['tree-xmind'])
      }
      this.resize()
    },
    resize() {
      if (this.$refs['tree-xmind']) {
        const { width } = this.$refs['tree-xmind'].getBoundingClientRect()
        this.width = width
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.treeXmind {
  width: 100%;
  height: 100%;
  svg {
    border: 1px solid red;
  }
}
</style>
