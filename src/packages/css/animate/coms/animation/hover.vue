<template>
  <div class="hover-wrap">
    <el-tabs
      v-model="activeName"
      style="width:100%;"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item, index) in list"
        :key="index"
        :name="item.value"
        :label="item.label"
      >
        <components :is="item.value" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Demo1 from './circle-hover-effect/demo1.vue'
import Demo2 from './circle-hover-effect/demo2.vue'
import Demo3 from './circle-hover-effect/demo3.vue'
import Demo4 from './circle-hover-effect/demo4.vue'
import Demo5 from './circle-hover-effect/demo5.vue'
import Demo6 from './circle-hover-effect/demo6.vue'
import Demo7 from './circle-hover-effect/demo7.vue'
export default {
  name: 'CircleHoverEffects',
  components: {
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
    Demo6,
    Demo7
  },
  props: {},
  data() {
    return {
      activeName: 'Demo1',
      list: [
        { label: 'Demo1', value: 'Demo1' },
        { label: 'Demo2', value: 'Demo2' },
        { label: 'Demo3', value: 'Demo3' },
        { label: 'Demo4', value: 'Demo4' },
        { label: 'Demo5', value: 'Demo5' },
        { label: 'Demo6', value: 'Demo6' },
        { label: 'Demo7', value: 'Demo7' }
      ]
    }
  },
  mounted() {},
  methods: {
    handleClick() {}
  }
}
</script>
<style scoped lang="scss">
.hover-wrap {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>
