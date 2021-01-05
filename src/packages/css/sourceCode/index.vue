<template>
  <div class="sourceCode">
    <el-scrollbar class="custom-el-scroll">
      <highlightjs language="html" autdetect :code="beautifyCode" />
    </el-scrollbar>
  </div>
</template>
<script>
import Vue from 'vue'
import highlight from 'highlight.js'
import beautify from 'js-beautify'
import 'highlight.js/styles/tomorrow-night.css'
window.hljs = highlight
Vue.use(highlight.vuePlugin)
export default {
  name: 'SourceCode',
  props: {
    source: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    beautifyCode() {
      return beautify.html(this.source.url)
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.sourceCode {
  width: 80%;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
  background: #202536;
  ::v-deep .custom-el-scroll.el-scrollbar {
    background: transparent;
    height: 100%;
    .el-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
      .el-scrollbar__view{
        width: 100%;
      }
    }
  }
  ::v-deep pre {
    font-size: 14px;
    font-family: inherit;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    code {
      overflow: visible!important;
      background: transparent;
      color: #afbccc;
      .hljs-meta, .hljs-name, .hljs-tag {
        color: #5db0d7!important;
      }
      .hljs-string {
        color: #f19766;
      }
      .hljs-attr {
        color: #9bbbbb;
      }
    }
  }
}
</style>
