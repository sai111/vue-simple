<template>
  <div class="breath-light">
    <div class="breath">测试心跳效果</div>
    <div class="heat">
      ❤️
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeartbeatLight',
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
.breath-light {
  width: 100%;
  height: 100%;
  .breath {
    margin: 100px auto;
    width: 400px;
    height: 60px;
    font-size: 28px;
    line-height: 60px;
    text-align: center;
    background: #f35626;
    color: #fff;
    opacity:0.1;
    box-shadow: 0 0 5px #f35626;
    border-radius:2px;
    animation: breath 0.83s ease-in-out infinite;
  }
  .heat {
    text-align: center;
    font-size: 100px;
    filter:drop-shadow(0px 0px 20px rgb(255,20,20));
    animation: breath2 1s infinite;
  }
}

@-webkit-keyframes breath {
  from {
    opacity: 0.5;
    //font-size: 20px;
    //width: 300px;
  }
  50% {
    opacity: 1;
    //font-size: 28px;
    //width: 400px;
  }
  to {
    opacity: 0.5;
    //font-size: 20px;
    //width: 300px;
  }
}

@-webkit-keyframes breath2 {
  from {
    opacity: 1;
    transform: scale(0.8, 0.8);
  }
  50% {
    opacity: 0.8;
    transform: scale(1, 1);
  }
  to {
    opacity: 1;
    transform: scale(0.8, 0.8);
  }
}
</style>
