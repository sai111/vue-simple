/** liquidFill配置项 */
import Stats from 'stats.js'
const DEFAULT_SETTINGS = {
  env: 'dev',
  value: 0,
  width: 200,
  height: 200,
  radius: 100,
  color: {
    startColor: '#f64',
    endColor: '#fec'
  }
}

export default class Liquid {
  svgGroup = null
  // 边框
  brGroup = null
  // 水波
  waveGroup = null
  // 绘制参数
  settings = DEFAULT_SETTINGS
  // refresh 逻辑控制阀
  needRefresh = false

  ticker = 0
  // 性能监测
  stats = null

  constructor({ svgGroup, settings = {} }) {
    Object.assign(this.settings, settings)
    this.svgGroup = svgGroup
    this.init()
    this.drawWave(this.settings)
  }

  init() {
    // 初始化时间
    this.startTime = Date.now()
    this.lastTime = Date.now()
    // stast
    if (this.settings.env === 'dev') {
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
    }
  }

  tick() {}

  drawCircle(settings = {}) {
    //this.brGroup = `<g class="border-group">
    //  <circle
    //    class="border-group-circle"
    //    cx=${settings.width / 2}
    //    cy=${settings.height / 2}
    //    r=${settings.radius}
    //    stroke="red"
    //    fill="none"
    //  />
    //stroke-width: 4;
      //stroke: rgba(0, 196, 252, 1);
      //fill: none;
    //</g>`
    console.log(this.brGroup, 'this.brGroup-->>')
    this.brGroup = document.createElement('circle')
    //const bCircle = document.createElement('circle')
    //this.brGroup.appendChild(bCircle)
    this.brGroup.setAttribute('class', 'border-group')
    this.brGroup.setAttribute('cx', settings.width / 2)
    this.brGroup.setAttribute('cy', settings.height / 2)
    this.brGroup.setAttribute('r', settings.radius)
    this.brGroup.setAttribute('fill', 'none')
    this.brGroup.setAttribute('stroke', 'rgba(0, 196, 252, 1)')
    this.brGroup.setAttribute('stroke-width', 4)
    this.svgGroup.appendChild(this.brGroup)
  }

  drawWave(settings = {}) {
    this.waveGroup = document.createElement('path')
    this.waveGroup.setAttribute('class', 'wave-group')
    this.waveGroup.setAttribute('fill', settings.fill)
    this.waveGroup.setAttribute('stroke', settings.color)
    this.waveGroup.setAttribute('stroke-width', 4)
    const w = settings.radius * 2
    const h = settings.radius * 2
    const path = `M150 0 L75 200 L225 200 Z`
    //console.log(w, h, 'eeee')
    this.waveGroup.setAttribute('d', path)
    this.svgGroup.appendChild(this.waveGroup)
    console.log(settings, 'this.svgGroup', w, h)
  }
  draw() {}
  refresh(settings = {}) {
    //this.drawCircle(settings)
    this.drawWave(settings)
  }
  resize() {}
  destroy() {
    if (this.settings.env === 'env') {
      document.body.removeChild(this.stats.dom)
    }
  }

}
