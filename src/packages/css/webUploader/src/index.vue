<template>
  <div>
    <web-uploader :action="api" />
  </div>
</template>
<script>
import props from './props.js'
import WebUploader from './upload.vue'
export default {
  name: 'UploadHome',
  components: { WebUploader },
  props: props,
  data() {
    return {
      api: 'https://jsonplaceholder.typicode.com/posts/',
      uploadFiles: [],
      dragOver: false,
      draging: false,
      tempIndex: 1,
      uploadConfig: {}
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
  watch: {},
  beforeDestroy() {
    this.revokeObject()
  },
  mounted() {
    //this.initOption()
  },
  methods: {
    initOption() {
      this.uploadConfig = { 
        type: this.type,
        drag: this.drag,
        action: this.action,
        multiple: this.multiple,
        'before-upload': this.beforeUpload,
        headers: this.headers,
        name: this.name,
        data: this.data,
        accept: this.accept,
        fileList: this.uploadFiles,
        autoUpload: this.autoUpload,
        listType: this.listType,
        disabled: this.uploadDisabled,
        limit: this.limit,
        'on-exceed': this.onExceed,
        'on-start': this.handleStart,
        'on-progress': this.handleProgress,
        'on-success': this.handleSuccess,
        'on-error': this.handleError,
        'on-preview': this.onPreview,
        'on-remove': this.handleRemove,
        'http-request': this.httpRequest
      }
      console.log(this.props, 'props---0000')
    },
    handleStart(rawFile) {},
    handleProgress(ev, rawFile) {},
    handleSuccess(res, rawFile) {},
    handleError(err, rawFile) {},
    handleRemove(file, raw) {},
    handleChange(ev) {
      console.log(ev.target, '555--->>handleChange')
    },
    upload(rawFile) {
      console.log(rawFile, 'rawFile--upload')
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
    getFile(rawFile) {},
    clearFiles() {
      this.uploadFiles = []
    },
    submit() {},
    getMigratingConfig() {},
    // 释放url对象
    revokeObject() {
      this.uploadFiles.forEach((file) => {
        if (file.url && file.url.indexOf('blob:') === 0) {
          URL.revokeObjectURL(file.url)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.web-uploader {
  width: 100%;
  height: 100%;
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
