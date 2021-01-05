<template>
  <div class="okr-tree-wrap">
    <vue-okr-tree
      :data="treeData"
      :left-data="leftData"
      only-both-tree
      direction="horizontal"
      show-collapsable
      node-key="id"
      default-expand-all
      label-class-name="diy-con-label"
      label-width="90"
      :props="defaultProps"
      :render-content="renderContent"
    />
  </div>
</template>
<script>
import { VueOkrTree } from 'vue-okr-tree'
import 'vue-okr-tree/dist/vue-okr-tree.css'
export default {
  name: 'OkrTree',
  components: { VueOkrTree },
  props: {
    treeData: {
      type: Array,
      required: true
    },
    leftData: {
      type: Array,
      required: true
    },
    imgs: {
      type: Object,
      default: () => {}
    },
    editImg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultProps: {
        label: 'title',
        children: 'children'
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
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
    clickEdit(item) {}
  }
}
</script>
<style lang="scss" scoped>
.okr-tree-wrap {
  width: 100%;
  height: 100%;
  background: #202536;
  ::v-deep .org-chart-container {
    height: 100%;
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
      height: 100%;
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
}
</style>
