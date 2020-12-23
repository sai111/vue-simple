<template>
  <div class="treeXmind">
    tree
  </div>
</template>
<script>

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
  mounted() {},
  methods: {}
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
