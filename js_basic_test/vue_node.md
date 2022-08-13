# 1. `MVVM`原理

  `vue`的精髓在于组件化和数据驱动视图。

  组件化之前就有，比如`php`等语言，`vue`使用了组件化思想。

  进行了数据驱动视图的创新。之前的前端操作是静态渲染，要操作`dom`修改视图。

  ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/55bcaaf30e6942e99f5351e7a823f9f8~noop.image?_iz=58558&from=article.pc_detail&x-expires=1660692262&x-signature=NSNOxRbtNjMxHFoLNocVa%2F%2FIMtg%3D)

  

  

  数据劫持的优势

  无需显示调用，直接通知变化并驱动视图，`react`需要显示调用`setState`。

  可精确得知变化数据，减少diff的额外开销。

  `data`监听原理

  `Vue2`核心`api：Object.defineProperty`

  无法原生监听数组变化，`vue`对数组常用的8种方法进行`hack`，不过其他方法无法监听。

  深度遍历时，一次性计算量大。

  无法监听新增/删除属性,需在实例 `data` 声明所有响应值。删除设置为 `null` 即可。

  具体实现

```js
 // 在html中引入，修改data的值即可看到效果// 触发更新视图
function updateView() {    
	console.log('视图更新')}// 重新定义数组原型
	const oldArrayProperty = Array.prototype
    // 创建新对象，原型指向 oldArrayProperty ，再扩展新的方法不会影响原型
	const arrProto = Object.create(oldArrayProperty);
	['push', 'pop', 'shift', 'unshift', 'splice'].forEach(methodName => {    
		arrProto[methodName] = function () {        
		    updateView() // 触发视图更新        
		    oldArrayProperty[methodName].call(this, ...arguments)  // 
			Array.prototype.push.call(this, ...arguments)    
		}
    })  // 重新定义属性，监听起来
			
function defineReactive(target, key, value) {    // 深度监听    
	observer(value)    // 核心 API    
	Object.defineProperty(target, key, {        
	    get() {            
	        return value        
	    },        
	    set(newValue) {            
	        if (newValue !== value) {  // 深度监听                
	            observer(newValue)  
            // 设置新值，value 一直在闭包中，此处设 再 get 时也是会获取最新的值                
	        value = newValue   // 触发更新视图                
	        updateView()            
	    }        
	}    
	})
}  // 监听对象属性

function observer(target) {    
	if (typeof target !== 'object' || target === null) {        
		// 不是对象或数组        
		return target    
	}    
    // 污染全局的 Array 原型    // 
	Array.prototype.push = function () {    //     
		updateView()   

        //     ...    // 

	}    
	if (Array.isArray(target)) {        
		target.__proto__ = arrProto    
	}    // 重新定义各个属性（for in 也可以遍历数组）    
	for (let key in target) {        
		defineReactive(target, key, target[key])    
	}
    }
    // 准备数据
	const data = {    
		name: 'zhangsan',    
		age: 20,    
		info: {        
			address: '北京' ,// 需要深度监听    
		},    
		nums: [10, 20, 30],
	}
    // 监听数据
	observer(data)// 测试// 
	data.name = 'lisi'// 
	data.age = 21// // 
	console.log('age', data.age)// 
	data.x = '100' // 新增属性，监听不到 —— 所以有 
	Vue.set// 
	delete data.name // 删除属性，监听不到 —— 所有已 
	Vue.delete// 
	data.info.address = '上海' // 深度监听// 
	data.nums.push(4) // 监听数组
```

  # Vue3核心api：proxy（数据代理）

  优缺点

  按需监听，实现响应式，性能更好

  可监听新增/删除属性

  可原生监听数组变化

  不兼容低版本IE浏览器

  无法polyfill

具体实现

