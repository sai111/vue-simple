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
      @onStart="handleStart"
    />
  </div>
</template>
<script>
import WebUploader from './src/upload.vue'
export default {
  name: 'webUploaderEntry',
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
      action: 'https://jsonplaceholder.typicode.com/posts/'
    }
  },
  computed: {},
  watch: {},
  beforeDestroy() {
    this.revokeObject()
  },
  mounted() {},
  methods: {
    handleStart(rawFile) {},
    handleProgress(ev, rawFile) {},
    handleSuccess(res, rawFile) {},
    handleError(err, rawFile) {},
    handleRemove(file, raw) {
      if (raw) {
        file = this.getFile(raw)
      }
      let doRemove = () => {
        this.abort(file)
      }
    },
    getFile(rawFile) {
      let fileList = this.uploadFiles
      let target
      fileList.every(item => {
        target = rawFile.uid === item.uid ? item : null
        return !target
      })
      return target
    },
    abort(file) {
      this.$refs['web-uploader'].abort(file);
    },
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
.webUploader-entry {
  width: 100%;
  height: 100%;
}
</style>
