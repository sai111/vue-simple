<template>
  <div class="treeXmind">
    <svg>
      <!-- 中心主题 -->
      <!-- 分支主题 -->
      <!-- 子主题 -->
      <!-- 联系 -->
    </svg>
  </div>
</template>
<script>
import { getTree } from '@/api/piece'
export default {
  name: 'TreeXmind',
  props: {},
  data() {
    return {
      tmpData: [],
      treeData: []
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getData()
    // this.initData()
    // this.init(this.tmpData)
  },
  methods: {
    getData() {
      getTree().then((res) => {
        console.log(res, 'res---->>>')
        this.tmpData = res.data.list
      })
    },
    init(data) {
      for (const i of data) {
        this.handleLoop(i)
      }
      console.log('🚀 ~ file: entry.vue ~ line 95 ~ init ~ data', data)
    },
    initData() {
      this.treeData.splice(0, this.treeData.length, ...this.tmpData)
      let len1 = 0
      let len2 = 0
      for (const i of this.treeData) {
        i.total = 0
        if (i.children) {
          i.total += Math.max(1, i.children.length)
          for (let index = 0; index < i.children.length; index++) {
            const j = i.children[index]
            i.total += Math.max(1, j.children.length)
            j.childLen = len2
            len2 += Math.max(1, j.children.length)
            if (j.children) {
              for (const k of j.children) k.childLen = len1
              len1 += j.children.length
            }
          }
        }
      }
      // console.log(this.treeData, '11111', this.tmpData)
    },
    // https://leetcode.com/problems/minimum-height-trees/
    // 递归数据
    handleLoop(o, len1 = 0, len2 = 0) {
      if (Array.isArray(o)) return false
      if (typeof o === 'object' && o && Object.keys(o).length && o.children) {
        // o.total += Math.max(1, j.children.length)
        o.total = o.children.length
        for (let i = 0; i < o.children.length; i++) {
          const j = o.children[i]
          j.len = len2
          // o.total += Math.max(1, j.total)
          j.total = 0
          if (j.children) {
            len2 += Math.max(1, j.children.length)
            j.total += Math.max(0, j.children.length)
            len1 += j.children.length
            for (const k of j.children) {
              k.len = len1
              this.handleLoop(k, len1, len2)
            }
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.treeXmind {
  width: 100%;
  height: 100%;
}
</style>
