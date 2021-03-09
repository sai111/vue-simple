<template>
  <div class="dingtalk">
    <remote-js src="https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js" />
  </div>
</template>
<script>
import remoteJs from '../../../lib/remote-js'
export default {
  name: 'Dingtalk',
  components: { remoteJs },
  props: {},
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
.dingtalk {
  width: 100%;
  height: 100%;
}
</style>
