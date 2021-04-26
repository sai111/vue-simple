<template>
  <div class="invade-entry">
    invade组件
    <invade />
  </div>
</template>
<script>
import invade from './index.vue'
export default {
  name: 'InvadeEntry',
  components: { invade },
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
.invade-entry {
  width: 100%;
  height: 100%;
}
</style>
