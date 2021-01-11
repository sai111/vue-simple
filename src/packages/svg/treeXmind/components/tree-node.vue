<template>
  <g class="tree-node-branch">
    <!-- 左侧 -->
    <g class="tree-node-branch-left">
      <TreeNode
        v-for="child in leftChildNodes"
        :key="getNodeKey(child)"
        :node="child"
        :render-content="renderContent"
        :node-key="nodeKey"
        :props="props"
        is-left-child-node
      />
    </g>
    <!-- 中间 -->
    <g
      class="tree-node-branch-label"
      :class="{
        'is-root-label': node.level === 1,
        'is-not-right-child': node.level === 1 && node.childNodes.length <= 0,
        'is-not-left-child': node.level === 1 && leftChildNodes.length <= 0
      }"
    >
      <NodeContent :node="node">
        <slot>
          <g :transform="formatTransform(node)">
            <rect x="-50" y="-20" width="100" height="40" stroke="red" fill="none" />
            <text
              :x="formatNodeX(node)"
              :y="formatNodeY(node)"
              width="100"
              height="30"
              fill="#000"
              stroke="none"
              font-size="16px"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              {{ formatLabel(node.label) }}
            </text>
          </g>
        </slot>
      </NodeContent>
    </g>
    <!-- 右侧 -->
    <g
      v-if="!isLeftChildNode&&node.childNodes && node.childNodes.length > 0"
      class="tree-node-branch-right"
    >
      <TreeNode
        v-for="child in node.childNodes"
        :key="getNodeKey(child)"
        :node="child"
        :render-content="renderContent"
        :node-key="nodeKey"
        :props="props"
      />
    </g>
  </g>
</template>
<script>
import { getNodeKey } from '../js/utils'
export default {
  name: 'TreeNode',
  components: {
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent
        if (parent._props.renderContent) {
          return parent._props.renderContent(h, this.node)
        } else {
          return this.$scopedSlots.default(this.node)
        }
      }
    }
  },
  props: {
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
    },
    node: {
      type: Object,
      required: true
    },
    root: {
      type: Object,
      default: () => {}
    },
    // 子节点是否可折叠
    showCollapsable: {
      type: Boolean,
      default: false
    },
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: {
      type: String,
      default: 'id'
    },
    // 判断是否是左子树的节点，样式需要改
    isLeftChildNode: {
      type: Boolean,
      default: false
    },
    // 树节点的内容区的渲染 Function
    renderContent: {
      type: Function,
      default: () => {}
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
    }
  },
  data() {
    return {
      tree: null
    }
  },
  computed: {
    isLeaf() {
      if (this.node.level === 1) {
        if (this.leftChildNode.length === 0 && this.node.childNodes.length === 0) {
          return true
        } else {
          return false
        }
      } else {
        return this.node.isLeaf
      }
    },
    leftChildNodes() {
      if (this.tree.store.onlyBothTree) {
        if (this.isLeftChildNode) {
          return this.node.childNodes
        } else {
          return this.node.leftChildNodes
        }
      }
      return []
    },
    animateName() {
      if (this.tree.store.animate) {
        return this.tree.store.animateName
      }
      return ''
    },
    animateDuration() {
      if (this.tree.store.animate) {
        return this.tree.store.animateDuration
      }
      return 0
    }
  },
  created() {
    const parent = this.$parent
    if (parent.isTree) {
      this.tree = parent
    } else {
      this.tree = parent.tree
    }
    const tree = this.tree
    if (!tree) {
      console.warn('Can not find nodes tree')
    }
  },
  mounted() {},
  methods: {
    getNodeKey(node) {
      return getNodeKey(this.nodeKey, node.data)
    },
    formatLabel(label) {
      return label ? this.byLength(label, 13) : null
    },
    formatNodeY(node) {
      let result = 0
      if (node.level > 0 && node.len) {
        result = node.len * 40
      }
      return result
    },
    formatNodeX(node) {
      const result = 0
      // if (node.level > 0) {
      //   const symbols = node.isLeftChild ? '' : '-'
      //   const width = (node.level - 1) * (this.labelWidth + 100)
      //   result = symbols + width
      // }
      return result
    },
    formatTransform(node) {
      let result = 'translate(0,0)'
      if (node.level > 0) {
        const symbols = node.isLeftChild ? '' : '-'
        const width = (node.level - 1) * (this.labelWidth + 100)
        const height = node.sum * this.labelHeight
        // if (node.level === 2) {
        //   console.log(node.level, node, 'node--->>>>', node.parent)
        // }
        result = `translate(${symbols + width}, -${height})`
      }
      return result
    },
    byLength(str, L) {
      let result = ''
      const len = str.length // 字符串长度
      const chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度
      if (chrlen <= L) { return str }
      for (var i = 0, j = 0; i < len; i++) {
        var chr = str.charAt(i)
        if (/[\x00-\xff]/.test(chr)) {
          j++ // ascii码为0-255，一个字符就是一个字节的长度
        } else {
          j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
        }
        if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
          result += chr
        } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
          return result + '...'
        }
      }
    },
    getChartLen(str) {
      if (!str) return ''
      let count = 0
      let chartCode = -1
      for (let i = 0; i < str.length; i++) {
        chartCode = str.charCodeAt(i)
        if (chartCode >= 0 && chartCode <= 128) {
          count++
        } else {
          count += 2
        }
      }
      return count
    }
  }
}
</script>
<style lang="scss" scoped></style>
