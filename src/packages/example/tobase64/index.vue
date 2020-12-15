<template>
  <div class="tobase64">
    <div class="tobase64-wrap">
      <div class="tobase64-wrap-png">
        <h3>png/jpg/svg转tobase64</h3>
        <div class="tobase64-wrap-upload">
          <el-upload
            class="avatar-uploader"
            action="#"
            accept=".jpg,.png,.jpeg,.svg"
            list-type="picture-card"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleChange"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
          <textarea v-model="pngBase" cols="30" rows="10" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Tobase64',
  props: {},
  data() {
    return {
      imageUrl: '',
      pngBase: ''
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleChange(file, fileList) {
      this.imageUrl = file.url
      // FileReader()读取文件
      const fr = new FileReader()
      fr.readAsDataURL(file.raw)
      fr.onload = () => {
        this.pngBase = fr.result
        // 从剪贴板中读取文本
        navigator.clipboard.readText(this.pngBase).then((text) => {
          this.$message('base64字符串已从剪贴板中读取文本')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tobase64 {
    width: 60%;
    height: 90%;
    margin: 5% auto;
    .tobase64-wrap {
        width: 100%;
        height: 100%;
        display: flex;
        &-png {
            h3 {
                height: 30px;
                line-height: 30px;
                margin-bottom: 20px;
            }
            .tobase64-wrap-upload {
                width: 100%;
                display: flex;
                .avatar-uploader {
                    margin-right: 30px;
                    img {
                        display: inline-block;
                        width: 148px;
                        height: 148px;
                        object-fit: contain;
                    }
                }
            }
        }
    }
}
</style>
