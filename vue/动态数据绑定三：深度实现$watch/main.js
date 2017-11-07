var Observer = function (obj) {
  this.data = obj
  this.walk(obj)
}

Observer.prototype.walk = function (obj) {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      let val = obj[i]
      if (typeof val === 'object') {
        new Observer(val)
      }
      this.define(i, val)
    }
  }
}

Observer.prototype.define = function (key, val, callback, emitWatch) {
  let _self = this
  Object.defineProperty(_self.data, key, {
    get: function () {
      // console.log('您取得了' + key + '值为：' + val)
      return val
    },
    set: function (newVal) {
      // console.log('您设置了' + key + '值为：' + newVal)
      let oldValue = val
      val = newVal
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

var o = new Observer({
  name: 'joe',
  age: 21,
  friend: {
    name: 'jerry',
    age: 22
  }
})

o.$watch('friend', function (key, val) {
  console.log('监听到了对象里面值的变化')
  console.log(`变化的属性是${key}，新值是${val}`)
})

o.data.friend.age = 23