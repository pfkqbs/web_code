学习来自于尚硅谷React课程
React学习笔记

## 为什么学习React？原生js的痛点？
	1、原生js操作DOM繁琐，效率低（DOM-API操作ui）
	2、使用js直接操作DOM，浏览器会进行大量的重绘重排。
	3、原生js没有 组件化 编码方案，代码复用率低

## React介绍

前期需要的知识：
	js的基础
	es6的基础
	（和用没用过vue是没有关系的）
	
react：
	小厂用vue 大厂用react 
	维护团队厉害 facebook
	国际上的地位更高
	react更是纯组件的开发思想（一切皆组件）
	技多不压身
	涨工资
	
目标：
	入门react
	学会用react做开发
	跟着视频多多练习
	
## react的基本认识

	react是什么：
		react中文的官网 
		用于构建用户界面的 JavaScript 库 由facebook 开发且是开源的 
		
	react的特点及作用： 
		声明式编码：（不需要操作dom 数据驱动视图只需要更新数据即可）
		组件化编码： 一次学习，随处编写（支持客户端 和 服务端渲染） 
		高效：（虚拟dom）（jsx） 
		单项数据流：（讲到react组件的时候 会具体的提到）
		
	react高效的原因： 
		使用虚拟dom，不总是直接操作dom（jsx）（javascript XML的简写） 
		dom diff算法，最小化页面重绘
	
	相关js库：
		react.development.js  React核心库(!!要先于扩展库引入)
		react-dom.development.js  提供操作DOM的react扩展库
		bebal.min.js  解析JSX 语法代码为js 代码的库

## react的基本使用

### 需求1：
	在页面上输出hello world 的文字 相关的js的库

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>react的基本使用</title>
</head>
<body>

  <!-- 根挂载点 -->
  <div id="app"></div>
  
  <!-- React的核心库 -->
  <script src="./lib/react.development.js"></script>
  
  <!-- React的扩展库--可以把jsx虚拟Dom转为真实Dom -->
  <script src="./lib/react-dom.development.js"></script>
  
  <!-- 解析js语法--浏览器发展跟不上js语法的发展 -->
  <script src="./lib/babel.min.js"></script>
  
  <script type="text/babel">
  
    // 遇到以{ 开头的代码 以js的语法来解析 标签中的js的语法一定要用{} 包裹起来 
	
    var hello = 'hello word'
    var str = <h1>{hello}</h1>
    ReactDOM.render(str, document.getElementById("app"))
	
  </script>
</body>
</html>

```
### 编码
	react jsx 虚拟dom
		jsx的全称 是 javascript XML
		react定义的一种类似于XML的js的扩展语法 XML+js
		XML 是早起用于存储和传输数据，后期用json更方便，
		且json有两个方法很好用，JSON.parse()和JSON.stringify()
		
	作用:
		用来创建react虚拟dom对象
		var h1 = <h1>hello world </h1>
		注意- 它不是一个字符串 也不是html xml的标签
		注意的是 最终会转化成一个js的对象
			标签名任意 HTML的标签 或者其他的标签都可以
			标签的属性任意的 HTML的标签的属性 或者其他的属性
			基本语法的规则
		遇到< 开头的代码 以标签的语法来解析 html同名的标签就转换成html的标签
		遇到以{ 开头的代码 以js的语法来解析 标签中的js的语法一定要用{} 包裹起来
	
	渲染虚拟dom
	语法: ReactDOM.render(h1, document.getElementById('app'))
	作用: 将虚拟dom元素渲染到页面中的真实容器中去
	参数说明
		参数一 纯js 或者 jsx创建的虚拟dom对象
		参数二 用来包含虚拟dom 元素的真实dom元素对象 （一般是一个div）
	
## 创建虚拟dom的两种方式

### 第一种：纯js

```HTML
<!DOCTYPE html>
html lang="en">
 <head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>react的基本使用</title>
 </head>
 <body>
   <!-- 根挂载点 -->
   <div id="app"></div>
 
   <!-- React的核心库 -->
   <script src="./lib/react.development.js"></script>
 
   <!-- React的扩展库--可以把jsx虚拟Dom转为真实Dom -->
   <script src="./lib/react-dom.development.js"></script>
 
   <!-- 解析js语法--浏览器发展跟不上js语法的发展 -->
   <script src="./lib/babel.min.js"></script>
 
   <script type="text/babel">
     // 创建虚拟Dom的两种方式：
 
     //第一种：纯js创建（一般不用！！！）

     var msg = 'i love youoooo'
    //  创建一个h1标签 id为myId，内容为msg
     var viturDom = React.createElement('h1', { id: 'myId' }, msg)

    //  虚拟Dom转为真实Dom
     ReactDOM.render(viturDom, document.getElementById("app"))
   </script>
 </body> 
 </html>
