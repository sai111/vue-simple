<template>
  <div style="width: 100%; height: 100%">
    <svg
      version="1.1"
      x="0px"
      y="0px"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <symbol id="singleRect">
        <path :d="path" />
        <!--此处为AI导出的单片花瓣的路径-->
      </symbol>
      <g id="leaf2" :fill="color">
        <use xlink:href="#singleRect" />
        <use
          v-for="(item, index) in 5"
          :key="'leaf' + index"
          class="scale-leaf"
          xlink:href="#singleRect"
        />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'RectScaleBlock',
  components: {},
  props: {
    width: {
      type: [Number, String],
      default: 800
    },
    height: {
      type: [Number, String],
      default: 600
    },
    color: {
      type: String,
      default: ''
    },
    path: {
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
svg {
  width: 100%;
  height: 100%;
}
@for $i from 0 through 4 {
  .scale-leaf:nth-child(4n + #{$i}) {
    animation: leaf#{$i} ease-in-out 0.3s both $i * 0.3s;
  }
  @keyframes leaf#{$i} {
    0% {
      opacity: 0;
      transform: rotate($i * 30deg);
      transform-origin: 400px 300px;
    }
    100% {
      transform: rotate($i * 15deg) scale(($i * 1.2) + 1.2);
      transform-origin: 400px 300px;
    }
  }
}
</style>
