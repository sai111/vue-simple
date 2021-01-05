<template>
  <div
    v-loading="loading"
    class="okrTree-entry"
  >
    okrTree组件
    <OkrTree
      v-if="chainData&&Object.keys(chainData).length>0"
      :tree-data="treeData"
      :left-data="leftData"
      :imgs="imgs"
      :edit-img="editImg"
    />
  </div>
</template>
<script>
import OkrTree from './index.vue'
export default {
  name: 'OkrTreeEntry',
  components: { OkrTree },
  data() {
    return {
      loading: false,
      isEdit: false,
      chainData: null,
      treeData: [],
      leftData: [],
      defaultProps: {
        label: 'title',
        children: 'children'
      },
      imgs: {
        promotion: require('./imgs/chain/promotion.png'), // 推广运营
        advertise: require('./imgs/chain/advertise.png'), // 广告提供
        technical: require('./imgs/chain/technical.png'), // 技术服务
        payment_platform: require('./imgs/chain/payment_platform.png'), // 四方支付平台
        running_platform: require('./imgs/chain/running_platform.png'), // 跑分平台
        advertising: require('./imgs/chain/advertising.png'), // 广告投放
        configuration: require('./imgs/chain/configuration.png'), // 配置管理
        agent_platform: require('./imgs/chain/agent_platform.png') // 代理平台
      },
      defaultImg: require('./imgs/chain/default.png'),
      editImg: require('./imgs/chain/edit.png')
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getJson()
  },
  methods: {
    getJson() {
      this.loading = true
      const res = require('./json/chain.json')
      if (res.data && Object.keys(res.data).length > 0) {
        const data = res.data
        const newObj = Object.assign({}, res.data)
        newObj.isCenter = true
        newObj.zoom = 1
        newObj.isMore = false
        if (newObj.children) delete newObj.children
        if (data && data.children && data.children.length > 0) {
          this.leftData = [this.formatMore({
            ...newObj,
            children: data.children.filter((v) => v.direction === 'left')
          }, 'left')]
          this.treeData = [this.formatMore({
            ...newObj,
            children: data.children.filter((v) => v.direction === 'right')
          }, 'right')]
        }
        this.loading = false
        this.chainData = data
      }
    },
    formatMore(data, direction, zoom = 2, webType) {
      if (data && data.children && data.children.length > 0) {
        if (data.children.length >= 6) {
          data.children[0].isMore = true
          data.children = data.children.splice(0, 6)
        }
        for (var i = 0; i < data.children.length; i++) {
          const v = data.children[i]
          v.directionFlag = direction
          v.zoom = zoom
          v.webTypeOnly = zoom > 2 ? webType : v.webType
          if (v.children && v.children.length > 0) {
            v.webTypeOnly = v.webType
            this.formatMore(v, direction, ++zoom, v.webType)
          }
        }
      } else if (data.children && data.children === 0) {
        delete data.children
      }
      return data
    },
    clickSave() {
      this.isEdit = false
    },
    openEdit() {
      this.isEdit = true
    }
  }
}
</script>
<style lang="scss" scoped>
.okrTree-entry {
  width: 100%;
  height: 100%;
}
</style>
