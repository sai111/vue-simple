<template>
  <div class="web-uploader" @click="handleClick" @keydown="handleKeydown">
    <div class="web-uploader-wrap" tabindex="0">
      <web-uploader-drag :disabled="disabled" @file="uploadFiles">
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </web-uploader-drag>
      <input
        ref="input"
        type="file"
        :accept="accept"
        :multiple="multiple"
        class="web-uploader-input"
        @change="handleChange"
      >
    </div>
  </div>
</template>
<script>
import props from './props.js'
import WebUploaderDrag from './dragger.vue'
export default {
  name: 'WebUploader',
  components: { WebUploaderDrag },
  props: props,
  data() {
    return {
      filesList: [],
      mouseover: false,
      reqs: {},
      progress: {}
    }
  },
  computed: {
    uploadDisabled() {
      return this.disabled
    }
  },
  provide() {
    return { uploader: this }
  },
  watch: {
    progress: {
      deep: true,
      handler(val) {
        console.log(val, 'al-----progress')
        if (val) this.$emit('on-progress', val)
      }
    }
  },
  mounted() {},
  methods: {
    isImage(str) {
      return str.indexOf('image') !== -1
    },
    handleChange(ev) {
      const files = ev.target.files
      if (!files) return
      this.uploadFiles(files)
    },
    beforeUpload(file) {
      let errorType = true
      const reg = /\\|\/|\?|\？|\*|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\|/g
      const acceptType = this.accept.replace(reg, '').split(',')
      const filename = file.name.split('.')
      const fileType = filename[filename.length - 1]
      const isLtMax = file.size / 1024 / 1024 < this.singleSize
      if (acceptType.indexOf(fileType.toLowerCase()) !== -1) {
        errorType = false
      }
      if (errorType) {
        this.$message.error(this.acceptText)
      } else {
        if (!isLtMax) {
          this.$message.error(this.acceptText)
        }
      }
      return !errorType && isLtMax
    },
    upload(rawFile) {
      this.$refs.input.value = null
      const before = this.beforeUpload(rawFile)
      // if (!this.beforeUpload) {
      //  return this.post(rawFile)
      // }
      if (before && before.then) {
        before.then((proFile) => {
          const fileType = Object.prototype.toString.call(proFile)
          if (fileType === '[object File]' || fileType === '[object Blob]') {
            if (fileType === '[object Blob]') {
              proFile = new File([proFile], rawFile.name, {
                type: rawFile.type
              })
            }
            for (const p in rawFile) {
              if (proFile[p]) {
                proFile[p] = rawFile[p]
              }
            }
            this.post(proFile)
          } else {
            this.post(rawFile)
          }
        }, () => {
          // this.onRemove(null, rawFile)
        })
      } else if (before !== false) {
        this.post(rawFile)
      } else {
        // this.onRemove(null, rawFile)
      }
    },
    handleClick() {
      if (!this.disabled) {
        this.$refs.input.value = null
        this.$refs.input.click()
      }
    },
    handleKeydown(e) {
      if (e.target !== e.currentTarget) return
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick()
      }
    },
    uploadFiles(files) {
      if (this.limit && this.fileList.length + files.length > this.limit) {
        if (this.onExceed) {
          this.$emit('onExceed', files, this.fileList)
        }
        return
      }
      let postFies = Array.prototype.slice.call(files)
      if (!this.multiple) {
        postFies = postFies.slice(0, 1)
      }
      if (postFies.length === 0) { return }
      postFies.forEach((rawFile) => {
        this.$emit('on-start', rawFile)
        if (this.autoUpload) this.upload(rawFile)
      })
    },
    abort(file) {
      const { reqs } = this
      if (file) {
        let uid = file
        if (file.uid) uid = file.uid
        if (reqs[uid]) {
          reqs[uid].abort()
        }
      } else {
        Object.keys(reqs).forEach((uid) => {
          delete reqs[uid]
        })
      }
    },
    post(rawFile) {
      const { uid } = rawFile
      const options = {
        headers: this.headers,
        file: rawFile,
        data: this.data,
        filename: this.name || 'file',
        action: this.action,
        onProgress: (e) => {
          const { percent } = e
          this.progress[rawFile.name] = percent
           console.log(rawFile, '🚀 ~ file: upload.vue ~ line 162 ~ post ~ e', e)
        },
        onSuccess: (res) => {
          this.$emit('on-success', res, rawFile)
          delete this.reqs[uid]
        },
        onError: (err) => {
          this.$emit('onError', err, rawFile)
          delete this.reqs[uid]
        }
      }
      const req = this.httpRequest(options)
      this.reqs[uid] = req
      if (req && req.then) {
        req.then(options.onSuccess, options.onError)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.web-uploader {
  width: 100%;
  .web-uploader-wrap {
    .el-icon-upload {
      font-size: 67px;
      text-align: center;
      margin: 40px 0 16px;
      color: #9ea7b4;
      font-weight: 400;
      display: inline-block;
      line-height: 50px;
      .el-upload__text {
        font-size: 14px;
        text-align: center;
        color: #55677d;
      }
    }
  }
  .web-uploader-input {
    display: none;
  }
}
</style>
