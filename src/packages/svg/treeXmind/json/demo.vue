<template>
  <div class="treeXmind">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      preserveAspectRetio="xMidYMid meet"
      width="100%"
      height="100%"
      x="0%"
      y="0%"
      :viewBox="viewBox"
    >
      <defs>
        <linearGradient id="center-bg" x1="50%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stop-color="#5a6fad" />
          <stop offset="100%" stop-color="#36446c" />
        </linearGradient>
      </defs>
      <!-- 中心主题 -->
      <center-theme
        v-if="treeData&&Object.keys(treeData).length>0"
        :tree-data="treeData"
        :cx="cx"
        :cy="cy"
        fill="url(#center-bg)"
        v-bind="config"
      />
      <!-- 分支主题 -->
      <g v-if="treeData&&Object.keys(treeData).length>0&&treeData.children&&treeData.children.length >0">
        <g
          v-if="treeData.leftArr&&treeData.leftArr.length>0"
          class="left-wrap"
          :transform="formatTranslate1('left')"
        >
          <g
            v-for="(itemL1, indexL1) in treeData.leftArr"
            :key="'branch-wrap-li-'+indexL1"
            class="one-branch-wrap-li"
            :transform="formatTranslate2('left', itemL1, indexL1, treeData.leftArr.length)"
          >
            <branch-theme
              v-bind="config"
              :cx="cx"
              :cy="cy"
              :index="indexL1"
              :max-rect="maxRect"
              :tree-data="itemL1"
            />
            <g
              v-if="itemL1&&itemL1.children&&itemL1.children.length>0"
              class="two-branch-wrap"
              :transform="twoformatTranslate('left')"
            >
              <g
                v-for="(itemL2, indexL2) in itemL1.children"
                :key="'two-branch-wrap-li-'+indexL2"
                class="two-branch-wrap-li"
              >
                <!-- :transform="formatTranslate2('right', itemL2, indexL2)" -->
                <branch-theme
                  v-bind="config"
                  :cx="cx"
                  :cy="cy"
                  :index="indexL2"
                  :max-rect="maxRect"
                  :tree-data="itemL2"
                />
              </g>
            </g>
          </g>
        </g>
        <g
          v-if="treeData.rightArr&&treeData.rightArr.length>0"
          class="right-wrap"
          :transform="formatTranslate1('right')"
        >
          <!-- <rect
            x="0"
            :y="config.branchHeight"
            :height="maxRect*config.branchHeight"
            width="300"
            stroke="#909399"
            fill="none"
          /> -->
          <g
            v-for="(itemR1, indexR1) in treeData.rightArr"
            :key="'branch-wrap-li-'+indexR1"
            class="one-branch-wrap-li"
            :transform="formatTranslate2('right', indexR1, itemR1, treeData.rightArr.length)"
          >
            <branch-theme
              v-bind="config"
              :cx="cx"
              :cy="cy"
              :index="indexR1"
              :max-rect="maxRect"
              :tree-data="itemR1"
            />
            <g
              v-if="itemR1&&itemR1.children&&itemR1.children.length>0"
              class="two-branch-wrap"
              :transform="twoformatTranslate('right')"
            >
              <g
                v-for="(itemR2, indexR2) in itemR1.children"
                :key="'two-branch-wrap-li-'+indexR2"
                class="two-branch-wrap-li"
              >
                <!-- :transform="formatTranslate2('right', itemR2, treeData)" -->
                <branch-theme
                  v-bind="config"
                  :cx="cx"
                  :cy="cy"
                  :index="indexR2"
                  :max-rect="maxRect"
                  :tree-data="itemR2"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
      <!-- 子主题 -->
      <!-- 联系 -->
    </svg>
  </div>
</template>
<script>
import CenterTheme from './components/center-theme.vue'
import BranchTheme from './components/branch-theme.vue'
export default {
  name: 'TreeXmind',
  components: {
    CenterTheme,
    BranchTheme
  },
  props: {
    treeData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // treeData: [],
      width: 1440,
      height: 600,
      config: {
        thirdCollapse: false, // 第三层是否折叠
        branchWidth: 150,
        branchHeight: 40,
        lineDistance: 80,
        radius: 100,
        textFill: '#cfd8e6',
        textFontSize: '16px',
        valueFontSize: '14px'
      }
    }
  },
  computed: {
    viewBox() {
      return `0 0 ${this.width} ${this.height}`
    },
    cx() {
      return this.width / 2
    },
    cy() {
      return this.height / 2
    },
    maxRect() {
      return Math.floor(this.height / this.config.branchHeight) - 2
    }
  },
  watch: {},
  mounted() {},
  methods: {
    formatTranslate1(direction) {
      let result = ''
      if (direction === 'left') {
        result = this.cx - this.config.radius - this.config.branchWidth - this.config.lineDistance
      } else {
        result = this.cx + this.config.radius + this.config.lineDistance
      }
      return `translate(${result}, 0)`
    },
    formatTranslate2(direction, item, index, len) {
      console.log(len, 'data', item)
      let avanger = 0
      if (len > 1) {
        avanger = this.height / len
      } else {
        avanger = this.cy
      }
      let result = ''
      if (item.sum && item.sum < this.maxRect) {
        result = (avanger + (item.sum + 1 + index) * this.config.branchHeight) / 2
      } else {
        result = (this.maxRect * this.config.branchHeight) / 2
      }
      return `translate(0, ${result})`
    },
    twoformatTranslate(direction) {
      const distance = this.config.branchWidth + this.config.lineDistance
      return `translate(${direction === 'left' ? -distance : distance}, 0)`
    }
    // formatTranslate1(total) {
    //   if (total > this.maxRect) {
    //     return 'translate(0,0)'
    //   } else {
    //     return `translate(0, ${(this.height - total * this.config.branchHeight) / 2})`
    //   }
    // },
    // formatTranslate(item, index, total) {
    // console.log(total, 'total', this.maxRect, arr)
    // const len = arr.length
    // if (total > this.maxRect) {
    //   return ''
    // } else {
    //   return `translate(0, ${(this.height - total * this.config.branchHeight) / 2})`
    // }
    // },
    // (itemR1.total * config.branchHeight)/2
    // formatPath1(item, index, allTotal) {
    //   console.log(item, 'total', index, allTotal, this.maxRect)
    //   let result = 0
    //   if (item.total > this.maxRect) {
    //     result = (this.maxRect * this.config.branchHeight) / 2
    //   } else {
    //     result = (item.total * this.config.branchHeight) / 2
    //   }
    //   return result
    // }
  }
}
</script>
<style lang="scss" scoped>
.treeXmind {
  width: 100%;
  height: 100%;
  svg {
    border: 1px solid red;
  }
}
</style>
