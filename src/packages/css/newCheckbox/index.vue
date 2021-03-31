<template>
  <div class="custom-checkbox">
    {{ model }}
    <label
      class="check-radio"
      :class="[{ 'is-checked': isChecked }]"
      role="radio"
      :aria-checked="isChecked"
    >
      <div
        class="check-radio-input"
        :class="[{ 'is-checked': isChecked }]"
      >
        <div class="check-radio-inner" />
        <input
          ref="radio"
          v-model="model"
          type="radio"
          aria-hidden="false"
          class="check-radio-origin"
          :value="label"
          :name="name"
          tabindex="-1"
          @change="handleChange"
          @focus="focus = true"
          @blur="focus = false"
        >
      </div>
      <div class="check-radio-wrap">
        测试
      </div>
    </label>
  </div>
</template>
<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    label: {
      type: Object,
      default: () => {}
    },
    checked: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    },
    trueLabel: {
      type: [String, Number],
      default: () => ''
    },
    falseLabel: {
      type: [String, Number],
      default: () => ''
    }
  },
  data() {
    return {
      selfModel: false,
      // focus: false,
      // model: '',
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
  computed: {
    model: {
      get() {
        const tmp = this.isGroup ? this.store : this.value !== undefined
          ? this.value : this.selfModel
        return tmp
      },
      set(val) {
        this.$emit('input', val)
        if (!this.isGroup) {
          this.selfModel = val
        }
      }
    },
    isChecked() {
      let result
      if ({}.toString.call(this.model) === '[object Boolean]') {
        result = this.model
      } else if (this.model !== null && this.model !== undefined) {
        result = this.model === this.trueLabel
      } else if (Array.isArray(this.model)) {
        result = this.model.indexOf(this.label) > -1
      }
      return result
    },
    // isGroup() {
    //  let parent = this.$parent
    //  while (parent) {
    //    if (parent.$options.componentName !== 'CheckGroup') {
    //      parent = parent.$parent
    //    } else {
    //      this._checkboxGroup = parent
    //      return true
    //    }
    //  }
    //  return false
    // },
    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value
    }
  },
  watch: {},
  created() {
    this.checked && this.addToStore()
  },
  mounted() {},
  methods: {
    handleChange(e) {
      let value
      if (e.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel
      }
      this.$emit('change', value, e)
    },
    addToStore() {
      this.model = this.trueLabel || true
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-checkbox {
  width: 100%;
  height: 100%;
  .check-radio {
    display: flex;
    .check-radio-input {
      margin: 3px 5px 0 0;
      width: 14px;
      height: 14px;
      position: relative;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      position: relative;
      vertical-align: middle;
      .check-radio-origin {
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
      }
      .check-radio-inner {
        border: 1px solid #dcdfe6;
        border-radius: 100%;
        width: 14px;
        height: 14px;
        background-color: #fff;
        position: relative;
        cursor: pointer;
        display: inline-block;
        box-sizing: border-box;
        &:after {
          width: 4px;
          height: 4px;
          border-radius: 100%;
          background-color: #fff;
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.15s ease-in;
        }
      }
    }
    .check-radio-wrap {
      width: calc(100% - 40px);
      word-break: break-all;
      word-wrap: break-word;
    }
    &.is-active {
      .check-radio-input {
        .check-radio-inner {
          border-color: #409eff;
          background: #409eff;
          &::after {
            content: '';
            box-sizing: content-box;
            border: 1px solid #409eff;
            border-left: 0;
            border-top: 0;
            height: 7px;
            left: 4px;
            position: absolute;
            top: 1px;
            width: 3px;
            transform: rotate(45deg) scale(0);
            transition: transform 0.15s ease-in 0.05s;
            transform-origin: center;
            //transform: translate(-50%,-50%) scale(1);
          }
        }
      }
    }
  }
}
</style>
