## 一、什么是单页应用

​      单页web应用（single page web application，SPA），就是只有一张Web页面的应用。单页应用程序 (SPA) 是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。浏览器一开始会加载必需的HTML、CSS和JavaScript，所有的操作都在这张页面上完成，都由JavaScript来控制。因此，对单页应用来说模块化的开发和设计显得相当重要。

## 二、单页应用的优势和缺点

#### 【1】优势

​     操作体验流畅：媲美本地应用的感觉，切换过程中不会频繁有被“打断”的感觉。因为界面框架都在本地，与服务端的通讯基本只有数据，所以便于迁移，可以用比较小的代价，迁移成桌面产品，或者各种移动端Hybrid产品。

 完全的前端组件化：前端开发不再以页面为单位，更多地采用组件化的思想，代码结构和组织方式更加规范化，便于修改和调整；

 API 共享：如果你的服务是多端的（浏览器端、Android、iOS、微信等），单页应用的模式便于你在多个端共用 API，可以显著减少服务端的工作量。容易变化的 UI 部分都已经前置到了多端，只受到业务数据模型影响的 API，更容易稳定下来，便于提供更棒的服务；

组件共享：在某些对性能体验要求不高的场景，或者产品处于快速试错阶段，借助于一些技术（Hybrid、React Native），可以在多端共享组件，便于产品的快速迭代，节约资源。

#### 【2】缺点

首次加载大量资源：要在一个页面上为用户提供产品的所有功能，在这个页面加载的时候，首先要加载大量的静态资源，这个加载时间相对比较长；不过可以利用路由懒加载解决这个问题

 对搜索引擎不友好：因为界面的绝大部分都是动态生成的，所以搜索引擎很不容易索引它。

开发难度相对较高：开发者的JavaScript技能必须过关，同时需要对组件化、设计模式有所认识，他所面对的不再是一个简单的页面，而是一个运行在浏览器环境中的桌面软件。

## 三、vue-router是什么

​        vue-router是Vue.js官方的路由插件，它和vue.js是深度集成的，适合用于构建单页面应用。vue的单页面应用是基于路由和组件的，路由用于设定访问路径，并将路径和组件映射起来。传统的页面应用，是用一些超链接来实现页面切换和跳转的。在vue-router单页面应用中，则是路径之间的切换，也就是组件的切换。路由模块的本质 就是建立起url和组件之间的映射关系。

        至于我们为啥不能用a标签，这是因为用Vue做的都是单页应用（当你的项目npm run build 打包后，就会生成dist文件夹，这里面只有静态资源和一个index.html页面），所以你写的<a></a>标签跳转页面是不起作用的，你必须使用vue-router来进行管理。

## 四、安装vue-router

```powershell
npm install vue-router --save-dev
```

## 五、配置和简单使用vue-router

【1】在src文件夹下新增一个router文件夹，里面添加一个index.js文件

图片

【2】在main.js文件中引入

图片

【3】router文件下的index.js配置

```javascript
import Vue from 'vue'
import Router from 'vue-router'//引入V-router
// 引入page1和page2组件
import page1 from '@/components/page1'
import page2 from '@/components/page2'

Vue.use(Router)//使用V-router

export default new Router({
  // 定义路由，每个路由应该映射一个组件，component对应引入的组件名
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    },
  ]
})
```

【4】使用

我们己经配置好了路由/page1和/page2，可以在app.vue页面使用这两个路由

```javascript
<template>
  <div id="app">
    <!--
      1、使用router-link标签来导航
      2、通过传入 `to` 属性指定链接
      3、<router-link> 默认会被渲染成一个 `<a>` 标签
      4、当<router-link>对应的路由匹配成功，将自动设置class属性值为.router-link-active
    -->
    <router-link to="/page1">page1</router-link>
</template>

 <script>
  export default {
    methods: {
      gotoPage1() {
        // 编程式导航
        this.$router.push('/page1')
      }
    },
  }
</script>
```

```js
<template>
<!-- 通过路由设置的name值进行导航 -->
<router-link :to="{name: 'page2'}">page2</router-link>

<!-- 使用编程式导航 -->
<span @click="gotoPage1">gotoPage1</span>

<!-- 占坑，路由匹配到的组件将渲染在这里 -->
<router-view />

  </div>
</template>
```

<script>
  export default {
    methods: {
      gotoPage1() {
        // 编程式导航
        this.$router.push('/page1')
      }
    },
  }
</script>

【5】效果

图片
## 六、this.$router 和 this.$route的区别

【1】router：是VueRouter的实例，相当于一个全局的路由器对象，里面含有很多属性和子对象，例如history对象，编程式路由导航可以使用this.$router.push进行跳转。

图片

【2】route：相当于当前路由对象，可以从里面获取name,path,params,query等

图片

## 七、动态路由

【1】官方解释

动态路径参数，使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到`this.$route.params`，可以在每个组件内使用。

你可以在一个路由中设置多段“路径参数”，对应的值都会设置到`$route.params`中。例如：

模式	匹配路径	$route.params
/user/:username	/user/evan	
{ username: 'evan' }

/user/:username/post/:post_id	/user/evan/post/123	
{ username: 'evan'， post_id: '123' }

【2】适用场景

比如商品详情页面，页面结构都一样，只是商品id的不同，所以这个时候就可以用动态路由。

配置动态路由参数 

```javascript
// 配置路由
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/goods/:id', component: goods}
  ]
})
```

goods组件 


<template>
    <div>
      当前商品id为：{{$route.params.id}}
    </div>
  </template>

在浏览器地址栏中输入/goods/123

图片

## 八、嵌套路由

嵌套路由就是路由里面嵌套他的子路由，子路由关键属性children

每一个子路由里面可以嵌套多个组件，子组件又有路由导航和路由容器

