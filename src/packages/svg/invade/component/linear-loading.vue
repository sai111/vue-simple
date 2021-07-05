<template>
  <div>
    <!--designed by 泱泱 -->
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="200"
      height="200"
      viewBox="0 0 200 200"
      xml:space="preserve"
    >
      <!--#4886CD为深色值   #9DBFE4为中间值 可以随意修改-->
      <defs>
        <linearGradient
          id="right"
          gradientUnits="userSpaceOnUse"
          x1="150"
          y1="20"
          x2="150"
          y2="180"
        >
          <stop offset="0" style="stop-color: #4886cd" />
          <stop offset="1" style="stop-color: #9dbfe4" />
          <!--右侧渐变---蓝到浅蓝渐变-->
        </linearGradient>
        <linearGradient id="left" gradientUnits="userSpaceOnUse" x1="50" y1="0" x2="50" y2="180">
          <stop offset="0" style="stop-color: #ffffff" />
          <stop offset="1" style="stop-color: #9dbfe4" />
          <!--左侧渐变---浅蓝到白色渐变-->
        </linearGradient>
      </defs>  
      <g id="load">
        <!--左半圆环-->
        <path class="left" :d="path" fill="url(#left)" />
        <!--右半圆环-->
        <path class="right" :d="path2" fill="url(#right)" />
        <!--小圆-->
        <circle class="top" cx="100" cy="10" r="10" fill="#4886cd" />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'LinearLoading',
  components: {},
  props: {
    width: {
      type: [Number, String],
      default: 200
    },
    height: {
      type: [Number, String],
      default: 200
    },
    color: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    path2: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
@keyframes load {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
#load {
  animation: load 1s linear infinite;
  transform-origin: center center;
}
</style>
