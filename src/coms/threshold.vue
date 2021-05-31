<template>
  <div class="threshold-series">
    <div
      v-for="(item, index) in series"
      :key="'threshold-series-li-'+item+index"
      class="threshold-series-li"
    >
      <el-input-number
        v-model="item.field"
        @change="handleChange"
        :min="1"
        :max="10"
        label="描述文字"
      />
   </div>
  </div>
</template>
<script>
export default {
  name: 'Threshold',
  components: {},
  props: {
    series: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleChange() {}
  }
 }
</script>
<style scoped lang="scss">
</style>
