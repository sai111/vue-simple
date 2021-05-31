<template>
  <div class="graphTree">
    GraphTree
    <div class="tree-recovery" @click="handleRecovery">
      复位
    </div>
    <div class="tree-wrap">
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
    handleRecovery() {
      this.$refs.magnifier.recovery()
    },
    getData() {
      const res = require('./json/index.json')
      const { tree } = new TransferTree({ data: res.data })
      // this.maxLevel = maxLevel
      this.dataList.splice(0, this.dataList.length, ...tree)
    }
  }
}
</script>
<style lang="scss" scoped>
.graphTree {
  width: 100%;
  height: 100%;
  .tree-wrap {
    margin: 0 auto;
    width: 1000px;
    height: 500px;
    border: 1px solid red;
  }
  .tree-recovery {
    font-size: 20px;
    cursor: pointer;
    color: #31c051;
  }
}
</style>
