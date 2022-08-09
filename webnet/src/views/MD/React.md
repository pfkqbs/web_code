## React

一、React概述

是一个用于 构建用户界面 的 `JavaScript` 库

用户界面： `HTML` 页面 （前端）

`React` 主要用来写`HTML` 页面， 或 构建 `web` 应用

如果从`MVC`的角度来看， `React`仅仅是视图层（V ) ，也就是只负责视图的渲染，而并非提供了完整的M和C的功能

`React` 起源于`FaceBook` 的内部项目， 后又用来架设 `Instagram` 的网站， 并与2013年5月开源

`React` 特点：

  声明式: 你只要描述 `UI` （`HTML`）看起来是什么样，就跟写`HTML`一样,`React`负责渲染`UI`，并在数据变化的时候更新`UI`  

```js
const jsx=<div className="app"><h1>Hello React { count } </h1></div>

```
  基于组件: 组件是 `React` 最重要内容, 组件表示页面中的部分内容, 组合、复用多个组件，可以实现完整的页面功能

  学习一次，随处使用: 使用`React` 可以开发`Web` 应用, 使用`React` 可以开大移动端原生应用 （`React-native`）使用`React` 可以开发`VR` （虚拟现实）应用 （`React 360`）

1.1 `React`的基本使用

  `React` 的安装   命令：`npm i  react react-dom`

  `react` 包是核心，提供创建元素、组件等功能

  `react-dom` 包提供`DOM`相关功能

  引入`react` 和`react-dom` 两个js文件


```html
<script src="./node_modules/react/umd/react.development.js" ></script>
<script src="./node_modules/react-dom/umd/react-dom.development.js" ></script>

```

  创建`React` 元素


```html

<script>
	const title= React.createElement('h1',null,'Hello World')
</script>

```

  渲染 `React` 元素到页面中

```html

<div id='root'></div>

<script  >
	//ReactDom.createElement(参数1：元素名称-标签名， 
  //参数2：元素属性，参数3及以后的参数：元素的子节点)
	const title= React.createElement('h1',{title:标题，id:"p1"},'Hello World')

	//渲染React 元素到页面中  ReactDom.render
  //（参数1：要渲染的react元素，参数2：挂载点-->Dom对象
	ReactDom.render(title,document.getElementById('root'))
</script>

```

## 1.2 React脚手架的使用

  ### 脚手架意义：

  脚手架是开发现在 `WEB` 应用的必备
  充分利用 `webpack`、`Babel`、`ESLint`等辅助项目开发
  零配置，无需手动配置繁琐的工具即可使用
  关注业务，而不是工具配置
  初始化项目：
  初始化项目, 命令： `npx create-react-app my-app`
  启动项目，在项目跟目录执行命令： `npm start`
  在脚手架中使用`React`：
  导入`react` 和`react-dom`两个包：

```shell
import React from 'react'

import ReactDOM from 'react-dom'

```

  调用 `React.createElement()`方法创建 `react` 元素
  调用 `ReactDOM.render()`方法渲染 `react` 元素到页面中

`npx` 命令介绍:

  目的： 提升包内提供的执行工具的使用体验
  原来： 先安装脚手架包，再使用这个包提供的命令
  现在： 无需安装脚手架，就可以直接使用这个包提供的命令
  推荐使用 ： `npx create-react-app 项目名称`

`yarn`	:

  `yarn` 是`FaceBook` 发布的包管理器，可以看做是`npm`的替代品，功能与`npm`相同
  `yarn` 具有快速，可靠和安全的特点
  初始化新项目： `yarn init`
  安装包： `yarn add 包名称`
  安装项目依赖项： `yarn`

二、`Jsx`语法：

`JSX`的基本使用

问题：为什么脚手架中可以使用 `JSX` 语法？

  `JSX` 不是标准的 `ECMAScript` 语法，它是 `ECMAScript` 的语法扩展
  需要使用`babel` 编译处理后，才能在浏览器环境中使用
  `create-react-app`  脚手架中已经默认有该配置，无需手动配置
  编译`JSX` 语法的包为 `@babe/preset-react`

