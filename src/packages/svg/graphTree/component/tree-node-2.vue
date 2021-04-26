<template>
  <!-- 165 456 912 -->
  <g
    :class="'tree-node-'+nodeLevel"
    class="tree-node"
  >
    <g class="tree-node-content">
      <image :xlink:href="labelBack" width="180" height="36" />
      <text
        fill="#fff"
        font-size="14"
        dominant-baseline="middle"
        x="20"
        y="17"
      >
        {{ childNodes.name }} / {{ childNodes.lastChildlastChild }}
      </text>
    </g>
    <g
      v-if="childNodes.children&&childNodes.children.length>0"
      class="tree-node-tree"
    >
      <!--<g class="tree-node-line" transform="translate(165,0)">
        <rect
          fill="#31c051"
          width="6"
          height="6"
          x="0"
          :y="childIndex * 58 + 15"
        />
        <g class="link-two-three">
          <path
            fill="none"
            stroke="#31c051"
            stroke-width="2"
            :d="`M3,18 L145,${childLength * 58 + 18} 145,0`"
          />
        </g>
      </g>-->
      <TreeNode
        v-for="(child, childIndex) in childNodes.children"
        :key="'child-tree-chart-node-'+childIndex+child.id"
        :node-level="child.level"
        :child-nodes="child"
        :child-length="child.length||childIndex"
        :transform="formatTransform(child, childIndex)"
      />
      <!-- translate(${300}, ${(childIndex) * 58}) -->
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
    }
  },
  data() {
    return {
      labelBack: require('./img/analysis.svg')
    }
  },
  mounted() {},
  methods: {
    formatTransform(node, index) {
      console.log(node, 'mode-->>>', index)
      const len = node.len + index
      return `translate(300, ${len * 58})`
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
