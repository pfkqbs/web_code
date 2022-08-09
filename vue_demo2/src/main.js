import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入axios
import axios from 'axios'
import router from './router'

// 引入图标库
import 'font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(ElementUI);


Vue.prototype.axios = axios  //挂载到原型 可以全局使用

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
