var Observer = function (obj, el, html, rootObj) {
  this.data = obj
  this.el = el
  this.html = html
  this.rootObj = rootObj // 根对象，要保存一下因为每次重新更新dom都要用到
  this.walk(obj)
}

Observer.prototype.walk = function (obj) {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      let val = obj[i]
      if (typeof val === 'object') {
        new Observer(val, this.el, this.html, this.rootObj)
      }
      this.define(i, val)
    }
  }
}

Observer.prototype.define = function (key, val, callback) {
  let _self = this
  Object.defineProperty(_self.data, key, {
    get: function () {
      return val
    },
    set: function (newVal) {
      let oldValue = val
      val = newVal
      if (oldValue !== val) {
        _self.el.innerHTML = _self.html // 重新初始化html
        event() // 重新更新绑定事件
        compile(_self.rootObj, _self.el) // 渲染{{}}
      }
      if (typeof callback === 'function' && oldValue !== val) { // 判断新值是否和旧值一样，不一样再执行回调
        callback.apply(_self, arguments) // 绑定正确的this
      }
      if (typeof _self.data._watch === 'function' && oldValue !== val) { // 给对象设置了$watch函数，所以就执行
        _self.data._watch(key, val) // 回传参数
      }
    }
  })
}

// 深度$watch
Observer.prototype.$watch = function (key, callback) {
  let data = this.data
  let val = data[key]
  if (typeof val === 'object') {
    Object.defineProperty(val, '_watch', {
      value: callback,
      configurable: false,
      enumerable: false,
      writable: true
    })
  }
  this.define(key, val, callback)
}

function compile (obj, node) {
  let childList = node.childNodes // 获取所有的子元素
  for (let i = 0, len = childList.length; i < len; i++) {
    let node = childList[i]
    if (node.nodeType === 3 && /(\{\{.+\}\})/.test(node.data)) { // 如果有是text节点又有{{}}模板就替换
      // node.data就是text节点的字符串，可以通过赋值来修改
      node.data = node.data.replace(/(\{\{[\s\w\.\+\-\*\/]+\}\})/g, function (str) { // 用正则替换字符串中的{{}}
        let exp = str.slice(2, -2).trim()
        let changeText = exp.replace(/(\w+\.*\w*)/g, function (str, $1) {
          return 'obj.' + $1
        })
        let newText = eval(changeText) + '' // eval可以把传入的字符串当做语句执行
        return newText
      })
    }
    if (node.nodeType === 1) { // 如果遍历到节点就递归继续遍历他的list
      compile(obj, node)
    }
  }
}

function MyMvc (option) {
  Object.assign(this, option.data)
  let element = document.querySelector(option.el)
  let _observer = new Observer(this, element, element.innerHTML, this)
  Object.assign(this, option.methods)
  compile(option.data, element)
}

var mySimpleMvc = new MyMvc({
  el: '#app',
  data: {
    text: 'hello to my simple mvc~',
    student1: {
      name: 'joe',
      age: 21
    },
    student2: {
      name: 'phs',
      age: 21.1
    }
  },
  methods: {
    addAge () {
      this.student1.age++
    }
  }
})

function event () {
  let btn = document.querySelector('#add')
  btn.addEventListener('click', function () {
    console.log(1)
    mySimpleMvc.addAge()
    console.log(mySimpleMvc.student1.age)
  }, false)
}

event()