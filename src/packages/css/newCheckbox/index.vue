<template>
  <div class="check-wrap">
    <rh-checkbox-group v-model="checkList">
      <rh-checkbox
        label="复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A复选框 A"
        @change="setCheckList"
      />
      <rh-checkbox label="复选框 B" @change="setCheckList" />
      <rh-checkbox label="复选框 C" @change="setCheckList" />
      <rh-checkbox label="禁用" @change="setCheckList" />
      <rh-checkbox label="选中且禁用" @change="setCheckList" />
    </rh-checkbox-group>
  </div>
</template>

<script>
import RhCheckboxGroup from './checkbox/checkbox-group.vue'
import RhCheckbox from './checkbox/checkbox.vue'
export default {
  components: {
    RhCheckboxGroup,
    RhCheckbox
  },
  data() {
    return {
      checkList: []
    }
  },
  methods: {
    setCheckList(val, { target }) {
      const { defaultValue } = target
      console.log(target, 'target', val, defaultValue)
      if (val) {
        this.checkList = [defaultValue]
      } else {
        this.checkList = []
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.check-wrap {
  width: 200px;
  margin: 0 auto;
}
</style>
