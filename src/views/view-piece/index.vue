<template>
  <div ref="piece-main" class="view-piece">
    123
    <!-- <router-view /> -->
  </div>
</template>
<script>
export default {
  name: 'ViewPiece',
  data() {
    return {
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(to, from, '1111')
    }
  },
  mounted() {
    if (this.$route.query && Object.keys(this.$route.query).length > 0) {
      console.log(this.$router.options.routes, '11111', this.$route)
      this.$router.push({ path: '/viewPiece/' + this.$route.query.en })
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.view-piece {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #000;
  transition: all 1s;
  position: relative;
  &-tool {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    &-icon {
      font-size: 24px;
      padding-right: 5px;
      cursor: pointer;
    }
  }
  &-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
