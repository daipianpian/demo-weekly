import 'babel-polyfill'
import Vue from 'vue'
import './assets/styles/reset.css'
import ElementUI from 'element-ui'
import './themes/element/element-variables.scss'
import App from './App.vue'
import router from './router'
import store from './store'
import common from './assets/js/common.js'
import { http, baseURL } from './config/http.js'
import vueQuillEditor from 'vue-quill-editor' // 引入富文本工具
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import moment from 'moment'
import md5 from 'js-md5'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vueQuillEditor)

const bus = new Vue()
window.bus = bus
Vue.prototype.$common = common
Vue.prototype.$http = http
Vue.prototype.$baseURL = baseURL
Vue.prototype.$moment = moment
Vue.prototype.$md5 = md5

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
