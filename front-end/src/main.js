import 'babel-polyfill'
import Vue from 'vue'
import './assets/styles/reset.css'
import ElementUI from 'element-ui'
import './themes/element/element-variables.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import common from './assets/js/common.js'

Vue.config.productionTip = false

Vue.use(ElementUI)

const bus = new Vue()
window.bus = bus
Vue.prototype.$common = common

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
