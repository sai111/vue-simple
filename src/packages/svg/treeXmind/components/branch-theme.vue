<template>
  <g class="branch-theme">
    <g
      v-if="treeData"
      class="branch-theme-li"
    >
      <g class="branch-theme-text">
        <!-- <path :d="drawFive(6, 30, index, treeData)" stroke="red" fill="none" /> -->
        <text
          x="0"
          :y="(index + treeData.sum) * branchHeight"
          :width="branchWidth"
          :height="branchHeight"
        >
          {{ treeData.title }}
        </text>
      </g>
    </g>
  </g>
</template>
<script>
export default {
  name: 'BranchTheme',
  props: {
    treeData: {
      type: Object,
      default: () => {}
    },
    cx: {
      type: [Number, String],
      default: 0
    },
    cy: {
      type: [Number, String],
      default: 0
    },
    maxRect: {
      type: [Number, String],
      default: 0
    },
    index: {
      type: [Number, String],
      default: 0
    },
    radius: {
      type: [Number, String],
      default: 0
    },
    textFill: {
      type: String,
      default: '#cfd8e6'
    },
    branchHeight: {
      type: [Number, String],
      default: 0
    },
    branchWidth: {
      type: [Number, String],
      default: 0
    },
    lineDistance: {
      type: [Number, String],
      default: 0
    },
    textFontSize: {
      type: [Number, String],
      default: ''
    },
    valueFontSize: {
      type: [Number, String],
      default: 0
    },
    showImage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
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
  mounted() {},
  methods: {
    // 绘制五边形
    drawFive(num, radius, index, item) {
      let polyPath = `M0,${(index + item.sum) * this.branchHeight + radius * 2}`
      for (let i = 0; i < num; i++) {
        const angle = i * (Math.PI * 2 / 5)
        if (i === 0) {
          polyPath += `L${Math.sin(angle) * radius},${-Math.cos(angle) * radius}`
        } else {
          polyPath += ` L${Math.sin(angle) * radius},${-Math.cos(angle) * radius}`
        }
      }
      polyPath += 'Z'
      return polyPath
    }
  }
}
</script>
<style lang="scss" scoped></style>
