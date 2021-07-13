<template>
  <div class="common-table">
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <template v-for="(item, columnIndex) in columns">
        <el-table-column
          :key="'column-li-'+columnIndex"
          :prop="item.prop"
          :type="item.type"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :show-overflow-tooltip="item.showOverflowTooltip"
        />
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'CommonTable',
  components: {},
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => [
        { companyName: '11', telNo: 12134 }
      ]
    },
    // 序号
    orderNum: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.common-table {
  width: 100%;
}
</style>
