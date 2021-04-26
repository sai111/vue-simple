<template>
  <div class="category-list">
    <div class="category-list-item">
      <div class="category-button" @click="$emit('categoryClick', item)">
        {{ item.category_code }}
      </div>
      <div class="category-list-group">
        <i class="el-icon-edit" @click="editCategory('update', item)" />
        <i class="el-icon-delete" @click="deleteCategory('delete', item)" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    editCategory(item) {
      this.$emit('cateEdit', this.item)
    },
    deleteCategory(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({ message: '删除成功', type: 'success' })
        this.$http({
          method: 'post',
          url: '/api/category/delete',
          data: { _id: item._id }
        }).then(() => {
          // this.getList()
        })
      }).catch(() => {
        this.$message('已取消删除')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.category-list {
  height: 36px;
  pointer-events: auto;
  overflow: hidden;
  transition: height 0.2s;
  cursor: pointer;
  &-item {
    width: 100%;
    .category-button {
      width: 100%;
      white-space: nowrap;
      cursor: pointer;
      color: #000;
      text-align: center;
      box-sizing: border-box;
      transition: .1s;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &:hover {
    height: 72px;
    .category-list-group {
      opacity: 1;
    }
  }
  .category-list-group {
    width: 100%;
    height: 28px;
    line-height: 28px;
    text-align: center;
    margin: 0 auto;
    opacity: 0;
    transition: opacity 0.5s;
    i {
      padding-right: 10px;
    }
  }
}
</style>
