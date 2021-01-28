<template>
  <div class="g-demo" />
</template>
<script>
export default {
  name: 'Demo2',
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() { },
  methods: {}
}
</script>
<style scoped lang="scss">
.g-demo {
  width: 140px;
  height: 90px;
  margin: 0 30px 50px 50px;
  position: relative;
  border: 1px solid #03a9f3;
  --borderColor: #03a9f3;
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
  }

  &::before {
    top: -5px;
    left: -5px;
    border-top: 1px solid var(--borderColor);
    border-left: 1px solid var(--borderColor);
  }

  &::after {
    right: -5px;
    bottom: -5px;
    border-bottom: 1px solid var(--borderColor);
    border-right: 1px solid var(--borderColor);
  }

  &:hover::before,
  &:hover::after {
    width: calc(100% + 9px);
    height: calc(100% + 9px);
  }
}
</style>
