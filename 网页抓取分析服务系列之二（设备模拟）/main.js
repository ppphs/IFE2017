var page = require('webpage').create()

// 页面开始加载时间
page.onLoadStarted = function () {
  page.startTime = new Date()
}

// 配置信息
var config = {
  iphone5: {
    name: 'iphone5',
    screen: {
      width: 320,
      heigth: 568
    },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  iphone6: {
    name: 'iphone6',
    screen: {
      width: 375,
      heigth: 667
    },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  },
  ipad: {
    name: 'ipad',
    screen: {
      width: 768,
      heigth: 1024
    },
    userAgent: "Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
  }
}

//设备参数
var device = config.iphone5
page.settings.userAgent = device.userAgent
page.viewportSize = {
  width: device.screen.width,
  height: device.screen.heigth
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