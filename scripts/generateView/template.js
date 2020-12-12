// template.js
module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
  <div class="${compoenntName}"></div>
</template>
<script>
export default {
  name: '${compoenntName}',
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
.${compoenntName} {
  width: 100%;
  height: 100%;
}
</style>`
},
  entryTemplate: compoenntName => {
    return `<template>
  <div class="${compoenntName}-entry">
    ${compoenntName}组件
    <${compoenntName} />
  </div>
</template>
<script>
import ${compoenntName} from './index.vue'
export default {
  name: '${compoenntName}Entry',
  components: { ${compoenntName} },
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
.${compoenntName}-entry {
  width: 100%;
  height: 100%;
}
</style>`
    },
  configTemplate: compoenntName => {
    return `/** ${compoenntName}配置项 */`
  },
  docTemplate: compoenntName => {
    return `<!-- ${compoenntName}文档 -->`
  }
}


