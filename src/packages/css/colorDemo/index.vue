<template>
  <div class="ColorDemo">
    <demo1 />
    <demo2 />
    <demo3 />
  </div>
</template>
<script>
import Demo1 from './components/index1.vue'
import Demo2 from './components/index2.vue'
import Demo3 from './components/index3.vue'
export default {
  name: 'ColorDemo',
  components: {
    Demo1,
    Demo2,
    Demo3
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() { },
  methods: {}
}
</script>
<style lang="scss" scoped>
.ColorDemo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
</style>