注意点：

  `React` 元素的属性使用驼峰命名法
  特殊属性名：`class->className`、  `for-->htmlFor `、 `tabindex-->tabIndex`
  没有子节点的 `React` 元素可以用  `/>` 结束
  推荐： 使用小括号`JSX` 从而避免 `JS` 中的自动插入分号陷阱

```JavaScript

const dv=( <div>...</div> )

```

`JSX` 中使用 `JavaScript` 表达式

嵌入 `JS` 表达式

  数据存储在 `JS` 中

  语法：`{ JAVAScript 表达式}`

  注意： 语法中是单大括号，不是双大括号

```JavaScript
const name='Jack'
const dv=(<div>你好，我叫 ： ？？？？</div>)
//↓↓↓
const name='Jack'
const dv=(<div>你好，我叫 ： { name }</div>)
```

注意点：

  单大括号中 可以使用任意的 `JAVAScript` 表达式

  `JSX` 自身也是 `JS` 表达式

  注意： JS 中的对象是一个例外，一般只会出现在`style` 属性中

  注意： 不能出现 `JS` 语句 （比如 if else  for(){} ...）


`JSX` 的条件渲染：

  场景： `loading` 效果

  条件渲染： 根据条件 渲染特定的 `JSX` 结构

  可以使用 `if/else` 或者 三元运算符 或 逻辑与 运算符 来实现

```JavaScript
const isLoading = true

const loadData =() =>{

	if(isLoading) {

	 return <div>数据加载中...请稍后...</div>

	}

	return (<div>数据加载完成.</div>)
}

const dv=(<div>{ loadData() }</div>)
```

`JSX` 的列表渲染：

  如果要渲染一组数据，应该使用数组的`map()`方法

  注意： 渲染列表应该添加key属性，`key`属性的值要保证唯一

  原则：`map()`遍历谁，就给谁添加 `key` 属性

  注意： 尽量避免使用索引号作为`key`

```JavaScript
const songs=[
	{id:1,name:"痴心绝对"},
	{id:2,name:"痴心绝对2"},
	{id:3,name:"痴心绝对3"}
	]
const List= (<ul>{ songs.map(item=>( <li key={item.id}>{ item.name }</li>) }<ul> )

```

`JSX` 的样式处理：

  行内样式— `style`

```html

<h1 style={ { color:'red',background:'skyblue'} }>
	JSX 的样式处理
</h1>

```
  类名--className（推荐）

```html
//引入css文件
import './css/index.css'
<h1 className='title' >
	JSX 的样式处理
</h1>

```

总结:
  `JSX` 是 `React` 的核心内容
  `JSX` 表示在 `JS` 代码中写 `HTML` 结构，是 `React` 声明式的体现
  使用`JSX`配合嵌入的JS表达式，条件渲染、列表渲染、可以描述任意的`UI`结构
  推荐使用`className` 的方式 给`JSX`添加样式
  `React` 完全利用JS 的语言自身的能力来编写UI，而不是造轮子增强 `HTML` 功能

三、`React`组件基础

`React`组件介绍：
  组件是`React` 的一等公民，使用`React`就是在用组件
  组件表示 页面中的部分功能
  组合多个组件实现完整的页面功能
  特点： 可复用、独立、可组合

`React` 组件的两种创建方式：
1使用函数创建组件：定义：使用`JS` 的函数（或箭头函数）创建的组件
约定：
  函数名称必须以大写字母开头， React 据此区分 组件 和普通的 React 元素
  函数组件  必须有返回值，表示该组件的结构
  如果返回值为null，表示不渲染任何内容
  渲染函数组件：用函数名作为组件标签名，组件标签可以是单标签也可以是双标签

```JavaScript
//普通函数
function Hello() {
	return ( <div>这是我的第一个函数组件</div> ）
}

//箭头函数
function Hello=() =><div>这是我的第一个函数组件</div>

//渲染组件
ReactDOM.render( <Hello />,document.getElementById('root') )
```

