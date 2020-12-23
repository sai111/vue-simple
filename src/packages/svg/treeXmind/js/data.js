
// getData() {
//   getTree().then((res) => {
//     const data = res.data
//     if (data && Object.keys(data).length > 0 && data.children && data.children.length > 0) {
//       data.branch = data.children.length
//       for (const i of data.children) {
//         this.handleLoop(i)
//       }
//       // data.maxChild = Math.max.apply(null, data.children.map(function(o) { return o.total }))
//       // data.minChild = Math.min.apply(null, data.children.map(function(o) { return o.total }))
//       console.log('🚀 ~ file: entry.vue ~ line 95 ~ init ~ data', data)
//     }
//     this.treeData = data
//   })
// },
// initData() {
//   this.treeData.splice(0, this.treeData.length, ...this.tmpData)
//   let len1 = 0
//   let len2 = 0
//   for (const i of this.treeData) {
//     i.total = 0
//     if (i.children) {
//       i.total += Math.max(1, i.children.length)
//       for (let index = 0; index < i.children.length; index++) {
//         const j = i.children[index]
//         i.total += Math.max(1, j.children.length)
//         j.childLen = len2
//         len2 += Math.max(1, j.children.length)
//         if (j.children) {
//           for (const k of j.children) k.childLen = len1
//           len1 += j.children.length
//         }
//       }
//     }
//   }
//   // console.log(this.treeData, '11111', this.tmpData)
// },
// https://leetcode.com/problems/minimum-height-trees/
// 递归数据
// handleLoop(o, len1 = 0, len2 = 0) {
//   if (Array.isArray(o)) return false
//   if (typeof o === 'object' && o && Object.keys(o).length && o.children) {
//     o.total = o.children.length
//     for (let i = 0; i < o.children.length; i++) {
//       const j = o.children[i]
//       j.len = len2
//       len2 += Math.max(1, j.children ? j.children.length : 0)
//       if (j.children) {
//         len1 += j.children.length
//         o.total += j.children.length
//         for (const k of j.children) {
//           k.len = len1
//           this.handleLoop(k, len1, len2)
//         }
//       }
//     }
//   }
// }
