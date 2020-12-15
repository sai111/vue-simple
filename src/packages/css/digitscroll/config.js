/** digitscroll配置项 */
export const digitConfig = {
  height: {
    type: Number,
    default: 60
  },
  width: {
    type: Number,
    default: 200
  },
  digitStyle: {
    type: Object,
    default: () => {
      return {
        width: 16,
        space: 2,
        size: 30
      }
    }
  },
  // 前缀
  prefix: {
    type: Object,
    default: () => {
      return {
        unit: '¥',
        fontSize: 14,
        color: '#000'
      }
    }
  },
  // 后缀
  suffix: {
    type: Object,
    default: () => {
      return {
        unit: '元',
        fontSize: 14,
        color: '#000'
      }
    }
  },
  num: {
    type: [Number, String],
    default: 0
  },
  animation: {
    type: Object,
    default: () => {
      return {
        type: '',
        speed: 50,
        continuity: 0 // 连续性
      }
    }
  }
}