使用类创建组件：定义： 使用`ES6` 的`class` 创建的组件
约定：
  类名称页必须以大写字母开头
  类组件应该继承`React.Component`父类，从而可以使用父类中提供的方法或属性
  类组件必须提供`render()`方法
  `render()`方法必须有返回值，表示该组件的结构

```JavaScript
class Hello extends React.Component {
	render (){
		return <div>Hello Class Component</div>
	}
}

//渲染组件
ReactDOM.render( <Hello />,document.getElementById('root') )

```
抽离为独立的JS文件
思考：项目中的组件多了之后，该如何处理这些组件呢？
	选择一：将所有的组件放在一个JS文件中
	选择二：将每个组件放在单独的JS文件中
	组件作为啊一个独立的个体，一般都会放在一个单独的JS文件中
how?
	创建Hello.js
	在Hello.js中导入React
	创建组件（函数或类）
	在Hello.js中导出Hello组件
	渲染组件
//Hello.js
import React from 'react'

class Hello extends React.Component{
	render () {
		return <div>Hello Class Component!</div>
	}
}
//导出Hello组件
export default Hello

//index.js

//导入Hello组件
import Hello from ‘./Hello'

//渲染导入的Hello组件
ReactDOM.render(<Hello />,root)
React 事件处理
事件绑定
	React 事件绑定语法与Dom 事件语法相似
	语法: on+ 事件名称 = {事件处理程序}，比如 onClick={ ()=>{} }
类组件代码：
class App extends React.Component{
	handleClick(){
		console.log('单击事件触发了！')
	}
	render(){
		retrurn (
			<button onClick={ this.handleClick }>点击</button>
		)
	}
}

函数组件代码

function App (){
	//事件处理程序
	handleClick(){
		console.log('单击事件触发了！')
	}
	retrurn (
		<button onClick={ handleClick }>点击</button>
	)
}
React 事件处理总结：
注意： React 事件采用驼峰命名法，比如：onClick、onMouseEnter、onFocus
在函数中绑定事件，函数名直接用
事件对象：
可以通过  事件处理程序的参数  获取到事件对象
React 中的的事件对象叫做： 合成对象（对象）
合成对象：兼容所有的浏览器，无需担心跨浏览器兼容性的问题

function handleClick(e){
	//阻止浏览器额默认行为
	e.preventDefault ()
	console.log('事件对象'，e)
}
<a onClick={handleClick} href='http://itcast.cn/' >传智播客</a>
有状态组件和无状态组件
	函数组件又叫无状态组件，类组件又叫做有状态组件
	状态（state）即数据
	函数组件没有自己的状态，只负责数据展示（静态）
	类组件有自己的状态，负责更新UI，让页面 动 起来

比如计数器案例中，点击按钮让数值加1。
0和1就是不同时刻的状态，而由0变为1就表示状态发生了变化。
状态变化后，UI也要响应的更新。
React中想要实现该功能，就要使用状态组件来完成

组件中的state和setstate()
state的基本使用
状态（state）即数据，是组件内部大的私有数据，只能在组件内部使用
state 的值是对象，表示一个组件可有多个数据，通过  this.state 来获取

class Hello extends React.Component {
	constructor(){
		super()
		//初始化state
		this.state={ count:0 }
	}
	render(){
		return (<div> 有状态组件 {this.state.count} </div>）
	}
}

//↓↓↓简化

class Hello extends React.Component {

		//初始化state
		this.state={ count:0 }

