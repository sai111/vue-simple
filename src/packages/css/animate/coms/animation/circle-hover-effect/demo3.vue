<template>
  <div>
    <section class="main">
      <ul class="ch-grid">
        <li v-for="(item, index) in list" :key="'ch-grid-li-' + index">
          <div class="ch-item">
            <div class="ch-info">
              <h3>{{ item.label }}</h3>
              <p>{{ item.des }}</p>
            </div>
            <div class="ch-thumb" :class="'ch-item-li-' + index" />
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Demo3',
  components: {},
  props: {},
  data() {
    return {
      list: [
        {
          label: 'Brainiac',
          des: '开发者详情'
        },
        {
          label: 'Vision',
          des: '开发者详情'
        },
        {
          label: 'Cylon',
          des: '开发者详情'
        }
      ]
    }
  },
  mounted() {},
  methods: {}
}
</script>
<style scoped lang="scss">
@import '../style/common.css';
.ch-item-li-0 {
  background-image: url(../style/imgs/7.jpg);
}
.ch-item-li-1 {
  background-image: url(../style/imgs/8.jpg);
}
.ch-item-li-2 {
  background-image: url(../style/imgs/9.jpg);
}
.ch-item {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  cursor: default;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}
.ch-thumb {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  box-shadow: inset 0 0 0 15px rgba(255, 255, 255, 0.5);
  -webkit-transform-origin: 95% 40%;
  -moz-transform-origin: 95% 40%;
  -o-transform-origin: 95% 40%;
  -ms-transform-origin: 95% 40%;
  transform-origin: 95% 40%;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.ch-thumb:after {
  content: '';
  width: 8px;
  height: 8px;
  position: absolute;
  border-radius: 50%;
  top: 40%;
  left: 95%;
  margin: -4px 0 0 -4px;
  background: rgb(14, 14, 14);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(14, 14, 14, 1) 0%,
    rgba(125, 126, 125, 1) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(14, 14, 14, 1)),
    color-stop(100%, rgba(125, 126, 125, 1))
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(14, 14, 14, 1) 0%,
    rgba(125, 126, 125, 1) 100%
  );
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(14, 14, 14, 1) 0%,
    rgba(125, 126, 125, 1) 100%
  );
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    rgba(14, 14, 14, 1) 0%,
    rgba(125, 126, 125, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(14, 14, 14, 1) 0%,
    rgba(125, 126, 125, 1) 100%
  );
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
}

.ch-info {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background: #c9512e url(../style/imgs/noise.png);
  box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
}

.ch-info h3 {
  color: #fff;
  text-transform: uppercase;
  position: relative;
  letter-spacing: 2px;
  font-size: 18px;
  margin: 0 60px;
  padding: 22px 0 0 0;
  height: 85px;
  font-family: 'Open Sans', Arial, sans-serif;
  text-shadow: 0 0 1px #fff, 0 1px 2px rgba(0, 0, 0, 0.3);
}

.ch-info p {
  color: #fff;
  padding: 10px 5px;
  font-style: italic;
  margin: 0 30px;
  font-size: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.5);
}

.ch-info p a {
  display: block;
  color: #333;
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  color: #fff;
  font-style: normal;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 1px;
  padding-top: 24px;
  margin: 7px auto 0;
  font-family: 'Open Sans', Arial, sans-serif;
  opacity: 0;
  transition: transform 0.3s ease-in-out 0.2s, opacity 0.3s ease-in-out 0.2s,
    background 0.2s linear 0s;
  transform: translateX(60px) rotate(90deg);
}

.ch-info p a:hover {
  background: rgba(255, 255, 255, 0.5);
}
.ch-item:hover .ch-thumb {
  box-shadow: inset 0 0 0 15px rgba(255, 255, 255, 0.5), 0 1px 3px rgba(0, 0, 0, 0.2);
  transform: rotate(-110deg);
}
.ch-item:hover .ch-info p a {
  opacity: 1;
  transform: translateX(0px) rotate(0deg);
}
</style>
