/** fireworks配置项 */
import Stats from 'stats.js'
const DEFAULT_SETTINGS = {
  env: 'dev',
  width: 400,
  height: 400,
  line: 1
}
export default class Fireworks {
  canvas = null
  ctx = null


  // 绘制参数
  settings = DEFAULT_SETTINGS
  // refresh 逻辑控制阀
  needRefresh = false

  // requestAnimationFrame返回用于cancel
  ticker = 0
  // 性能监测
  stats = null
  percent = 0

  constructor({ canvas, settings = {} }) {
    this.canvas = canvas
    console.log(this.percent, 'percent----7777')
    Object.assign(this.settings, settings)
    this.init()
  }

  init() {
    this.ctx = this.canvas.getContext('2d')
    this.draw()
    this.ticker = requestAnimationFrame(this.draw.bind(this))
    // stast
    if (this.settings.env === 'dev') {
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
    }
  }

  tick() {
    if (this.stats) this.stats.update()
    this.draw()
    this.ticker = requestAnimationFrame(this.tick.bind(this))
  }

  resize() {
    const { width, height } = this.canvas.getBoundingClientRect()
    this.canvas.width = width
    this.canvas.height = height
    console.log(this.settings, 'this.settings')
  }

  draw() {
    if (this.stats) this.stats.update()
    const center = [this.settings.width, this.settings.height]
    this.ctx.clearRect(0, 0, this.settings.width, this.settings.height)
    for (let i = 0; i < this.settings.count; i++) {
      const angle = Math.PI * 2 / this.settings.count * i
      console.log(count * i, 'iiii', angle)
      const x = this.settings.width + this.settings.radius * Math.sin(angle)
      const y = this.settings.width + this.settings.radius * Math.cos(angle)
      this.ctx.strokeStyle = this.getRandomColor(this.settings.count)[i]
      this.ctx.beginPath()
      this.drawWithDiscrete(this.ctx, center, [180, 50], [x, y], this.percent)
      this.ctx.stroke()
    }
    this.percent = (this.percent + 1) % 100
    console.log(this.percent, 'this.percent', this.settings)
  }

  // 生成随机颜色
  getRandomColor(count) {
    let colors = []
    for ( let i = 0; i < count; i++ )  {
      colors.push(
        `rgb(${( Math.random() * 255 >> 0 )},
        ${( Math.random() * 255 >> 0 )},
        ${( Math.random() * 255 >> 0 )})`
      )
    }
    return colors
  }
  // 这个方程就是二次贝赛尔曲线方
  twoBezizer (p0, p1, p2, t) {
    const k = 1 - t
    return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2
  }

  oneBezizer(p0,p1,t) {
    return p0 + (p1-p0) * t
  }

  drawWithDiscrete2(ctx, start, control, end, percent) {
    const t = percent / 100
    // 求出A点
    const A = []
    const C = []
    A[0] = oneBezizer(start[0], control[0], t)
    A[1] = oneBezizer(start[1], control[1], t)
    C[0] = twoBezizer(start[0], control[0], end[0], t)
    C[1] = twoBezizer(start[1], control[1], end[1], t)
    ctx.quadraticCurveTo( 
      A[ 0 ], A [ 1 ],
      C[ 0 ], C[ 1 ]
    )
  }

  // 离散化
  drawWithDiscrete(ctx, start, control, end, percent) {
    ctx.moveTo(start[0], start[1])
    for ( let t = 0; t <= percent / 100; t += 0.01 ) {
      const x = twoBezizer(start[0], control[0], end[0], t)
      const y = twoBezizer(start[1], control[1], end[1], t)
      ctx.lineTo(x, y)
    }
  }
  destory() {
    this.osc = null
    this.osctx = null
    this.canvas = null
    this.ctx = null
    if (this.settings.env === 'env') {
      document.body.removeChild(this.stats.dom)
    }
  }
}
