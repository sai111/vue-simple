<template>
  <div class="original-input">
    <div class="multipe-button" @click="submit">批量上传</div>
    <div class="upload-box" @click="handleClick">
      <upload-dragger @file="uploadDragFile">
        <i class="el-icon-upload" />
        <div class="el-upload__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <div class="el-upload__tip">
          支持批量解析，单次上传数量不超过100个，单个文件大小不超过100M，仅支持.apk格式文件
        </div>
      </upload-dragger>
      <input
        ref="input"
        type="file"
        multiple
        style="display: none"
        @change="handleChange"
      >
    </div>
    <div class="file-wrap">
      <div
        v-for="(item, index) in fileList"
        :key="'li-' + index"
        class="file-wrap-li"
      >
        <div
          class="progress-bar"
          :style="{
            height: '100%',
            background: '#409eff',
            width: item.percentage + '%',
          }"
        >
          <span>{{ item.name }}</span>
          <span>{{ formatSize(item.size) }}</span>
          <span>{{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UploadDragger from './drag.vue'
export default {
  name: 'OriginalUpload',
  components: { UploadDragger },
  props: {},
  data() {
    return {
      accept: 'apk',
      acceptSymbol: ',',
      singleSize: 100,
      fileList: [],
      uploadFiles: [],
      action: '/api/file/upload',
      tempIndex: 1,
      tableVisible: false
      // https://www.cnblogs.com/sanhuamao/p/14068101.html
      // https://juejin.cn/post/6980142557066067982
      // https://www.oecom.cn/jsuploadprogress/
    }
  },
  mounted() {},
  methods: {
    clearFiles() {
      this.fileList = []
    },
    uploadDragFile(ev) {
      console.log(ev, 'ev')
    },
    handleClick() {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    handleChange(ev) {
      // 将伪数组转换成数组形式的数据
      const files = Array.prototype.slice.call(ev.target.files)
      files.forEach((v) => {
        const tmp = this.beforeUpload(v)
        const file = {
          status: 'ready',
          name: v.name,
          size: v.size,
          flag: tmp.flag,
          flagName: tmp.reason,
          percentage: 0,
          uid: Date.now() + this.tempIndex++,
          raw: v
        }
        this.fileList.push(file)
      })
      if (this.fileList && this.fileList.length > 0) {
        const flag = this.fileList.length > 1
        this.submit(flag)
        this.tableVisible = flag
      }
      console.log(this.fileList, 'this.fileList')
    },
    handleKeydown(e) {
      if (e.target !== e.currentTarget) return
      if (e.keyCode === 13 || e.keyCode === 32) {
        this.handleClick()
      }
    },
    beforeUpload(file) {
      let errorType = true
      let errorName = '等待上传'
      const acceptType = this.accept.split(`${this.acceptSymbol}`)
      const filename = file.name.split('.')
      const fileType = filename[filename.length - 1]
      const isLtMax = file.size / 1024 / 1024 < this.singleSize
      // 果要检索的字符串值没有出现，则该方法返回 -1
      if (acceptType.indexOf(fileType.toLowerCase()) !== -1) {
        errorType = false
      }
      if (errorType) {
        errorName = '格式错误'
      } else {
        if (!isLtMax) {
          errorName = '文件大小超出'
        }
      }
      return { flag: !errorType && isLtMax, reason: errorName }
    },
    formatSize(num) {
      const table = [
        { size: 1024 * 1024 * 1024 * 1024, unit: 'TB' },
        { size: 1024 * 1024 * 1024, unit: 'GB' },
        { size: 1024 * 1024, unit: 'MB' },
        { size: 1024, unit: 'KB' },
        { size: -1, unit: 'B' }
      ]
      for (const item of table) {
        // 网络 1B = 8b
        const _num = num
        if (parseInt(_num) >= item.size) {
          const value = (parseInt(_num) / Math.abs(item.size)).toFixed(1)
          return value + ' ' + item.unit
        }
      }
    },
    async submit() {
      if (this.$refs.input) {
        this.$refs.input.value = null
      }
      let time = null
      const tmp = this.fileList.filter((v) => v.flag)
      for (let i = 0; i < tmp.length; i++) {
        if (i === 0) {
          time = new Date().getTime()
        }
        const res = await this.postData(tmp[i], tmp.length, time)
        // 有结果，且data.end 为true 结束
        console.log('🚀 ~ file: upload.vue ~ line 103 ~ multipeUpload ~ res', res)
      }
    },
    postData(file, len, time) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file.raw)
        formData.append('group', len + '-' + time)
        this.$http({
          url: this.action,
          method: 'post',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data'
            // Authorization: 'Bearer'
          },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total * 100 | 0)
            const raw = this.getFile(file)
            raw.status = 'uploading'
            raw.percentage = progress
            // https://www.cnblogs.com/alax/p/10654978.html
          }
        }).then((res) => {
          resolve(res)
        }).catch(() => {
          resolve()
        })
      })
    },
    getFile(rawFile) {
      let target
      this.fileList.every((item) => {
        target = rawFile.uid === item.uid ? item : null
        return !target
      })
      return target
    }
  }
}
</script>
<style scoped lang="scss">
.upload-box {
  //width: 360px;
  //height: 180px;
  text-align: center;
  box-sizing: border-box;
  border: 1px solid #409eff;
  display: flex;
  flex-direction: column;
  .el-icon-upload {
    font-size: 67px;
    color: #c0c4cc;
    margin: 40px 0 16px;
    line-height: 50px;
  }
}
.original-input {
  margin: 30px;
}
.multipe-button {
  width: 100px;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #409eff;
}
.file-wrap {
  width: 500px;
  .file-wrap-li {
    display: flex;
    height: 40px;
    line-height: 40px;
    position: relative;
    span {
      display: inline-block;
      width: 30%;
      overflow: hidden;
    }
    .progress-bar {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      height: 100%;
      //background-color: #409eff;
      transition: width 0.6s ease;
    }
  }
}
</style>
