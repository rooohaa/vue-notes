import { createApp } from 'vue'

import router from './router'
import store from './store'

import App from './App.vue'
import Container from './components/ui/Container'
import Spinner from './components/ui/Spinner'
import Modal from './components/ui/Modal'
import Notify from './components/ui/Notify'

const app = createApp(App)

app.component('container', Container)
app.component('spinner', Spinner)
app.component('modal', Modal)
app.component('notify', Notify)

app.use(store).use(router).mount('#app')
