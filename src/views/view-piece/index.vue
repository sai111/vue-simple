<template>
  <div ref="piece-main" class="view-piece">
    <div class="piece-tool">
      <div
        v-for="(button, bIndex) in buttons"
        :key="'piece-tool-'+bIndex"
        :title="button.name"
        class="piece-tool-icon"
        @click="operateClick(button)"
      >
        <i :title="button.name" :class="button.icon" />
      </div>
    </div>
    <div
      ref="piece-comp"
      class="view-piece-wrap"
    >
      <router-view />
    </div>
    <!-- 展示截图内容 -->
    <el-dialog
      class="view-piece-dialog"
      width="500px"
      :title="pieceTip"
      :visible.sync="pieceDialog"
      :close-on-click-modal="false"
    >
      <img :src="screenScr" alt="" style="height:300px;width:100%;">
      <div style="width:100%;display:flex;justify-content:flex-end;">
        <el-button class="md-raised" @click="closeDialog()">关闭</el-button>
        <el-button class="md-raised" @click="saveScreen()">保存</el-button>
      </div>
    </el-dialog>
    <!-- 文档和配置 -->
    <el-drawer
      :title="drawerTitle"
      :visible.sync="drawerFlag"
      :with-header="false"
    >
      <span>{{ drawerTitle }}!</span>
    </el-drawer>
  </div>
</template>
<script>
import domtoimage from 'dom-to-image'
export default {
  name: 'ViewPiece',
  data() {
    return {
      buttons: [
        { code: 'screenshot', icon: 'el-icon-camera', name: '截图' },
        { code: 'config', icon: 'el-icon-setting', name: '配置' },
        { code: 'markdown', icon: 'el-icon-document', name: '文档' },
        { code: 'close', icon: 'el-icon-close', name: '关闭' }
      ],
      screenScr: null,
      pieceDialog: false,
      pieceTip: '',
      drawerFlag: false,
      drawerTitle: ''
    }
  },
  mounted() {},
  methods: {
    // 工具操作
    operateClick(item) {
      switch (item.code) {
        case 'screenshot':
          this.screenShot(item)
          break
        case 'config':
          this.formatConfig(item)
          break
        case 'markdown':
          this.openMarkdown(item)
          break
        case 'close':
          this.closePiece(item)
          break
      }
    },
    screenShot() {
      const screenEle = this.$refs['piece-comp']
      this.pieceDialog = true
      // 优先使用domtoimage截图
      domtoimage.toPng(screenEle).then((res) => {
        this.screenScr = res
        // this.saveImg(res).then(() => {
        //   console.log(1111)
        // })
      }).catch(() => {
        // domtoimage截图失败使用html2canvas
        // html2canvas(screenEle, {
        //   foreignObjectRendering: false,
        //   logging: false,
        //   allowTaint: false,
        //   imageTimeout: 5000,
        //   useCORS: true,
        //   width: screenEle.getBoundingClientRect().width,
        //   height: screenEle.getBoundingClientRect().height,
        //   scale: window.devicePixelRatio || 1
        // }).then((res) => {
        //   this.screenScr = res.toDataURL('image/png')
        // })
      })
    },
    saveImg(imgUrl) {
      const formData = new FormData()
      formData.append('file', this.dataURLToFile(imgUrl))
      return new Promise((resolve, reject) => {
        const xml = new XMLHttpRequest()
        xml.open('post', '/file')
        xml.setRequestHeader('Authorization', 'Bearer' + 12)
        xml.send(formData)
        xml.onreadystatechange = () => {
          if (xml.readyState === 4) {
            resolve(JSON.parse(xml.response).data)
          }
        }
      })
    },
    // 将图片转成文件流
    dataURLToFile(dataUrl) {
      const arr = dataUrl.split(',')
      const mine = arr[0].match(/:(.*?);/)[1]
      const suffix = mine.split('/')[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], `file.${suffix}`, { type: mine })
    },
    formatConfig(item) {
      this.drawerTitle = item.name
      this.drawerFlag = !this.drawerFlag
    },
    openMarkdown(item) {
      this.drawerTitle = item.name
      this.drawerFlag = !this.drawerFlag
    },
    closePiece() {
      this.$router.replace('/')
    },
    saveScreen() {},
    closeDialog() {
      this.pieceDialog = false
    }
  }
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
  .piece-tool {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    z-index: 100;
    .piece-tool-icon {
      font-size: 24px;
      padding-right: 5px;
      cursor: pointer;
    }
  }
  .view-piece-wrap {
    width: 100%;
    height: 100%;
  }
}
</style>
