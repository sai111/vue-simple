/** invade配置项 */
import CircleShape from './component/circle.vue'
import PentagonShape from './component/pentagon.vue'
import FlowerBlock from './component/flower-transform.vue'
import FlowerScaleBlock from './component/flower-scale.vue'
import RectScaleBlock from './component/rect-scale.vue'
import LinearLoading from './component/linear-loading.vue'

import LoadingBlock from './component/loading.vue'
// 色值
const colorArr1 = [
  '#8A6BD6',
  '#8776D6',
  '#8581D7',
  '#828BD7',
  '#7F96D7',
  '#7DA1D7',
  '#7AACD8',
  '#78B7D8',
  '#75C2D8',
  '#72CCD8',
  '#70D7D9'
]

const comps = {
  CircleShape,
  PentagonShape,
  FlowerBlock,
  FlowerScaleBlock,
  RectScaleBlock,
  LinearLoading,
  LoadingBlock
}

const list = [
  {
    label: '入侵',
    value: Math.random() * 10000,
    type: 'circle',
    component: 'CircleShape',
    width: 250,
    height: 250
  },
  {
    label: '捕获',
    value: Math.random() * 10000,
    type: 'rect',
    component: 'PentagonShape',
    width: 250,
    height: 250
  },
  {
    label: '叠加旋转动画',
    type: 'flower-transform',
    component: 'FlowerBlock',
    width: 800,
    height: 600,
    color: 'rgba(176, 247, 235, 0.2)',
    path: 'M357.5,211.693c0,35.741,16.598,67.6,42.5,88.307c25.902-20.707,42.5-52.566,42.5-88.307s-16.598-67.6-42.5-88.307C374.098,144.094,357.5,175.953,357.5,211.693z'
  },
  {
    label: '叠加旋转动画',
    type: 'flower-transform-2',
    component: 'FlowerBlock',
    width: 800,
    height: 600,
    color: 'rgba(255, 131, 86, 0.2)',
    path: 'M800,170 C750,180 600,160 670,110 C660,40 750,100 800,170'
  },
  {
    label: '叠加旋转缩放动画',
    type: 'flower-transform-scale',
    component: 'FlowerScaleBlock',
    width: 800,
    height: 600,
    color: '#fef3d4',
    path: 'M412.48,148.21c-26.63,31.13-70.55,124.62-35.78,148,14,8,144.75,9.92,166.54-5s.07-57.71-29.42-91.4S439.12,117.08,412.48,148.21Z'
  },
  {
    label: '叠加旋转缩放动画',
    type: 'rect-scale',
    component: 'RectScaleBlock',
    width: 800,
    height: 600,
    color: 'rgba(255, 0, 122, 0.2)',
    path: 'M437.5,353.06a180.54,180.54,0,0,1-75,0c-6.8-1.52-14-8.76-15.56-15.56a180.54,180.54,0,0,1,0-75c1.52-6.8,8.76-14,15.56-15.56a180.54,180.54,0,0,1,75,0c6.8,1.52,14,8.76,15.56,15.56a180.54,180.54,0,0,1,0,75C451.54,344.3,444.3,351.54,437.5,353.06Z'
  },
  {
    label: '渐变loading',
    type: 'linear-loading',
    component: 'LinearLoading',
    width: 200,
    height: 200,
    color: '',
    path: 'M100,0v20c44.1,0,80,35.9,80,80c0,44.1-35.9,80-80,80v20c55.2,0,100-44.8,100-100S155.2,0,100,0z',
    path2: 'M20,100c0-44.1,35.9-80,80-80V0C44.8,0,0,44.8,0,100s44.8,100,100,100v-20C55.9,180,20,144.1,20,100z'
  },
  {
    label: 'loading',
    type: 'loading-icon',
    component: 'LoadingBlock',
    width: 200,
    height: 200,
    colorArr: colorArr1
  }
]

export default {
  comps,
  list
}
