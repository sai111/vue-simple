<template>
  <div class="dragCard-entry">
    dragCard组件
    <dragCard v-bind="cardConfig" />
  </div>
</template>
<script>
import dragCard from './index.vue'
export default {
  name: 'DragCardEntry',
  components: { dragCard },
  data() {
    return {
      cardConfig: {
        imgList: [
          require('./imgs/advertise.png'),
          require('./imgs/promotion.png'),
          require('./imgs/advertising.png'),
          require('./imgs/agent_platform.png'),
          require('./imgs/configuration.png'),
          require('./imgs/payment_platform.png'),
          require('./imgs/technical.png'),
          require('./imgs/running_platform.png')
        ],
        cardWidth: 300,
        cardHeight: 300,
        throwTriggerDistance: 100,
        hasShadow: true
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.dragCard-entry {
  width: 100%;
  height: 100%;
}
</style>
