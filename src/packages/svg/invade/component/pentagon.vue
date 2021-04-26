<template>
  <div>
    <svg
      x="0"
      y="0"
      width="100%"
      height="100%"
      viewBox="0 0 250 250"
    >
      <path
        :d="drawPolygon(100)"
        stroke-width="4px"
        stroke="rgba(43,232,242,0.5)"
        fill="none"
      />
      <rect width="110" height="1" x="60" y="64" fill="#2be8f2" stroke-opacity="0.4">
        <animate
          attributeName="width"
          dur="5s"
          values="0;110;0;0"
          keyTimes="0;0.05;0.1;1"
          repeatCount="indefinite"
        />
        <!-- 这里的 代码=> changeMove -->
      </rect>
      <rect width="170" height="1" x="40" y="100" fill="#2be8f2" stroke-opacity="0.5">
        <animate
          attributeName="width"
          dur="5s"
          values="0;170;0;0"
          keyTimes="0;0.04;0.08;1"
          repeatCount="indefinite"
        />
      </rect>
      <rect width="157" height="1" x="46" y="160" fill="#2be8f2" stroke-opacity="0.6">
        <animate
          attributeName="width"
          dur="5s"
          values="0;157;0;0"
          keyTimes="0;0.04;0.08;1"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'PentagonShape',
  components: {},
  props: {},
  data() {
    return {
      sideNum: 6,
      sixRad: Math.PI * 2 / 6
    }
  },
  mounted() {},
  methods: {
    drawPolygon(radius) {
      const origin = 125
      let polyPath = ''
      for (let i = 0; i <= this.sideNum; i++) {
        const angle = i * this.sixRad
        if (i === 0) {
          polyPath += `M${Math.cos(angle) * radius + origin},${-Math.sin(angle) * radius + origin}`
        } else {
          polyPath += ` L${Math.cos(angle) * radius + origin},${-Math.sin(angle) * radius + origin}`
        }
      }
      polyPath += 'Z'
      return polyPath
    }
  }
}
</script>
<style scoped lang="scss">
@keyframes move {
  to { top: 200%; }
}
@keyframes changeMove {
 0% {
   width: 0px;
 }
 5% {
   width: 120px;
 }
 10% {
   width: 0px;
 }
 100% {
   width: 0px;
 }
}
</style>
