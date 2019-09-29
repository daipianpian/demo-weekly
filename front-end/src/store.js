import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menuList: [
      { name: '用户管理', url: '/home/user', icon: 'el-icon-user' },
      { name: '周报列表', url: '/home/weekly', icon: 'el-icon-s-grid' }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
