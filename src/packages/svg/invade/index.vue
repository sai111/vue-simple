<template>
  <div class="invade">
    <div
      v-for="(item, index) in dataList"
      :key="'invade-li-' + index"
      class="invade-li"
    >
      <components
        v-if="item.show"
        :is="item.component"
        :width="item.width"
        :height="item.height"
        :color="item.color"
        :color-arr="item.colorArr"
        :path="item.path"
        :path2="item.path2"
        :radius="item.radius"
      />
    </div>
  </div>
</template>
<script>
import config from './config.js'
export default {
  name: 'Invade',
  components: config.comps,
  props: {},
  data() {
    return {
      dataList: config.list
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
// fill: nth(#F5F5F5 #FFCD00 #FF8356 #F54D42 #FF5C5C, $m);
.invade {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  background:#061c33;
  .invade-li {
    width: 250px;
    height: 250px;
    overflow: hidden;
    position: relative;
    border: 1px solid red;
  }
}
</style>
