<template>
  <div class="nestShape-entry">
    nestShape组件
    <nestShape />
  </div>
</template>
<script>
import nestShape from './index.vue'
export default {
  name: 'NestShapeEntry',
  components: { nestShape },
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
.nestShape-entry {
  width: 100%;
  height: 100%;
}
</style>
