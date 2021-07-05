<template>
  <div style="width: 100%; height: 100%">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0"
      y="0"
      :viewBox="`0 0 ${width} ${height}`"
    >
      <g class="load">
        <circle
          v-for="(item, index) in colorArr"
          :key="'circle-load-li-'+index"
          :cx="formatCx(index)"
          :cy="formatCy(index)"
          :r="15.1 - index* 0.5"
          :fill="item" 
        />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  name: 'LoadingBlock',
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
    colorArr: {
      type: Array,
      default: () => []
    },
    path: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      radius: 70,
      distance: 100
    }
  },
  computed: {
    rad() {
      return Math.PI * 2 / this.colorArr.length
    }
  },
  mounted() {},
  methods: {
    formatCx(index) {
      const angle = this.rad * index
      const radius = this.radius
      return Math.cos(angle) * radius + this.distance
    },
    formatCy(index) {
      const angle = this.rad * index
      const radius = this.radius
      return -Math.sin(angle) * radius + this.distance
    }
  }
}
</script>
<style scoped lang="scss">
svg {
  width: 100%;
  height: 100%;
}
@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.load {
  animation: load linear 2s infinite;
  transform-origin: 50% 50%;
}
</style>
