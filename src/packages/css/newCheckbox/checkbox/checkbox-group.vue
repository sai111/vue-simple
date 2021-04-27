<script>
import Emitter from './emitter'

export default {
  name: 'ElCheckboxGroup',

  componentName: 'ElCheckboxGroup',

  mixins: [Emitter],

  inject: {
    elFormItem: {
      default: ''
    }
  },

  props: {
    value: {
      type: Object,
      default: function() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    },
    size: {
      type: String,
      default: 'mini'
    },
    fill: {
      type: String,
      default: undefined
    },
    textColor: {
      type: String,
      default: '#000'
    }
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize
    },
    checkboxGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size
    }
  },

  watch: {
    value(value) {
      this.dispatch('ElFormItem', 'el.form.change', [value])
    }
  }
}
</script>

<template>
  <div class="el-checkbox-group" role="group" aria-label="checkbox-group">
    <slot />
  </div>
</template>
