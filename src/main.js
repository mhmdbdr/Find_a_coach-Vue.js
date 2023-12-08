import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/index.js'
import baseCard from './components/ui/baseCard'
import baseButton from './components/ui/baseButton'
import baseBadge from './components/ui/baseBadge'
import baseSpinner from '@/components/ui/BaseSpinner.vue'
// import basedialog from '@/components/ui/BaseDialog'

const basedialog = defineAsyncComponent(() => import('./components/ui/BaseDialog'))

const app = createApp(App)

app.use(router)
app.use(store)

app.component('base-card', baseCard)
app.component('base-button', baseButton)
app.component('base-badge', baseBadge)
app.component('base-spinner', baseSpinner)
app.component('base-dialog', basedialog)
app.mount('#app')
