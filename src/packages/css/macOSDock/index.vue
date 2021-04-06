<template>
  <div class="dock-wrap">
    <div class="dock">
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item }}
      </li>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Dock',
  props: {},
  data() {
    return {
      list: ['😊', '🚗', '🎬', '😯', '😢', '💗']
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.initStart()
  },
  methods: {
    initStart() {
      document.querySelectorAll('.dock li').forEach(li => {
        li.addEventListener('click', e => {
          e.currentTarget.classList.add('loading')
        })
        li.addEventListener('mousemove', e => {
          const item = e.target
          const itemRect = item.getBoundingClientRect()
          const offset = Math.abs(e.clientX - itemRect.left) / itemRect.width
          const prev = item.previousElementSibling || null
          const next = item.nextElementSibling || null
          const scale = 0.6
          resetScale()
          if (prev) {
            prev.style.setProperty('--scale', 1 + scale * Math.abs(offset - 1))
          }
          item.style.setProperty('--scale', 1 + scale)
          if (next) {
            next.style.setProperty('--scale', 1 + scale * offset)
          }
        })
      })
      document.querySelector('.dock').addEventListener('mouseleave', e => {
        resetScale()
      })
      function resetScale() {
        document.querySelectorAll('.dock li').forEach(li => {
          li.style.setProperty('--scale', 1)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dock-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  .dock {
    --scale: 1;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .dock li {
    font-size: calc(6rem * var(--scale));
    padding: 0 0.5rem;
    cursor: default;
    position: relative;
    top: calc((6rem * var(--scale) - 6rem) / 2 * -1);
    transition: 15ms all ease-out;
  }

  .dock li.loading {
    animation: 1s loading ease-in infinite;
  }
}
@keyframes loading {
  0%,
  100% {
    transition: translateY(0px);
  }
  60% {
    transition: translateY(-40px);
  }
}
</style>
