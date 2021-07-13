<template>
  <div style="width:100%;height:100%;">
    <svg
      version="1.1"
      x="0px"
      y="0px"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <symbol id="single">
        <path :d="path" />
        <!--此处为AI导出的单片花瓣的路径-->
      </symbol>
      <g id="leaf" :fill="color" :transform="`translate(-${width / 3}, -${height / 4}) scale(1.8)`">
        <use xlink:href="#single" />
        <use
          v-for="(item, index) in 17"
          :key="'leaf'+index"
          class="flower-leaf"
          xlink:href="#single"
        />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'FlowerBlock',
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
    return {
}
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

@for $i from 0 through 17 {
  .flower-leaf:nth-child(17n + #{$i}) {
    animation: leaf#{$i} ease-in-out 0.2s both $i*0.2s;
  }
  @keyframes leaf#{$i} {
    0% {
      opacity: 0;
      transform: rotate(($i - 1)*20deg);
      transform-origin: 366px 255px;
    }
    100% {
      transform: rotate($i*20deg);
      transform-origin: 366px 255px;
    }
  }
}
</style>
