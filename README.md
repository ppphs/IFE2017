# 百度前端技术学院2017

* [自定义checkbox，radio样式](https://ppphs.github.io/IFE2017/%E8%87%AA%E5%AE%9A%E4%B9%89checkbox%EF%BC%8Cradio%E6%A0%B7%E5%BC%8F/index.html)

* vue: 动态数据绑定了解getter，setter（详情代码见vue文件夹）
* vue: 动态数据绑定二：实现$watch（详情代码见vue文件夹）
* vue: 动态数据绑定三：深度实现$watch（详情代码见vue文件夹）
* [vue: 动态数据绑定四：渲染{{}}（详情代码见vue文件夹）](https://ppphs.github.io/IFE2017/vue/%E5%8A%A8%E6%80%81%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A%E5%9B%9B%EF%BC%9A%E6%B8%B2%E6%9F%93%7B%7B%7D%7D/index.html)
```html
<body>
  <div id="app">
    <p>{{ text }}</p>
    <p>
    学生1名字：{{ student1.name }}，年龄：{{ student1.age }}，学生2的名字：{{ student2.name }}，年龄：{{student2.age}}，两个人的总年龄：{{ student1.age + student2.age }}
    </p>
    <button id="add">学生1年龄加1</button>
  </div>
  <script src="./main.js"></script>
</body>
```