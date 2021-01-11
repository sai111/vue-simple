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
      <line x1="0" :y1="cy" :x2="2 * cx" :y2="cy" stroke="#000" fill="none" />
      <line :x1="cx" y1="0" :x2="cx" :y2="height" stroke="#000" fill="none" />
      <TreeNode
        v-for="child in root.childNodes"
        :key="getNodeKey(child)"
        :node="child"
        :root="root"
        :render-content="renderContent"
        :node-key="nodeKey"
        :props="props"
        :label-width="labelWidth"
        :label-height="labelHeight"
        :transform="`translate(${cx}, ${cy})`"
      />
    </svg>
  </div>
</template>
<script>
import ResizeObserver from 'resize-observer-polyfill'
import TreeStore from './js/tree-store'
import { getNodeKey } from './js/utils'
// 组件
import TreeNode from './components/tree-node.vue'
export default {
  name: 'TreeXmind',
  components: { TreeNode },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    leftData: {
      type: Array,
      default: () => []
    },
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 树节点的内容区的渲染 Function
    renderContent: {
      type: Function,
      default: null
    },
    // 树节点区域的宽度
    labelWidth: {
      type: [String, Number],
      default: 100
    },
    // 树节点区域的高度
    labelHeight: {
      type: [String, Number],
      default: 40
    },
    // 飞书 OKR 模式
    onlyBothTree: {
      type: Boolean,
      default: false
    },
    // 方向
    direction: {
      type: String,
      default: 'vertical'
    },
    props: {
      type: Object,
      default() {
        return {
          leftChildren: 'leftChildren',
          children: 'children',
          label: 'label',
          disabled: 'disabled'
        }
      }
    }
  },
  data() {
    return {
      width: 1440,
      height: 600,
      config: {
        branchWidth: 150,
        branchHeight: 40,
        lineDistance: 80,
        radius: 100,
        textFill: '#cfd8e6',
        textFontSize: '16px',
        valueFontSize: '14px'
      },
      store: null,
      root: null
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
  watch: {
    data(newVal) {
      this.store.setData(newVal)
    }
  },
  created() {
    this.isTree = true
    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      leftData: this.leftData,
      props: this.props,
      onlyBothTree: this.onlyBothTree
    })
    this.root = this.store.root
  },
  mounted() {
    // this.initObserver()
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
    },
    getNodeKey(node) {
      return getNodeKey(this.nodeKey, node.data)
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
