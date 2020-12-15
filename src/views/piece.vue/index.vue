<template>
  <div ref="piece-main" class="piece">
    知识碎片
  </div>
</template>
<script>
export default {
  name: 'Piece',
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.piece {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 20;
  &-background {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-size: cover;
    background-color: #fff;
  }
}
</style>
