<template>
  <div class="animate-contain">
    <div class="animate-body">
      <div
        class="test"
        :style="formatStyle()"
      >
        动画
      </div>
    </div>
    <div class="animate-list">
      <el-tabs type="border-card">
        <el-tab-pane
          v-for="(item1, index1) in list"
          :key="'animate-li-'+index1"
          :label="item1.label"
        >
          <div class="animate-group">
            <div
              v-for="(item2, index2) in filterArr(item1)"
              :key="'group-item-'+index2"
              class="group-item"
              @click="getClass(item2)"
            >
              {{ item2.label }}
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import config from './config.js'
export default {
  name: 'AnimateBlock',
  components: {},
  props: {},
  data() {
    return {
      // https://www.dowebok.com/demo/2014/98/
      // https://www.cnblogs.com/xiaohuochai/p/7372665.html
      list: config.list,
      classN: ''
    }
  },
  mounted() {},
  methods: {
    filterArr(obj) {
      let result = []
      if (obj && obj.children && obj.children.length > 0) {
        result = obj.children
      } else {
        result = []
      }
      return result
    },
    getClass(item) {
      this.classN = item.label
    },
    formatStyle() {
      let result = {}
      result.animation = `${this.classN} 1s 1 both`
      setTimeout(() => {
        result.animation = 'none 0 ease 0 1 normal'
      })
      return result
    }
  }
}
</script>
<style scoped lang="scss">
@import './index.scss';
</style>
