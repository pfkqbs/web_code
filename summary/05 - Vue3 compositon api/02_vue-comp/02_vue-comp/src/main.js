import { createApp } from 'vue'
import App from './App.vue'
import i18n from './plugins/i18n'
import zh from './locals/zh'
const app = createApp(App)

app.use(i18n,zh).mount('#app')
