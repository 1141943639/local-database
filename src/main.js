import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router/router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')