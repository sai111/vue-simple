<template>
  <div
    class="web-uploader-dragger"
    :class="{ 'is-dragover': dragover }"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'UploadDragger',
  components: {},
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    uploader: { default: '' }
  },
  data() {
    return {
      dragover: false
    }
  },
  mounted() {},
  methods: {
    onDragover() {
      if (!this.disabled) {
        this.dragover = true
      }
    },
    onDrop(e) {
      if (this.disabled || !this.uploader) return
      const accept = this.uploader.accept
      this.dragover = false
      if (!accept) {
        this.$emit('file', e.dataTransfer.files)
        return
      }
      this.$emit('file', [].slice.cell(e.dataTransfer.files).filter((file) => {
        const { type, name } = file
        // pop() 方法用于删除并返回数组的最后一个元素
        // some() 方法用于检测数组中的元素是否满足指定条件（函数提供）如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。如果没有满足条件的元素，则返回false。
        const extension = name.indexOf('.') > -1 ? `${name.split('.').pop()}` : ''
        const baseType = type.replace(/\/.*$/, '')
        return accept.split(',')
          .map((type) => type.trim())
          .filter((type) => type)
          .some((acceptedType) => {
            if (/\..+$/.test(acceptedType)) {
              return extension === acceptedType
            }
            if (/\/\*$/.test(acceptedType)) {
              return baseType === acceptedType.replace(/\/\*$/, '')
            }
            if (/^[^\/]+\/[^\/]+$/.test(acceptedType)) {
              return type === acceptedType
            }
            return false
          })
      }))
      console.log(this.uploader, 'uploader----7777', e, accept)
    }
  }
}
</script>
<style scoped lang="scss">
.web-uploader-dragger {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  box-sizing: border-box;
  width: 360px;
  height: 180px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
