<template>
  <div class="tab-wrap" style="overflow:hidde;">
    <el-scrollbar class="custom-el-scroll custom-el-scroll-components">
      <el-button @click="goNext"> 跳转到角色管理tab </el-button>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户管理" name="first">
          <div class="role-tab">
            <div class="role-hold">
              测试测绘舍此啊 hi
            </div>
            <div id="role-first">
              <div v-for="(item, index) in 30" :key="'list-li-' + index" class="role-list-li">
                test + {{ index }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">
          <div class="role-tab">
            <div id="role-third">
              <div v-for="(item, index) in 30" :key="'list-li-' + index" class="role-list-li">
                test + {{ index }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: 'CommonTab',
  components: {},
  props: {},
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted() {},
  methods: {
    goNext() {
      this.activeName = 'first'
      const dbom = document.querySelector('.tab-wrap .custom-el-scroll .el-scrollbar__wrap')
      const target = document.getElementById('role-first').offsetTop
      dbom.scrollTop = target
      console.log(dbom, 'dbom--->>>>', target)
    }
  }
}
</script>
<style scoped lang="scss">
.role-tab {
  width: 100%;
  height: 100%;
}
.role-hold {
  width: 100%;
  height: 100px;
  border: 1px solid red;
}
  ::v-deep .custom-el-scroll.el-scrollbar {
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
      .el-scrollbar__view{
        width: 100%;
      }
    }
  }
</style>
