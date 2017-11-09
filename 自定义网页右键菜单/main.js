window.onload = function () {
  let wrapper = document.querySelector('.wrapper')
  let menu = document.querySelector('.menu')
  let filter = document.querySelector('.filter')
  let menuStyle = window.getComputedStyle(menu)
  let menuWidth = parseInt(menuStyle.width)
  let menuHeight = parseInt(menuStyle.height)
  wrapper.addEventListener('contextmenu', function (e) {
    e.preventDefault()
    filter.style.display = 'block'
    menu.style.display = 'block'
    let mouseLeft = e.clientX
    let mouseTop = e.clientY
    let mouseRight = document.documentElement.clientWidth - mouseLeft
    let mouseBottom = document.documentElement.clientHeight - mouseTop

    if (mouseRight < menuWidth && mouseBottom > menuHeight) { // 在右侧但是不在底部
      setMenuPosition(mouseTop - 5, mouseRight, '', '')
    } else if (mouseRight < menuWidth && mouseBottom < menuHeight) { // 在右侧又在底部
      setMenuPosition('', mouseRight, 0, '')
    } else if (mouseBottom < menuHeight) { // 只是在底部
      setMenuPosition('', '', 0, mouseLeft)
    } else { // 正常情况
      setMenuPosition(mouseTop - 5, '', '', mouseLeft)
    }
  }, false)

  function setMenuPosition (top, right, bottom, left) {
    menu.style.top = top !== '' ? top + 'px' : ''
    menu.style.right = right !== '' ? right + 'px' : ''
    menu.style.bottom = bottom !== '' ? bottom + 'px' : ''
    menu.style.left = left !== '' ? left + 'px' : ''
  }

  filter.addEventListener('click', function () {
    filter.style.display = 'none'
    menu.style.display = 'none'
  }, false)
}