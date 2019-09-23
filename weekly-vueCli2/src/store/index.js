import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex);

const state = {
	isBill: 0,  // 显示含税商品还是不含税商品，0-不含税，1-含税
	adminId: sessionStorage.getItem('adminId'),
	adminName: sessionStorage.getItem('adminName'),
	loginTime: sessionStorage.getItem('loginTime')
}

export default new Vuex.Store({
	state,
	mutations,
	actions
})

