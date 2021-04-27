/** os-liquid配置项 */
// 水波球组件
import Stats from 'stats.js'
const DEFAULT_SETTINGS = {
  env: 'dev',
  width: 200,
  height: 200,
  radius: 200,
  waveSpeed: 0.5, // 速度
  waveOffset: 0, // 频率
  waveHeight: 60, // 高度
  controlPointOffsetRate: 0.2,
  color: {
    startColor: '#f64',
    endColor: '#fec'
  }
}
// 2倍绘制
const DRAW_RATE = 1
export default class Liquid {
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

  constructor({ canvas, settings = {}}) {
    this.canvas = canvas
    Object.assign(this.settings, settings)
    // this.refresh(settings)
    this.init()
    this.resize()
  }

  init() {
    console.log('初始化--->>>>>', this)
    // 初始化context
    this.ctx = this.canvas.getContext('2d')

    // 初始化离屏canvas
    this.osc = document.createElement('canvas')
    this.osctx = this.osc.getContext('2d')

    // 初始化时间
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

    // 重绘osc内容-绘制一个浪
    const w = this.settings.radius * 2 * DRAW_RATE
    const h = this.settings.radius * 2 * DRAW_RATE
    const waveH = this.settings.waveHeight * DRAW_RATE
    const controlPointOffset = w * this.settings.controlPointOffsetRate

    this.osc.width = w * 2
    this.osc.height = w + waveH

    this.osctx.beginPath()
    this.osctx.moveTo(0, waveH + h)
    this.osctx.lineTo(0, waveH)
    this.osctx.bezierCurveTo(controlPointOffset, waveH, w * 0.5 - controlPointOffset, 0, w * 0.5, 0)
    this.osctx.bezierCurveTo(w * 0.5 + controlPointOffset, 0, w * 1 - controlPointOffset, waveH, w * 1, waveH)
    this.osctx.bezierCurveTo(w + controlPointOffset, waveH, w * 1.5 - controlPointOffset, 0, w * 1.5, 0)
    this.osctx.bezierCurveTo(w * 1.5 + controlPointOffset, 0, w * 2 - controlPointOffset, waveH, w * 2, waveH)

    this.osctx.lineTo(w * 2, waveH)
    this.osctx.lineTo(w * 2, waveH + h)
    if (typeof (this.settings.color) === 'string') {
      this.osctx.fillStyle = this.settings.color
    } else {
      const gradient = this.osctx.createLinearGradient(0, 0, 0, this.osc.height)
      gradient.addColorStop(0, this.settings.color.startColor)
      gradient.addColorStop(1, this.settings.color.endColor)
      this.osctx.fillStyle = gradient
    }
    this.osctx.fill()
    this.osctx.closePath()
  }

  draw({ delt, total }) {
    this.ctx.clearRect(0, 0, this.settings.width, this.settings.height)
    this.settings.waveOffset -= delt / 1000 * this.settings.waveSpeed
    const offset = (this.settings.waveOffset % 1) * this.settings.radius * 2
    const height = (1 - this.settings.value) * this.settings.radius
    this.ctx.drawImage(
      this.osc,
      0,
      0,
      this.osc.width,
      this.osc.height,
      offset,
      height,
      this.osc.width / DRAW_RATE,
      this.osc.height / DRAW_RATE
    )
  }

  resize() {
    const { width, height } = this.canvas.getBoundingClientRect()
    this.canvas.width = width
    this.canvas.height = height
    this.settings.radius = 0.5 * Math.min(width, height)
    this.refresh({ width, height })
  }
  destory() {}
}
