import { createApp } from 'vue'  //导入vue

import App from './App.vue'//导入主组件

// 这里和vue2不同
const app = createApp(App)

app.mount('#app')
