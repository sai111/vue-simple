// 累计计数
import { requestAnimationFrame, cancelAnimationFrame } from '../../../../lib/storyboard/utils/requestAnimationFrame.js'
export default class Add {
  constructor({ targets, nums, params }) {
    this.targets = targets
    this.nums = nums
    this.childs = []
    this.startTime = 0
    this.currentTime = 0
    // 频率
    this.speed = params.speed
    this.transAnimate = this.updateAnimate.bind(this)

    this.initAnimate()
    this.initReset()
  }

  _speed = 20
  get speed() { return this._speed }
  // set speed(speed) { return this._speed = speed }

  _continuity = 0.4 // 连续性
  get continuity() { return this._continuity }
  // set continuity(continuity) { return this._continuity = continuity }

  initAnimate() {
    for (let i = 0; i < this.targets.length; i++) {
      const child = {
        index: i,
        parent: this.targets[i],
        dom: document.createElement('span'),
        from: 0,
        to: this.nums[i]
      }
      child.dom.innerHTML = child.from
      child.parent.appendChild(child.dom)
      this.childs.push(child)
    }
  }

  initReset() {
    requestAnimationFrame(this.transAnimate)
    // 动画方向 9=>1 正常的是 9=>0=>1 不是 9=>8=>7=>...1
    for (let i = 0; i < this.childs.length; i++) {
      this.childs[i].from = 0
      this.childs[i].to = this.nums[i]
      this.childs[i].dom.innerHTML = '0'
    }
    this.initStart()
  }

  initFresh({ targets, nums }) {
    cancelAnimationFrame(this.transAnimate)
    if (targets.length <= this.childs.length) {
      for (let i = targets.length; i < this.childs.length; i++) {
        this.childs[i].parent = null
        this.childs[i].dom = null
      }
    } else {
      for (let i = this.childs.length; i < targets.length; i++) {
        const child = {
          index: i,
          parent: targets[i],
          dom: document.createElement('span'),
          from: 0,
          to: nums[i]
        }
        child.dom.innerHTML = child.from
        child.params.appendChild(child.dom)
        this.childs.push(child)
      }
    }
    for (let i = 0; i < this.childs.length; i++) {
      if (!this.childs[i].dom) return
      this.childs[i].from = this.childs[i].dom.innerHTML - 0
      this.childs[i].to = nums[i]
    }
    this.initStart()
  }
  initStart() {
    this.startTime = this.currentTime = new Date()
    requestAnimationFrame(this.transAnimate)
  }

  updateAnimate() {
    const now = new Date()
    const totalTime = now - this.startTime
    let changeTime = Math.round(totalTime / this.speed)
    let childsLen = this.childs.length

    for (let i = this.childs.length - 1; i >= 0 && changeTime > 0; i--) {
      const v = this.childs[i]
      const current = Math.min(Math.floor(v.from + changeTime), v.to)
      v.dom.innerHTML = current
      v.current = current
      if (current === v.to) childsLen--
      changeTime -= this._continuity * Math.abs(v.from - v.to)
    }
    if (childsLen > 0) {
      requestAnimationFrame(this.transAnimate)
    }
  }

  destroy() {
    for (const child of this.childs) {
      child.parent.removeChild(child.dom)
      child.parent = null
      child.dom = null
    }
    cancelAnimationFrame(this.transAnimate)
  }
}
