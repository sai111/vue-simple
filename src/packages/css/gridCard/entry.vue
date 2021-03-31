<template>
  <div class="gridCard-entry">
    gridCard组件
    <div v-loading="loading" class="grid-card-entry-wrap">
      <div v-for="(item, index) in list" :key="'card-li-'+index">
        <gridCard :card-item="item" />
      </div>
    </div>
  </div>
</template>
<script>
import GridCard from './index.vue'
import { getCardList } from '@/api/card'
export default {
  name: 'GridCardEntry',
  components: { GridCard },
  data() {
    return {
      loading: false,
      list: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getCardList().then((res) => {
        this.list = res.data.list
        this.loading = false
      }).catch((e) => {
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.gridCard-entry {
  width: 100%;
  height: 100%;
  .grid-card-entry-wrap {
    display: grid;
    gap: 4px 4px;
    grid-template-columns: repeat(auto-fill, 100px);
    justify-content: space-between;
  }
}
</style>
