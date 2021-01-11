<template>
  <div
    v-loading="loading"
    class="treeXmind-entry"
  >
    treeXmind组件
    <div class="treexmind-edit">
      <span
        v-if="isEdit"
        @click="clickSave"
      >
        完成
      </span>
      <span
        v-else
        @click="openEdit"
      >
        编辑
      </span>
    </div>
    <tree-xmind
      v-if="chainData&&Object.keys(chainData).length>0"
      :data="treeData"
      :left-data="leftData"
      :props="defaultProps"
      node-key="id"
      only-both-tree
      direction="horizontal"
      :label-width="labelWidth"
      :label-height="labelHeight"
    />
  </div>
</template>
<script>
import TreeXmind from './index.vue'
export default {
  name: 'TreeXmindEntry',
  components: { TreeXmind },
  data() {
    return {
      loading: false,
      isEdit: false,
      chainData: null,
      treeData: [],
      leftData: [],
      labelWidth: 150,
      labelHeight: 40,
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
          const leftArr = data.children.filter((v) => v.direction === 'left')
          const rightArr = data.children.filter((v) => v.direction === 'right')
          this.leftData = [this.formatMore({
            ...newObj,
            children: leftArr,
            leftTotal: leftArr.reduce((p, c) => p + (c.sum || 0), 0) + leftArr.length
          }, 'left')]
          this.treeData = [this.formatMore({
            ...newObj,
            children: rightArr,
            rightTotal: rightArr.reduce((p, c) => p + (c.sum || 0), 0) + rightArr.length
          }, 'right')]
        }
        console.log(this.leftData, 'this.leftData', this.treeData)
        this.loading = false
        this.chainData = data
      }
    },
    formatMore(data, direction, zoom = 2, webType, len2 = 0) {
      if (data && data.children && data.children.length > 0) {
        if (data.children.length >= 6) {
          data.children[0].isMore = true
          data.children = data.children.splice(0, 6)
        }
        for (var i = 0; i < data.children.length; i++) {
          const v = data.children[i]
          v.len = len2 + v.sum
          len2 += Math.max(1, v.children ? v.children.length : 0)
          v.directionFlag = direction
          v.zoom = zoom
          v.webTypeOnly = webType
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
      const image = node.data.isCenter ? '' : this.isEdit && node.data.edit ? this.editImg : img
      const titleText = node.data.title ? this.byLength(node.data.title, 13) : node.data.title
      const valueText = node.data.value ? this.byLength(node.data.value, 13) : node.data.value
      // dom
      let titleDom
      if (this.getChartLen(node.data.title) > 12) {
        titleDom = <div class='diy-con-content-title'><el-tooltip content={node.data.title} placement='top'><div>{ titleText }</div></el-tooltip></div>
      } else {
        titleDom = <div class='diy-con-content-title'>{ titleText }</div>
      }
      let valueDom
      if (this.getChartLen(node.data.value) > 12) {
        valueDom = <a href={valueLink} target='_blank' rel='noopener noreferrer'><el-tooltip content={node.data.value} placement='top'><div>{ valueText }</div></el-tooltip></a>
      } else {
        valueDom = <a href={valueLink} target='_blank' rel='noopener noreferrer'>{ valueText }</a>
      }
      const centerValueDom = <div class='diy-con-content-edit-box' onClick={() => this.clickEdit(node.data)}>{ node.data.title ? '编辑' : '添加' }网站信息</div>
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
        <div class={cls}>
          <div class='diy-con-name'>
            { node.data.isMore ? moreDom : '' }
            { image && !node.data.isMore ? imageDom : null }
            { node.data.title && !node.data.isMore ? titleDom : null }
          </div>
          <div class='diy-con-content'>
            { node.data.isCenter && this.isEdit ? centerValueDom : node.data.value && !node.data.isMore ? valueDom : null }
          </div>
        </div>
      )
    },
    // https://blog.csdn.net/weixin_38747509/article/details/80534849?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control
    byLength(str, L) {
      let result = ''
      const len = str.length // 字符串长度
      const chrlen = str.replace(/[^\x00-\xff]/g, '**').length // 字节长度
      if (chrlen <= L) { return str }
      for (var i = 0, j = 0; i < len; i++) {
        var chr = str.charAt(i)
        if (/[\x00-\xff]/.test(chr)) {
          j++ // ascii码为0-255，一个字符就是一个字节的长度
        } else {
          j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
        }
        if (j <= L) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
          result += chr
        } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
          return result + '...'
        }
      }
    },
    getChartLen(str) {
      if (!str) return ''
      let count = 0
      let chartCode = -1
      for (let i = 0; i < str.length; i++) {
        chartCode = str.charCodeAt(i)
        if (chartCode >= 0 && chartCode <= 128) {
          count++
        } else {
          count += 2
        }
      }
      return count
    },
    clickMore(item, parent) {},
    clickImage(item, parent) {},
    clickEdit(item) {},
    clickSave() {
      this.isEdit = false
    },
    openEdit() {
      this.isEdit = true
    }
  }
}
</script>
<style lang="scss">
.treeXmind-entry {
  // background: #202536;
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
      .only-both-tree-node {
        justify-content: center;
      }
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
        overflow: hidden;
      }
      .diy-wrapper-direction-left {
        text-align: right;
      }
      .diy-wrapper-direction-right {
        text-align: left;
      }
      .diy-con-name-more {
        color:#31c05c!important;
        cursor: pointer;
      }
      .diy-wrapper-custom {
        overflow: hidden;
        width: 100%;
        .diy-con-name {
          width: 100%;
          word-break: normal;
          // text-overflow: ellipsis;
          // white-space: nowrap
        }
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
  .treexmind-edit {
    color: #fff;
    cursor: pointer;
  }
}
</style>
