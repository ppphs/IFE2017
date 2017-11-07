/**
 * 传入参数只考虑对象，不考虑数组。
 * new Observer返回一个对象，其 data 属性要能够访问到传递进去的对象。
 * 通过 data 访问属性和设置属性的时候，均能打印出右侧对应的信息。
 */

var Observer = function (obj) {
  this.data = obj
  this.walk(obj)
}

Observer.prototype.walk = function (obj) {
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) { // for...in 会枚举继承的可枚举属性，用hasOwnProperty可以检测是不是自己的属性
      let val = obj[i]
      if (typeof val === 'object') {
        new Observer(val) // 递归继续定义内部属性的getter和setter
      }
      this.define(i, val)
    }
  }
}

Observer.prototype.define = function (key, val) {
  Object.defineProperty(this.data, key, {
    // value: 1, // value不能和get、set一起使用，否则报错
    get: function () {
      console.log('您取得了' + key + '值为：' + val)
      return val
    },
    set: function (newVal) {
      console.log('您设置了' + key + '值为：' + newVal)
      val = newVal
    }
  })
}

var o = new Observer({
  name: 'joe',
  age: '21',
  friend: {
    name: 'jerry',
    age: 22
  }
})

