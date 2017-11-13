var page = require('webpage').create()

// 页面开始加载时间
page.onLoadStarted = function () {
  page.startTime = new Date()
}

var searchStr = 'javascript'
url = 'https://www.baidu.com/s?wd=' + encodeURIComponent(searchStr),
  result = {}

result.code = 0
result.message = '抓取失败'
result.time = 0
result.word = searchStr
result.dataList = []
//打开页面
page.open(url, function (s) {
  if (s === 'success') {
    var data = page.evaluate(function () {
      var data = []
      var resultList = Array.prototype.slice.call(document.querySelectorAll('.result'), 0)
      resultList.forEach(function (el) {
        var obj = {}
        var title = el.querySelector('.t') || el.querySelector('.c-title')
        if (title === null) return
        obj.title = title.textContent
        var info = el.querySelector('.c-abstract') || el.querySelector('.c-color')
        if (info === null) return
        obj.info = info.textContent
        var link = title.querySelector('a') || title.parentNode
        if (link === null) return
        obj.link = link.getAttribute('href')
        data.push(obj)
      })
      return data
    })

    result.dataList = data
    result.time = new Date() - page.startTime
    result.code = 1
    result.message = '抓取成功！'

    console.log(JSON.stringify(result))
  } else {
    console.log('页面加载失败...')
    console.log(JSON.stringify(result))
  }
  phantom.exit()
})