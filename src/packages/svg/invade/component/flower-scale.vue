<template>
  <div style="width: 100%; height: 100%">
    <svg
      version="1.1"
      x="0px"
      y="0px"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <symbol id="single2">
        <path :d="path" />
        <!--此处为AI导出的单片花瓣的路径-->
      </symbol>
      <g id="leaf2" :fill="color">
        <use xlink:href="#single2" />
        <use
          v-for="(item, index) in 3"
          :key="'leaf' + index"
          class="scale-leaf"
          xlink:href="#single2"
        />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'FlowerScaleBlock',
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
.scale-leaf:nth-child(1) {
  mix-blend-mode: lighten;
  transform: rotate(-15deg);
  transform-origin: 400px 320px;
}
@for $i from 1 through 4 {
  .scale-leaf:nth-child(4n + #{$i}) {
    opacity: 0.3;
    animation: leaf#{$i} ease-in-out 0.3s both $i * 0.3s;
    fill: nth(#fef3d4 #f19600 #df5600 #d63600 #c70100, $i);
  }
  @keyframes leaf#{$i} {
    0% {
      opacity: 0;
      transform: rotate($i * 15deg);
      transform-origin: 400px 320px;
    }
    100% {
      transform: rotate($i * 15deg) scale(($i * 0.12) + 1.2);
      transform-origin: 400px 320px;
    }
  }
}
</style>
