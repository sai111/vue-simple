/** fireworks配置项 */
import Stats from 'stats.js'
const DEFAULT_SETTINGS = {
  env: 'dev',
  width: 200,
  height: 200,
  line: 1
}

export default class Fireworks {
  canvas = null
  ctx = null

  // 离屏
  osc = null
  osctx = null
  // 绘制参数
  settings = DEFAULT_SETTINGS
  // refresh 逻辑控制阀
  needRefresh = false

  // 动画控制时间
  startTime = 0
  lastTime = 0
  currentTime = 0

  // requestAnimationFrame返回用于cancel
  ticker = 0
  // 性能监测
  stats = null
}
