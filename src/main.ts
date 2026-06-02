import { createApp } from 'vue'

import App from './App.vue'

import Antd from 'ant-design-vue'

import 'ant-design-vue/dist/reset.css'

import { createPinia } from 'pinia'
import 'vant/lib/index.css'
import { Tabbar, TabbarItem, Popup } from 'vant'

const app = createApp(App)
app.use(Tabbar).use(TabbarItem).use(Popup)

app.use(createPinia())

app.use(Antd)

app.mount('#app')