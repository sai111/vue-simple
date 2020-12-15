<template>
  <div
    class="digitscroll"
    :class="'digitscroll-wrap-'+timeScopd"
    :style="style"
  >
    <span class="digitscroll-prefix">
      {{ prefix.unit }}
    </span>
    <digit
      ref="digitscroll"
      :digit-num="String(num)"
      :digit-style="digitStyle"
      :digit-animation="animation"
      class="digitscroll-value"
    />
    <span class="digitscroll-suffix">
      {{ suffix.unit }}
    </span>
  </div>
</template>
<script>
import { digitConfig } from './config.js'
import Digit from './components/digit.vue'
export default {
  name: 'Digitscroll',
  components: { Digit },
  props: digitConfig,
  data() {
    return {
      timeScopd: (new Date()).getTime(),
      style: null
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.formatStyle()
  },
  methods: {
    formatStyle() {
      this.style = `
                .${'digitscroll-wrap-' + this.timeScopd} {
                    --digitscroll-box-width: ${this.width}px;
                    --digitscroll-box-height: ${this.height}px;
                    --digitscroll-prefix-color: ${this.prefix.color};
                    --digitscroll-suffix-color: ${this.suffix.color};
                    --digitscroll-suffix-fontSize: ${this.suffix.fontSize}px;
                    --digitscroll-prefix-fontSize: ${this.prefix.fontSize}px;
                    --digitscroll-sum-fontSize: ${this.digitStyle.size}px;
                }
            `
      this.$nextTick(() => {
        this.$refs.digitscroll.reset()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@font-face {
    font-family: "ds-digital";
    src: url("./assets/DS-DIGIB.TTF")format("truetype");
}
.digitscroll {
    display: flex;
    width: var(--digitscroll-box-width);
    height: var(--digitscroll-box-height);
    &-prefix {
        line-height: var(--digitscroll-box-height);
        color: var(--digitscroll-prefix-color);
        font-size: var(--digitscroll-prefix-fontSize);
    }
    &-value {
        font-family: "ds-digital";
    }
    &-suffix {
        line-height: var(--digitscroll-box-height);
        display: inline-block;
        color: var(--digitscroll-suffix-color);
        font-size: var(--digitscroll-suffix-fontSize);
    }
}
</style>