举例：假设page页面下包含home子组件和goods子组件

配置嵌套路由（在page路由下增加一个children属性，配置home和goods两个子组件路由）

```javascript
export default new Router({
  // 定义路由，每个路由应该映射一个组件，component对应引入的组件名
  routes: [
    {
      path: '/page',
      name: 'page',
      component: page,
      children: [{
        path: '/page/home',
        name: 'home',
        component: home,
      }, {
        path: '/page/goods',
        name: 'goods',
        component: goods,
      }]
    },
    {
      path: '/page2',
      name: 'page2',
      component: page2
    },
  ]
})
```

page组件配置

```javascript


<template>
  <div>
    <p>page组件</p>
    <router-link to="/page/home">home</router-link>
    <router-link to="/page/goods">goods</router-link>
<!-- 占坑，匹配的子组件将渲染在这里 -->
<router-view></router-view>

  </div>
</template>
```

效果

图片

## 九、编程式导航

#### 【1】router.push

点击 <router-link ：to="..."> 等同于调用 this.$router.push(...)

在 Vue 实例内部，你可以通过 $router访问路由实例，因此你可以调用 this.$router.push

声明式	编程式
`<router-link ：to="...">	router.push(...)`
`$router.push(...)`的参数可以是一个字符串路径，或者一个描述地址的对象。例如：


```javascript
    // 字符串
    router.push('home')

    // 对象
    router.push({ path: 'home' })

    // 命名的路由
    router.push({ name: 'user', params: { userId: '123' } })

    // 带查询参数，变成 /register?plan=private
    router.push({ path: 'register', query: { plan: 'private' } })

    // 注意：如果提供了path,params会被忽略。需要提供路由的name或手写完整的带有参数的path
    const userId = '123'
    router.push({ path: '/user', params: { userId }}) // -> /user params不生效
    router.push({ name: 'user', params: { userId }}) // -> /user/123 params生效
    router.push({ path: `/user/${userId}` }) // -> /user/123 params生效
```

#### 【2】router.replace

跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 一一 替换掉当前的 history 记录。

#### 【3】router.go(n)

这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似window.history.go(n) 

```javascript
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)

// 后退一步记录，等同于 history.back()
router.go(-1)

// 前进 3 步记录
router.go(3)

// 后退 3 步记录
router.go(-3)
```



## 十、命名路由

就是在routers配置路由的时候加一个name属性，通过name名称来标识一个路由更加方便一些，特别是在嵌套路由path名称特别长的时候

```javascript
export default new Router({
  routes: [
    {
      path: '/page',
      name: 'page',
      component: page,
      children: [{
        path: '/page/home',
        name: 'home',
        component: home,
      }]
    },
  ]
})
```


以下四种方式都可以导航到/page/home路径  

 

```javascript
  <router-link to="/page/home">home</router-link>
   <router-link :to="{name: home}">home</router-link>
    this.$router.push('/page/home')
    this.$router.push({name: home})
```



## 十一、命名视图

简单来说就是，给不同的router-view定义不同的名字，通过名字进行对应组件的渲染。如果router-view没有设置名字，那么默认为default。

### 【1】适用场景

例如创建一个布局，有 topNav(顶部导航)、sidebar (侧导航) 和 main (主要内容) 三个视图，这个时候命名视图就派上用场了。

配置路由：根路由下定义了三个组件

index(主内容)：映射在router-view 默认视图上

topNav(顶部导航)：映射在 router-view 的 name 为 top 的视图上

sideNav(侧边栏)：映射在 router-view 的 name 为 side 的视图上

```javascript
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default: Index,
        side: SideNav,
        top: TopNav,
      },
      children: [{
        path: '/home',
        component: Home,
      }, {
        path: '/goods',
        component: Goods,
      }]
    },
  ]
})
```


App.vue文件（添加name属性创建两个命名视图和一个default默认视图）  

```javascript
 <router-view class="view one" name="top"></router-view>
 <router-view class="view two" name="side"></router-view>
 <router-view class="view three"></router-view>
```

效果

图片

## 十二、重定向和别名

### 【1】重定向（redirect）

```javascript
/a的重定向是/b，当用户访问 /a 时，URL 将会被替换成 /b，然后导航到 /b 页面


  // 重定向目标可以是一个path
    { path: '/a', component: A, redirect: '/b',  },

// 重定向目标也可以是一个命名的路由
{ path: '/a', component: A, redirect: {name: 'b'}},

// 甚至是一个方法
{ path: '/a', component: A, redirect: to => {
  // 方法接收目标路由to作为参数 to包含hash、params、query等属性
  // return 重定向的字符串路径/路径对象
  return '/b'
}}
```



### 【2】别名（alias）

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是导航到 /a页面，就像用户访问 /a 一样。

```javascript
 routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
```




## 十三、vue-router模式

### 【1】hash （默认）

hash模式URL：http://www.abc.com/#/hello

hash即地址栏 URL 中的 # 符号，比如这个 URL：http://www.abc.com/#/hello，hash 的值为 #/hello。它的特点在于hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

### 【2】history 

history模式URL：http://www.abc.com/hello

有的时候出于强迫症，不能忍受模式下的URL上存在#符号，或者是出于业务需求，URL不能带#号。这个时候要考虑采用vue-router的history模式，history模式的前端配置与上文大同小异，但是由于history模式下URL 路径的跳转是vue-router利用h5的history API动态添加的，而手动刷新页面会导致找不到路由从而产生404错误，因此还需要对服务端进行配置，将路由重定向到一级页面

### 【3】模式配置

```javascript
export default new Router({
  mode: 'history',
  routes: [...]
})
```



## 十四、路由守卫

Vue - 路由守卫（路由的生命周期）

