// 翻牌器动画
import { requestAnimationFrame, cancelAnimationFrame } from '../../../../lib/storyboard/utils/requestAnimationFrame.js'
export default class Flip {
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
      const target = this.targets[i]
      const child = {
        index: i,
        parent: target,
        dom: ((num) => {
          const nums = []
          const container = document.createElement('span')
          for (let i = 0; i < num; i++) {
            const dom = document.createElement('span')
            dom.innerHTML = i
            // dom.style.lineHeight = '86%'
            nums.push(dom)
            container.appendChild(dom)
          }
          container.style.display = 'flex'
          container.style.flexDirection = 'column'
          return container
        })(10),
        from: 0,
        current: 0,
        to: this.nums[i]
      }
      child.parent.appendChild(child.dom)
      this.childs.push(child)
    }
  }

  initReset() {
    requestAnimationFrame(this.transAnimate)
    // 动画方向 9=>1 正常的是 9=>0=>1 不是 9=>8=>7=>...1
    for (let i = 0; i < this.childs.length; i++) {
      this.childs[i].from = 0
      this.childs[i].current = 0
      this.childs[i].to = this.nums[i]
    }
    this.initStart()
  }

  initFresh({ targets, nums }) {
    cancelAnimationFrame(this.transAnimate)
    if (targets.length <= this.childs.length) {
      for (let i = targets.length; i < this.childs.length; i++) {
        this.childs.parent = null
        this.childs.dom = null
      }
      this.childs.splice(targets.length, this.childs.length - targets.length)
    } else {
      // 假如targets.length > this.childs.length 将新的部分初始化进child
      for (let i = this.childs.length; i < targets.length; i++) {
        const target = targets[i]
        const child = {
          index: i,
          parent: target,
          dom: ((num) => {
            const nums = []
            const container = document.createElement('span')
            for (let i = 0; i < num; i++) {
              const dom = document.createElement('span')
              // dom.style.lineHeight = '86%'
              dom.innerHTML = i
              nums.push(dom)
              container.appendChild(dom)
            }
            container.style.display = 'flex'
            container.style.flexDirection = 'column'
            return container
          })(10),
          from: 0,
          to: this.nums[i],
          current: 0
        }
        child.parent.appendChild(child.dom)
        this.childs.push(child)
      }
    }
    for (let i = 0; i < this.childs.length; i++) {
      this.childs[i].from = this.childs[i].current
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
    let changeTime = totalTime / this.speed
    let childsLen = this.childs.length

    for (let i = this.childs.length - 1; i >= 0 && changeTime > 0; i--) {
      const v = this.childs[i]
      const current = Math.min(v.from + changeTime, v.to)
      v.current = current
      v.dom.style.transform = `translate(0, -${current * 10}%)`
      if (current === v.to) childsLen--
      changeTime -= this._continuity * Math.abs(v.from - v.to)
    }
    if (childsLen > 0) {
      requestAnimationFrame(this.transAnimate)
    }
  }

  destroy() {
    for (const child of this.childs) {
      child.parent.style.display = 'inline-block'
      child.parent.removeChild(child.dom)
      child.parent = null
      child.dom = null
    }
    cancelAnimationFrame(this.transAnimate)
  }
}
