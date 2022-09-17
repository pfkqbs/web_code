import { createApp } from 'vue'
import App from './App.vue'

//导入插件i18n
import i18n from './plugins/i18n'


import zh from './locals/zh'

const app = createApp(App)

// 挂载使用插件i18n
app.use(i18n,zh).mount('#app')
