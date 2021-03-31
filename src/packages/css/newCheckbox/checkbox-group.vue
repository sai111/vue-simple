<template>
  <div
    class="checkbox-group"
    role="group"
    aria-label="checkbox-group"
  >
    <slot />
  </div>
</template>
<script>
export default {
  name: 'CheckboxGroup',
  components: {},
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: [
        {
          id: 1,
          title: '标题',
          label: '测试测试测试测还采伐high爱狗嗨哦胳丷个i啊哈嘎哈嘎'
        },
        {
          id: 2,
          title: '标题33334444555',
          label: '测试测试测试测还采伐high爱狗嗨哦胳丷个i啊哈嘎哈嘎测试测试测试测还采伐high爱狗嗨哦胳丷个i啊哈嘎哈嘎'
        }
      ]
    }
  },
  watch: {
    value(value) {
      console.log(value, 'value--00')
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
</style>
