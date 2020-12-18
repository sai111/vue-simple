<template>
  <div class="aside-button">
    <div class="aside-button-icon">
      <el-button
        plain
        icon="el-icon-plus"
        @click="$emit('addCategory')"
      >
        {{ homeLabel }}
      </el-button>
    </div>
    <div class="aside-button-list">
      <list-item
        v-for="(item, index) in categoryList"
        :key="'category-li-'+index"
        :item="item"
        @cateDelete="$emit('deleteCate', item)"
        @cateEdit="$emit('editCate', item)"
        @categoryClick="$emit('categoryClick', item)"
      />
    </div>
  </div>
</template>
<script>
import ListItem from './category-list.vue'
export default {
  name: 'AsideButton',
  components: { ListItem },
  props: {
    categoryList: {
      type: Array,
      default: () => []
    },
    homeLabel: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.aside-button {
  padding-left: 20px;
  width: 100%;
  text-align: center;
  .aside-button-icon {
    margin-top: 30px;
  }
  .aside-button-list {
    margin-top: 30px;
  }
}
</style>
