<template>
  <div>
    <svg
      x="0"
      y="0"
      width="100%"
      height="100%"
      preserveAspectRetio="xMidYMid meet"
      viewBox="0 0 250 250"
    >
      <g>
        <circle cx="125" cy="125" r="100" class="invade-circle" />
        <circle cx="125" cy="125" r="90" class="invade-dash" />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'CircleShape',
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
svg {
  .invade-circle {
    stroke-width:  4px;
    stroke: rgba(43, 232, 242, 0.5);
    fill: none;
  }
  .invade-dash {
    stroke-width: 4px;
    stroke: rgba(0, 193, 252, 0.5);
    fill: none;
    stroke-dasharray: 120 60;
    transform-origin: 50% 50%;
    animation: changeRotate 0.8s infinite linear alternate;
  }
}
@keyframes changeRotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(90deg); }
}
</style>
