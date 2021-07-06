<template>
  <div class="col-table">
    <el-table
      :data="tableData"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="type" label="类型" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="amount" label="数值（元）" />
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'ColTable', // 表格合并
  props: {},
  data() {
    return {
      spanArr: [],
      spanArr1: [],
      rowspan: [],
      tableData: [
        { type: 1, name: '测试1', amount: 111 },
        { type: 1, name: '测试2', amount: 222 },
        { type: 1, name: '测试3', amount: 333 },
        { type: 3, name: '测试4', amount: 444 },
        { type: 1, name: '测试5', amount: 555 },
        { type: 2, name: '测试6', amount: 666 },
        { type: 2, name: '测试7', amount: 777 },
        { type: 3, name: '测试8', amount: 888 },
        { type: 2, name: '测试9', amount: 999 },
        { type: 3, name: '测试10', amount: 1000 }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getSpanArr(0, 'type', this.tableData)
  },
  methods: {
    initData() {},
    getSpanArr(idx, prop, data) {
      this.spanArr[idx] = []
      this.position = 0
      data.forEach((item, index) => {
        if (index === 0) {
          this.spanArr[idx].push(1)
          this.position = 0
        } else {
          if (data[index][prop] === data[index - 1][prop]) {
            this.spanArr[idx][this.position] += 1 // 有相同项
            this.spanArr[idx].push(0) // 名称相同后往数组里面加一项0
          } else {
            this.spanArr[idx].push(1) // 同列的前后两行单元格不相同
            this.position = index
          }
        }
      })
      console.log(this.spanArr, 'spanArr-->>>>>++')
    },
    getSpanArr2(data) {
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr1.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].type === data[i - 1].type) {
            this.spanArr1[this.pos] += 1
            this.spanArr1.push(0)
          } else {
            this.spanArr1.push(1)
            this.pos = i
          }
        }
      }
      console.log(this.spanArr1, 'spanArr')
    },
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[0][rowIndex]
        const _col = _row > 0 ? 1 : 0
        console.log(`rowspan:${_row} colspan:${_col}`)
        // [0,0] 表示这一行不显示， [2,1]表示行的合并数
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.col-table {
  width: 300px;
  height: 400px;
}
</style>
