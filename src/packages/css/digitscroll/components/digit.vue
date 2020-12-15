<template>
  <span class="digit-container" :style="digitalStyle">
    <div
      v-for="(item, index) in numList"
      :key="'digit-container-num-'+index"
      class="digit-container-num"
    >
      <span
        class="digit-container-num-palce"
      >
        {{ palceNum }}
      </span>
      <span
        ref="targetNumber"
        class="digit-container-num-li"
      />
      <span
        v-if="!item.isLast"
        class="digit-container-num-dot"
      >
        {{ item.dot }}
      </span>
    </div>
  </span>
</template>
<script>
import addAnimate from '../js/add.js'
import flipAnimate from '../js/filp.js'
export default {
  name: 'Digit',
  props: {
    digitNum: {
      type: String,
      default: '0'
    },
    digitStyle: {
      type: Object,
      default: () => {
        return {
          size: 20,
          space: 5
        }
      }
    },
    digitAnimation: {
      type: Object,
      default: () => {
        return {
          type: '',
          speed: 50,
          continuity: 0 // 连续性
        }
      }
    }
  },
  data() {
    return {
      palceNum: 8,
      digitalStyle: null,
      animation: {
        obj: null,
        type: 'none'
      },
      animateList: {
        add: addAnimate,
        flip: flipAnimate
      }
    }
  },
  computed: {
    numList() {
      const numArr = this.digitNum.split('')
      const newArr = []
      for (let i = 0; i < numArr.length; i++) {
        const v = numArr[i]
        if (v === ',' || v === '.') {
          newArr[newArr.length - 1].dot = v
        } else {
          newArr.push({
            value: v,
            dot: '',
            isLast: i === numArr.length - 1
          })
        }
      }
      // console.log(this.digitAnimation, '1111')
      // 动画方向
      if (this.animation.obj) {
        this.$nextTick(() => {
          this.animation.obj.initFresh({
            targets: this.$refs.targetNumber,
            nums: newArr.filter((v) => v.value !== '-').map((num) => parseInt(num.value))
          })
        })
      }
      return newArr
    }
  },
  created() {
    this.initStyle()
  },
  mounted() {},
  methods: {
    initStyle() {
      this.digitalStyle = `
        --digit-container-num-space: ${this.digitStyle.space}px;
        --digit-container-num-fontSize: ${this.digitStyle.size}px;
      `
    },
    reset() {
      if (this.animation.type === this.digitAnimation.type) {
        if (this.animation.obj) {
          this.animation.obj.speed = this.digitAnimation.speed
          this.animation.obj.continuity = this.digitAnimation.continuity
          this.animation.obj.initReset()
        }
      } else {
        this.animation.type = this.digitAnimation.type || 'none'
        this.$nextTick(() => {
          if (this.animation.obj) this.animation.obj.destroy()
          if (this.animation.type !== 'none') {
            this.animation.obj = new this.animateList[this.animation.type]({
              targets: this.$refs.targetNumber,
              nums: this.numList.map((v) => parseInt(v.value)),
              params: this.digitAnimation
            })
          } else {
            this.animation.obj = null
          }
        })
      }
    },
    start() {
      if (this.animation.obj) this.animation.obj.initStart()
    }
  }
}
</script>
<style lang="scss" scoped>
.digit-container {
  font-size: 0px;
  display: inline-block;
  .digit-container-num {
    display: inline-block;
    position: relative;
    white-space: nowrap;
    font-size: 0px;
    overflow: hidden;
    height: var(--digitscroll-box-height);
    width: calc(var(--digit-container-num-fontSize) * 0.5 + var(--digit-container-num-space));
    span {
      display: inline-block;
      line-height: var(--digitscroll-box-height);
    }
    &-palce {
      text-align: right;
      opacity: 0.2;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: calc(var(--digit-container-num-fontSize) * 0.5);
      font-size: var(--digit-container-num-fontSize);
    }
    &-li {
      text-align: right;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      height: 100%;
      width: calc(var(--digit-container-num-fontSize) * 0.5);
      font-size: var(--digit-container-num-fontSize);
    }
    &-dot {
      position: absolute;
      bottom: 0;
      left: 80%;
      z-index: 1;
      font-size: var(--digit-container-num-fontSize);
    }
  }
}
</style>
