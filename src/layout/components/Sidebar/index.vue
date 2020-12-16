<template>
  <div>
    <el-menu
      :default-active="activeMenu"
      :text-color="variables.menuText"
      :unique-opened="false"
      :collapse-transition="false"
      mode="horizontal"
    >
      <sidebar-item
        v-for="route in menus"
        :key="'menu' + route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  name: 'Sidebar',
  components: { SidebarItem },
  data() {
    return {
      menus: this.$router.options.routes
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    variables() {
      return variables
    }
  },
  mounted() {}
}
</script>
