<template>
  <div>
   demo   
  </div>
</template>
<script>
function noop() {}
export default {
  name: '',
  components: {},
  props: {
    // 上传的地址
    action: {
      type: String,
      required: true
    },
    // 上传的请求头
    headers: {
      type: Object,
      default() {
        return {};
      }
    },
    // 上传时额外携带的参数
    data: {
      type: Object,
      default: () => {}
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // 上传的文件字段名称
    name: {
      type: String,
      default: 'file'
    },
    // 是否支持拖拽上传
    drag: {
      type: Boolean,
      default: false
    },
    dragger,
    showFileList: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: ''
    },
    // 事件触发--start
    // 上传文件之前的钩子
    beforeUpload: {
      type: Function,
      default: null
    },
    // 删除文件之前的钩子，参数为上传的文件和文件列表，若返回 false 或者返回 Promise 且被 reject，则停止删除
    beforeRemove: {
      type: Function,
      default: null
    },
    onRemove: {
      type: Function,
      default: noop
    },
    onChange: {
      type: Function,
      default: noop
    },
    onPreview: {
      type: Function,
      default: null
    },
    onSuccess: {
      type: Function,
      default: noop
    },
    onProgress: {
      type: Function,
      default: noop
    },
    onError: {
      type: Function,
      default: noop
    },
    fileList: {
      type: Array,
      default() {
        return [];
      }
    },
    // 是否在选取文件后立即进行上传
    autoUpload: {
      type: Boolean,
      default: true
    },
    // 文件列表的类型
    listType: {
      type: String,
      default: 'text' // text,picture,picture-card
    },
    httpRequest: {
      type: Function,
      default: null
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    limit: Number,
    onExceed: {
      type: Function,
      default: noop
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
 }
</script>
<style scoped lang="scss">
</style>
