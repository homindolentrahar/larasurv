import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router/index'
import './index.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
