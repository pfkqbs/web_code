import Vue from 'vue'
import App from './App.vue'
import router from './router' 
import store from './store'
// markdown样式
import "github-markdown-css";
// 代码高亮
import "highlight.js/styles/github.css"; //默认样式
 
// 代码高亮devibeans   swh自定义颜色
// import './assets/css/swh.css'           //自定义样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入md文章组件列表

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
