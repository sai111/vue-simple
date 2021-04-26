<template>
  <div class="graphTree">
    GraphTree
    <result-magnifier ref="magnifier" :origin-viewbox="viewbox" class="tree-chart-magnifier">
      <tree-node
        v-for="(child, childIndex) in dataList"
        slot="content"
        :key="'tree-chart-node-' + childIndex + child.id"
        :max-level="maxLevel"
        :node-level="child.level"
        :child-nodes="child"
        :child-index="childIndex"
        :child-length="child.length || childIndex"
        :transform="`translate(0, ${58 * (child.length || childIndex)})`"
      />
    </result-magnifier>
  </div>
</template>
<script>
import TransferTree from './component/tree'
import ResultMagnifier from './component/magnifier.vue'
import TreeNode from './component/tree-node.vue'
export default {
  name: 'GraphTree',
  components: { ResultMagnifier, TreeNode },
  props: {},
  data() {
    return {
      maxLevel: 1,
      dataList: [],
      viewbox: {
        x: 0,
        y: 0,
        width: 1292,
        height: 600
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      const res = require('./json/index.json')
      const { tree, maxLevel } = new TransferTree({ data: res.data })
      this.maxLevel = maxLevel
      this.dataList.splice(0, this.dataList.length, ...tree)
    }
  }
}
</script>
<style lang="scss" scoped>
.graphTree {
  width: 100%;
  height: 100%;
}
</style>