```

### 第二种：jsx

```js
    var msg = 'i love Money'

    var h1 = <h1 id="myId">{msg}</h1>

    var viturDom = React.createElement('h1', { id: 'myId' }, msg)

    ReactDOM.render(viturDom, document.getElementById("app"))
```

### 需求： 动态展示列表数据 ul的列表 html css css3 node uniapp

```HTML
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>react的基本使用</title>
</head>
<body>
  <!-- 根挂载点 -->
  <div id="app"></div>
  <!-- React的核心库 -->
  <script src="./lib/react.development.js"></script>
  <!-- React的扩展库--可以把jsx虚拟Dom转为真实Dom -->
  <script src="./lib/react-dom.development.js"></script>
  <!-- 解析js语法--浏览器发展跟不上js语法的发展 -->
  <script src="./lib/babel.min.js"></script>
  <script type="text/babel">

    // 小需求：动态展示列表数据，ul的列表 html css  css3 node uniapp
var arr = ['html', 'css', 'jquery', 'react', 'vue', 'uniapp', '小程序']

    // 第一种:先遍历数组，把数组元素格式化为<li>的形式
var lis = []

    //注意： jsx的语法一定 要有闭合的标签
    arr.forEach((item, index) => lis.push(<li key={index}>{item}</li>))
    var ul1 = <ul>
      {lis}
    </ul>
