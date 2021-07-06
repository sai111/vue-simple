<template>
  <div class="invade-entry">
    invade组件
    <el-scrollbar class="custom-el-scroll">
      <invade />
    </el-scrollbar>
  </div>
</template>
<script>
import Stats from 'stats.js'
import invade from './index.vue'
export default {
  name: 'InvadeEntry',
  components: { invade },
  data() {
    return {
      stats: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.initStats()
  },
  methods: {
    initStats() {
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
    }
  }
}
</script>
<style lang="scss" scoped>
.invade-entry {
  width: 100%;
  height: 100%;
}
</style>
