<template>
  <div class="animate">
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height:100%"
      @select="(val) => $emit('handleSelect', val)"
    >
      <el-submenu
        v-for="(item1, index1) in menuList"
        :key="'submenu-li-'+index1"
        :index="item1.value"
      >
        <template slot="title">
          <i class="el-icon-location" />
          <span>{{ item1.label }}</span>
        </template>
        <template v-if="item1.children && item1.children.length>0">
          <el-menu-item
            v-for="(item2, index2) in item1.children"
            :key="'menu-item-li-'+index2"
            :index="item2.value"
          >
            {{ item2.label }}
          </el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import config from './config.js'
export default {
  name: 'AnimateMenu',
  props: {},
  data() {
    return {
      menuList: config.menuList
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.animate {
  width: 100%;
  height: 100%;
}
</style>
