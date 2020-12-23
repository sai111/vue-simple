<template>
  <div
    v-loading="loading"
    class="treeXmind-entry"
  >
    treeXmind组件
    <div class="treexmind-edit">
      <span v-if="isEdit">
        完成
      </span>
      <span v-else>
        编辑
      </span>
    </div>
    <vue-okr-tree
      v-if="chainData&&Object.keys(chainData).length>0"
      :data="treeData"
      :left-data="leftData"
      only-both-tree
      direction="horizontal"
      show-collapsable
      node-key="id"
      default-expand-all
      label-class-name="diy-con-label"
      :props="defaultProps"
      :render-content="renderContent"
    />
  </div>
</template>
<script>
import { VueOkrTree } from 'vue-okr-tree'
import 'vue-okr-tree/dist/vue-okr-tree.css'
export default {
  name: 'TreeXmindEntry',
  components: { VueOkrTree },
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
    console.log(this.$refs, 'diy-wrapper')
    // this.getData()
  },
  methods: {
    getJson() {
      this.loading = true
      const res = require('./json/template3.json')
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
        console.log(this.treeData, '1111', this.leftData, 'data', this.chainData)
      }
    },
    formatMore(data, direction, zoom = 2, webType) {
      if (data && data.children && data.children.length > 0) {
        // if (data.children.length > 5) {
        //   data.children[5].isMore = true
        // }
        if (data.children.length > 6) {
          data.children = data.children.splice(0, 6)
          // data.children[data.children.length - 1].isMore = true
        }
        for (var i = 0; i < data.children.length; i++) {
          const v = data.children[i]
          v.directionFlag = direction
          v.zoom = zoom
          v.webTypeOnly = webType
          // v.isMore = i > 4
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
    renderContent(h, node) {
      // 判断
      const img = node.level < 4 ? this.imgs[node.data.webType] || this.imgs[node.data.webTypeOnly] || (node.level > 0 ? this.imgs[node.parent.data.webType] : '') : ''
      const valueLink = node.data.value ? (node.data.value).includes('http') ? node.data.value : 'http://' + node.data.value : ''
      const image = node.data.isCenter ? '' : this.isEdit && node.data.edit ? this.edit : img
      const titleText = node.data.title && node.data.title.length > 12 ? node.data.title.slice(0, 12) + '...' : node.data.title
      const valueText = node.data.value && node.data.value.length > 12 ? node.data.value.slice(0, 12) + '...' : node.data.value
      // dom
      const valueDom = <a href={valueLink} target='_blank' rel='noopener noreferrer'>{ valueText }</a>
      const centerValueDom = <div class='diy-con-content-edit-box'>{ node.data.title ? '编辑' : '添加' }网站信息</div>
      const imageDom = <div class='diy-con-name-image' onClick={() => this.clickImage(node.data, node.parent.data)}><img src={image} /></div>
      const moreDom = <div class='diy-con-name-more' onClick={() => this.clickMore(node.data, node.parent.data)}>更多</div>

      // class
      const cls = ['diy-wrapper']
      if (node.data.isCenter) {
        cls.push('diy-wrapper-center')
      } else {
        cls.push('diy-wrapper-custom')
        if (node.parent.data.directionFlag) {
          cls.push('diy-wrapper-direction-' + node.data.directionFlag)
        }
      }
      // 结果
      return (
        <div ref='diy-wrapper' class={cls}>
          <div class='diy-con-name'>
            { node.data.isMore ? moreDom : '' }
            { image && !node.data.isMore ? imageDom : null }
            { node.data.title && !node.data.isMore ? titleText : null }
          </div>
          <div class='diy-con-content'>
            { node.data.isCenter && this.isEdit ? centerValueDom : node.data.value && !node.data.isMore ? valueDom : null }
          </div>
        </div>
      )
    },
    clickMore(item, parent) {},
    clickImage(item, parent) {}
  }
}
</script>
<style lang="scss">
.treeXmind-entry {
  background: #202536;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  // #31c05c;
  .org-chart-container {
    height: 80%;
    margin: 0 auto;
    .org-chart-node-children,
    .org-chart-node-label,
    .org-chart-node,
    .org-chart-node-left-children {
      &::before,
      &::after {
        border-color: #424c66!important;
      }
    }
    .org-chart-node-children {
      .expanded {
        background: transparent!important;
        width: 0!important;
        height: 0!important;
        border: none!important;
        box-shadow: none!important;
        cursor: default!important;
      }
      .diy-wrapper {
        font-size: 14px;
        .diy-con-name {
          color: #cfd8e6!important;
        }
        .diy-con-content {
          color: #cfd8e6!important;
          a {
            text-decoration: none!important;
            color:#31c05c!important;
          }
        }
      }
      .diy-con-label {
        padding: 0!important;
      }
      .diy-wrapper-direction-left {
        text-align: right;
      }
      .diy-wrapper-direction-right {
        text-align: left;
      }
      .diy-wrapper-center {
        width: 110px;
        height: 110px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        border-radius: 50%;
        background-image: linear-gradient(324deg, #5a6fad 0%, #36446c 100%);
        box-shadow: 0px 4px 8px 0px rgba(0,14,30,0.2)!important;
      }
    }
  }

}
</style>
