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
  function render (node, parentNode) {
    node.forEach(function (el) {
      if (el.children) {
        let folder = document.createElement('div')
        let sign = document.createElement('i')
        let folderIcon = document.createElement('i')
        let title = document.createElement('div')
        let children = document.createElement('div')
        let folderOpen = false
        folder.className = 'folder'
        sign.className = 'iconfont icon-jiajianzujianjiahao left'
        folderIcon.className = 'iconfont icon-wenjianjia1 left'
        children.className = 'children'
        title.textContent = el.name
        title.appendChild(sign)
        title.appendChild(folderIcon)
        folder.appendChild(title)
        render(el.children, children)
        folder.appendChild(children)
        title.addEventListener('click', function (e) {
          if (folderOpen) {
            sign.classList.remove('icon-jianhaojiacu')
            sign.classList.add('icon-jiajianzujianjiahao')
            folderIcon.classList.remove('icon-wenjianjia')
            folderIcon.classList.add('icon-wenjianjia1')
            children.style.display = 'none'
          } else {
            sign.classList.remove('icon-jiajianzujianjiahao')
            sign.classList.add('icon-jianhaojiacu')
            folderIcon.classList.add('icon-wenjianjia')
            folderIcon.classList.remove('icon-wenjianjia1')
            children.style.display = 'block'
          }
          folderOpen = !folderOpen
        }, false)
        parentNode.appendChild(folder)
      } else {
        let file = document.createElement('div')
        file.textContent = el.name
        let fileIcon = document.createElement('i')
        fileIcon.className = 'iconfont icon-wenjian left'
        file.appendChild(fileIcon)
        parentNode.appendChild(file)
      }
    })
  }
  render(node, container)
}
