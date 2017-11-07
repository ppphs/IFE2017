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

Observer.prototype.define = function (key, val, callback) {
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
    }
  })
}

// $watch
Observer.prototype.$watch = function (key, callback) { // 这里没法监听到引用值的改变
  this.define(key, this.data[key], callback)
}

var o = new Observer({
  name: 'joe',
  age: 21,
  friend: {
    name: 'jerry',
    age: 22
  }
})

o.$watch('age', function () {
  console.log('我今年已经' + this.data.age + '岁啦！')
})

o.data.age = 21