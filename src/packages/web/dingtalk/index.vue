<template>
  <div v-loading="loading" class="dingtalk">
    <div id="login-container" />
  </div>
</template>
<script>
export default {
  name: 'Dingtalk',
  components: {},
  props: {},
  data() {
    return {
      loading: true,
      appid: 'dingoa1qzpp6zazbfqbc8y', // 扫描授权ID
      redirect_url: 'https://ding-doc.dingtalk.com/', // 设置重定向地址
      config: {}
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.initSrc()
    this.initConfig()
  },
  methods: {
    initSrc() {
      this.loading = true
      const oScript = document.createElement('script')
      oScript.type = 'text/javascript'
      oScript.src = 'https://g.alicdn.com/dingding/dinglogin/0.0.5/ddLogin.js'
      document.body.appendChild(oScript)
      setTimeout(() => {
        this.initConfig()
      }, 10 * 1000)
    },
    initConfig() {
      const textUrl = 'https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid='
      const params = '&response_type=code&scope=snsapi_login&state=STATE&redirect_uri='
      const url = textUrl + this.appid + params + this.redirect_url
      if (url && encodeURIComponent(url)) {
        DDLogin({
          id: 'login-container',
          goto: encodeURIComponent(url),
          style: 'border:none;background-color:#FFFFFF;',
          width: '365',
          height: '400'
        })
        this.loading = false
        var getCode = function(event) {
          var origin = event.origin
          if (origin === 'https://login.dingtalk.com') {
            const tmpCode = event.data
            if (tmpCode && url) {
              window.location.href = url + `&loginTmpCode=${tmpCode}`
            }
          }
        }
        if (typeof window.addEventListener !== 'undefined') {
          window.addEventListener('message', getCode, false)
        } else if (typeof window.attachEvent !== 'undefined') {
          window.attachEvent('onmessage', getCode)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.dingtalk {
  width: 100%;
  height: 100%;
  #login-container {
    display: flex;
    justify-content: center;
  }
}
</style>
