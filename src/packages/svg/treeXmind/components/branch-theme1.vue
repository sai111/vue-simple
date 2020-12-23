<template>
  <g class="branch-theme">
    <g
      v-if="treeData&&treeData.direction=='left'"
      class="branch-theme-left"
    >
      <!-- <rect
       :x="cx-radius-branchWidth-lineDistance"
       y="0"
       :height="(treeData.children.length)*branchHeight"
       :width="branchWidth"
       stroke="green"
       fill="none"
      /> -->
      <text>
        {{ treeData.title }}
      </text>
    </g>
    <g
      v-if="treeData&&treeData.direction=='right'"
      class="branch-theme-right"
    >
      <!-- <rect
       :x="cx+radius+lineDistance"
       y="0"
       :height="(treeData.children.length)*branchHeight"
       :width="branchWidth"
       stroke="green"
       fill="none"
      /> -->
      <text>
        {{ treeData.title }}
      </text>
    </g>
  </g>
</template>
<script>
export default {
  name: 'BranchTheme',
  props: {
    treeData: {
      type: Object,
      default: () => {}
    },
    cx: {
      type: [Number, String],
      default: 0
    },
    cy: {
      type: [Number, String],
      default: 0
    },
    maxRect: {
      type: [Number, String],
      default: 0
    },
    radius: {
      type: [Number, String],
      default: 0
    },
    textFill: {
      type: String,
      default: '#cfd8e6'
    },
    branchHeight: {
      type: [Number, String],
      default: 0
    },
    branchWidth: {
      type: [Number, String],
      default: 0
    },
    lineDistance: {
      type: [Number, String],
      default: 0
    },
    textFontSize: {
      type: [Number, String],
      default: ''
    },
    valueFontSize: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
