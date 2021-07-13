<template>
  <div class="upload-wrap">
    <el-upload
      class="upload-demo"
      drag
      :action="action"
      :on-success="handleSuccess"
      :on-error="handleError"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div
        slot="tip"
        class="el-upload__tip"
      >
        上传文件是{{ accept }}格式! 且大小不超过{{ singleSize }}MB!
      </div>
    </el-upload>
  </div>
</template>
<script>
import props from '@/lib/config/upload.js'
export default {
  name: 'UploadSection',
  components: {},
  props: props,
  data() {
    return {}
  },
  mounted() {},
  methods: {
    beforeUpload(file) {
      let errorType = true
      const acceptType = this.accept.split(`${this.acceptSymbol}`)
      const filename = file.name.split('.')
      const fileType = filename[filename.length - 1]
      const isLtMax = file.size / 1024 / 1024 < this.singleSize
      if (acceptType.indexOf(fileType.toLowerCase()) !== -1) {
        errorType = false
      }
      if (errorType) {
        this.$message.error(`当前上传文件格式${fileType}，需要的格式为${this.accept}`)
      } else {
        if (!isLtMax) {
          this.$message.error('文件大小不超过' + this.singleSize + 'MB!')
        }
      }
      return !errorType && isLtMax
    },
    handleSuccess(response, file, fileList) {
      this.$emit('success', response, file, fileList)
    },
    handleError(err, file, fileList) {
      this.$message.error(JSON.parse(err.message).message)
      this.$emit('error', err)
    }
  }
}
</script>
<style scoped lang="scss">
.upload-wrap {
  width: 100%;
}
</style>
