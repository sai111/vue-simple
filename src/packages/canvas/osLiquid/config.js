/** os-liquid配置项 */
// 水波球组件
import Stats from 'stats.js'
const DEFAULT_SETTINGS = {
  env: 'dev',
  width: 200,
  height: 200
}

export default class Liquid {
  canvas = null
  ctx = null
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

  constructor({ canvas, settings = {}}) {
    this.canvas = canvas
    this.refresh(settings)
    this.resize()
    this.init()
  }

  init() {
    console.log('初始化--->>>>>', this)
    // 初始化context
    this.ctx = this.canvas.getContext('2d')

    this.startTime = Date.now()
    this.lastTime = Date.now()
    this.ticker = requestAnimationFrame(this.tick.bind(this))

    // stast
    if (this.settings.env === 'dev') {
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
    }
  }

  tick() {
    if (this.stats) this.stats.update()
    // 计算delt,用于控制动画
    this.currentTime = Date.now()
    const delt = this.currentTime - this.lastTime // 当前帧和前一帧间相差的时间
    const total = this.currentTime - this.startTime
    this.draw({ delt, total })
    this.ticker = requestAnimationFrame(this.tick.bind(this))
  }
  refresh(settings = {}) {
    Object.assign(this.settings, settings)
  }

  draw({ delt, total }) {
    this.ctx.clearRect(0, 0, this.settings.width, this.settings.height)
    const center = { x: this.settings.width * 0.5, y: this.settings.height * 0.5 }
    const size = 20

    // 执行一个动画
    center.x -= 100 * Math.sin(total / 400)
    center.y += 20 * Math.sin(total / 200)
    this.ctx.beginPath()
    this.ctx.rect(center.x - size * 0.5, center.y - size * 0.5, size, size)
    this.ctx.fillStyle = 'red'
    this.ctx.fill()
    this.ctx.closePath()
  }

  resize() {
    const { width, height } = this.canvas.getBoundingClientRect()
    this.canvas.width = width
    this.canvas.height = height
    this.refresh({ width, height })
  }
  destory() {}
}