```js

  // 创建响应式
  function reactive(target = {}) {    
    if (typeof target !== 'object' || target == null) {        // 不是对象或数组，则返回        return target    }    // 代理配置    
    const proxyConf = {        
        get(target, key, receiver) {            
            // 只处理本身（非原型的）属性            
            const ownKeys = Reflect.ownKeys(target)            
            if (ownKeys.includes(key)) {                
                console.log('get', key) // 监听            
                }                
            const result = Reflect.get(target, key, receiver)                    
            // 深度监听            
            // 性能如何提升的？            
            return reactive(result)        
            },        
            set(target, key, val, receiver) {            
                // 重复的数据，不处理            
                if (val === target[key]) {                
                    return true            
                }                
                const ownKeys = Reflect.ownKeys(target)            
                if (ownKeys.includes(key)) {                
                    console.log('已有的 key', key)            
                } else {                
                    console.log('新增的 key', key)            
                }            
                const result = Reflect.set(target, key, val, receiver)            
                console.log('set', key, val)            
                // console.log('result', result) // true            
                return result // 是否设置成功        
                },        
                deleteProperty(target, key) {            
                    const result = Reflect.deleteProperty(target, key)            
                    console.log('delete property', key)            
                    // console.log('result', result) // true            
                    return result // 是否删除成功        
                    }    
                }    
                // 生成代理对象    
                const observed = new Proxy(target, proxyConf)    
                return observed}
                // 测试数据
                const data = {    
                    name: 'zhangsan',    
                    age: 20,    
                    info: {        
                        city: 'beijing',        
                        a: {            
                            b: {                
                                c: {                    
                                    d: 100                
                                }            
                            }        
                        }    
                    }}
                const proxyData = reactive(data)
```

  # 2. 虚拟dom：用js模拟dom结构，计算最小变更，操作dom

  js模拟dom

  ```html
  <div id="div1" class="container" style="color: red">    
  <p>vdom</p>    
  <ul style="font-size: 20px">        
    <li>a</li>    
  </ul></div>
  ```

  

  ```js

  {    
    tag: 'div',    
    sel: {        
        id: 'div1',        
        className: 'container'    
    },    
    props: { 
        style: 'color: red' 
    },    
    children: [        
        {            
            tag: 'p',            
            children: 'vdom'        
        },        
        {            
            tag: 'ul',            
            props: { style: 'font-size: 20px' },            
            children: [                
                {                    
                    tag: 'li',                    
                    children: 'a'               
                    }            
            ]        
        }    
    ]}
  ```

  核心：diff算法

  概述

  只比较同一层级，不跨级比较。

  ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/79bbd4bd89da41feb50f05e70bf42d7d~noop.image?_iz=58558&from=article.pc_detail&x-expires=1660692262&x-signature=CSIHsWeZl4AOIDjGvb1TzUwqxvU%3D)

  

  

  tag不相同，直接删除重建，不做再深度比较。

  ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/4689a587e0c34e6b9374c1adfffb54a7~noop.image?_iz=58558&from=article.pc_detail&x-expires=1660692262&x-signature=a58m%2BgA1ev86VxM6tFgQXLw7AJM%3D)

  

  

  tag和key相同，认为是同一节点，不做再深度比较。

  核心api（非真正源码）

  patch方法

  ```js
  // 参数代表旧的和新的虚拟
  domfunction patch (oldVnode, vnode) {    // tag、key、sel相同时进行比较    
  if (sameVnode(oldVnode, vnode)) {        
    patchVnode(oldVnode, vnode)    
    } else {        
        const oEl = oldVnode.el        
        let parentEle = api.parentNode(oEl)        
        createEle(vnode)        
        if (parentEle !== null) {            
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl))            
            api.removeChild(parentEle, oldVnode.el)            
            oldVnode = null        
            }    
    }    
    return vnode}
  ```

  使用sameVnode，tag、key、sel相同时，调用patchVnode函数进行比较。

  不相同则新节点将老节点替换。

  

  patchVnode方法

  ```js
  patchVnode (oldVnode, vnode) {    
    const el = vnode.el = oldVnode.el    
    let i, oldCh = oldVnode.children, ch = vnode.children    
    if (oldVnode === vnode) return    
    if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {        api.setTextContent(el, vnode.text)    
    }else {        
        updateEle(el, vnode, oldVnode)        
        if (oldCh && ch && oldCh !== ch) {            
            updateChildren(el, oldCh, ch)        
            }else if (ch){            
                createEle(vnode) //create el's children dom        
                }else if (oldCh){            
                    api.removeChildren(el)        
                    }    
                    }}
  ```

  节点的比较有5种情况：

  1、两个节点的引用一致，可以认为没有变化。

  2、文本节点不一致，进行修改。

  3、两个节点都有子节点且不一样，调用updateChildren函数比较子节点，这是diff的核心。

  4、只有新的节点有子节点，在原有dom节点上添加子节点。

  5、只有老的节点有子节点，直接删除老节点。

  updateChildren方法（函数体较大，不再展示）

  ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/74b0022e8707451596f94fc7b6d7d5fa~noop.image?_iz=58558&from=article.pc_detail&x-expires=1660692262&x-signature=1bZqAw335lMhEiYO%2FZRxMVyrE6M%3D)

  

  

  oldv和newv各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式，在比较的过程中，变量会往中间靠。

  命中后节点会进行相应的转移。比如是oldStarIdx和newEndIdx匹配上了，那么真实dom中的第一个节点会移到最后。

  ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/593445dc719a4fee8aca3012f47e83e1~noop.image?_iz=58558&from=article.pc_detail&x-expires=1660692262&x-signature=UD2sXB9cP9tRXr%2FtpJNsI4RcMa8%3D)

  

  

  4种都没匹配到，如果有key，就会把key和sel一致的进行复用。

  # 3. Vue是如何渲染和更新的

  ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/c763ad2257924ffa8e91802d455d477d~noop.image?_iz=58558&from=article.pc_detail&x-expires=1660692262&x-signature=IUak71hsSGiVYwL8fTdq4Qg88BM%3D)

  

  

  初次渲染过程

  解析模板为render函数（或在开发环境已完成，vue-loader）

  ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/7cb56d67909845a8ace7fe60713abacc~noop.image?_iz=58558&from=article.pc_detail&x-expires=1660692262&x-signature=OwuWCUvZBTWBriqaogJZ7oZrYlU%3D)

  

  

  触发响应式，监听getter、setter

  执行render函数，生成vnode，patch(vnode)

  更新过程

  修改data，触发setter，此前getter已被监听

  重新执行render函数，生成newVnode

  patch(vnode,newVnode)

  # 4. 为什么data必须是函数？

  组件是可复用的vue实例，不管被复用了多少次，组件中的data都应是相互隔离，互不影响的。
