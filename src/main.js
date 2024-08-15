import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './style.css'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)
const app = createApp(App);

app.mount('#app');
app.use(pinia);

