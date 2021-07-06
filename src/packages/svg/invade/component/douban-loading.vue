<template>
  <div class="douban-loading">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="100%"
      height="100%"
      x="0"
      y="0"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <circle
        class="mouth"
        :cx="cx"
        :cy="cy"
        :r="radius"
        :stroke="color"
        :stroke-width="radius / 5"
        :stroke-dasharray="`${large * radius / 2}, ${large * radius / 2}`"
      >
        <animate
          attributeName="stroke-dasharray"
          :dur="duration+'s'"
          :values="`${large * radius / 2} ${large * radius / 2};
            ${large * radius / 2} ${large * radius / 4};
            ${large * radius / 2} ${large * radius / 2};
            ${large * radius / 2} ${large * radius / 2};`
          "
          fill="freeze"
          calcMode="spline"
          keySplines="0,0,.58,1"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          :from="`0 ${cx} ${cy}`"
          :to="`720 ${cx} ${cy}`"
          :dur="duration+'s'"
          fill="freeze"
          calcMode="spline"
          keySplines="0,0,.58,1"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        class="eye"
        :cx="cx"
        :cy="cy"
        :stroke="color"
        :r="radius"
        :stroke-width="radius / 5"
        :stroke-dasharray="`0, ${large * radius / 4 * 3}`"
      >
        <animate
          attributeName="stroke-dasharray"
          :dur="duration+'s'"
          :values="`0 ${large * radius / 4 * 3};
            0 ${large * radius / 7 * 8};
            0 ${large * radius / 4 * 3};
            0 ${large * radius / 4 * 3};`
          "
          keyTimes="0; 0.4; 0.8; 1"
          fill="freeze"
          calcMode="spline"
          keySplines=".42,0,.58,1"
          repeatCount="indefinite"
        />
        <animateTransform
          attributeName="transform"
          type="rotate"
          :from="`-45 ${cx} ${cy}`"
          :to="`675 ${cx} ${cy}`"
          :dur="duration+'s'"
          fill="freeze"
          calcMode="spline"
          keySplines=".42,0,.58,1"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'DoubanLoading',
  components: {},
  props: {
    width: {
      type: [Number, String],
      default: 400
    },
    height: {
      type: [Number, String],
      default: 400
    },
    color: {
      type: String,
      default: ''
    },
    radius: {
      type: [Number, String],
      default: 80
    },
    // 动画时间（单位：s）
    duration: {
      type: [Number, String],
      default: 2.3
    }
  },
  data() {
    return {
      large: Math.PI * 2
    }
  },
  computed: {
    cx() {
      return this.width / 2
    },
    cy() {
      return this.height / 2
    }
  },
  mounted() {},
  methods: {
    // https://segmentfault.com/a/1190000009268083
    // https://juejin.cn/post/6844903977054633998
    // https://juejin.cn/post/6844903487440961543
    // https://segmentfault.com/a/1190000009371194
  }
}
</script>
<style scoped lang="scss">
.douban-loading {
  width: 100%;
  height: 100%;
  .mouth {
    fill: none;
    stroke-linecap: round;
    // stroke-dasharray: 44, 44;
    //animation-timing-function: ease-out;
    //transform-origin: center;   /* transform动画时以自身中心作为基点 */
    //animation: mounthAni 2. 3s ease-out infinite;
  }
 .eye {
    fill: none;
    stroke-linecap: round;
    //animation-timing-function: ease-in-out;
    // stroke-dasharray: 0, 66;
    //transform-origin: center;
    //transform: rotate(-45deg);
    //animation: eyeAni 2.3s ease-in-out infinite;
  }
}

@keyframes mounthAni {
  40% {
    //stroke-dasharray: 44, 22;   /* 间距改为1/4 */
  }
  80%, 100% {
    //stroke-dasharray: 44, 44;   /* 间距恢复为1/2 */
    //transform: rotate(720deg);
  }
}

@keyframes eyeAni {
    40% {
      stroke-dasharray: 0, 77;    /* 间距改为7/8 */
    }
    80%, 100% {
      transform: rotate(675deg);  /* 间距恢复为3/4 */
      stroke-dasharray: 0, 66;
    }
}

</style>
