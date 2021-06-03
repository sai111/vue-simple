import ajax from './ajax.js'
export default {
  name: {
    type: String,
    default: 'file'
  },
  // 必选参数，上传的地址
  action: {
    type: String,
    required: true,
    default: ''
  },
  // 设置上传的请求头部
  Headers: {
    type: Object,
    default: () => {}
  },
  // 上传时附带的额外参数
  data: {
    type: Object,
    default: () => {}
  },
  // 是否支持多选文件
  multiple: {
    type: Boolean,
    default: true
  },
  // 是否启用拖拽上传
  drag: {
    type: Boolean,
    default: true
  },
  dragger: {
    type: Boolean,
    default: true
  },
  // 是否显示已上传文件列表
  showFileList: {
    type: Boolean,
    default: true
  },
  // 接受上传的文件类型
  accept: {
    type: String,
    default: null
  },
  // 单一文件大小：单位MB
  singleSize: {
    type: [Number, String],
    default: Infinity
  },
  // 总体大小：单位MB
  sumSize: {
    type: [Number, String],
    default: Infinity
  },
  // 上传格式提示
  acceptText: {
    type: String,
    default: ''
  },
  // 上传大小提示
  sizeText: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'select'
  },
  fileList: {
    type: Array,
    default: () => []
  },
  // 是否自动上传
  autoUpload: {
    type: Boolean,
    default: true
  },
  listType: {
    type: String,
    default: 'text' // text,picture,picture-card
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 最大允许上传个数
  limit: {
    type: Number,
    default: Infinity
  },
  // 事件---start
  // 覆盖默认的上传行为，可以自定义上传的实现
  httpRequest: {
    type: Function,
    default: ajax
  },
  // 上传文件之前的钩子，参数为上传的文件=>function(file)
  // beforeUpload: {
  //  type: Function,
  //  default: () => {}
  // },
  // 删除文件之前的钩子，参数为上传的文件和文件列表=>function(file, fileList)
  beforeRemove: {
    type: Function,
    default: () => {}
  },
  // 文件列表移除文件时的钩子==>function(file, fileList)
  onRemove: {
    type: Function,
    default: () => {}
  },
  // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用=>function(file, fileList)
  onChange: {
    type: Function,
    default: () => {}
  },
  // 点击文件列表中已上传的文件时的钩子=>function(file)
  onPreview: {
    type: Function,
    default: () => {}
  },
  // 文件上传成功时的钩子=>function(response, file, fileList)
  onSuccess: {
    type: Function,
    default: () => {}
  },
  // 文件上传时的钩子=>function(event, file, fileList)
  onProgress: {
    type: Function,
    default: () => {}
  },
  // 文件上传失败时的钩子=>function(err, file, fileList)
  onError: {
    type: Function,
    default: () => {}
  },
  // 文件超出个数限制时的钩子=>function(files, fileList)
  onExceed: {
    type: Function,
    default: () => {}
  }
}
