<template>
  <g class="liquid-item">
    <g class="liquid-item-circle">
      <circle
        cx="200"
        cy="200"
        r="100"
        stroke="red"
        fill="none"
      />
    </g>
  </g>
</template>
<script>
import Circle from '../../invade/component/circle.vue'
export default {
  name: 'LiquidFillItem',
  components: {Circle},
  props: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {}
 }
</script>
<style scoped lang="scss">
</style>
