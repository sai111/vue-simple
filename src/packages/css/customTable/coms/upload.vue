<template>
  <div class="com-uplod-table">
    <upload-section
      v-bind="uploadConfig"
      @success="handleSuccess"
    />
    <common-table
      :columns="columns"
      :table-data="tableData"
    />
  </div>
</template>
<script>
import UploadSection from '@/coms/upload.vue'
import CommonTable from '@/coms/common-table.vue'
export default {
  name: 'TableSection',
  components: { UploadSection, CommonTable },
  props: {},
  data() {
    return {
      uploadConfig: {
        action: '/api/file/upload',
        singleSize: 100,
        acceptSymbol: '、',
        accept: 'xls、xlsx、csv'
      },
      orderNum: true,
      columns: [
        { prop: 'index', type: 'index', label: '序号', width: '100', align: 'center' },
        { prop: 'companyName', label: '企业名称', 'show-overflow-tooltip': true },
        { prop: 'telNo', label: '手机号码' }
      ],
      tableData: [],
      excelNames: {
        '企业名称': 'companyName',
        '手机号码': 'telNo'
      }
    }
  },
  mounted() {},
  methods: {
    handleSuccess(res, file, fileList) {
      var fileReader = new FileReader()
      var XLSX = require('../js/xlsx.js')
      fileReader.onload = (e) => {
        try {
          const data = e.target.result
          // 以二进制流方式读取得到整份excel表格对象
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const exlname = workbook.SheetNames[0] // 取第一张表
          // xlsx.js 工具类 - `XLSX.utils.sheet_to_json`：输出JSON格式
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
          let tmp = []
          for (const k in this.excelNames) {
            tmp = this.keyChange(exl, this.excelNames[k], k)
          }
          this.tableData = tmp
        } catch {
          console.log('文件类型不正确')
          return
        }
      }
      // 以二进制方式打开文件
      if (file && file.raw && fileReader) {
        fileReader.readAsBinaryString(file.raw)
      }
    },
    keyChange(arr, key, replaceKey) {
      const newArr = []
      arr.forEach((item, index) => {
        for (var i = 0; i < key.length; i++) {
          item[key] = item[replaceKey]
        }
        newArr.push(item)
      })
      return newArr
    }
  }
}
</script>
<style scoped lang="scss">
.com-uplod-table {}
</style>
