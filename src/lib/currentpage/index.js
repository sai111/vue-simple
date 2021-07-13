// 删除当前页面的某一项，或者某几项后，如果当前数据为空，则回到上一页；否则，留在当前页
const getPage = function(data, idArr, page) {
  let currentPage = 1
  if (data && data.length > 0) {
    const tmp = arr.splice(0, data.length)
    const tmpArr = tmp.filter((v1) => {
      const arrList = idArr.map((v2) => v2)
      return !arrList.includes(v1.id)
    })
    if (tmpArr && tmpArr.length > 0) {
      currentPage = page
    } else {
      currentPage = page - 1 > 0 ? page - 1 : 1
    }
  }
  return currentPage
}

export default getPage
