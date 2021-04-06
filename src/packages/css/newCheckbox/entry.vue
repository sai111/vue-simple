<template>
  <div class="newCheckbox-entry">
    newCheckbox组件
    <checkbox @change="handleChange" />
  </div>
</template>
<script>
import checkbox from './index.vue'
export default {
  name: 'NewCheckboxEntry',
  components: { checkbox },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleChange(val) {
      // console.log(val, 'val--000099999')
    }
  }
}
</script>
<style lang="scss" scoped>
.newCheckbox-entry {
  width: 100%;
  height: 100%;
  margin: 30px;
}
</style>
