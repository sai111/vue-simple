<template>
  <div class="treeXmind-entry">
    treeXmind组件
    <vue-okr-tree
      :data="treeData"
      :left-data="leftData"
      only-both-tree
      direction="horizontal"
      show-collapsable
      node-key="id"
      default-expand-all
      :props="defaultProps"
    />
  </div>
</template>
<script>
import { getTree } from '@/api/piece'
import { VueOkrTree } from 'vue-okr-tree'
import 'vue-okr-tree/dist/vue-okr-tree.css'
export default {
  name: 'TreeXmindEntry',
  components: { VueOkrTree },
  data() {
    return {
      treeData: [],
      leftData: [],
      defaultProps: {
        label: 'title',
        children: 'children'
      },
      imgs: {
        promotion: require('../imgs/chain/promotion.png'), // 推广运营
        advertise: require('../imgs/chain/advertise.png'), // 广告提供
        technical: require('../imgs/chain/technical.png'), // 技术服务
        payment_platform: require('../imgs/chain/payment_platform.png'), // 四方支付平台
        running_platform: require('../imgs/chain/running_platform.png'), // 跑分平台
        advertising: require('../imgs/chain/advertising.png'), // 广告投放
        configuration: require('../imgs/chain/configuration.png'), // 配置管理
        agent_platform: require('../imgs/chain/agent_platform.png') // 代理平台
      },
      defaultImg: require('../imgs/chain/default.png'),
      editImg: require('../imgs/chain/edit.png')
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getJson()
    // this.getData()
  },
  methods: {
    getJson() {
      const res = require('./template.json')
      if (res.data && Object.keys(res.data).length > 0) {
        const data = res.data
        // data.rightSum = 0
        // data.leftSum = 0
        const newObj = Object.assign({}, res.data)
        newObj.isCenter = true
        newObj.zoom = 1
        if (newObj.children) delete newObj.children
        if (data && data.children && data.children.length > 0) {
          this.leftData = this.formatMore([{ ...newObj, children: data.children.filter((v) => v.direction === 'left') }])
          this.treeData = this.formatMore([{ ...newObj, children: data.children.filter((v) => v.direction === 'right') }])
          // this.treeData = [{
          //   ...newObj,
          //   children: data.children.filter((v) => v.direction === 'right')
          // }]
        }
        console.log(this.treeData, '1111', this.leftData)
      }
    },
    formatMore(data, zoom = 2, webType) {
      if (data && data.children && data.children.length > 0) {
        if (data.children.length > 6) {
          data.children = data.children.splice(0, 6)
        }
        for (let i = 0; i < data.children.length; i++) {
          const v = data.children[i]
          v.zoom = zoom
          v.webTypeOnly = webType
          v.isMore = i > 4
          if (i.children && v.children.length > 0) {
            this.formatMore(v, ++zoom, v.webType)
          } else if (i.children && v.children.length === 0) {
            delete data.children
          }
        }
      }
      return data
    },
    getData() {
      getTree().then((res) => {
        const data = res.data
        if (data && Object.keys(data).length > 0 && data.children && data.children.length > 0) {
          data.branch = data.children.length
          data.rightTotal = 0
          data.leftTotal = 0
          data.leftArr = data.children.filter((v) => v.direction === 'left')
          data.rightArr = data.children.filter((v) => v.direction === 'right')
          for (const i of data.children) {
            this.handleLoop(i)
            if (i.direction === 'right') {
              data.rightTotal += i.total
            }
            if (i.direction === 'left') {
              data.leftTotal += i.total
            }
          }
          // data.maxChild = Math.max.apply(null, data.children.map(function(o) { return o.total }))
        }
        // console.log('🚀 ~ file: entry.vue ~ line 95 ~ init ~ data', data)
        this.treeData = data
      })
    },
    handleLoop(o, len1 = 0, len2 = 0) {
      if (Array.isArray(o)) return false
      if (typeof o === 'object' && o && Object.keys(o).length && o.children) {
        // o.total = o.children.length
        for (let i = 0; i < o.children.length; i++) {
          const j = o.children[i]
          j.len = len2
          len2 += Math.max(1, j.children ? j.children.length : 0)
          if (j.children) {
            len1 += j.children.length
            // o.total += j.children.length
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
.treeXmind-entry {
  width: 100%;
  height: 100%;
}
</style>
