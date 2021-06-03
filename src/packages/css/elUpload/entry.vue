<template>
  <div class="elUpload-entry">
    elUpload组件
    <el-upload
      ref="upload"
      drag
      action=""
      multiple
      :auto-upload="false"
      class="upload-demo"
      :before-upload="beforeUpload"
      :on-change="handleChange"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <div
        slot="tip"
        class="el-upload__tip"
      >
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: 'ElUploadEntry',
  components: {},
  data() {
    return {
      action1: 'https://jsonplaceholder.typicode.com/posts/',
      action: 'https://jsonplaceholder.typicode.com/posts/',
      fileList: []
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    beforeUpload() {
      return true
    },
    handleChange(file, fileList) {
      if (fileList && fileList.length > 0) {
        this.fileList = fileList.map((v) => {
          return {
            name: v.name,
            size: v.size,
            percentage: v.percentage,
            uid: v.uid
          }
        })
        this.$refs.upload.submit()
      }
    },
    // https://github.com/dianbaer/anyupload
    // https://www.jianshu.com/p/96dca370248d
    submitUpload() {
      this.$refs.upload.uploadFiles
        .filter((file) => file.status === 'ready')
        .forEach((file) => {
          const fd = new FormData()
          fd.append('files', file.raw, file.name)
          console.log(fd, 'dg----0000')
          this.$http({
            method: 'post',
            url: 'https://jsonplaceholder.typicode.com/posts',
            data: fd,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then((res) => {
            console.log(res, 'res----999')
          }).catch(() => {
            console.log(file, 'file---')
            // this.fileList.splice()
            this.$message.error('上传失败')
          })
          // this.upload(file)
        })
    },
    getFile(rawFile) {
      const fileList = this.uploadFiles
      let target
      fileList.every(item => {
        target = rawFile.uid === item.uid ? item : null
        return !target
      })
      return target
    },
    upload(rawFile) {
      if (this.$refs.upload) {
        const that = this.$refs.upload
        that.$refs['upload-inner'].$refs.input = null
        const before = that.$refs['upload-inner'].beforeUpload(rawFile)
        if (before && before.then) {
          before.then((res) => {
            console.log(res, 'res=----')
          })
        } else if (!before !== false) {
          this.post(rawFile)
        } else {
          console.log(222)
        }
        console.log(rawFile, 'rawFile----777', before)
      }
    },
    post(rawFile) {
      console.log(rawFile, 'post')
    },
    handleRemove(file, raw) {

    }
  }
}
</script>
<style lang="scss" scoped>
.elUpload-entry {
  width: 100%;
  height: 100%;
}
</style>
