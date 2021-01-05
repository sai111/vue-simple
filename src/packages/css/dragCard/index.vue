<template>
  <div class="dragCard">
    <div
      class="drag-card-wrap"
      :style="{width: cardWidth+'px', height: cardHeight+'px'}"
    >
      <div
        v-for="(item, index) in imgList"
        :key="'drag-card-wrap-li-'+index"
        class="drag-card-wrap-li"
        :class="{
          animation: isAnimating,
          shadowEffect: hasShadow,
          boderEffect: hasBorder,
        }"
        :style="formatCardStyle(index, imgList.length)"
      >
        <template v-if="slotShow">
          <slot :name="(index+1) + 'Card'" />
        </template>
        <template v-else>
          <img :src="item" alt="" class="drag-card-wrap-li-img">
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DragCard',
  props: {
    imgList: {
      type: Array,
      default: () => []
    },
    // 是否开启插槽
    slotShow: {
      type: Boolean,
      default: false
    },
    // 正常卡片宽度
    cardWidth: {
      type: Number,
      default: 260
    },
    // 正常卡片高度
    cardHeight: {
      type: Number,
      default: 300
    },
    // 卡片层叠的横向边距
    leftPad: {
      type: Number,
      default: 10
    },
    // 卡片层叠的纵向边距
    topPad: {
      type: Number,
      default: 6
    },
    // 卡片背景色
    cardBgColor: {
      type: String,
      default: '#fff'
    },
    // 卡片拖拽方向
    dragDirection: {
      type: String,
      default: 'all' // all,vertical,horizontal
    },
    // 卡片的圆角弧度
    borderRadius: {
      type: Number,
      default: 10
    },
    // 卡片触发飞卡效果的距离
    throwTriggerDistance: {
      type: Number,
      default: 100
    },
    // 飞卡的移动距离
    throwDistance: {
      type: Number,
      default: 1000
    },
    // 是否开启卡片描边效果
    hasBorder: {
      type: Boolean,
      default: false
    },
    // 是否开启阴影效果
    hasShadow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isAnimating: false
    }
  },
  computed: {},
  watch: {},
  mounted() {
    console.log(this.imgList, 'imgList---++')
  },
  methods: {
    formatCardStyle(index, len) {
      const result = {
        'border-radius': this.borderRadius + 'px',
        backgroundColor: this.cardBgColor
      }
      if (index > 0) {
        result.width = this.cardWidth - this.leftPad * index * 2 + 'px'
        result.height = this.cardHeight - this.topPad * index * 2 + 'px'
        result.left = this.leftPad + 'px'
        result.top = this.topPad * index * 3 + 'px'
        result.zIndex = (len + 10) - index
      } else {
        result.left = 0
        result.top = 0
        result.width = this.cardWidth + 'px'
        result.height = this.cardHeight + 'px'
        result.zIndex = len + 10
      }
      return result
    }
  }
}
</script>
<style lang="scss" scoped>
.dragCard {
  width: 100%;
  height: 100%;
  position: relative;
  .drag-card-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .drag-card-wrap-li {
      position: absolute;
      overflow: hidden;
      .drag-card-wrap-li-img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.boderEffect {
        border: 1px solid #ccc;
      }
      &.shadowEffect {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
      }
      &.animation {
        transition: opacity 0.4s ease-out,
        left 0.4s ease-out,
        top 0.4s ease-out,
        width 0.4s ease-out,
        height 0.4s ease-out;
      }
    }
  }
}
</style>
