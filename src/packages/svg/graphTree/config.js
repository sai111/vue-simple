/** graphTree配置项 */

// this.dataList.splice(0, this.dataList.length, ...data)
// let length1 = 0
// let length2 = 0
// for (const i of this.dataList) {
//  if (i.children) {
//    for (let index = 0; index < i.children.length; index++) {
//      const j = i.children[index]
//      j.length = length2
//      length2 += Math.max(1, (j.children && j.children.length) || 0)
//      if (j.children) {
//        for (const k of j.children) k.length = length1
//        length1 += j.children.length
//      }
//    }
//  }
// }
// this.formatData(data)
