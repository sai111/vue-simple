<template>
  <div class="radarScan-entry">
    radarScan组件
    <radarScan v-bind="scanConfig" />
  </div>
</template>
<script>
import radarScan from './index.vue'
export default {
  name: 'RadarScanEntry',
  components: { radarScan },
  data() {
    return {
      scanConfig: {
        width: 230,
        height: 230,
        radius: 90,
        angle: 90,
        cx: 115,
        cy: 115,
        duration: 1.8,
        color: 'rgb(72,168,248)',
        colors: [
          { value: 0, color: 'rgba(72,168,248,0.6)' },
          { value: 0.5, color: 'rgba(72,168,248,0)' },
          { value: 1, color: 'rgba(72,168,248,0)' }
        ],
        colors2: [
          { value: 0, color: 'rgba(72,168,248,0.8)' },
          { value: 0.4, color: 'rgba(72,168,248,0.3)' },
          { value: 0.8, color: 'rgba(72,168,248,0)' },
          { value: 1, color: 'rgba(0,0,0,0)' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.radarScan-entry {
    width: 100%;
    height: 100%;
}
</style>
