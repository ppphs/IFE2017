function MyMvc (option) {
  let element = document.querySelector(option.el)
  compile(option, element)
}

function compile (option, node) {
  let childList = node.childNodes // 获取所有的子元素
  for (let i = 0, len = childList.length; i < len; i++) {
    let node = childList[i]
    if (node.nodeType === 3 && /(\{\{.+\}\})/.test(node.data)) { // 如果有是text节点又有{{}}模板就替换
      // node.data就是text节点的字符串，可以通过赋值来修改
      node.data = node.data.replace(/(\{\{[\s\w\.\+\-\*\/]+\}\})/g, function (str) { // 用正则替换字符串中的{{}}
        let exp = str.slice(2, -2).trim()
        let changeText = exp.replace(/(\w+\.*\w*)/g, function (str, $1) {
          return 'option.data.' + $1
        })
        let newText = eval(changeText) + '' // eval可以把传入的字符串当做语句执行
        return newText
      })
    }
    if (node.nodeType === 1) { // 如果遍历到节点就递归继续遍历他的list
      compile(option, node)
    }
  }
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
  }
})