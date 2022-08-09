
import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../components/Home.vue'   //路由懒加载不用导入

Vue.use(Router)
export default new Router({
    routes:[
        {
            path:'/home',
            // component:Home,
            component:()=>import('@/views/HomePage.vue')  //路由懒加载
            // component:resolve => require(['@/views/HomePage',resolve])  //异步组件
        },
        {
            path:'/',
            redirect:'/login',
            // component:Home,
            component:()=>import('@/views/LoginPage.vue')  //路由懒加载
            // component:resolve => require(['@/views/LoginPage',resolve])  //异步组件
        },
        {
            path:'/login',
            // component:Home,
            component:()=>import('@/views/LoginPage.vue')  //路由懒加载
            // component:resolve => require(['@/views/LoginPage',resolve])  //异步组件
        },

    ],
    mode:'history'
})
