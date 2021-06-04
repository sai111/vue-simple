<template>
  <div class="webUploader-entry">
    webUploader组件
    <web-uploader
      ref="web-uploader"
      :action="action"
      :multiple="multiple"
      :accept-text="acceptText+accept+'格式!'"
      :size-text="sizeText+singleSize+'MB!'"
      :accept="accept"
      :single-size="singleSize"
      :sum-size="sumSize"
      @on-start="handleStart"
      @on-success="handleSuccess"
      @on-progress="handleProgress"
    />

  </div>
</template>
<script>
import WebUploader from './src/upload.vue'
export default {
  name: 'WebUploaderEntry',
  components: { WebUploader },
  data() {
    return {
      multiple: true,
      acceptText: '上传文件只能是',
      sizeText: '上传文件大小不能超过',
      accept: 'png,jpg,jpeg,image,text,word,xls,txt,zip,apk',
      maxSize: 100,
      singleSize: 100,
      sumSize: 100 * 1024,
      uploadFiles: [],
      action: 'https://jsonplaceholder.typicode.com/posts/',
      tempIndex: 1
    }
  },
  computed: {},
  watch: {
    listType(type) {
      if (type === 'picture-card' || type === 'picture') {
        this.uploadFiles = this.uploadFiles.map((file) => {
          if (!file.url && file.raw) {
            try {
              file.url = URL.createObjectURL(file.raw)
            } catch (err) {
              console.error('上传错误', err)
            }
          }
          return file
        })
      }
    },
    fileList: {
      immediate: true,
      handler(fileList) {
        if (!fileList) return null
        this.uploadFiles = fileList.map((item) => {
          item.uid = item.uid || (Date.now() + this.tempIndex++)
          item.status = item.status || 'success'
          return item
        })
      }
    }
  },
  beforeDestroy() {
    this.revokeObject()
  },
  mounted() {},
  methods: {
    handleStart(rawFile) {
      rawFile.uid = Date.now() * 1 + this.tempIndex++
      let file = {
        status: 'ready',
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        uid: rawFile.uid,
        raw: rawFile
      }
      if (this.listType === 'picture-card' || this.listType === 'picture') {
        try {
          file.url = URL.createObjectURL(rawFile)
        } catch (err) {
          console.error('上传错误', err)
          return
        }
      }
      this.uploadFiles.push(file)
      this.onChange(file, this.uploadFiles)
    },
    onChange(file, fileList) {
      console.log(file, fileList, 'onChange', this.uploadFiles)
    },
    handleProgress(ev, rawFile) {
      // const file = this.getFile(rawFile)
      // this.onProgress(ev, file, this.uploadFiles) 不要显示
      // file.status = 'uploading'
      // file.percentage = ev.percent || 0
    },
    handleSuccess(res, rawFile) {
      const file = this.getFile(rawFile)
      // console.log(res, rawFile, 'success', , this.uploadFiles)
      if (file) {
        file.status = 'success'
        file.response = res
        //this.onSuccess(res, file, this.uploadFiles)
        this.onChange(file, this.uploadFiles)
      }
    },
    handleError(err, rawFile) {
      const file = this.getFile(rawFile)
      const fileList = this.uploadFiles
      file.status = 'fail'
      fileList.splice(fileList.indexOf(file), 1)

      //this.onError(err, file, this.uploadFiles)
      this.onChange(file, this.uploadFiles)
    },
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw)
      }
      let doRemove = () => {
        this.abort(file)
        let fileList = this.uploadFiles
        fileList.splice(fileList.indexOf(file), 1)
        this.onRemove(file, fileList)
      }
      if (!this.beforeRemove) {
        doRemove()
      } else if (typeof this.beforeRemove === 'function') {
        const before = this.beforeRemove(file, this.uploadFiles)
        if (before && before.then) {
          before.then(() => {
            doRemove()
          }, () => {})
        } else if (before !== false) {
          doRemove()
        }
      }
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles
      let target
      fileList.every((item) => {
        target = rawFile.uid === item.uid ? item : null
        return !target
      })
      return target
    },
    abort(file) {
      this.$refs['web-uploader'].abort(file)
    },
    // 释放url对象
    revokeObject() {
      this.uploadFiles.forEach((file) => {
        if (file.url && file.url.indexOf('blob:') === 0) {
          URL.revokeObjectURL(file.url)
        }
      })
    },
    clearFiles() {
      this.uploadFiles = []
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
}
</style>
