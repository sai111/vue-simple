<template>
  <div class="triangle-entry">
    triangle组件
    <triangle
      v-for="(item, index) in shapleS"
      :key="'triangle-shape-'+index"
      :direction="item"
      :width="width"
    />
  </div>
</template>
<script>
import triangle from './index.vue'
export default {
  name: 'TriangleEntry',
  components: { triangle },
  data() {
    return {
      width: 50,
      shapleS: ['up', 'down', 'left', 'right', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight']
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.triangle-entry {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: #fff;
}
</style>
