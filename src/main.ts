import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index'
import 'element-plus/es/components/message/style/css'
import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
