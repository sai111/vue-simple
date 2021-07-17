/** animate配置项 */
import CircleHoverEffects from './coms/animation/hover.vue'
import AnimateBlock from './coms/animation/animate/index.vue'
import CubicBezier from './coms/cubic-bezier/index.vue'
import BreathLight from './coms/animation/breath-light/index.vue'
import HeartbeatLight from './coms/animation/heart-beat-light/index.vue'
import BookBlock from './coms/turn/book-block/index.vue'
const comps = {
  CircleHoverEffects,
  AnimateBlock,
  CubicBezier,
  BreathLight,
  HeartbeatLight,
  BookBlock
}

const menuList = [
  {
    label: 'css',
    value: '',
    children: []
  },
  {
    label: '动画(animation)',
    value: '',
    children: [
      {
        label: 'hover效果',
        value: 'CircleHoverEffects',
        sourceAddress: 'https://github.com/ShowKingzw/CircleHoverEffects'
      },
      {
        label: '线悬停',
        value: 'LineHoverStyles',
        sourceAddress: 'https://tympanus.net/Development/LineHoverStyles/'
      },
      {
        label: '按钮悬停',
        value: 'ButtonHoverStyles',
        sourceAddress: 'https://tympanus.net/Development/ButtonHoverStyles/'
      },
      {
        label: 'animate.css',
        value: 'AnimateBlock',
        sourceAddress: 'https://www.dowebok.com/demo/2014/98/'
      },
      {
        label: '贝塞尔曲线取值',
        value: 'CubicBezier',
        sourceAddress: 'https://cubic-bezier.com/#.42,0,.58,1'
      },
      {
        label: '呼吸灯 breathLight',
        value: 'BreathLight',
        sourceAddress: 'https://www.cnblogs.com/ae6623/archive/2013/05/24/4416521.html'
      },
      {
        label: '心跳灯 heartbeatLight',
        value: 'HeartbeatLight',
        sourceAddress: ''
      }
    ]
  },
  {
    label: '翻页（turnPage）',
    value: '',
    children: [
      {
        label: 'BookBlock – A Content Flip Plugin',
        value: 'BookBlock',
        sourceAddress: 'https://github.com/codrops/BookBlock'
      },
      {
        label: 'Swatch Book with CSS3 & jQuery',
        value: '',
        sourceAddress: ''
      }
    ]
  }
]
export default {
  menuList,
  comps
}
