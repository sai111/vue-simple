<template>
  <g class="tree-node-branch" />
</template>
<script>
export default {
  name: 'TreeNodeBranch',
  props: {
    // 子节点是否可折叠
    showCollapsable: {
      type: Boolean,
      default: false
    },
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    // nodeKey: String,
    // 判断是否是左子树的节点，样式需要改
    isLeftChildNode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  }
}
</script>
