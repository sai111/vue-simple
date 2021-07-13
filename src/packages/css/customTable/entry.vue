<template>
  <div class="customTable-entry">
    customTable组件
    <div class="custom-table-wrap">
      <div class="wrap-tabs">
        <div
          v-for="(item, index) in tabList"
          :key="'wrap-tabs-li-'+index"
          :class="['wrap-tabs-li', { 'active': tabActive==item.value }]"
          @click="clickTag(item)"
        >
          {{ item.label }}
        </div>
      </div>
      <components
        :is="tabActive"
        ref="custom-table"
      />
    </div>
  </div>
</template>
<script>
import CustomTable from './coms/form.vue'
import TableSection from './coms/upload.vue'
export default {
  name: 'CustomTableEntry',
  components: { CustomTable, TableSection },
  data() {
    return {
      tabActive: 'CustomTable',
      tabList: [
        { label: '手动输入', value: 'CustomTable' },
        { label: '文件导入', value: 'TableSection' }
      ],
      uploadConfig: {
        action: '/api/file/upload',
        singleSize: 100,
        acceptSymbol: '、',
        accept: 'xls、xlsx、csv'
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    clickTag(item) {
      this.tabActive = item.value
      console.log(item, 'item')
      if (item && item.value === 'CustomTable') {
        this.addTable()
      }
    },
    addTable() {
      this.$refs && this.$refs['custom-table'] && this.$refs['custom-table'].addForm()
    }
  }
}
</script>
<style lang="scss" scoped>
.customTable-entry {
  width: 100%;
  height: 100%;
  .custom-table-wrap {
    width: 80%;
    margin: 50px auto;
    .wrap-tabs {
      display: flex;
      flex-wrap: wrap;
      margin: 20px 0;
      .wrap-tabs-li {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0 30px 0 0;
        transition: .1s;
        font-weight: 500;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
        &.active {
          color: #fff;
          background-color: #409eff;
          border-color: #409eff;
        }
      }
    }
    .button {
      margin: 20px;
    }
  }
}
</style>
