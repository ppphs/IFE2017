var node = [{
  name: "父节点1",
  children: [{
    name: "子节点1"
  }, {
    name: "子节点2"
  }]
}, {
  name: "父节点2",
  children: [{
    name: "子节点3"
  }, {
    name: "子节点4",
    children: [{
      name: "子节点5"
    }]
  }]
}]

window.onload = function () {
  let container = document.querySelector('.container')
  function render (node) {
    node.forEach(function (el) {
      if (el.children) {
        let folder = document.createElement('div')
        let sign = document.createElement('i')
        let folderIcon = document.createElement('i')
        let title = document.createElement('div')
        sign.className = 'iconfont icon-jiajianzujianjiahao'
        folderIcon.className = 'iconfont icon-wenjianjia1'
        title.textContent = el.name
        title.appendChild(sign)
        title.appendChild(folderIcon)
        folder.appendChild(title)
      } else {
        let file = document.createElement('div')
        let file
      }
    })
  }
}
