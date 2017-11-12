var node = [
  {
    name: "style",
    children: [
      {
      name: "reset.css"
      },
      {
      name: "style.css"
      }
    ]
  },
  {
    name: "js",
    children: [
      {
        name: "main.js"
      },
      {
        name: "util",
        children: [
          {
          name: "dom.js"
          }
        ]
      }
    ]
  },
  {
    name: 'index.html'
  }
]

// 暂时只完成了基本功能代码，后期再重构，代码写的比较乱
window.onload = function () {
  let container = document.querySelector('.container')
  function render (node, parentNode) {
    node.forEach(function (el) {
      if (el.children) {
        let folder = document.createElement('div') // 文件夹
        let sign = document.createElement('i') // 加减号
        let folderIcon = document.createElement('i')
        let title = document.createElement('div')
        let children = document.createElement('div') // 文件夹里面的内容区域
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
        file.className = 'file'
        file.appendChild(fileIcon)
        parentNode.appendChild(file)
      }
    })
  }
  render(node, container)
}