	render(){
		return (<div> 有状态组件 {this.state.count}</div>）
	}
}

setState()
状态是可变的
	语法： this.setState( {要修改的数据} )
	注意： 不要直接修改state中的值，这是错误的！ this.state.count+=1
	setState()  作用： 1修改state 2更新UI
	思想：数据驱动视图
class App extends React.Component {
	state = {count:0}
	render(){
		return (
			<div>
				<h1>计数器：{this.state.count} </h1>
				<button onClick={ ( )=> { this.setState.count +1}) }}+1</button>
			</div>
React.render(<App />,document.getElementById('root'))

抽离JS代码
	问题： JSX 中掺杂过多JS逻辑代码，会显得非常混乱
	推荐：将逻辑抽离到单独的方法中，保证 JSX 结构清晰
	事件处理程序中的 this 的值为 undefined
	希望： this 指向组件实例 （render 方法中的 this 即为组件实例）
class App extends React.Component {
	state = {count:0}
		//事件处理程序
	onIncrement(){
		this.setState(
		{ count:this.state.count +1 }
	)
	}
	render(){
		return (
			<div>
				<h1>计数器：{this.state.count} </h1>
				<button onClick={ ( )=> { this.onIncrement }) }}+1</button>
				{/*<button onClick={ ( )=> { this.setState.count +1}) }}+1</button>*/}
			</div>
React.render(<App />,document.getElementById('root'))
事件绑定this指向
	箭头函数
	利用箭头函数自身不绑定this的特点
	render() 方法中的this 为组件实例，可以获取到 setState()
代码

	class App extends React.Component {
	state = {count:0}
		//事件处理程序
	onIncrement(){
		this.setState( { count:this.state.count +1 } )
	}
	render(){
		return (
			<div>
				<h1>计数器：{this.state.count} </h1>
				<button onClick={ ( )=> { this.onIncrement() } }按钮+1</button>
				{/*<button onClick={ ( )=> { this.setState.count +1} }+1</button>*/}
			</div>
React.render(<App />,document.getElementById('root'))
关键代码：

<button onClick={  ()=>this.onIncrement()  } />
Dunction.prototype.bind()
利用ES5 中的  bind 方法， 将事件处理程序中的  this  与组件实例绑定到一起
代码
	class App extends React.Component {

	constructor(){
		super()
		this.onIncrement = this.onIncrement.bind(this)
	}

	state = {count:0}

	//事件处理程序
	onIncrement(){
		this.setState( { count:this.state.count +1 } )
	}

	render(){
		return (
			<div>
				<h1>计数器：{this.state.count} </h1>
				<button onClick={ ( )=> { this.onIncrement() } }按钮+1</button>
				{/*<button onClick={ ( )=> { this.setState.count +1} }+1</button>*/}
			</div>
React.render(<App />,document.getElementById('root'))
关键代码：

class App extends React.Component {
	constructor(){
	super()
	//事件处理程序
	onIncrement=()=>{
		this.setState( { count:this.state.count +1 } )
	}
	this.onIncrement = this.onIncrement.bind(this)
}

class  的实例方法
利用箭头函数形式的class实例方法

class App extends React.Component {
	state = {count:0}

	//事件处理程序
	onIncrement=()=>{
		this.setState( { count:this.state.count +1 } )
	}

	render(){
		return (
			<div>
				<h1>计数器：{this.state.count} </h1>
				<button onClick={ ( )=> { this.onIncrement } }按钮+1</button>
				{/*<button onClick={ ( )=> { this.setState.count +1} }+1</button>*/}
			</div>
React.render(<App />,document.getElementById('root'))

关键代码：

class App extends React.Component {

	//事件处理程序
	onIncrement=()=>{
		this.setState( { count:this.state.count +1 } )
	}
}

表单处理 
受控组件
	HTML中的表单元素是可输入的，也就有自己的可变状态
	而  React 中可变状态通常保存在state中，并且只能通过setState（）方法来修改
	React将state与表单元素值value绑定到一起，由state的值来控制表单元素的值
	比如：<input type='text' value={this.state.text} />
	受控组件： 其值受到React 控制的表单元素
在state中添加一个状态，作为表单元素的value值，（控制表单元素值的来源）
给表单元素绑定change事件，将表单元素的值设置为state的值（控制表单元素值的变化）

state={txt:''}

<input type="text" value={this.state.txt}
	onChange={e =>this.setState({ txt:e.target.value }) }
/>

非受控组件
