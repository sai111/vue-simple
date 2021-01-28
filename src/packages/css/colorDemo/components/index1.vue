<template>
  <div class="g-wrap">
    <div
      v-for="(item, index) in 5"
      :key="'g-container-' + index"
      class="g-margin"
      :class="'g-container-' + item"
    >
      <div v-for="item1 in 10" :key="item1" class="g-box" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'Demo1',
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() { },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.g-wrap {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .g-margin {
    margin: 0 10px;
    width: 100px;
    height: 100px;
  }
  .g-container-1 {
    position: relative;
    $count: 10;
    @for $i from 1 to $count + 1 {
      .g-box:nth-child(#{$i}) {
        --width: #{$i* 10}px;
        width: var(--width);
        height: var(--width);
        margin-left: calc(var(--width) / -2);
        margin-top: calc(var(--width) / -2);
        border: 1px solid #000;
      }
    }
  }
  .g-container-2 {
    position: relative;
    $count: 10;
    @for $i from 1 to $count + 1 {
      .g-box:nth-child(#{$i}) {
        --width: #{$i* 10}px;
        width: var(--width);
        height: var(--width);
        margin-left: calc(var(--width) / -2);
        margin-top: calc(var(--width) / -2);
        border: 1px solid hsla(calc(#{$i * 25}), 50%, 65%, 1);
      }
    }
  }
  .g-container-3 {
    position: relative;
    $count: 10;
    @for $i from 1 to $count + 1 {
      .g-box:nth-child(#{$i}) {
        --width: #{$i* 10}px;
        width: var(--width);
        height: var(--width);
        margin-left: calc(var(--width) / -2);
        margin-top: calc(var(--width) / -2);
        background: hsla(calc(#{$i * 25}), 50%, 65%, 1);
        border: none;
        z-index: #{$count - $i};
      }
    }
  }

  .g-container-4 {
    position: relative;
    $count: 10;
    @for $i from 1 to $count + 1 {
      .g-box:nth-child(#{$i}) {
        --width: #{$i* 10}px;
        width: var(--width);
        height: var(--width);
        margin-left: calc(var(--width) / -2);
        margin-top: calc(var(--width) / -2);
        background: hsla(calc(#{$i * 25}), 50%, 65%, 1);
        border: none;
        z-index: #{$count - $i};
        transform: rotate(#{$i * 7}deg);
      }
    }
  }

  .g-container-5 {
    position: relative;
    $count: 10;
    @for $i from 1 to $count + 1 {
      .g-box:nth-child(#{$i}) {
        --width: #{$i* 10}px;
        width: var(--width);
        height: var(--width);
        margin-left: calc(var(--width) / -2);
        margin-top: calc(var(--width) / -2);
        background-size: calc(100% - (#{i} - 1) * 1%);
        // background: hsla(calc(#{$i * 25}), 50%, 65%, 1);
        border: 1px
          solid
          hsla(calc((100 - #{$i}) * 2.55), calc(#{$i} * 1%), 50%, calc(#{$i} / 100));
        z-index: #{$count - $i};
        transform: rotate(#{$i * 30}deg);
      }
    }
  }
  .g-box {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
