<template>
  <div class="svg-editor">
    <div class="svg-editor-tool">
      <section>
        <h2>创建</h2>
        <form class="create-shape">
          <button
            v-for="(item, key, index) in shapeInfo"
            :key="'button-li-' + index"
            type="button"
            :create="key"
            @click="createShape(item, key)"
          >
            {{ key }}
          </button>
        </form>
      </section>
      <section>
        <h2>形状</h2>
        <form class="shape-attr">请先创建图形</form>
      </section>
      <section>
        <h2>外观和变换</h2>
        <form class="look-transform" disabled="disabled">
          <p>
            <label style="display: inline">填充</label>
            <input id="fill" type="color" value="#fff">
          </p>
          <p>
            <label style="display: inline">描边</label>
            <input id="stroke" type="color" value="#ff0000">
            <input id="strokeWidth" type="range" value="1">
          </p>
        </form>
      </section>
    </div>
    <div class="svg-editor-canvas">
      <!--<svg
        ref="svg-editor"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        preserveAspectRetio="xMidYMid meet"
        width="100%"
        height="100%"
        x="0%"
        y="0%"
      >-->
      <svg-shape :a="21331312" />
      <!--</svg>-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'SvgEditor',
  components: {
    SvgShape: {
      render: function(h) {
        console.log(this)
        return h('div', this.a)
      },
      props: {
        a: Number
      }
    }
  },
  props: {},
  data() {
    return {
      svg: null,
      selected: null,
      svgNS: 'http://www.w3.org/2000/svg',
      shapeInfo: {
        rect: {
          x: 10,
          y: 10,
          width: 200,
          height: 100
        },
        circle: {
          cx: 200,
          cy: 200,
          r: 50
        },
        ellipse: {
          cx: 200,
          cy: 200,
          rx: 80,
          ry: 30
        },
        line: {
          x1: 10,
          y1: 10,
          x2: 100,
          y2: 200
        }
      },
      defaultAttrs: {
        fill: '#fff',
        stroke: '#ff0000'
      },
      width: 1000,
      height: 960,
      selectInfo: null,
      selectShape: 'path'
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    createShape(item, key) {
      this.selectShape = key
      this.selectInfo = item
    }
  }
}
</script>
<style lang="scss">
@import './style/index.scss';
</style>
