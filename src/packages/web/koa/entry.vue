<template>
  <div class="koa-entry">
    koa组件
    <koa-block />
  </div>
</template>
<script>
import KoaBlock from './index.vue'
export default {
  name: 'koaEntry',
  components: { KoaBlock },
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
.koa-entry {
  width: 100%;
  height: 100%;
}
</style>
