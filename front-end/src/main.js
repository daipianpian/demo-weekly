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
import MetaInfo from 'vue-meta-info'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(vueQuillEditor)
Vue.use(MetaInfo)

const bus = new Vue()
window.bus = bus
Vue.prototype.$common = common
Vue.prototype.$http = http
Vue.prototype.$baseURL = baseURL
Vue.prototype.$moment = moment
Vue.prototype.$md5 = md5

/* eslint-disable */
router.beforeEach((to, from, next)=>{
  if (to.path) {
      _hmt.push(['_trackPageview', to.fullPath]);
  }
  next();
})
/* eslint-disable */

new Vue({
  router,
  store,
  render: h => h(App),
  // 添加mounted，不然不会执行预编译
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
