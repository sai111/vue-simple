<template>
  <div class="webUploader-entry">
    webUploader组件
    <!--<el-upload
      ref="web-uploader"
      drag
      multiple
      :auto-upload="false"
      :action="action"
      :limit="maxLimit"
      :accept="accept"
      :before-upload="beforeUpload"
      :on-change="getList"
      :on-success="handleSuccess"
      :on-progress="handleProgress"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div slot="tip" class="el-upload__tip">
        上传文件是{{ accept }}格式! 大小{{ singleSize }}MB!
      </div>
    </el-upload>-->
    <!-- 原生上传 -->
    <original-upload />
    <!-- 弹窗 -->
    <result-popover
      v-if="resultVisible"
      :file-list="uploadFiles"
      style="width:400px;margin:0 auto;"
    />
  </div>
</template>
<script>
import ResultPopover from './result-popover.vue'
import OriginalUpload from './original/upload.vue'
export default {
  name: 'WebUploaderEntry',
  components: { ResultPopover, OriginalUpload },
  data() {
    return {
      multiple: true,
      acceptText: '上传文件只能是',
      sizeText: '上传文件大小不能超过',
      accept: 'png/jpg/jpeg/image/text/word/xls/txt/zip/apk',
      maxLimit: 100, // 个数最大100
      singleSize: 100, // 100M
      sumSize: 100 * 1024,
      fileList: [],
      errList: [],
      action: 'http://116.62.114.170:3000/file/upload',
      tempIndex: 1,
      resultVisible: false,
      uploadFiles: []
    }
  },
  computed: {},
  watch: {},
  beforeDestroy() {},
  mounted() {},
  methods: {
    init() {
      this.fileList = []
      this.uploadFiles = []
    },
    beforeUpload(file) {
      let errorType = true
      const reg = /\\|\/|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\|/g
      const acceptType = this.accept.replace(reg, ',').split(',')
      const filename = file.name.split('.')
      const fileType = filename[filename.length - 1]
      const isLtMax = file.size / 1024 / 1024 < this.singleSize
      if (acceptType.indexOf(fileType.toLowerCase()) !== -1) {
        errorType = false
      }
      if (errorType) {
        this.$message.error(this.acceptText + this.accept + '格式!')
      } else {
        if (!isLtMax) {
          this.$message.error(this.sizeText + this.singleSize + 'MB!')
        }
      }
      return !errorType && isLtMax
    },
    handleProgress(event, file, fileList) {
      this.getList()
    },
    handleSuccess(response, file, fileList) {
      this.resultVisible = true
      this.fileList = fileList
      this.getList()
    },
    handleError(err, file, fileList) {
      console.log(err, 'err', err, file, fileList)
      this.getList()
    },
    getList() {
      this.uploadFiles = this.$refs['web-uploader'].uploadFiles || []
    }
  }
}
</script>
<style lang="scss" scoped>
.webUploader-entry {
  width: 100%;
  height: 100%;
  .web-file-list {
    width: 100%;
    .web-file-li {
      display: flex;
      align-items: center;
    }
  }
  .el-icon-upload {
    font-size: 67px;
    text-align: center;
    margin: 40px 0 16px;
    color: #9ea7b4;
    font-weight: 400;
    display: inline-block;
    line-height: 50px;
  }
  .el-upload__text {
    font-size: 14px;
    text-align: center;
    color: #55677d;
  }
}
</style>