ReactDOM.render(ul1, document.getElementById("app"))

    // 第二种 在{}使用map遍历出数组
    var ul2 = <ul>
      {arr.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
    ReactDOM.render(ul2, document.getElementById("app"))
  </script>
</body>
</html>
```
## 模块与组件   模块化与组件化的理解

	模块：向外提供特定功能的js程序，一般就是一个js文件
	为什么要拆成模块？ 随着业务逻辑增加，代码越来越多且复杂
	作用：复用js，简化js的编写，提高js运行效率
	
	组件： 用来实现局部功能效果的代码和资源的集合(html css js image等)
	为什么？一个界面的功能更复杂
	作用: 复用编码，简化项目编码，提高运行效率
	
	模块化：当应用的js都以模块化来编写，这个应用就是一个模块化的应用
	
	组件化：当应用是以多组件的方式实现，这个应用就是一个组件化的应用
	
	安装React调试工具

## 自定义组件的两种方式

### 函数式组件

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>定义组件的两种方式</title>
</head>
<body>
  <div id="app"></div>
  <script src="../1-基本认识使用/lib/react.development.js"></script>
  <script src="../1-基本认识使用/lib/react-dom.development.js"></script>
  <script src="../1-基本认识使用/lib/babel.min.js"></script>
  <script type="text/babel">

    // 定义组件的第一种方式：常用于无数据交互，比如标题
    function Simple() {
      return <h1>我是函数组件</h1>
    }
    ReactDOM.render(<Simple />, document.getElementById('app'))
  </script>
</body>
</html>

### es6类组件

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>定义组件的两种方式</title>
</head>
<body>
  <div id="app"></div>
  <script src="../1-基本认识使用/lib/react.development.js"></script>
  <script src="../1-基本认识使用/lib/react-dom.development.js"></script>
  <script src="../1-基本认识使用/lib/babel.min.js"></script>
  <script type="text/babel">
    // 定义组件的第二种方式:组件中的数据建议使用类组件
    // class Complex extends React.Component {
    //   render() {
    //     return (
    //       <div>
    //         我是复杂组件
    //       </div>
    //     )
    //   }
    // }
// ReactDOM.render(<Complex />, document.getElementById('app'))

    class Complex extends React.Component {
      constructor(props) {
        super(props)
      // 注意：1 state名称不能改变；
      // 注意：2 this.state就是组件存放数据的地方
      // 注意：3 this.state里放的数据如何获取？const { msg } = this.state
      // 注意：4 this指的就是这个Complex组件
      // 注意：5 函数组件中有没有定义state的这种方法呢？React16版本之后可以，使用：hooks
        this.state = {
          msg: '我是state复杂的组件',
          arr: []
        }
      }
      render() {
        const { msg } = this.state
        return (
          <div>
            <div>
              <h1>{msg}</h1>
              <h1>{msg}</h1>
            </div>
            <div>
              <h1>{msg}</h1>
              <h1>{msg}</h1>
            </div>
          </div>
        )
      }
    }
    ReactDOM.render(<Complex />, document.getElementById('app'))
  </script>
</body>
</html>

###总结： 

	组件编写注意点：
		一定要有闭合的标签 
		首字母一定要大写 
		只能有一个根节点
		
	render渲染组件的基本流程
		react 内部会创建组件实例对象
		得到包含的虚拟dom并解析成真实的dom
		插入到指定的页面元素内部

## 组件实例的三大核心属性之一：state属性

	state是什么以及作用?
		组件内部很重要的属性,值是对象 （可以包含多个key-value的组合）
		组件被称之为状态机 通过更新组件的state 来更新对应的页面显示（重新渲染组件）
		
	强烈注意：
		组件中的render方法中的this为组件实例对象
		组件中自定义的方法中this为undefined 如何解决？
			强制绑定this 通过函数对象的bind（）
			赋值语句+箭头函数
		状态数据，不能直接修改或更新！使用this.setState()去修改

###需求

页面上展示我喜欢你 然后点击之后变成你喜欢我

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="../lib/react.development.js"></script>
  <script src="../lib/react-dom.development.js"></script>
  <script src="../lib/prop-types.js"></script>
  <script src="../lib/babel.min.js"></script>
  <script type="text/babel">
    //需求： 页面上展示我喜欢你 然后点击之后变成你喜欢我
     class Like extends React.Component {
    //   组件数据部分 类似于data
       state = {
         flag: true
       }
    // 组件的js部分  改变this指向  handleClick() {  可以写为  handleClick = ()=>{ 
       handleClick() {
    //   错误的演示
    //   this.state.msg = "你喜欢我"   这里this丢失
    //   es6的class类默认 是严格模式，是undefined 不是window 
         let { flag } = this.state
         this.setState({
           flag: !flag
         })
       }
    // 渲染页面
       render() {
    // 使用 ：es6的对象的解构赋值 等价于 const msg = this.state.msg  作用：取出state中的数据
         const { flag } = this.state
         const msg = flag ? '我喜欢你' : '你喜欢我'
         //通过bind改变this指向 
         return <h1 onClick={this.handleClick.bind(this)}>{msg}</h1>
       }
     }
    // ReactDOM.render(<Like />, document.getElementById("app"))
  </script>
</body>
</html>
```
This丢失的情况说明：
	函数中this为window
	严格模式下 函数中this为undefined，es6的class类默认 是严格模式，所以是undefined 不是window 
	
props 属性
	每个组件对象都是会有props属性的
	组件标签的所有属性 都是保存在props中的
props作用
	通过标签属性 从组件外部 向组件内部传递数据 
	注意 组件内部不要修改props属性的值
	
需求
自定义用来显示一个人员信息的组件（信息由外部传入组件内部）
	姓名必须制定
	如果性别没有指定 默认为男
	如果年龄没有指定 默认18 
	
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="../lib/react.development.js"></script>
  <script src="../lib/react-dom.development.js"></script>
  <!-- 进行类型检查 -->
  <script src="../lib/prop-types.js"></script>
  <script src="../lib/babel.min.js"></script>
  <script type="text/babel">

//需求： 自定义用来显示一个人员信息的组件（信息由外部传入组件内部）
//姓名必须制定
//如果性别没有指定 默认为男
//如果年龄没有指定 默认18 

class Person extends React.Component {
  render() {
    // 外部传过来的 我们通过  this.props  来获取
    // console.log(this.props);
    const { name, sex, age } = this.props
    // this.props.name = '张飞'
    return (
      <div>
        <h1>姓名:{name}</h1>
        <h1>性别:{sex}</h1>
        <h1>年龄:{age}</h1>
      </div>
    )
  }
}
// 外部数据  
let person = { name: '关羽', }
//对标签属性类型、必要性的限制
Person.propTypes = {
  name: PropTypes.string.isRequired
}
Person.defaultProps = {
  sex: '男',
  age: 1000
}
// ReactDOM.render(<Person name={person.name} sex={person.sex}  age={person.age}/>, document.getElementById("app"))
// 上面代码优化
ReactDOM.render(<Person {...person} />, document.getElementById("app"))
  </script>
</body>
</html>
```
面试题：请区分一下组件的props 和 state属性
	state 组件自身的内部可以变化的数据
	props 是组件外部向组件内部传递的数据 组件内部只读 不改变
refs属性是什么及其作用 
组件内部的标签可以定义ref属性来标识自己
	两种方式来标识自己
	标签内部通过回调函数
	通过this.ref来获取
	事件处理
	onClick 指定组件的事件处理函数 注意大小写
	e.target.value
受控组件 和 非受控组件 
	针对于表单而言的 受控组件 受state控制
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>组件</title>
</head>
<body>
  <div id="app"></div>
  <script src="../lib/react.development.js"></script>
  <script src="../lib/react-dom.development.js"></script>
  <script src="../lib/babel.min.js"></script>
  <script type="text/babel">

  // 第二种： 受控组件来实现获取表单的值（受state控制）（推荐使用）

    class Input extends React.Component {
      // 组件的数据部分
      state = {
        value: ''
      }
      // 组件的事件方法部分
      handleClick = () => {
        console.log(this.state.value)
      }
      handleChange = (e) => {
        this.setState({
          value: e.target.value
        })
      }
      // 组件虚拟Dom转真实Dom
      render() {
        const { value } = this.state
        return (
          <div>
            <input type="text" value={value} onChange={this.handleChange} />
            <button onClick={this.handleClick}>点击获取input的值</button>
          </div>
        )
      }
    }
    ReactDOM.render(<Input />, document.getElementById("app"))
    
  </script>
</body>
</html>
```
	非受控组件 不受state控制 通过refs属性

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>组件</title>
</head>
<body>
  <div id="app"></div>
  <script src="../1-基本认识使用/lib/react.development.js"></script>
  <script src="../1-基本认识使用/lib/react-dom.development.js"></script>
  <script src="../1-基本认识使用/lib/babel.min.js"></script>
  <script type="text/babel">

  // 第一种 非受控组件来实现获取表单的值（不受state控制）

    class Input extends React.Component {
      handleClick = () => {
        console.log(this.input.value)
      }
      render() {
        return (
          <div>
            <input type="text" ref={ (input) =>{ this.input = input }} />
            <button onClick={this.handleClick}>点击获取input的值</button>
          </div>
        )
      }
    }
    ReactDOM.render(<Input />, document.getElementById("app"))
    
  </script>
</body>
</html>
```
组件通信 
	父组件传值给子组件：通过props传递的数组[]
	子组件传值给父组件：props传递的，只不过这个props依然是父组件传递给子组件的props,而是一个函数
需求 简易todoList功能的实现

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>todoList</title>
</head>
<body>
  <div id="app">
  </div>
  <script src="../lib/react.development.js"></script>
  <script src="../lib/react-dom.development.js"></script>
  <script src="../lib/prop-types.js"></script>
  <script src="../lib/babel.min.js"></script>
  <script type="text/babel">

    //ToDoList组件结构划分： 整个大组件为APP组件，输入部分为add组件，下部展示部分为list组件
    //数据流向： 输入部分 Add组件先传给父组件App 然后传给List展示
// 输入input组件，如何传给父组件：父组件中子组件标签上定义一个方法，子组件调用父组件方法传参，而这个方法是在父组件中定义了，就可以通过参数拿到子组件给父组件传的数据

    class App extends React.Component {
      state = {
        arr: [
          '张飞',
          '关羽',
          '赵云'
        ]
      }
      handleAdd = (value) => {
        const { arr } = this.state//1取出state中的数据
        arr.unshift(value)//2拿到子组件传递给父组件的输入的数据 添加到父组件的state中
        // 3改变state中的数据
        this.setState({
          arr
        })
      }
      render() {
        const { arr } = this.state
        return (
          <div>
            <Add add={this.handleAdd} />
            <List list={arr} />
          </div>
        )
      }
}

    class Add extends React.Component {
      handleClick = () => {
        console.log(this.input.value);//获取到input的值
        this.props.add(this.input.value)//调用ths.props.add（）方法
        this.input.value = ''//添加完清空input
      }
      render() {
        return (
          <div>
            <input type="text" ref={(input) => { this.input = input }} />
            <button onClick={this.handleClick}>添加</button>
          </div>
        )
      }
}

// 静态组件List（展示数据）函数组件
    function List(props) {
      console.log(props);//拿到父组件给子组件的传值
      return (
        <ul>
          {
            props.list.map((item, index) => {
              return (<li key={index}>{item}</li>)
            })
          }
        </ul>
      )
    }
    ReactDOM.render(<App />, document.getElementById("app"))
  </script>
</body>
</html>
```