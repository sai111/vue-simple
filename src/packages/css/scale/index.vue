<template>
  <div class="scale">
    <div class="circle-scale">
      <svg x="0" y="0" width="200" height="200" viewbox="0 0 200 200">
        <circle cx="100" cy="100" r="90" class="circle-scale-dash" />
        <circle cx="100" cy="100" r="75" class="circle-scale-circle" />
        <!-- 2-3组成scale动画 -->
        <circle cx="100" cy="100" r="75" class="circle-scale-circle2 circle-scale-in" />
        <circle cx="100" cy="100" r="75" class="circle-scale-circle3 circle-scale-in" />
        <circle cx="100" cy="100" r="75" class="circle-scale-circle-dash" />
      </svg>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Scale',
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.scale {
    width: 100%;
    height: 100%;
    .circle-scale {
      width: 400px;
      height: 400px;
    }
    .circle-scale-dash {
      stroke-width: 2;
      stroke-dasharray: 2 12;
      stroke: rgba(0, 196, 252, .5);
      stroke-linecap: round;
      fill: none;
    }
    .circle-scale-circle {
      stroke-width: 10;
      stroke: rgba(0, 196, 252, .5);
      fill: none;
    }
    .circle-scale-circle-dash {
      stroke: rgba(0, 196, 252, 1);
      fill: none;
      stroke-width: 10;
      stroke-dasharray: 100 70 60 70 60 70;
      animation: changeRotate 2s infinite linear;
      transform-origin: 50% 50%;
    }
    .circle-scale-in {
      stroke-width: 4;
      stroke: rgba(0, 196, 252, 1);
      fill: none;
      animation: changeScale 2s infinite linear;
      animation-fill-mode: forwards;
      transform-origin: 50% 50%;
    }
    .circle-scale-circle2 {
      animation-delay: 0s;
    }
    .circle-scale-circle3 {
      animation-delay: 1s;
    }
    @keyframes changeScale{
      0%{
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0.6)
      }
    }
    @keyframes changeRotate{
      0%{
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg)
      }
    }
}
</style>
