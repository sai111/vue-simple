<template>
  <g :class="'tree-node-' + nodeLevel" class="tree-node">
    <g v-if="childNodes" class="tree-node-content">
      <image :xlink:href="labelBack" width="180" height="36" />
      <text fill="#fff" font-size="14" dominant-baseline="middle" x="20" y="17">
        {{ childNodes.name }}index{{ childIndex }}level{{ childNodes.level }}
      </text>
    </g>
    <!--<g class="tree-node-line">
      <rect
        fill="#31c051"
        width="6"
        height="6"
        x="0"
        :y="formatY(childIndex, 13)"
        :transform="`translate(${childNodes.level > 1 ? 10 : 165}, 0)`"
      />
      <path
        v-if="childNodes.level > 1"
        fill="none"
        stroke="#31c051"
        stroke-width="2"
        :d="`M-130,16 L13,${18} 13,18`"
      />
    </g>-->
    <g v-if="childNodes.children && childNodes.children.length > 0" class="tree-node-tree">
      <TreeNode
        v-for="(child, index) in childNodes.children"
        :key="'child-tree-chart-node-' + index + child.id"
        :node-level="child.level"
        :child-nodes="child"
        :child-index="index"
        :child-length="child.length || index"
        :transform="formatTransform(child, index, childNodes)"
      />
    </g>
  </g>
</template>
<script>
export default {
  name: 'TreeNode',
  components: {},
  props: {
    childNodes: {
      type: [Array, Object],
      default: () => []
    },
    label: {
      type: String,
      default: ''
    },
    childLength: {
      type: [Number, String],
      default: 0
    },
    childIndex: {
      type: [Number, String],
      default: 0
    },
    nodeLevel: {
      type: [Number, String],
      default: 1
    },
    maxLevel: {
      type: [Number, String],
      default: 1
    }
  },
  data() {
    return {
      labelBack: require('./img/analysis.svg')
    }
  },
  mounted() {},
  methods: {
    formatY(index, distance) {
      return index > 0 ? index * distance : index * distance + distance
    },
    formatLine(node, index) {
      return `'translate(${node.level > 1 ? 0 : 300}, 10)'`
    },
    formatTransform(node, index, childNodes) {
      console.log(node, '🚀 ~ file: tree-node.vue ~ line 84 ~ formatTransform ~ index', index)
      // let tmp = null
      // if (node && node.parent) {
      //  tmp = node.parent.find((v) => v.level === node.level)
      //  const tmpArr = tmp.children[node.sequence]
      //  console.log(node, 'node---->>>', index, tmpArr, tmp)
      // }
      // console.log(this.childIndex, 'childIndex')
      return `translate(300, ${(index) * 58})`
    }
  }
}
</script>
<style scoped lang="scss">
.tree-node {
  font-size: 0px;
  padding: 0 36px;
  .tree-node-group {
    cursor: pointer;
    text {
      opacity: 0.8;
      transition: opacity 0.2s;
      &:hover {
        opacity: 1;
        fill: #31c051;
      }
    }
  }
}
</style>
