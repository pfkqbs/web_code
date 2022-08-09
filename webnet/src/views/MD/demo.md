## 后台管理系统

    第一步：删除不必要的文件

    第二步：下载依赖：axios；vue-router；less；less-loader；element-ui

    第三步： 配置路由；编写组件Login，Home组件，实现简单跳转

路由配置代码如下：

```js
const routes = [
  {
    path: '/', redirect:'/home'
  },
  {
    path: '/home',name: 'home',component: HomeView
  },
  {
    path: '/about',name: 'about',component: () => import('../views/AboutView.vue')
  }
]

```
  然后写 登录界面的样式；登录样式div垂直水平居住

  样式需要下载less:        npm i less@3.0.4 -D 
  样式需要下载less-loader: npm i less-loader@5.0.0 -D 

  编写好样式文件后 引入公共样式到vue文件 @import './styles/base.less'

```js


```

状态管理： 前端为什么需要前端管理？
    管理复杂的数据。
    Mvc，MvvM开始，通过状态去驱动，借鉴后端使用方法，
