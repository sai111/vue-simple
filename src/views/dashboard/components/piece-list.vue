<template>
  <div class="md-layout home-piece-list">
    <div class="home-piece-list-block md-layout-item">
      <div class="piece-content" @click="addDialog({}, true)">
        <div class="piece-content-add">+</div>
      </div>
    </div>
    <div
      v-for="(item, index) in list"
      :key="'piece-li-'+index"
      class="home-piece-list-block"
      @click="openPiece(item, index)"
    >
      <div class="piece-content">
        <div class="piece-btn">
          <i class="el-icon-edit" @click.stop="addDialog(item, false)" />
          <i class="el-icon-delete" @click.stop="deletePiece(item)" />
        </div>
        <div class="piece-content-title">
          {{ item.title || item.name }}
        </div>
        <div class="piece-content-des">
          {{ item.desc }}
        </div>
      </div>
    </div>
    <home-piece-add
      ref="piece-add-dialog"
      :is-add="isAdd"
      @cateAddSuccess="cateAddSuccess"
    />
  </div>
</template>
<script>
import HomePieceAdd from './piece-add.vue'
export default {
  name: 'PieceList',
  components: { HomePieceAdd },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    pieceType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isAdd: null
    }
  },
  mounted() {},
  methods: {
    cateAddSuccess() {
      this.$emit('pieceSuccess')
    },
    addDialog(form = {}, flag) {
      let addForm = {
        name: '',
        desc: '',
        tag: '',
        title: '',
        img: '',
        en: ''
      }
      if (!flag) {
        addForm = {
          en: form.en,
          name: form.name,
          desc: form.desc,
          tag: form.tag,
          title: form.title,
          img: form.img,
          _id: form._id,
          category_code: form.category_code
        }
      }
      this.isAdd = flag
      this.$refs['piece-add-dialog'].activateForm(`${flag ? '创建' : '修改'}一个作品`, addForm, this.pieceType)
    },
    openPiece(item) {
      this.$router.push({ path: '/viewPiece/' + item.en })
    },
    deletePiece(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/api/collect/delete',
          data: { _id: item._id }
        }).then((res) => {
          this.$message({ message: '删除成功', type: 'success' })
          this.cateAddSuccess()
        })
      }).catch(() => {
        this.$message('已取消删除')
      })
    }
  }
}
</script>
<style lang="scss">
.home-piece-list {
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-wrap: wrap;
  overflow: auto;
  &-block {
    float: left;
    position: relative;
    width: 250px;
    height: 150px;
    display: inline-block;
    box-sizing: border-box;
    transform-style: preserve-3d;
    perspective: 800px;
    margin: 0 15px 15px 0;
    // &:nth-child(4n + 4) {
    //   margin-right: 0;
    // }
    .piece-content {
      width: 100%;
      height: 100%;
      padding: 10px;
      box-sizing: border-box;
      vertical-align: middle;
      border-radius: 4px;
      border: 1px solid #ebeef5;
      font-size: 18px;
      text-align: left;
      overflow: hidden;
      cursor: pointer;
      backface-visibility: hidden;
      transition: box-shadow 135ms 0ms cubic-bezier(0.4, 0, 0.2, 1), opacity .2s ease;
      .piece-btn {
        text-align: right;
        opacity: 0;
        .el-icon-edit {
          margin-right: 10px;
        }
        .el-icon-right,
        .el-icon-delete {
          cursor: pointer;
        }
      }
      .piece-content-add {
        width: 100%;
        height: 100%;
        font-size: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .piece-content-title {
        width: 100%;
        height: 40%;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
      }
      .piece-content-des {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        text-indent: 6px;
      }
      &:hover {
        box-shadow: 0px 4px 5px 0 rgba(0,0,0,.4);
        .piece-btn {
          opacity: 1;
        }
        .piece-content-title {
          animation: fadeInDown 2s ease-out 0.5s 1 both
          // animation: fadeInDownBig 0.25s ease 0.25s;
          //transform: translate3d(0, -2000px, 0);
          //animation-fill-mode: forwards;
        }
        .piece-content-des {
          animation: fadeInUpBig 2s ease-out 0.5s 1 both
          // animation: fadeInUpBig 0.25s ease 0.25s;
          //-webkit-transform: translate3d(0, 2000px, 0);
          //transform: translate3d(0, 2000px, 0);
          //animation-fill-mode: forwards;
        }
      }
    }
  }
}
@keyframes fadeInDownBig {
  from {
    opacity: 0;
    transform: translate3d(0, -2000px, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeInUpBig {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 2000px, 0);
    transform: translate3d(0, 2000px, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
