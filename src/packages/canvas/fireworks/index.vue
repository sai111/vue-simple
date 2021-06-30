<template>
  <div class="fireworks">
    <canvas />
  </div>
</template>
<script>
export default {
  name: 'Fireworks',
  props: {},
  data() {
    return {
      width: 400,
      height: 400,
      lines: 10
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.fireworks {
  width: 100%;
  height: 100%;
}
</style>
