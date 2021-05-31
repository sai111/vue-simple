<template>
  <div class="result-magnifier">
    <svg
      ref="svg"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      :viewBox="viewBox"
      class="svg-liquid-fill"
    >
      <slot name="content" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'ResultMagnifier',
  props: {},
  data() {
    return {
      viewBox: '0 0 400 400'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.result-magnifier {
  width: 100%;
  height: 100%;
  .svg-liquid-fill {
    border: 1px solid red;
  }
}
</style>
