<template>
  <div class="invade">
    <div
      v-for="(item, index) in dataList"
      :key="'invade-li-' + index"
      class="invade-li"
    >
      <circle-shape v-if="item.type<1" />
      <pentagon-shape v-if="item.type>0" />
    </div>
  </div>
</template>
<script>
import CircleShape from './component/circle.vue'
import PentagonShape from './component/pentagon.vue'
export default {
  name: 'Invade',
  components: { CircleShape, PentagonShape },
  props: {},
  data() {
    return {
      sideNum: 5,
      fiveRad: Math.PI * 2 / 5,
      dataList: [
        { label: '入侵', value: Math.random() * 10000, type: 0 },
        { label: '捕获', value: Math.random() * 10000, type: 1 }
      ]
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.invade {
  width: 100%;
  height: 100%;
  display: flex;
  .invade-li {
    width: 250px;
    height: 250px;
    overflow: hidden;
    position: relative;
  }
}
</style>
