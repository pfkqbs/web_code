import Vue from 'vue'//第1步 ：导入 Vue
import VueRouter from 'vue-router'//第2步 ：导入 VueRouter
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)//第3步 ：使用 VueRouter

const routes = [
  {
    path: '/', redirect:'/home'
  },
  {
    path: '/home',name: 'home',component:() => import('../views/HomeView.vue')
  },
  // {
    // path: '/about',name: 'about',component: () => import('../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,  //默认下载router会有，自己配的话要配置  配置啥呢？？
  routes
})

export default router   //第4步 ：导出router  然后 main.js导入使用，并挂载到vue实例上
