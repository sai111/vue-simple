<template>
  <div class="triangle">
    <section>
      <div class="trianle-label">{{ direction }}</div>
      <div class="trianle-shape" :style="formatStyle()" />
    </section>
  </div>
</template>
<script>
export default {
  name: 'Triangle',
  props: {
    direction: {
      type: String,
      default: 'up'
    },
    width: {
      type: [Number, String],
      default: 50
    }
  },
  data() {
    return {
      triangleStyle: '',
      shapeList: {
        up: {
          borderLeft: false,
          borderRight: false,
          borderBottom: true
        },
        down: {
          borderLeft: false,
          borderRight: false,
          borderTop: true
        },
        left: {
          borderTop: false,
          borderBottom: false,
          borderRight: true
        },
        right: {
          borderTop: false,
          borderBottom: false,
          borderLeft: true
        },
        topLeft: {
          borderRight: false,
          borderTop: true
        },
        topRight: {
          borderLeft: false,
          borderTop: true
        },
        bottomLeft: {
          borderRight: false,
          borderBottom: true
        },
        bottomRight: {
          borderLeft: false,
          borderBottom: true
        }
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    formatStyle() {
      const param = {}
      const shapeObj = this.shapeList[this.direction]
      for (const k in shapeObj) {
        // if (shapeObj.hasOwnProperty(k)) {
        //   param[k] = `${this.width}px solid ${shapeObj[k] ? 'red' : 'transparent'}`
        // }
        param[k] = `${this.width}px solid ${shapeObj[k] ? 'red' : 'transparent'}`
      }
      return param
    }
  }
}
</script>
<style lang="scss" scoped>
.triangle {
    width: 20%;
    font-size: 20px;
    font-weight: bolder;
    border-bottom: 1px solid skyblue;
    box-sizing: border-box;
    section {
     width: 100%;
     font-size: 20px;
     margin-top: 20px;
     box-sizing: border-box;
     .trianle-label {
         font-weight: bold;
         font-size: 16px;
     }
     .trianle-shape {
         width: 0;
         height: 0;
         box-sizing: border-box;
     }
    }
}
</style>
