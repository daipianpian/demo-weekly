import 'babel-polyfill'
import Vue from 'vue'
import './assets/styles/reset.css'
import ElementUI from 'element-ui'
import './themes/element/element-variables.scss'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
