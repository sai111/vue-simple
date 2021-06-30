<template>
  <div class="result-wrap">
    <tr class="tr-li">
      <th
        v-for="(columm, columnIndex) in columns"
        :key="'th-li'+columnIndex"
        class="th-li"
      >
        {{ columm.label }}
      </th>
    </tr>
    <tr
      v-for="(row, rowIndex) in fileList"
      :key="'tr-li-'+rowIndex"
      class="body-tr-li"
    >
      <div class="progress-bar" :style="rowProgress(row)" />
      <td
        v-for="(columm, columnIndex) in columns"
        :key="'tr-td-li'+columnIndex"
        class="td-li"
      >
        <template v-if="columm.slotFormatter">
          <i :class="'el-icon-' + row[columm.prop]" size="18" />
        </template>
        <template v-else>
          {{ row[columm.prop] }}
        </template>
      </td>
    </tr>
  </div>
</template>
<script>
export default {
  name: 'ResultPopover',
  components: {},
  props: {
    fileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        { label: '文件名', prop: 'name' },
        { label: '大小', prop: 'size' },
        { label: '上传状态', prop: 'status', slotFormatter: true }
      ]
    }
  },
  mounted() {
    console.log(this.fileList, 'fileList')
  },
  methods: {
    rowProgress(row) {
      return {
        width: row.percentage + '%',
        backgroundColor: 'rgba(226, 238, 255, 1)'
      }
    }
  }
}
</script>
<style scoped lang="scss">
.result-wrap {
  width: 100%;
  max-height: 500px;
  tr {
    border: 1px solid #000;
  }
  th {
    border-right:  1px solid #000;
    &:last-child {
      border-right: none;
    }
  }
  .tr-li {
    display: flex;
  }
  .body-tr-li {
    display: flex;
    position: relative;
    border-top: none;
    .progress-bar {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      height: 100%;
      background-color: #409eff;
      transition: width .6s ease;
    }
  }
  .th-li,
  .td-li {
    width: calc(100% / 3);
    text-align: left;
    padding: 0 10px;
  }
}
</style>
