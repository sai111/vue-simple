<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="dashboard-container-left">
      <aside-button
        :home-label="homeLabel"
        :category-list="categoryList"
        @addCategory="addCategory"
        @editCate="editCate"
        @categoryClick="categoryClick"
      />
    </div>
    <div class="dashboard-container-right">
      <piece-list
        :piece-type="pieceType"
        :list="pieceList"
        @pieceSuccess="pieceSuccess"
      />
    </div>
    <!-- 弹窗 -->
    <category-add
      ref="home-category-dialog"
      :is-add="isAdd"
      @cateAddSuccess="getList"
    />
  </div>
</template>
<script>
import AsideButton from './components/aside-button.vue'
import PieceList from './components/piece-list.vue'
import CategoryAdd from './components/category-add.vue'
export default {
  name: 'Dashboard',
  components: {
    AsideButton,
    PieceList,
    CategoryAdd
  },
  data() {
    return {
      loading: false,
      homeLabel: '分类',
      isAdd: false,
      pieceType: '',
      categoryList: [],
      pieceList: []
    }
  },
  created() {},
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.$http({
        method: 'get',
        url: '/api/category/list'
      }).then((res) => {
        this.categoryList = res.data.data
        if (res.data.data && res.data.data.length > 0) {
          this.pieceType = res.data.data[0].category_code
          this.getPiece(res.data.data[0].category_code)
        }
      })
    },
    getPiece(item) {
      this.loading = true
      this.pieceList = []
      this.$http({
        method: 'get',
        url: '/api/collect/list',
        params: { category_code: item }
      }).then((res) => {
        this.loading = false
        this.pieceList = res.data.data
      }).catch(() => {
        this.loading = false
      })
    },
    categoryClick(item) {
      this.pieceType = item.category_code
      this.getPiece(item.category_code)
    },
    pieceSuccess() {
      this.getPiece(this.pieceType)
    },
    // 新增
    addCategory() {
      this.isAdd = true
      const addForm = {
        category: '',
        category_desc: '',
        category_code: '',
        tag: ''
      }
      this.$refs['home-category-dialog'].activateForm('创建一个合集', addForm)
    },
    editCate(obj) {
      this.isAdd = false
      const addForm = {
        category: obj.category,
        category_desc: obj.category_desc,
        category_code: obj.category_code,
        tag: obj.tag,
        _id: obj._id
      }
      this.$refs['home-category-dialog'].activateForm(`修改${obj.category_code || 'css'}合集`, addForm)
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100%;
  display: flex;
  .dashboard-container-left {
    height: 100%;
    width: 240px;
  }
  .dashboard-container-right {
    height: 100%;
    margin: 30px;
  }
}
</style>
