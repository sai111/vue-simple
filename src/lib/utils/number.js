const translateNum = function(num) {
  const table = [
    { size: 1024 * 1024 * 1024 * 1024, unit: 'TB' },
    { size: 1024 * 1024 * 1024, unit: 'GB' },
    { size: 1024 * 1024, unit: 'MB' },
    { size: 1024, unit: 'KB' },
    { size: -1, unit: 'B' }
  ]
  for (const item of table) {
    // 网络 1B = 8b
    const _num = num
    if (parseInt(_num) >= item.size) {
      const value = (parseInt(_num) / Math.abs(item.size)).toFixed(1)
      return { value: value, unit: item.unit }
    }
  }
}
// 数组对象解构
//const arr = [
//  { content: 111 },
//  { list: [a, b, c] }
//]
//let result = Object.create({})
//arr.forEach((v) => result = { ...result, ...v })
//console.log(result, 'result')
export default {
  translateNum
}
