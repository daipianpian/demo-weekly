import * as types from './mutation-types'

export default {
	changeIsBill({commit}, bill) {
		commit(types.CHANGE_IS_BILL, bill)
	}
};
