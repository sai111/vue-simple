<template>
  <div class="result-wrap">
    <div class="result-file-list">
      <div
        v-for="(head, headIndex) in columns"
        :key="'heade-'+headIndex"
        class="result-file-li"
      >
        {{ head.label }}
      </div>``
      <div
        v-for="(item, index) in uploadFiles"
        :key="'result-file-li-' + index"
        class="result-file-li"
      >
        <div class="li-name">
          {{ item.name }}
        </div>
        <!--<div class="li-progress">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
        </div>-->
        <div class="li-state">
          1213
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      columns: [
        { label: '文件名', prop: '' },
        { label: '大小', prop: '' },
        { label: '上传状态', prop: '', slotFormatter: true }
      ]
    }
  },
  mounted() {},
  methods: {}
 }
</script>
<style scoped lang="scss">
.result-wrap {
  width: 100%;
  max-height: 500px;
  .result-file-list {
    display: flex;

  }
}
</style>
