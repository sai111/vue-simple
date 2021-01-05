<!-- 原生文件上传说明文档 -->
### 文件上传

```
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
}

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
  }
```


实际运用 dom-to-image

```
import domtoimage from 'dom-to-image'
downDomImage() {
  return new Promise((resolve, reject) => {
    const tmpArr = []
    const tmpFunc = []
    for(let i = 0; i < this.data.length; i++) {
      const row = this.data[i]
      const personEle = document.getElementsByClassName('dom-li-'+ row.id)[0]
      const tmp = new Promise((resolve) => {
        domtoimage.toPng(personEle).then((tmpSrc) => {
          this.saveImg(tmpSrc).then((res) => {
            tmpArr.push({
              id: row.id,
              fileId: res.fileId
            })
            resolve()
          }).catch(() => {
            resolve()
          })
        })
      })
      tmpFunc.push(tmp)
    }
    Promise.all(tmpFunc).then((res) => {
      resolve({ domImages: tmpArr })
    })
  })
}

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
}

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
  }
```
