<template>
  <div
    class="flip-number"
    :class="'flip-number-wrap-'+timeScopd"
    :style="style"
  >
    <span class="flip-number-prefix">
      {{ prefix }}
    </span>
    <span class="flip-number-value">
      <div
        v-for="(item, index) in numList"
        :key="'flip-number-value-li-'+index"
        class="flip-number-value-li"
      >
        <span class="flip-number-value-li-place">
          {{ placeNum }}
        </span>
        <span class="flip-number-value-li-wrap">
          <div
            v-for="child in 1"
            :key="'li-wrap-containter-'+child"
            class="li-wrap-containter"
          >
            <div class="li-wrap-containter-top">
              <span class="li-wrap-containter-top-content">
                {{ child }}
              </span>
            </div>
            <div class="li-wrap-containter-top-shadow" />
            <div class="li-wrap-containter-bottom">
              <span class="li-wrap-containter-bottom-content">
                {{ child }}
              </span>
            </div>
            <div class="li-wrap-containter-bottom-shadow" />
          </div>
        </span>
      </div>
    </span>
    <span class="flip-number-suffix">
      {{ suffix }}
    </span>
  </div>
</template>
<script>
// import { requestAnimationFrame, cancelAnimationFrame } from '../../../../lib/storyboard/utils/requestAnimationFrame.js'
export default {
  name: 'FlipNumber',
  props: {
    height: {
      type: Number,
      default: 60
    },
    width: {
      type: Number,
      default: 200
    },
    placeNum: {
      type: [Number, String],
      default: null
    },
    digitStyle: {
      type: Object,
      default: () => {
        return {
          space: 2,
          size: 30
        }
      }
    },
    startVal: {
      type: [Number, String],
      required: false,
      default: 0
    },
    endVal: {
      type: [Number, String],
      required: false,
      default: 0
    },
    duration: {
      type: Number,
      required: false,
      default: 3000
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true
    },
    // 小数
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator(value) {
        return value >= 0
      }
    },
    decimal: {
      type: String,
      required: false,
      default: '.'
    },
    separator: {
      type: String,
      required: false,
      default: ','
    },
    prefix: {
      type: String,
      required: false,
      default: ''
    },
    suffix: {
      type: String,
      required: false,
      default: ''
    },
    useEasing: {
      type: Boolean,
      required: false,
      default: true
    },
    easingFn: {
      type: Function,
      default(t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
      }
    }
  },
  data() {
    return {
      timeScopd: (new Date()).getTime(),
      style: null
    }
  },
  computed: {
    countFlag() {
      return this.startVal > this.endVal
    },
    numList() {
      const startArr = this.startVal.toString().split('')
      const newArr = []
      for (let i = 0; i < startArr.length; i++) {
        const v = startArr[i]
        if (v === ';' || v === '.') {
          newArr[newArr.length - 1].dot = v
        } else {
          newArr.push({
            value: v,
            dot: '',
            isLast: i === newArr.length - 1
          })
        }
      }
      return newArr
    }
  },
  mounted() {
    this.initStyle()
  },
  methods: {
    initStyle() {
      this.style = `
        .flip-number-wrap-${this.timeScopd} {
          --flip-number-wrap-width: ${this.width}px;
          --flip-number-wrap-width: ${this.width}px;
          --flip-number-wrap-height: ${this.height}px;
          --flip-number-wrap-fontSize: ${this.digitStyle.size}px;
          --flip-number-wrap-space: ${this.digitStyle.space}px;
        }`
    },
    initRun() {

    }
  }
}
</script>
<style lang="scss" scoped>
.flip-number {
  display: flex;
  width: var(--flip-number-wrap-width);
  height: var(--flip-number-wrap-height);
  &-prefix {
    display: inline-block;
    font-size: 14px;
    line-height: var(--flip-number-wrap-height);
  }
  &-value {
    font-size: 0;
    display: inline-block;
    &-li {
      display: inline-block;
      position: relative;
      white-space: nowrap;
      font-size: 0px;
      overflow: hidden;
      width: calc(var(--flip-number-wrap-fontSize) / 2 + var(--flip-number-wrap-space));
      height: var(--flip-number-wrap-height);
      span {
        display: inline-block;
        height: var(--flip-number-wrap-height);
        line-height: var(--flip-number-wrap-height);
      }
      &-place {
        text-align: right;
        opacity: 0.2;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: calc(var(--flip-number-wrap-fontSize) / 2);
        font-size: var(--flip-number-wrap-fontSize);
      }
      &-wrap {
        text-align: right;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        width: calc(var(--flip-number-wrap-fontSize) / 2);
        font-size: var(--flip-number-wrap-fontSize);
        .li-wrap-containter {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
          &-top {
            position: absolute;
            left: 0;
            overflow: hidden;
            width: 100%;
            height: 50%;
            border: 1px solid red;
            &::before {
              content: "";
              height: 100%;
              width: 100%;
              position: absolute;
              left: 0;
              top: 0;
            }
            &-content {
              display: block;
              overflow: hidden;
              // font-size: 24px;
              text-align: center;
              line-height: var(--flip-number-wrap-height);
            }
          }
          &-bottom {
            position: absolute;
            left: 0;
            bottom: 0;
            overflow: hidden;
            width: 100%;
            height: 50%;
            border: 1px solid red;
            &::before {
              content: "";
              height: 100%;
              width: 100%;
              position: absolute;
              left: 0;
              top: 0;
            }
            &-content {
              display: block;
              overflow: hidden;
              // font-size: 24px;
              text-align: center;
              margin-top: calc(0px - var(--flip-number-wrap-height) / 2);
              line-height: var(--flip-number-wrap-height);
            }
          }
        }
      }
    }
  }
  &-suffix {
    display: inline-block;
    padding-left: 2px;
    font-size: 14px;
    line-height: var(--flip-number-wrap-height);
  }
}
</style>
